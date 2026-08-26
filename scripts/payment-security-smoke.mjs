import assert from "node:assert/strict";

process.env.RAZORPAY_KEY_ID = "rzp_test_smoke";
process.env.RAZORPAY_KEY_SECRET = "api-secret";
process.env.RAZORPAY_WEBHOOK_SECRET = "webhook-secret";

const { verifyPaymentSignature, verifyWebhookSignature } =
  await import("../src/lib/razorpay.server.ts");

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

console.log("Payment signature checks passed");
