import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { getReceiptDetails } from "@/lib/registrations";

export const Route = createFileRoute("/account/receipt/$registrationId")({
  loader: async ({ params }) => ({
    receipt: await getReceiptDetails({ data: { registrationId: params.registrationId } }),
  }),
  head: () => ({ meta: [{ title: "Payment Receipt — Paul & Timothy Training Centre" }] }),
  component: ReceiptPage,
});

function ReceiptPage() {
  const { receipt } = Route.useLoaderData();
  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: receipt.currency,
  }).format(receipt.amountMinor / 100);

  return (
    <main className="min-h-screen bg-cream px-6 py-32 md:py-40 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to account
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Download className="h-4 w-4" /> Print / save PDF
          </button>
        </div>

        <article className="rounded-3xl border border-border/60 bg-card p-8 shadow-card md:p-12 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <div className="flex items-start justify-between gap-5 border-b border-border/60 pb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep">
                Paul &amp; Timothy Training Centre
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold text-primary">Payment receipt</h1>
            </div>
            <p className="text-right text-sm text-muted-foreground">
              Receipt
              <br />
              <span className="font-semibold text-primary">{receipt.receiptNumber}</span>
            </p>
          </div>

          <div className="grid gap-8 border-b border-border/60 py-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Paid by
              </p>
              <p className="mt-2 font-semibold text-primary">{receipt.customerName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{receipt.customerEmail}</p>
              <p className="mt-1 text-sm text-muted-foreground">{receipt.customerPhone}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payment date
              </p>
              <p className="mt-2 font-semibold text-primary">
                {receipt.capturedAt ? new Date(receipt.capturedAt).toLocaleString() : "—"}
              </p>
              <p className="mt-1 text-sm capitalize text-muted-foreground">
                Method: {receipt.paymentMethod ?? "Razorpay"}
              </p>
            </div>
          </div>

          <div className="border-b border-border/60 py-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Event registration
            </p>
            <p className="mt-2 font-serif text-2xl font-bold text-primary">{receipt.eventTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {receipt.startsAt
                ? new Date(receipt.startsAt).toLocaleDateString()
                : "Date to be announced"}
            </p>
            <div className="mt-6 flex items-center justify-between text-lg">
              <span className="font-semibold text-primary">Total paid</span>
              <span className="font-bold text-primary">{amount}</span>
            </div>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            <p>Razorpay order ID: {receipt.razorpayOrderId}</p>
            <p className="mt-1">Razorpay payment ID: {receipt.razorpayPaymentId}</p>
            <p className="mt-5">This receipt confirms a payment captured through Razorpay.</p>
          </div>
        </article>
      </div>
    </main>
  );
}
