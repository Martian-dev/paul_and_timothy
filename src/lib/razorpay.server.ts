import "@tanstack/react-start/server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string | null;
  status: string;
  attempts?: number;
};

export type RazorpayPayment = {
  id: string;
  amount: number;
  currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed" | string;
  order_id: string | null;
  method?: string | null;
  amount_refunded?: number;
  refund_status?: string | null;
  captured?: boolean;
  email?: string | null;
  contact?: string | null;
  error_code?: string | null;
  error_description?: string | null;
  created_at?: number;
};

export type RazorpayRefund = {
  id: string;
  amount: number;
  currency: string;
  payment_id: string;
  status: "created" | "processed" | "failed" | string;
};

export type RazorpayDispute = {
  id: string;
  amount: number;
  currency: string;
  payment_id: string;
  status: string;
};

type RazorpayErrorPayload = {
  error?: {
    code?: string;
    description?: string;
    field?: string;
  };
};

export class RazorpayApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "RazorpayApiError";
    this.status = status;
    this.code = code;
  }
}

function razorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_NOT_CONFIGURED");
  }
  return { keyId, keySecret };
}

function basicAuth(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`, "utf8").toString("base64")}`;
}

async function razorpayRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { keyId, keySecret } = razorpayCredentials();
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    signal: init.signal ?? AbortSignal.timeout(15_000),
    headers: {
      Authorization: basicAuth(keyId, keySecret),
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    let payload: RazorpayErrorPayload = {};
    try {
      payload = (await response.json()) as RazorpayErrorPayload;
    } catch {
      // Preserve the HTTP status when Razorpay returns a non-JSON response.
    }
    throw new RazorpayApiError(
      response.status,
      payload.error?.code ?? "RAZORPAY_API_ERROR",
      payload.error?.description ?? `Razorpay request failed with ${response.status}`,
    );
  }

  return (await response.json()) as T;
}

export async function createRazorpayOrder(input: {
  amount: number;
  currency: string;
  receipt: string;
  registrationId: string;
  paymentAttemptId: string;
}) {
  return razorpayRequest<RazorpayOrder>("/orders", {
    method: "POST",
    body: JSON.stringify({
      amount: input.amount,
      currency: input.currency,
      receipt: input.receipt,
      partial_payment: false,
      notes: {
        registration_id: input.registrationId,
        payment_attempt_id: input.paymentAttemptId,
      },
    }),
  });
}

export async function fetchRazorpayPayment(paymentId: string) {
  return razorpayRequest<RazorpayPayment>(`/payments/${encodeURIComponent(paymentId)}`);
}

export async function fetchRazorpayOrderPayments(orderId: string) {
  const payments: RazorpayPayment[] = [];
  let skip = 0;
  for (;;) {
    const payload = await razorpayRequest<{ items?: RazorpayPayment[] }>(
      `/orders/${encodeURIComponent(orderId)}/payments?count=100&skip=${skip}`,
    );
    const page = payload.items ?? [];
    payments.push(...page);
    if (page.length < 100) return payments;
    skip += page.length;
  }
}

export async function fetchRazorpayOrdersByReceipt(receipt: string) {
  const payload = await razorpayRequest<{ items?: RazorpayOrder[] }>(
    `/orders?receipt=${encodeURIComponent(receipt)}&count=10`,
  );
  return payload.items ?? [];
}

export async function fetchRazorpayPaymentRefunds(paymentId: string) {
  const refunds: RazorpayRefund[] = [];
  let skip = 0;
  for (;;) {
    const payload = await razorpayRequest<{ items?: RazorpayRefund[] }>(
      `/payments/${encodeURIComponent(paymentId)}/refunds?count=100&skip=${skip}`,
    );
    const page = payload.items ?? [];
    refunds.push(...page);
    if (page.length < 100) return refunds;
    skip += page.length;
  }
}

export async function fetchRazorpayDisputes(sinceUnixSeconds?: number, skip = 0) {
  const query = new URLSearchParams({ count: "100" });
  if (sinceUnixSeconds !== undefined) query.set("from", String(sinceUnixSeconds));
  if (skip > 0) query.set("skip", String(skip));
  const payload = await razorpayRequest<{ items?: RazorpayDispute[] }>(
    `/disputes?${query.toString()}`,
  );
  return payload.items ?? [];
}

export async function refundRazorpayPayment(paymentId: string, amount?: number) {
  return razorpayRequest<{ id: string; status: string }>(
    `/payments/${encodeURIComponent(paymentId)}/refund`,
    {
      method: "POST",
      body: JSON.stringify(amount === undefined ? {} : { amount }),
    },
  );
}

function hmacHex(message: string, secret: string) {
  return createHmac("sha256", secret).update(message, "utf8").digest("hex");
}

export function safeEqualHex(expected: string, received: string) {
  if (expected.length !== 64 || received.length !== 64) return false;
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

export function verifyPaymentSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const { keySecret } = razorpayCredentials();
  return safeEqualHex(hmacHex(`${input.orderId}|${input.paymentId}`, keySecret), input.signature);
}

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret || !signature) return false;
  return safeEqualHex(hmacHex(rawBody, webhookSecret), signature);
}

export function getRazorpayKeyId() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) throw new Error("RAZORPAY_NOT_CONFIGURED");
  return keyId;
}
