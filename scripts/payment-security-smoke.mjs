import assert from "node:assert/strict";
import fs from "node:fs";

process.env.RAZORPAY_KEY_ID = "rzp_test_smoke";
process.env.RAZORPAY_KEY_SECRET = "api-secret";
process.env.RAZORPAY_WEBHOOK_SECRET = "webhook-secret";

const { createRazorpayOrder, safeEqualHex, verifyPaymentSignature, verifyWebhookSignature } =
  await import("../src/lib/razorpay.server.ts");

assert.equal(safeEqualHex("0".repeat(64), "0".repeat(64)), true);
assert.equal(safeEqualHex("0".repeat(63), "0".repeat(63)), false);
assert.equal(safeEqualHex("0".repeat(64), "O".repeat(64)), false);

const rawBody = '{"event":"payment.captured"}';
assert.equal(
  verifyWebhookSignature(
    rawBody,
    "0e95258623492dd0dae77245c958c256d46b4a30b338084b7e996fc25653c79c",
  ),
  true,
);
assert.equal(
  verifyWebhookSignature(
    '{"event": "payment.captured"}',
    "0e95258623492dd0dae77245c958c256d46b4a30b338084b7e996fc25653c79c",
  ),
  false,
);
assert.equal(verifyWebhookSignature(rawBody, null), false);
assert.equal(
  verifyPaymentSignature({
    orderId: "order_test",
    paymentId: "pay_test",
    signature: "6409a9f47121baa9b7c62d34144b6e72dfcd7d1e48f9e0130dfa44b48444d3d0",
  }),
  true,
);
assert.equal(
  verifyPaymentSignature({
    orderId: "order_test",
    paymentId: "pay_tampered",
    signature: "6409a9f47121baa9b7c62d34144b6e72dfcd7d1e48f9e0130dfa44b48444d3d0",
  }),
  false,
);

const originalFetch = globalThis.fetch;
let orderRequestBody;
globalThis.fetch = async (_input, init) => {
  orderRequestBody = JSON.parse(String(init?.body));
  return new Response(
    JSON.stringify({
      id: "order_smoke",
      amount: 150000,
      currency: "INR",
      receipt: "PTTC-smoke",
      status: "created",
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
};
await createRazorpayOrder({
  amount: 150000,
  currency: "INR",
  receipt: "PTTC-smoke",
  registrationId: "registration-smoke",
  paymentAttemptId: "attempt-smoke",
});
globalThis.fetch = originalFetch;
assert.equal(orderRequestBody.capture, undefined);
assert.equal(orderRequestBody.partial_payment, false);
assert.deepEqual(orderRequestBody.notes, {
  registration_id: "registration-smoke",
  payment_attempt_id: "attempt-smoke",
});

const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.deepEqual(
  vercelConfig.crons,
  [{ path: "/api/razorpay/reconcile", schedule: "0 3 * * *" }],
  "the reconciliation fallback must stay within Vercel Hobby's once-daily cron limit",
);

const webhookSource = fs.readFileSync("src/routes/api/razorpay/webhook.ts", "utf8");
assert.match(webhookSource, /readBoundedBody/);
assert.match(webhookSource, /x-razorpay-signature/);
assert.match(webhookSource, /ON CONFLICT \(razorpay_event_id\) DO NOTHING/);
assert.match(webhookSource, /status: 500/);

const reconcileSource = fs.readFileSync("src/routes/api/razorpay/reconcile.ts", "utf8");
assert.match(reconcileSource, /request\.headers\.get\("authorization"\).*Bearer/);
assert.match(reconcileSource, /if \(!authorized\(request\)\)/);
assert.match(reconcileSource, /const MAX_ATTEMPTS_PER_RUN = 25/);
assert.match(reconcileSource, /LIMIT \$\{MAX_ATTEMPTS_PER_RUN\}/);
assert.match(reconcileSource, /if \(refunds\.length > 0 \|\| matchingDisputes\.length > 0\)/);

const registrationsSource = fs.readFileSync("src/lib/registrations.ts", "utf8");
assert.match(
  registrationsSource,
  /export const refreshEventPaymentStatus = createServerFn\(\{ method: "POST" \}\)/,
  "the authenticated modal-close status refresh must exist",
);
assert.match(
  registrationsSource,
  /open_attempts\.status IN \('creating', 'created', 'authorized'\)/,
  "failed-order reuse must not outrank an existing open payment attempt",
);
assert.match(
  registrationsSource,
  /PAYMENT_PROVIDER_AUTH_FAILED/,
  "expired Razorpay credentials must have a distinct safe error",
);
const registerSource = fs.readFileSync("src/routes/register.tsx", "utf8");
assert.match(
  registerSource,
  /useEffect\(\(\) => \{[\s\S]*step !== "payment"[\s\S]*window\.scrollTo\(\{ top: 0, behavior: "auto" \}\)/,
  "entering the payment step must return the page to the top",
);
assert.match(
  registerSource,
  /refreshEventPaymentStatus/,
  "the registration UI must refresh provider status after checkout",
);
assert.match(
  registerSource,
  /PAYMENT_PROVIDER_AUTH_FAILED/,
  "the UI must explain provider credential failures instead of hiding them as generic errors",
);
assert.match(
  registerSource,
  /ondismiss:\s*\(\) => \{[\s\S]*(?:refreshPaymentStatus|waitForPaymentConfirmation)/,
  "modal dismissal must trigger the provider status refresh",
);
assert.match(
  registerSource,
  /ondismiss:\s*\(\) => \{[\s\S]*waitForPaymentConfirmation/,
  "modal dismissal must allow the provider order to settle before showing failure",
);
assert.match(
  registerSource,
  /latest\?\.status === "captured" \|\|\s*latest\?\.status === "refunded"/,
  "payment polling must not stop on a provisional failed attempt",
);
assert.match(
  registerSource,
  /providerRefreshFailed && latest\?\.status === "failed"\) return null/,
  "provider outages must keep an uncertain failed payment pending",
);
assert.match(
  registerSource,
  /checkout\.on\("payment\.failed", \(\) => \{[\s\S]*paymentFailureObserved\.current = true/,
  "a payment.failed event must remain provisional while Checkout can retry",
);
const paymentFailedHandler = registerSource.match(
  /checkout\.on\("payment\.failed", \(\) => \{[\s\S]*?\n\s*\}\);/,
);
assert.ok(paymentFailedHandler, "the payment.failed handler must remain present");
assert.doesNotMatch(
  paymentFailedHandler[0],
  /setPaymentError\(/,
  "a payment.failed event must not immediately surface a terminal failure",
);
assert.doesNotMatch(
  paymentFailedHandler[0],
  /setPaying\(/,
  "a payment.failed event must not unlock or race the active Checkout session",
);

console.log("Payment signature checks passed");
