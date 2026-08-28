import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/db/client";

const MAX_ATTEMPTS_PER_RUN = 25;

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function handleReconcile(request: Request) {
  if (!authorized(request)) return new Response("Unauthorized", { status: 401 });
  const sql = getDb();
  const attempts = (await sql`
    SELECT id, razorpay_order_id, razorpay_payment_id, status,
           receipt, amount_minor, currency, updated_at, created_at
    FROM event_payment_attempts
    WHERE status IN ('creating', 'failed', 'created', 'authorized', 'captured', 'refund_pending', 'refund_failed', 'disputed')
    ORDER BY COALESCE(updated_at, created_at) ASC, created_at ASC
    LIMIT ${MAX_ATTEMPTS_PER_RUN}
  `) as unknown as Array<{
    id: string;
    razorpay_order_id: string | null;
    razorpay_payment_id: string | null;
    status: string;
    receipt: string;
    amount_minor: number;
    currency: string;
  }>;

  const {
    fetchRazorpayDisputes,
    fetchRazorpayOrdersByReceipt,
    fetchRazorpayOrderPayments,
    fetchRazorpayPayment,
    fetchRazorpayPaymentRefunds,
  } = await import("@/lib/razorpay.server");
  const { processRazorpayPaymentEvent } = await import("@/lib/registrations");
  let processed = 0;
  const failures: Array<{ attemptId: string; error: string }> = [];

  const disputes: Array<{ payment_id: string; status: string }> = [];
  if (attempts.some((attempt) => Boolean(attempt.razorpay_payment_id))) {
    try {
      // Walk the full disputes collection. Chargebacks can be opened well
      // after a payment, so a recent-only window would permanently miss a
      // late dispute after a webhook outage.
      let skip = 0;
      for (;;) {
        const page = await fetchRazorpayDisputes(undefined, skip);
        disputes.push(...page);
        if (page.length < 100) break;
        skip += page.length;
      }
    } catch (error) {
      failures.push({
        attemptId: "disputes",
        error: error instanceof Error ? error.message : "DISPUTE_RECONCILIATION_FAILED",
      });
    }
  }

  for (const attempt of attempts) {
    let attemptFailed = false;
    try {
      let orderId = attempt.razorpay_order_id;
      if (!orderId && ["creating", "failed"].includes(attempt.status)) {
        const matchingOrders = (await fetchRazorpayOrdersByReceipt(attempt.receipt)).filter(
          (order) =>
            order.amount === Number(attempt.amount_minor) && order.currency === attempt.currency,
        );
        const recoveredOrder = matchingOrders[0];
        if (recoveredOrder) {
          await sql`
            UPDATE event_payment_attempts
            SET razorpay_order_id = ${recoveredOrder.id}, status = 'created', updated_at = NOW()
            WHERE id = ${attempt.id} AND razorpay_order_id IS NULL
          `;
          orderId = recoveredOrder.id;
        }
      }

      if (orderId && ["creating", "failed", "created", "authorized"].includes(attempt.status)) {
        const payments = await fetchRazorpayOrderPayments(orderId);
        for (const payment of payments) {
          const eventType =
            payment.status === "captured"
              ? "payment.captured"
              : payment.status === "authorized"
                ? "payment.authorized"
                : payment.status === "failed"
                  ? "payment.failed"
                  : null;
          if (!eventType) continue;
          await processRazorpayPaymentEvent({
            eventType,
            payment: payment as unknown as Record<string, unknown>,
          });
          processed += 1;
        }
      }

      if (attempt.razorpay_payment_id) {
        const refunds = await fetchRazorpayPaymentRefunds(attempt.razorpay_payment_id);
        const matchingDisputes = disputes.filter(
          (item) => item.payment_id === attempt.razorpay_payment_id,
        );
        let currentPayment: Awaited<ReturnType<typeof fetchRazorpayPayment>> | undefined;
        if (refunds.length > 0 || matchingDisputes.length > 0) {
          // A current payment fetch is needed for cumulative partial-refund
          // detection, but is skipped for ordinary captured attempts.
          currentPayment = await fetchRazorpayPayment(attempt.razorpay_payment_id);
        }
        for (const refund of refunds) {
          const eventType =
            refund.status === "processed"
              ? "refund.processed"
              : refund.status === "failed"
                ? "refund.failed"
                : "refund.created";
          await processRazorpayPaymentEvent({
            eventType,
            payment: currentPayment as unknown as Record<string, unknown>,
            refund: refund as unknown as Record<string, unknown>,
          });
          processed += 1;
        }

        for (const dispute of matchingDisputes) {
          const disputeEvent =
            dispute.status === "won"
              ? "payment.dispute.won"
              : dispute.status === "lost"
                ? "payment.dispute.lost"
                : dispute.status === "closed"
                  ? "payment.dispute.closed"
                  : dispute.status === "under_review"
                    ? "payment.dispute.under_review"
                    : "payment.dispute.created";
          await processRazorpayPaymentEvent({
            eventType: disputeEvent,
            payment: currentPayment as unknown as Record<string, unknown>,
          });
          processed += 1;
        }
      }
    } catch (error) {
      attemptFailed = true;
      failures.push({
        attemptId: attempt.id,
        error: error instanceof Error ? error.message : "RECONCILIATION_FAILED",
      });
    }

    // Reconciliation is deliberately cursorless: touching successful
    // rows rotates them to the back of the queue so a backlog of old
    // captured attempts cannot starve newer/unresolved attempts. Rows
    // that failed remain old and are retried promptly on the next run.
    if (!attemptFailed) {
      await sql`
        UPDATE event_payment_attempts
        SET updated_at = NOW()
        WHERE id = ${attempt.id}
      `;
    }
  }

  return Response.json({ inspected: attempts.length, processed, failures });
}

export const Route = createFileRoute("/api/razorpay/reconcile")({
  server: {
    handlers: {
      GET: ({ request }) => handleReconcile(request),
      POST: ({ request }) => handleReconcile(request),
    },
  },
});
