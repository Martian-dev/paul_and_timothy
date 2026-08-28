import { defineTask } from "nitro/task";
import { handleReconcile } from "@/routes/api/razorpay/reconcile";

export default defineTask({
  meta: {
    name: "razorpay:reconcile",
    description: "Reconcile unresolved Razorpay payment attempts",
  },
  async run() {
    const response = await handleReconcile(
      new Request("https://internal.invalid/api/razorpay/reconcile", {
        headers: {
          authorization: `Bearer ${process.env.CRON_SECRET ?? ""}`,
        },
      }),
    );

    if (!response.ok) {
      throw new Error(`RAZORPAY_RECONCILIATION_FAILED_${response.status}`);
    }

    return { result: await response.json() };
  },
});
