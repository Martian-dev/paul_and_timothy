import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/db/client";

type RazorpayWebhook = {
  id?: string;
  event?: string;
  created_at?: number;
  payload?: {
    payment?: { entity?: Record<string, unknown> };
    order?: { entity?: Record<string, unknown> };
    refund?: { entity?: Record<string, unknown> };
  };
};

const MAX_WEBHOOK_BYTES = 1024 * 1024;
const MAX_WEBHOOK_AGE_SECONDS = 5 * 60;

async function readBoundedBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? "");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_WEBHOOK_BYTES) return null;

  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_WEBHOOK_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

export const Route = createFileRoute("/api/razorpay/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawBody = await readBoundedBody(request);
        if (rawBody === null) return new Response("Webhook payload too large", { status: 413 });
        const signature = request.headers.get("x-razorpay-signature");
        const { verifyWebhookSignature } = await import("@/lib/razorpay.server");
        if (!verifyWebhookSignature(rawBody, signature)) {
          return new Response("Invalid webhook signature", { status: 400 });
        }

        let event: RazorpayWebhook;
        try {
          event = JSON.parse(rawBody) as RazorpayWebhook;
        } catch {
          return new Response("Invalid webhook payload", { status: 400 });
        }

        const eventId = request.headers.get("x-razorpay-event-id") ?? event.id;
        if (!eventId || !event.event)
          return new Response("Missing webhook event ID", { status: 400 });

        // The event ID is supplied in an unsigned header. A timestamp window
        // prevents a captured, correctly signed payload from being replayed
        // later with a different header ID. Legitimate late deliveries are
        // recovered by the authenticated reconciliation job instead.
        const createdAt = Number(event.created_at);
        if (!Number.isInteger(createdAt)) {
          return new Response("Missing webhook timestamp", { status: 400 });
        }
        const now = Math.floor(Date.now() / 1000);
        if (Math.abs(now - createdAt) > MAX_WEBHOOK_AGE_SECONDS) {
          const sql = getDb();
          await sql`
            INSERT INTO razorpay_webhook_events (
              razorpay_event_id, event_type, payload, signature_verified, status,
              processing_error, processed_at
            )
            VALUES (
              ${eventId}, ${event.event}, ${rawBody}::jsonb, TRUE, 'ignored',
              'STALE_WEBHOOK', NOW()
            )
            ON CONFLICT (razorpay_event_id) DO NOTHING
          `;
          return Response.json({ received: true, ignored: true, stale: true });
        }

        const sql = getDb();
        const eventRows = (await sql`
          INSERT INTO razorpay_webhook_events (
            razorpay_event_id, event_type, payload, signature_verified, status
          )
          VALUES (${eventId}, ${event.event}, ${rawBody}::jsonb, TRUE, 'received')
          ON CONFLICT (razorpay_event_id) DO NOTHING
          RETURNING id
        `) as unknown as Array<{ id?: string }>;

        // Razorpay delivers events at least once. A duplicate is already safely
        // recorded and should be acknowledged without applying it twice. A
        // previously failed event is allowed to retry and finish processing.
        if (!eventRows[0]?.id) {
          const existingRows = (await sql`
            SELECT status FROM razorpay_webhook_events
            WHERE razorpay_event_id = ${eventId}
            LIMIT 1
          `) as unknown as Array<{ status?: string }>;
          if (existingRows[0]?.status === "processed" || existingRows[0]?.status === "ignored") {
            return Response.json({ received: true, duplicate: true });
          }
          await sql`
            UPDATE razorpay_webhook_events
            SET status = 'received', processing_error = NULL
            WHERE razorpay_event_id = ${eventId}
          `;
        }

        const payment = event.payload?.payment?.entity;
        const refund = event.payload?.refund?.entity;
        if (!payment && !refund) {
          await sql`
            UPDATE razorpay_webhook_events
            SET status = 'ignored', processing_error = 'NO_PAYMENT_ENTITY', processed_at = NOW()
            WHERE razorpay_event_id = ${eventId}
          `;
          return Response.json({ received: true, ignored: true });
        }

        try {
          const { processRazorpayPaymentEvent } = await import("@/lib/registrations");
          await processRazorpayPaymentEvent({ eventType: event.event, payment, refund });
          await sql`
            UPDATE razorpay_webhook_events
            SET status = 'processed', processed_at = NOW()
            WHERE razorpay_event_id = ${eventId}
          `;
          return Response.json({ received: true });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Webhook processing failed";
          await sql`
            UPDATE razorpay_webhook_events
            SET status = 'failed', processing_error = ${message.slice(0, 500)}
            WHERE razorpay_event_id = ${eventId}
          `;
          // A non-2xx response causes Razorpay to retry this event. The event
          // insert is idempotent, so a later retry can safely finish it.
          return Response.json({ received: false }, { status: 500 });
        }
      },
    },
  },
});
