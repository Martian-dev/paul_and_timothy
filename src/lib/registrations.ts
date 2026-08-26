import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { z } from "zod";
import { getDb } from "@/db/client";
import { upsertAppUser } from "@/lib/user-sync";

type DatabaseRow = Record<string, unknown>;

const alethiaQuestionsSchema = z.object({
  participatedInAlethiaTraining: z.enum(["yes", "no"]),
  involvedInYouthMinistry: z.enum(["yes", "no", "wants_to"]),
  churchNameArea: z.string().trim().min(1, "Enter your church name and area").max(300),
  youthMinistryQuestions: z.string().trim().max(2000).default(""),
});

const registrationDraftSchema = z
  .object({
    eventSlug: z.string().trim().min(1).max(100),
    fullName: z.string().trim().min(2, "Enter your full name").max(200),
    phone: z.string().trim().min(5, "Enter a valid phone number").max(40),
    additionalQuestions: alethiaQuestionsSchema.optional(),
  })
  .superRefine((data, context) => {
    if (data.eventSlug === "alethia" && !data.additionalQuestions) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["additionalQuestions"],
        message: "Complete the Alethia questionnaire",
      });
    }
  });

const registrationIdSchema = z.object({ registrationId: z.string().uuid() });

export type RegistrationInput = z.infer<typeof registrationDraftSchema>;

export type RegistrationEvent = {
  slug: string;
  title: string;
  startsAt: string | null;
  endsAt: string | null;
  status: "draft" | "open" | "closed" | "cancelled";
  amountMinor: number;
  currency: string;
  paymentRequired: boolean;
  registrationDeadline: string | null;
};

export type ExistingRegistration = {
  registrationId: string;
  fullName: string;
  phone: string;
  additionalQuestions: Record<string, string>;
  registrationStatus: "draft" | "payment_pending" | "registered" | "cancelled" | "refunded";
  paymentStatus:
    | "not_required"
    | "pending"
    | "authorized"
    | "paid"
    | "failed"
    | "refund_pending"
    | "refunded"
    | "disputed";
  paymentAttemptId: string | null;
  receiptNumber: string | null;
};

export type RegistrationPageData = {
  event: RegistrationEvent;
  registration: ExistingRegistration | null;
};

export type PaymentOrderResult = {
  registrationId: string;
  paymentAttemptId: string;
  orderId: string;
  amountMinor: number;
  currency: string;
  keyId: string;
  receipt: string;
  alreadyPaid: boolean;
};

export type PaymentVerificationResult = {
  status:
    | "created"
    | "authorized"
    | "captured"
    | "failed"
    | "refunded"
    | "refund_pending"
    | "refund_failed"
    | "disputed";
  registrationId: string;
  paymentAttemptId: string;
  receiptNumber: string | null;
};

export type AccountRegistration = {
  registrationId: string;
  eventSlug: string;
  eventTitle: string;
  startsAt: string | null;
  endsAt: string | null;
  registrationStatus: ExistingRegistration["registrationStatus"];
  paymentStatus: ExistingRegistration["paymentStatus"];
  amountMinor: number;
  currency: string;
  receiptNumber: string | null;
  paymentAttemptId: string | null;
  paymentCreatedAt: string | null;
  paymentCapturedAt: string | null;
  failureDescription: string | null;
};

export type ReceiptDetails = {
  receiptNumber: string;
  eventTitle: string;
  eventSlug: string;
  startsAt: string | null;
  endsAt: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amountMinor: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  capturedAt: string | null;
  paymentMethod: string | null;
};

async function requireCurrentUser() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) throw new Error("UNAUTHORIZED");
  const { appUserId, email } = await upsertAppUser(userId);
  return { clerkUserId: userId, appUserId, email };
}

async function requireVerifiedCurrentUser() {
  const current = await requireCurrentUser();
  const clerkUser = await clerkClient().users.getUser(current.clerkUserId);
  if (clerkUser.primaryEmailAddress?.verification?.status !== "verified") {
    throw new Error("ACCOUNT_EMAIL_REQUIRED");
  }
  return current;
}

function mapEvent(row: DatabaseRow): RegistrationEvent {
  return {
    slug: row.slug as string,
    title: row.title as string,
    startsAt: (row.starts_at as string | null) ?? null,
    endsAt: (row.ends_at as string | null) ?? null,
    status: row.status as RegistrationEvent["status"],
    amountMinor: Number(row.amount_minor ?? 0),
    currency: row.currency as string,
    paymentRequired: Boolean(row.payment_required),
    registrationDeadline: (row.registration_deadline as string | null) ?? null,
  };
}

function mapRegistration(row: DatabaseRow): ExistingRegistration {
  return {
    registrationId: row.registration_id as string,
    fullName: row.full_name as string,
    phone: row.phone as string,
    additionalQuestions:
      (row.additional_questions as Record<string, string> | null | undefined) ?? {},
    registrationStatus: row.registration_status as ExistingRegistration["registrationStatus"],
    paymentStatus: row.payment_status as ExistingRegistration["paymentStatus"],
    paymentAttemptId: (row.payment_attempt_id as string | null) ?? null,
    receiptNumber: (row.receipt_number as string | null) ?? null,
  };
}

/** Load the event and the current user's saved registration. */
export const getRegistrationPageData = createServerFn({ method: "GET" })
  .validator(z.object({ eventSlug: z.string().trim().min(1).max(100) }))
  .handler(async ({ data }): Promise<RegistrationPageData> => {
    const { appUserId } = await requireCurrentUser();
    const sql = getDb();
    const eventRows = (await sql`
      SELECT id, slug, title, starts_at, ends_at, status, amount_minor, currency,
             payment_required, registration_deadline
      FROM events
      WHERE slug = ${data.eventSlug}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const event = eventRows[0];
    if (!event) throw new Error("EVENT_NOT_FOUND");

    const registrationRows = (await sql`
      SELECT
        registrations.id AS registration_id,
        registrations.full_name,
        registrations.phone,
        registrations.additional_questions,
        registrations.registration_status,
        registrations.payment_status,
        registrations.receipt_number,
        attempts.id AS payment_attempt_id
      FROM event_registrations AS registrations
      LEFT JOIN LATERAL (
        SELECT id
        FROM event_payment_attempts
        WHERE registration_id = registrations.id
        ORDER BY created_at DESC
        LIMIT 1
      ) AS attempts ON TRUE
      WHERE registrations.event_id = ${event.id as string}
        AND registrations.user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];

    return {
      event: mapEvent(event),
      registration: registrationRows[0] ? mapRegistration(registrationRows[0]) : null,
    };
  });

/** Backwards-compatible narrow loader for callers that only need a registration. */
export const getEventRegistration = createServerFn({ method: "GET" })
  .validator(z.object({ eventSlug: z.string().trim().min(1).max(100) }))
  .handler(async ({ data }): Promise<ExistingRegistration | null> => {
    return (await getRegistrationPageData({ data })).registration;
  });

/** Save the questionnaire and contact details without claiming payment. */
export const saveRegistrationDraft = createServerFn({ method: "POST" })
  .validator(registrationDraftSchema)
  .handler(async ({ data }) => {
    const { appUserId } = await requireVerifiedCurrentUser();
    const sql = getDb();
    const eventRows = (await sql`
      SELECT id, status, payment_required, amount_minor, currency, registration_deadline
      FROM events
      WHERE slug = ${data.eventSlug}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const event = eventRows[0];
    if (!event) throw new Error("EVENT_NOT_FOUND");
    if (event.status !== "open") throw new Error("EVENT_CLOSED");
    if (event.registration_deadline && new Date(String(event.registration_deadline)) < new Date()) {
      throw new Error("REGISTRATION_DEADLINE_PASSED");
    }
    if (
      Boolean(event.payment_required) &&
      (!Number.isSafeInteger(Number(event.amount_minor ?? 0)) ||
        Number(event.amount_minor ?? 0) <= 0)
    ) {
      throw new Error("EVENT_PRICE_NOT_CONFIGURED");
    }

    const existingRows = (await sql`
      SELECT id, registration_status, payment_status
      FROM event_registrations
      WHERE event_id = ${event.id as string} AND user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const existing = existingRows[0];
    if (
      existing?.payment_status === "refund_pending" ||
      existing?.payment_status === "refunded" ||
      existing?.payment_status === "disputed"
    ) {
      throw new Error("PAYMENT_NOT_AVAILABLE");
    }
    if (
      existing?.payment_status === "paid" ||
      (event.payment_required !== true && existing?.registration_status === "registered")
    ) {
      throw new Error("REGISTRATION_ALREADY_PAID");
    }

    const additionalQuestions =
      data.eventSlug === "alethia" ? (data.additionalQuestions ?? {}) : {};
    const registrationStatus = event.payment_required === true ? "draft" : "registered";
    const paymentStatus = event.payment_required === true ? "pending" : "not_required";
    const rows = (await sql`
      INSERT INTO event_registrations (
        event_id, user_id, full_name, phone, additional_questions,
        registration_status, payment_status, questionnaire_submitted_at,
        confirmed_at
      )
      VALUES (
        ${event.id as string}, ${appUserId}, ${data.fullName}, ${data.phone},
        ${JSON.stringify(additionalQuestions)}::jsonb,
        ${registrationStatus}, ${paymentStatus}, NOW(),
        ${event.payment_required === true ? null : new Date()}
      )
      ON CONFLICT (event_id, user_id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        additional_questions = EXCLUDED.additional_questions,
        questionnaire_submitted_at = NOW(),
        registration_status = CASE
          WHEN event_registrations.payment_status IN ('paid', 'authorized')
            THEN event_registrations.registration_status
          ELSE EXCLUDED.registration_status
        END,
        payment_status = CASE
          WHEN event_registrations.payment_status IN ('paid', 'authorized')
            THEN event_registrations.payment_status
          ELSE EXCLUDED.payment_status
        END,
        confirmed_at = CASE
          WHEN EXCLUDED.payment_status = 'not_required' THEN COALESCE(event_registrations.confirmed_at, NOW())
          ELSE event_registrations.confirmed_at
        END,
        updated_at = NOW()
      RETURNING id, registration_status, payment_status
    `) as unknown as DatabaseRow[];

    const row = rows[0];
    if (!row?.id) throw new Error("REGISTRATION_FAILED");
    return {
      registrationId: row.id as string,
      registrationStatus: row.registration_status as ExistingRegistration["registrationStatus"],
      paymentStatus: row.payment_status as ExistingRegistration["paymentStatus"],
      amountMinor: Number(event.amount_minor ?? 0),
      currency: event.currency as string,
      paymentRequired: Boolean(event.payment_required),
    };
  });

function createReceiptReference() {
  return `PTTC-${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
}

function paymentAuditSnapshot(payment: Record<string, unknown> | undefined) {
  if (!payment) return null;
  const allowedFields = [
    "id",
    "order_id",
    "amount",
    "currency",
    "status",
    "method",
    "amount_refunded",
    "refund_status",
    "captured",
    "error_code",
    "error_description",
    "created_at",
  ];
  return Object.fromEntries(
    allowedFields
      .filter((field) => payment[field] !== undefined)
      .map((field) => [field, payment[field]]),
  );
}

/** Create the server-owned Razorpay order used by Checkout. */
export const createEventPaymentOrder = createServerFn({ method: "POST" })
  .validator(
    z.object({
      registrationId: z.string().uuid(),
      clientIdempotencyKey: z.string().trim().min(16).max(128),
    }),
  )
  .handler(async ({ data }): Promise<PaymentOrderResult> => {
    const { appUserId } = await requireVerifiedCurrentUser();
    const sql = getDb();
    const registrationRows = (await sql`
      SELECT registrations.id, registrations.registration_status, registrations.payment_status,
             registrations.full_name, registrations.phone, registrations.additional_questions,
             registrations.questionnaire_submitted_at,
             events.slug, events.status AS event_status,
             events.title, events.amount_minor, events.currency, events.payment_required,
             events.registration_deadline
      FROM event_registrations AS registrations
      INNER JOIN events ON events.id = registrations.event_id
      WHERE registrations.id = ${data.registrationId}
        AND registrations.user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const registration = registrationRows[0];
    if (!registration) throw new Error("REGISTRATION_NOT_FOUND");
    if (!registration.questionnaire_submitted_at) throw new Error("QUESTIONNAIRE_REQUIRED");
    const questionnaire = registrationDraftSchema.safeParse({
      eventSlug: registration.slug as string,
      fullName: registration.full_name as string,
      phone: registration.phone as string,
      additionalQuestions: registration.additional_questions ?? undefined,
    });
    if (!questionnaire.success) throw new Error("QUESTIONNAIRE_REQUIRED");
    if (registration.event_status !== "open") throw new Error("EVENT_CLOSED");
    if (
      registration.registration_deadline &&
      new Date(String(registration.registration_deadline)) < new Date()
    ) {
      throw new Error("REGISTRATION_DEADLINE_PASSED");
    }
    if (
      registration.payment_required !== true ||
      !Number.isSafeInteger(Number(registration.amount_minor ?? 0)) ||
      Number(registration.amount_minor ?? 0) <= 0
    ) {
      throw new Error("EVENT_PRICE_NOT_CONFIGURED");
    }
    if (
      registration.payment_status === "paid" ||
      (registration.payment_required !== true && registration.registration_status === "registered")
    ) {
      return {
        registrationId: data.registrationId,
        paymentAttemptId: "",
        orderId: "",
        amountMinor: Number(registration.amount_minor),
        currency: registration.currency as string,
        keyId: "",
        receipt: "",
        alreadyPaid: true,
      };
    }
    if (
      registration.payment_status === "refund_pending" ||
      registration.payment_status === "disputed" ||
      registration.payment_status === "refunded"
    ) {
      throw new Error("PAYMENT_NOT_AVAILABLE");
    }

    const existingAttemptRows = (await sql`
      SELECT id, receipt, amount_minor, currency, status, razorpay_order_id
      FROM event_payment_attempts
      WHERE registration_id = ${data.registrationId}
        AND client_idempotency_key = ${data.clientIdempotencyKey}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const existingAttempt = existingAttemptRows[0];
    if (existingAttempt?.razorpay_order_id) {
      const { getRazorpayKeyId } = await import("@/lib/razorpay.server");
      return {
        registrationId: data.registrationId,
        paymentAttemptId: existingAttempt.id as string,
        orderId: existingAttempt.razorpay_order_id as string,
        amountMinor: Number(existingAttempt.amount_minor),
        currency: existingAttempt.currency as string,
        keyId: getRazorpayKeyId(),
        receipt: existingAttempt.receipt as string,
        alreadyPaid: false,
      };
    }

    // Razorpay orders support multiple payment attempts. Reuse the most
    // recent failed order instead of creating a second order that could race
    // a delayed authorization from the first one.
    const failedOrderRows = (await sql`
      SELECT id, receipt, amount_minor, currency, razorpay_order_id
      FROM event_payment_attempts
      WHERE registration_id = ${data.registrationId}
        AND status = 'failed' AND razorpay_order_id IS NOT NULL
        AND NOT EXISTS (
          SELECT 1
          FROM event_payment_attempts AS open_attempts
          WHERE open_attempts.registration_id = ${data.registrationId}
            AND open_attempts.status IN ('creating', 'created', 'authorized')
        )
      ORDER BY created_at DESC
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const failedOrder = failedOrderRows[0];
    if (failedOrder?.razorpay_order_id) {
      const { getRazorpayKeyId } = await import("@/lib/razorpay.server");
      return {
        registrationId: data.registrationId,
        paymentAttemptId: failedOrder.id as string,
        orderId: failedOrder.razorpay_order_id as string,
        amountMinor: Number(failedOrder.amount_minor),
        currency: failedOrder.currency as string,
        keyId: getRazorpayKeyId(),
        receipt: failedOrder.receipt as string,
        alreadyPaid: false,
      };
    }

    const openAttemptRows = (await sql`
      SELECT id, receipt, amount_minor, currency, status, razorpay_order_id, created_at
      FROM event_payment_attempts
      WHERE registration_id = ${data.registrationId}
        AND status IN ('creating', 'created', 'authorized')
      ORDER BY created_at DESC
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const openAttempt = openAttemptRows[0];
    if (openAttempt) {
      const isStaleCreating =
        openAttempt.status === "creating" &&
        new Date(String(openAttempt.created_at)).getTime() < Date.now() - 10 * 60 * 1000;
      if (isStaleCreating && !openAttempt.razorpay_order_id) {
        await sql`
          UPDATE event_payment_attempts
          SET status = 'failed', failure_code = 'ORDER_CREATION_TIMEOUT',
              failure_description = 'Order creation did not complete', updated_at = NOW()
          WHERE id = ${openAttempt.id as string}
            AND status = 'creating' AND razorpay_order_id IS NULL
        `;
      } else if (openAttempt.razorpay_order_id) {
        const { getRazorpayKeyId } = await import("@/lib/razorpay.server");
        return {
          registrationId: data.registrationId,
          paymentAttemptId: openAttempt.id as string,
          orderId: openAttempt.razorpay_order_id as string,
          amountMinor: Number(openAttempt.amount_minor),
          currency: openAttempt.currency as string,
          keyId: getRazorpayKeyId(),
          receipt: openAttempt.receipt as string,
          alreadyPaid: false,
        };
      } else {
        throw new Error("PAYMENT_ATTEMPT_IN_PROGRESS");
      }
    }

    let attemptId: string;
    let receipt: string;
    try {
      const attemptRows = (await sql`
        INSERT INTO event_payment_attempts (
          registration_id, client_idempotency_key, receipt, amount_minor, currency,
          questionnaire_snapshot
        )
        VALUES (
          ${data.registrationId}, ${data.clientIdempotencyKey}, ${createReceiptReference()},
          ${Number(registration.amount_minor)}, ${registration.currency as string},
          ${JSON.stringify({
            version: 1,
            eventSlug: registration.slug,
            fullName: registration.full_name,
            phone: registration.phone,
            additionalQuestions: registration.additional_questions ?? {},
          })}::jsonb
        )
        RETURNING id, receipt
      `) as unknown as DatabaseRow[];
      if (!attemptRows[0]?.id) throw new Error("PAYMENT_ATTEMPT_FAILED");
      attemptId = attemptRows[0].id as string;
      receipt = attemptRows[0].receipt as string;
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes("duplicate key")) throw error;
      const retryRows = (await sql`
        SELECT id, receipt, amount_minor, currency, status, razorpay_order_id
        FROM event_payment_attempts
        WHERE registration_id = ${data.registrationId}
          AND client_idempotency_key = ${data.clientIdempotencyKey}
        LIMIT 1
      `) as unknown as DatabaseRow[];
      const retry = retryRows[0];
      if (retry?.razorpay_order_id) {
        const { getRazorpayKeyId } = await import("@/lib/razorpay.server");
        return {
          registrationId: data.registrationId,
          paymentAttemptId: retry.id as string,
          orderId: retry.razorpay_order_id as string,
          amountMinor: Number(retry.amount_minor),
          currency: retry.currency as string,
          keyId: getRazorpayKeyId(),
          receipt: retry.receipt as string,
          alreadyPaid: false,
        };
      }
      // A failed attempt has no Razorpay order and can safely be retried with
      // the same idempotency key. An attempt that is still being created is
      // owned by another request and must not be raced.
      if (retry?.status !== "failed" || retry.razorpay_order_id) {
        throw new Error("PAYMENT_ATTEMPT_IN_PROGRESS");
      }
      const claimedRows = (await sql`
        UPDATE event_payment_attempts
        SET status = 'creating', failure_code = NULL, failure_description = NULL, updated_at = NOW()
        WHERE id = ${retry?.id as string} AND status = 'failed' AND razorpay_order_id IS NULL
        RETURNING id, receipt
      `) as unknown as DatabaseRow[];
      if (!claimedRows[0]?.id) throw new Error("PAYMENT_ATTEMPT_IN_PROGRESS");
      attemptId = claimedRows[0].id as string;
      receipt = claimedRows[0].receipt as string;
    }

    const { createRazorpayOrder, fetchRazorpayOrdersByReceipt, getRazorpayKeyId } =
      await import("@/lib/razorpay.server");
    let order: Awaited<ReturnType<typeof createRazorpayOrder>>;
    try {
      order = await createRazorpayOrder({
        amount: Number(registration.amount_minor),
        currency: registration.currency as string,
        receipt,
        registrationId: data.registrationId,
        paymentAttemptId: attemptId,
      });
      if (
        order.amount !== Number(registration.amount_minor) ||
        order.currency !== registration.currency
      ) {
        throw new Error("PAYMENT_ORDER_DETAILS_MISMATCH");
      }
    } catch {
      // The create request may have reached Razorpay even when the response
      // was lost (timeout, connection reset, or a duplicate-receipt error).
      // Look up the unique receipt before marking this attempt failed. This
      // keeps the local attempt linked to the external order and prevents a
      // retry from ever presenting an untracked second order to the customer.
      try {
        const recoveredOrder = (await fetchRazorpayOrdersByReceipt(receipt)).find(
          (candidate) =>
            candidate.amount === Number(registration.amount_minor) &&
            candidate.currency === registration.currency,
        );
        if (recoveredOrder) {
          await sql`
            UPDATE event_payment_attempts
            SET status = 'created', razorpay_order_id = ${recoveredOrder.id}, updated_at = NOW()
            WHERE id = ${attemptId} AND status = 'creating'
          `;
          await sql`
            UPDATE event_registrations
            SET registration_status = 'payment_pending', payment_status = 'pending', updated_at = NOW()
            WHERE id = ${data.registrationId} AND payment_status <> 'paid'
          `;
          return {
            registrationId: data.registrationId,
            paymentAttemptId: attemptId,
            orderId: recoveredOrder.id,
            amountMinor: recoveredOrder.amount,
            currency: recoveredOrder.currency,
            keyId: getRazorpayKeyId(),
            receipt,
            alreadyPaid: false,
          };
        }
      } catch {
        // Reconciliation will retry the receipt lookup if Razorpay or the
        // database is temporarily unavailable.
      }
      await sql`
        UPDATE event_payment_attempts
        SET status = 'failed', failure_code = 'ORDER_CREATION_FAILED',
            failure_description = 'Razorpay order creation failed', updated_at = NOW()
        WHERE id = ${attemptId} AND status = 'creating'
      `;
      throw new Error("PAYMENT_ORDER_FAILED");
    }

    // Persist the Razorpay order before returning it to the browser. A short
    // retry protects against a transient database connection failure; without
    // this, a payable order could exist at Razorpay with no local mapping.
    let persisted = false;
    for (let attempt = 0; attempt < 3 && !persisted; attempt += 1) {
      try {
        await sql`
          UPDATE event_payment_attempts
          SET status = 'created', razorpay_order_id = ${order.id}, updated_at = NOW()
          WHERE id = ${attemptId} AND status = 'creating'
        `;
        persisted = true;
      } catch {
        if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 100 * 2 ** attempt));
      }
    }
    if (!persisted) throw new Error("PAYMENT_ORDER_PERSIST_FAILED");

    try {
      await sql`
        UPDATE event_registrations
        SET registration_status = 'payment_pending', payment_status = 'pending', updated_at = NOW()
        WHERE id = ${data.registrationId} AND payment_status <> 'paid'
      `;
      return {
        registrationId: data.registrationId,
        paymentAttemptId: attemptId,
        orderId: order.id,
        amountMinor: order.amount,
        currency: order.currency,
        keyId: getRazorpayKeyId(),
        receipt,
        alreadyPaid: false,
      };
    } catch {
      // The order ID is already durable, so reconciliation can resume this
      // attempt even if the registration status update is temporarily down.
      throw new Error("PAYMENT_ORDER_PERSIST_FAILED");
    }
  });

async function applyPaymentState(input: {
  attemptId: string;
  status:
    | "authorized"
    | "captured"
    | "failed"
    | "refunded"
    | "refund_pending"
    | "refund_failed"
    | "disputed";
  paymentId?: string;
  orderId?: string;
  signature?: string;
  payment?: Record<string, unknown>;
  failureCode?: string | null;
  failureDescription?: string | null;
  refundId?: string | null;
  resolveDispute?: boolean;
}) {
  const sql = getDb();
  // Keep only non-sensitive payment metadata. Razorpay entities may include
  // card/network fields; retaining the entire webhook payload is unnecessary
  // and creates avoidable PCI/PII exposure in our database.
  const paymentJson = paymentAuditSnapshot(input.payment);
  await sql.transaction((tx) => [
    tx`
      UPDATE event_payment_attempts
      SET status = CASE
            WHEN status = 'refunded' THEN status
            -- Once a refund or dispute has started, a delayed payment event
            -- must not resurrect the registration as paid.
            WHEN status IN ('refund_pending', 'refund_failed', 'disputed')
              AND NOT ${input.resolveDispute === true}
              AND ${input.status} NOT IN ('refund_pending', 'refund_failed', 'refunded', 'disputed') THEN status
            WHEN ${input.status} IN ('refunded', 'refund_pending', 'refund_failed', 'disputed') THEN ${input.status}
            WHEN status = 'captured' THEN status
            WHEN ${input.status} = 'captured' THEN 'captured'
            WHEN ${input.status} = 'authorized' AND status = 'failed' THEN 'authorized'
            ELSE ${input.status}
          END,
          razorpay_payment_id = COALESCE(${input.paymentId ?? null}, razorpay_payment_id),
          razorpay_order_id = COALESCE(${input.orderId ?? null}, razorpay_order_id),
          razorpay_signature = COALESCE(${input.signature ?? null}, razorpay_signature),
          razorpay_refund_id = COALESCE(${input.refundId ?? null}, razorpay_refund_id),
          failure_code = COALESCE(${input.failureCode ?? null}, failure_code),
          failure_description = COALESCE(${input.failureDescription ?? null}, failure_description),
          payment_method = COALESCE(${typeof input.payment?.method === "string" ? input.payment.method : null}, payment_method),
          raw_payment = COALESCE(${paymentJson ? JSON.stringify(paymentJson) : null}::jsonb, raw_payment),
          authorized_at = CASE WHEN ${input.status} = 'authorized' THEN COALESCE(authorized_at, NOW()) ELSE authorized_at END,
          captured_at = CASE WHEN ${input.status} = 'captured' THEN COALESCE(captured_at, NOW()) ELSE captured_at END,
          refunded_at = CASE WHEN ${input.status} = 'refunded' THEN COALESCE(refunded_at, NOW()) ELSE refunded_at END,
          updated_at = NOW()
      WHERE id = ${input.attemptId}
    `,
    tx`
      UPDATE event_registrations AS registrations
          SET registration_status = CASE
            WHEN attempts.status = 'captured' THEN 'registered'
            WHEN attempts.status = 'refunded' THEN 'refunded'
            WHEN attempts.status IN ('refund_pending', 'refund_failed', 'disputed') THEN 'payment_pending'
            ELSE registrations.registration_status
          END,
          payment_status = CASE
            WHEN attempts.status = 'captured' THEN 'paid'
            WHEN attempts.status = 'authorized' THEN 'authorized'
            WHEN attempts.status = 'failed' THEN 'failed'
            WHEN attempts.status = 'refunded' THEN 'refunded'
            WHEN attempts.status IN ('refund_pending', 'refund_failed') THEN 'refund_pending'
            WHEN attempts.status = 'disputed' THEN 'disputed'
            ELSE registrations.payment_status
          END,
          confirmed_at = CASE
            WHEN attempts.status = 'captured' THEN COALESCE(registrations.confirmed_at, NOW())
            ELSE registrations.confirmed_at
          END,
          refunded_at = CASE
            WHEN attempts.status = 'refunded' THEN COALESCE(registrations.refunded_at, NOW())
            ELSE registrations.refunded_at
          END,
          receipt_number = CASE
            WHEN attempts.status = 'captured' THEN COALESCE(registrations.receipt_number, attempts.receipt)
            ELSE registrations.receipt_number
          END,
          updated_at = NOW()
      FROM event_payment_attempts AS attempts
      WHERE registrations.id = attempts.registration_id
        AND attempts.id = ${input.attemptId}
    `,
  ]);

  const rows = (await sql`
    SELECT registrations.id AS registration_id, registrations.receipt_number,
           attempts.status, attempts.id AS payment_attempt_id
    FROM event_payment_attempts AS attempts
    INNER JOIN event_registrations AS registrations ON registrations.id = attempts.registration_id
    WHERE attempts.id = ${input.attemptId}
    LIMIT 1
  `) as unknown as DatabaseRow[];
  const row = rows[0];
  return {
    registrationId: row?.registration_id as string,
    paymentAttemptId: row?.payment_attempt_id as string,
    status: row?.status as PaymentVerificationResult["status"],
    receiptNumber: (row?.receipt_number as string | null) ?? null,
  };
}

/** Verify the browser callback, then confirm current status with Razorpay. */
export const verifyEventPayment = createServerFn({ method: "POST" })
  .validator(
    z.object({
      paymentAttemptId: z.string().uuid(),
      razorpayPaymentId: z.string().trim().min(1).max(100),
      razorpayOrderId: z.string().trim().min(1).max(100),
      razorpaySignature: z.string().trim().min(1).max(200),
    }),
  )
  .handler(async ({ data }): Promise<PaymentVerificationResult> => {
    const { appUserId } = await requireVerifiedCurrentUser();
    const sql = getDb();
    const rows = (await sql`
      SELECT attempts.id, attempts.razorpay_order_id, attempts.amount_minor, attempts.currency,
             attempts.status, registrations.id AS registration_id
      FROM event_payment_attempts AS attempts
      INNER JOIN event_registrations AS registrations ON registrations.id = attempts.registration_id
      WHERE attempts.id = ${data.paymentAttemptId}
        AND registrations.user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const attempt = rows[0];
    if (!attempt?.razorpay_order_id) throw new Error("PAYMENT_ATTEMPT_NOT_FOUND");
    if (attempt.status === "captured") {
      const receiptRows = (await sql`
        SELECT receipt_number FROM event_registrations WHERE id = ${attempt.registration_id as string}
      `) as unknown as DatabaseRow[];
      return {
        status: "captured",
        registrationId: attempt.registration_id as string,
        paymentAttemptId: data.paymentAttemptId,
        receiptNumber: (receiptRows[0]?.receipt_number as string | null) ?? null,
      };
    }
    if (attempt.razorpay_order_id !== data.razorpayOrderId) {
      throw new Error("PAYMENT_ORDER_MISMATCH");
    }

    const { fetchRazorpayPayment, verifyPaymentSignature } = await import("@/lib/razorpay.server");
    if (
      !verifyPaymentSignature({
        orderId: attempt.razorpay_order_id as string,
        paymentId: data.razorpayPaymentId,
        signature: data.razorpaySignature,
      })
    ) {
      throw new Error("PAYMENT_SIGNATURE_INVALID");
    }

    const payment = await fetchRazorpayPayment(data.razorpayPaymentId);
    if (
      payment.order_id !== attempt.razorpay_order_id ||
      payment.amount !== Number(attempt.amount_minor) ||
      payment.currency !== attempt.currency
    ) {
      throw new Error("PAYMENT_DETAILS_MISMATCH");
    }
    const status =
      payment.status === "captured"
        ? "captured"
        : payment.status === "authorized"
          ? "authorized"
          : payment.status === "failed"
            ? "failed"
            : payment.status === "refunded"
              ? "refunded"
              : null;
    if (!status) throw new Error("PAYMENT_STATUS_UNCONFIRMED");
    return applyPaymentState({
      attemptId: data.paymentAttemptId,
      status,
      paymentId: data.razorpayPaymentId,
      orderId: data.razorpayOrderId,
      signature: data.razorpaySignature,
      payment: payment as unknown as Record<string, unknown>,
      failureCode: payment.error_code,
      failureDescription: payment.error_description,
    });
  });

export const getPaymentStatus = createServerFn({ method: "GET" })
  .validator(registrationIdSchema)
  .handler(async ({ data }): Promise<PaymentVerificationResult | null> => {
    const { appUserId } = await requireCurrentUser();
    const rows = (await getDb()`
      SELECT registrations.id AS registration_id, registrations.receipt_number,
             attempts.id AS payment_attempt_id, attempts.status
      FROM event_registrations AS registrations
      LEFT JOIN LATERAL (
        SELECT id, status
        FROM event_payment_attempts
        WHERE registration_id = registrations.id
        ORDER BY created_at DESC
        LIMIT 1
      ) AS attempts ON TRUE
      WHERE registrations.id = ${data.registrationId}
        AND registrations.user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const row = rows[0];
    if (!row) return null;
    return {
      registrationId: row.registration_id as string,
      paymentAttemptId: (row.payment_attempt_id as string | null) ?? "",
      status: (row.status as PaymentVerificationResult["status"] | null) ?? "created",
      receiptNumber: (row.receipt_number as string | null) ?? null,
    };
  });

/**
 * Refresh an open payment directly from Razorpay.
 *
 * The Checkout success callback is not guaranteed to reach the browser (for
 * example, a modal can close while the callback request is in flight). The
 * authenticated customer can therefore ask the server to inspect the
 * server-owned order and apply any captured/failed payment it finds. The
 * order ID is read from our database rather than accepted from the browser.
 */
export const refreshEventPaymentStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      registrationId: z.string().uuid(),
      paymentAttemptId: z.string().uuid(),
    }),
  )
  .handler(async ({ data }): Promise<PaymentVerificationResult> => {
    const { appUserId } = await requireCurrentUser();
    const sql = getDb();
    const rows = (await sql`
      SELECT attempts.id, attempts.razorpay_order_id, attempts.amount_minor,
             attempts.currency, attempts.status, registrations.id AS registration_id
      FROM event_payment_attempts AS attempts
      INNER JOIN event_registrations AS registrations
        ON registrations.id = attempts.registration_id
      WHERE attempts.id = ${data.paymentAttemptId}
        AND registrations.id = ${data.registrationId}
        AND registrations.user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const attempt = rows[0];
    if (!attempt) throw new Error("PAYMENT_ATTEMPT_NOT_FOUND");

    const { fetchRazorpayOrderPayments } = await import("@/lib/razorpay.server");
    const orderId = attempt.razorpay_order_id as string | null;
    if (orderId) {
      const payments = await fetchRazorpayOrderPayments(orderId);
      for (const payment of payments) {
        if (
          payment.amount !== Number(attempt.amount_minor) ||
          payment.currency !== attempt.currency
        ) {
          continue;
        }
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
      }
    }

    const refreshedRows = (await sql`
      SELECT registrations.id AS registration_id, registrations.receipt_number,
             attempts.id AS payment_attempt_id, attempts.status
      FROM event_payment_attempts AS attempts
      INNER JOIN event_registrations AS registrations
        ON registrations.id = attempts.registration_id
      WHERE attempts.id = ${data.paymentAttemptId}
        AND registrations.id = ${data.registrationId}
        AND registrations.user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const refreshed = refreshedRows[0];
    if (!refreshed) throw new Error("PAYMENT_ATTEMPT_NOT_FOUND");
    return {
      registrationId: refreshed.registration_id as string,
      paymentAttemptId: refreshed.payment_attempt_id as string,
      status: refreshed.status as PaymentVerificationResult["status"],
      receiptNumber: (refreshed.receipt_number as string | null) ?? null,
    };
  });

export const getAccountRegistrations = createServerFn({ method: "GET" }).handler(
  async (): Promise<AccountRegistration[]> => {
    const { appUserId } = await requireCurrentUser();
    const rows = (await getDb()`
      SELECT
        registrations.id AS registration_id,
        events.slug AS event_slug,
        events.title AS event_title,
        events.starts_at,
        events.ends_at,
        registrations.registration_status,
        registrations.payment_status,
        registrations.receipt_number,
        attempts.id AS payment_attempt_id,
        COALESCE(attempts.amount_minor, events.amount_minor) AS amount_minor,
        COALESCE(attempts.currency, events.currency) AS currency,
        attempts.created_at AS payment_created_at,
        attempts.captured_at AS payment_captured_at,
        attempts.failure_description
      FROM event_registrations AS registrations
      INNER JOIN events ON events.id = registrations.event_id
      LEFT JOIN LATERAL (
        SELECT *
        FROM event_payment_attempts
        WHERE registration_id = registrations.id
        ORDER BY created_at DESC
        LIMIT 1
      ) AS attempts ON TRUE
      WHERE registrations.user_id = ${appUserId}
      ORDER BY registrations.created_at DESC
    `) as unknown as DatabaseRow[];
    return rows.map((row) => ({
      registrationId: row.registration_id as string,
      eventSlug: row.event_slug as string,
      eventTitle: row.event_title as string,
      startsAt: (row.starts_at as string | null) ?? null,
      endsAt: (row.ends_at as string | null) ?? null,
      registrationStatus: row.registration_status as AccountRegistration["registrationStatus"],
      paymentStatus: row.payment_status as AccountRegistration["paymentStatus"],
      amountMinor: Number(row.amount_minor ?? 0),
      currency: row.currency as string,
      receiptNumber: (row.receipt_number as string | null) ?? null,
      paymentAttemptId: (row.payment_attempt_id as string | null) ?? null,
      paymentCreatedAt: (row.payment_created_at as string | null) ?? null,
      paymentCapturedAt: (row.payment_captured_at as string | null) ?? null,
      failureDescription: (row.failure_description as string | null) ?? null,
    }));
  },
);

export const getReceiptDetails = createServerFn({ method: "GET" })
  .validator(registrationIdSchema)
  .handler(async ({ data }): Promise<ReceiptDetails> => {
    const { appUserId, email } = await requireCurrentUser();
    const rows = (await getDb()`
      SELECT
        registrations.receipt_number,
        registrations.full_name,
        registrations.phone,
        events.slug AS event_slug,
        events.title AS event_title,
        events.starts_at,
        events.ends_at,
        attempts.amount_minor,
        attempts.currency,
        attempts.razorpay_order_id,
        attempts.razorpay_payment_id,
        attempts.captured_at,
        attempts.payment_method
      FROM event_registrations AS registrations
      INNER JOIN events ON events.id = registrations.event_id
      INNER JOIN event_payment_attempts AS attempts
        ON attempts.registration_id = registrations.id
       AND attempts.status = 'captured'
      WHERE registrations.id = ${data.registrationId}
        AND registrations.user_id = ${appUserId}
        AND registrations.payment_status = 'paid'
      ORDER BY attempts.captured_at DESC
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const row = rows[0];
    if (!row?.receipt_number || !row.razorpay_order_id || !row.razorpay_payment_id) {
      throw new Error("RECEIPT_NOT_AVAILABLE");
    }
    return {
      receiptNumber: row.receipt_number as string,
      eventTitle: row.event_title as string,
      eventSlug: row.event_slug as string,
      startsAt: (row.starts_at as string | null) ?? null,
      endsAt: (row.ends_at as string | null) ?? null,
      customerName: row.full_name as string,
      customerEmail: email,
      customerPhone: row.phone as string,
      amountMinor: Number(row.amount_minor),
      currency: row.currency as string,
      razorpayOrderId: row.razorpay_order_id as string,
      razorpayPaymentId: row.razorpay_payment_id as string,
      capturedAt: (row.captured_at as string | null) ?? null,
      paymentMethod: (row.payment_method as string | null) ?? null,
    };
  });

/** Initiate a full refund from an explicitly allow-listed operations account. */
export const refundEventPayment = createServerFn({ method: "POST" })
  .validator(registrationIdSchema)
  .handler(async ({ data }) => {
    const { clerkUserId } = await requireCurrentUser();
    const allowedAdmins = (process.env.ADMIN_CLERK_USER_IDS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (!allowedAdmins.includes(clerkUserId)) throw new Error("FORBIDDEN");

    const rows = (await getDb()`
      SELECT attempts.id, attempts.razorpay_payment_id, attempts.status
      FROM event_payment_attempts AS attempts
      INNER JOIN event_registrations AS registrations ON registrations.id = attempts.registration_id
      WHERE registrations.id = ${data.registrationId}
        AND attempts.status IN ('captured', 'refund_failed')
        AND attempts.razorpay_payment_id IS NOT NULL
      ORDER BY attempts.captured_at DESC
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const attempt = rows[0];
    if (!attempt?.razorpay_payment_id) {
      const pendingRows = (await getDb()`
        SELECT id FROM event_payment_attempts
        WHERE registration_id = ${data.registrationId} AND status = 'refund_pending'
        LIMIT 1
      `) as unknown as DatabaseRow[];
      if (pendingRows[0]) throw new Error("PAYMENT_REFUND_IN_PROGRESS");
      throw new Error("PAYMENT_NOT_REFUNDABLE");
    }

    const { fetchRazorpayPayment, fetchRazorpayPaymentRefunds, refundRazorpayPayment } =
      await import("@/lib/razorpay.server");
    if (attempt.status === "refund_failed") {
      const existingRefunds = await fetchRazorpayPaymentRefunds(
        attempt.razorpay_payment_id as string,
      );
      const existingRefund = existingRefunds.find((item) => item.status !== "failed");
      if (existingRefund) {
        const currentPayment = await fetchRazorpayPayment(attempt.razorpay_payment_id as string);
        const eventType =
          existingRefund.status === "processed" ? "refund.processed" : "refund.created";
        const recovered = await processRazorpayPaymentEvent({
          eventType,
          payment: currentPayment as unknown as Record<string, unknown>,
          refund: existingRefund as unknown as Record<string, unknown>,
        });
        return { refundId: existingRefund.id, status: recovered?.status ?? "refund_pending" };
      }
    }
    const claimRows = (await getDb().transaction((tx) => [
      tx`
        UPDATE event_payment_attempts
        SET status = 'refund_pending', updated_at = NOW()
        WHERE id = ${attempt.id as string} AND status IN ('captured', 'refund_failed')
        RETURNING id
      `,
      tx`
        UPDATE event_registrations
        SET payment_status = 'refund_pending', updated_at = NOW()
        WHERE id = ${data.registrationId} AND payment_status IN ('paid', 'refund_pending')
      `,
    ])) as unknown as Array<{ id?: string }>;
    if (!claimRows[0]?.id) throw new Error("PAYMENT_REFUND_IN_PROGRESS");

    let refund: { id: string; status: string };
    try {
      refund = await refundRazorpayPayment(attempt.razorpay_payment_id as string);
    } catch (error) {
      await applyPaymentState({
        attemptId: attempt.id as string,
        status: "refund_failed",
        paymentId: attempt.razorpay_payment_id as string,
        failureCode: "REFUND_API_FAILED",
        failureDescription: error instanceof Error ? error.message : "Razorpay refund failed",
      });
      throw new Error("PAYMENT_REFUND_FAILED");
    }
    await getDb()`
      UPDATE event_payment_attempts
      SET razorpay_refund_id = ${refund.id}, updated_at = NOW()
      WHERE id = ${attempt.id as string} AND status = 'refund_pending'
    `;
    return { refundId: refund.id, status: "refund_pending" as const };
  });

export async function processRazorpayPaymentEvent(input: {
  eventType: string;
  payment?: Record<string, unknown>;
  refund?: Record<string, unknown>;
}) {
  const sql = getDb();
  const payment = input.payment ?? {};
  const refund = input.refund ?? {};
  const paymentId =
    typeof payment.id === "string"
      ? payment.id
      : typeof refund.payment_id === "string"
        ? refund.payment_id
        : undefined;
  const orderId = typeof payment.order_id === "string" ? payment.order_id : undefined;
  if (!paymentId && !orderId) throw new Error("WEBHOOK_PAYMENT_NOT_FOUND");

  const rows = (await sql`
    SELECT attempts.id, attempts.amount_minor, attempts.currency
    FROM event_payment_attempts AS attempts
    WHERE attempts.razorpay_order_id = ${orderId ?? null}
       OR attempts.razorpay_payment_id = ${paymentId ?? null}
    ORDER BY attempts.created_at DESC
    LIMIT 1
  `) as unknown as DatabaseRow[];
  const attempt = rows[0];
  if (!attempt) throw new Error("WEBHOOK_UNKNOWN_ORDER");

  if (!input.eventType.startsWith("refund.")) {
    const amount = Number(payment.amount ?? 0);
    const currency = String(payment.currency ?? "");
    if (amount !== Number(attempt.amount_minor) || currency !== attempt.currency) {
      throw new Error("WEBHOOK_PAYMENT_DETAILS_MISMATCH");
    }
  }

  if (input.eventType === "payment.failed") {
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "failed",
      paymentId,
      orderId,
      payment,
      failureCode: (payment.error_code as string | null | undefined) ?? null,
      failureDescription: (payment.error_description as string | null | undefined) ?? null,
    });
  }
  if (input.eventType === "payment.authorized") {
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "authorized",
      paymentId,
      orderId,
      payment,
    });
  }
  if (input.eventType === "payment.captured" || input.eventType === "order.paid") {
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "captured",
      paymentId,
      orderId,
      payment,
    });
  }

  if (input.eventType === "refund.created") {
    const refundAmount = Number(refund.amount ?? 0);
    if (
      refund.payment_id !== paymentId ||
      refundAmount <= 0 ||
      refundAmount > Number(attempt.amount_minor) ||
      (refund.currency && refund.currency !== attempt.currency)
    ) {
      throw new Error("WEBHOOK_REFUND_DETAILS_MISMATCH");
    }
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "refund_pending",
      paymentId,
      orderId,
      refundId: (refund.id as string | null | undefined) ?? null,
      payment: refund,
    });
  }
  if (input.eventType === "refund.processed") {
    const refundAmount = Number(refund.amount ?? 0);
    if (
      refund.payment_id !== paymentId ||
      refundAmount <= 0 ||
      refundAmount > Number(attempt.amount_minor) ||
      (refund.currency && refund.currency !== attempt.currency)
    ) {
      throw new Error("WEBHOOK_REFUND_DETAILS_MISMATCH");
    }
    // A processed event can represent a partial refund. Reconciliation passes
    // the current payment aggregate; the webhook path remains fast and uses
    // the event amount as a safe full-refund indication.
    const currentPayment = input.payment ?? {};
    const refundIsComplete =
      Number(currentPayment.amount_refunded ?? 0) >= Number(attempt.amount_minor) ||
      refundAmount >= Number(attempt.amount_minor);
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: refundIsComplete ? "refunded" : "refund_pending",
      paymentId,
      orderId,
      refundId: (refund.id as string | null | undefined) ?? null,
      payment: refund,
    });
  }
  if (input.eventType === "refund.failed") {
    if (refund.payment_id !== paymentId) throw new Error("WEBHOOK_REFUND_DETAILS_MISMATCH");
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "refund_failed",
      paymentId,
      orderId,
      refundId: (refund.id as string | null | undefined) ?? null,
      payment: refund,
      failureCode: "REFUND_FAILED",
      failureDescription: (refund.failure_reason as string | null | undefined) ?? null,
    });
  }
  if (input.eventType === "payment.dispute.created") {
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "disputed",
      paymentId,
      orderId,
      payment,
    });
  }
  if (
    input.eventType === "payment.dispute.action_required" ||
    input.eventType === "payment.dispute.under_review"
  ) {
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "disputed",
      paymentId,
      orderId,
      payment,
    });
  }
  if (input.eventType === "payment.dispute.won") {
    const resolvedStatus =
      payment.status === "captured"
        ? "captured"
        : payment.status === "refunded"
          ? "refunded"
          : "disputed";
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: resolvedStatus,
      paymentId,
      orderId,
      payment,
      resolveDispute: resolvedStatus !== "disputed",
    });
  }
  if (input.eventType === "payment.dispute.lost" || input.eventType === "payment.dispute.closed") {
    return applyPaymentState({
      attemptId: attempt.id as string,
      status: "disputed",
      paymentId,
      orderId,
      payment,
    });
  }
  return null;
}
