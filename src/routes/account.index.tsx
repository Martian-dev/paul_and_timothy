import { createFileRoute, Link } from "@tanstack/react-router";
import { useUser } from "@clerk/tanstack-react-start";
import { ArrowRight, CheckCircle2, Clock3, Receipt, ShieldCheck } from "lucide-react";
import { getAccountRegistrations } from "@/lib/registrations";

export const Route = createFileRoute("/account/")({
  loader: async () => ({ registrations: await getAccountRegistrations() }),
  head: () => ({ meta: [{ title: "Your Account — Paul & Timothy Training Centre" }] }),
  component: AccountPage,
});

function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

function AccountPage() {
  const { registrations } = Route.useLoaderData();
  const { isLoaded, user } = useUser();

  if (!isLoaded) return <AccountLoading />;
  if (!user) return null;

  const registered = registrations.filter(
    (item) =>
      item.paymentStatus === "paid" ||
      (item.paymentStatus === "not_required" && item.registrationStatus === "registered"),
  );
  const pending = registrations.filter(
    (item) =>
      item.paymentStatus !== "paid" &&
      !(item.paymentStatus === "not_required" && item.registrationStatus === "registered") &&
      item.registrationStatus !== "refunded" &&
      item.registrationStatus !== "cancelled",
  );
  const refunded = registrations.filter(
    (item) => item.paymentStatus === "refunded" || item.registrationStatus === "refunded",
  );

  return (
    <main className="min-h-screen bg-cream px-6 py-32 md:py-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep">
            Your account
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-primary md:text-5xl">
            Registered events
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Signed in as{" "}
            {user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress}. Your
            questionnaire and payment records are linked securely to this account.
          </p>
        </div>

        <div className="space-y-8">
          <section aria-labelledby="registered-heading">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-teal-deep" />
              <h2 id="registered-heading" className="font-serif text-2xl font-bold text-primary">
                Confirmed registrations
              </h2>
            </div>
            {registered.length === 0 ? (
              <EmptyCard text="You do not have any confirmed event registrations yet." />
            ) : (
              <div className="space-y-4">
                {registered.map((item) => (
                  <div
                    key={item.registrationId}
                    className="rounded-3xl border border-border/60 bg-card p-6 shadow-card md:p-8"
                  >
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-teal-deep">
                          {item.paymentStatus === "paid"
                            ? "Payment captured"
                            : "Registration confirmed"}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl font-bold text-primary">
                          {item.eventTitle}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.startsAt
                            ? new Date(item.startsAt).toLocaleDateString()
                            : "Date to be announced"}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        {formatMoney(item.amountMinor, item.currency)}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 border-t border-border/60 pt-5">
                      {item.receiptNumber ? (
                        <Link
                          to="/account/receipt/$registrationId"
                          params={{ registrationId: item.registrationId }}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                        >
                          <Receipt className="h-4 w-4" /> View payment receipt
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section aria-labelledby="pending-heading">
            <div className="mb-4 flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-amber-700" />
              <h2 id="pending-heading" className="font-serif text-2xl font-bold text-primary">
                Payment in progress
              </h2>
            </div>
            {pending.length === 0 ? (
              <EmptyCard text="There are no incomplete payments." />
            ) : (
              <div className="space-y-4">
                {pending.map((item) => (
                  <div
                    key={item.registrationId}
                    className="rounded-3xl border border-amber-700/20 bg-amber-50 p-6"
                  >
                    <p className="font-semibold text-primary">{item.eventTitle}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.paymentStatus === "failed"
                        ? (item.failureDescription ?? "The last payment attempt failed.")
                        : item.paymentStatus === "refund_pending"
                          ? "Your refund is being processed by Razorpay. We will update this record when it is complete."
                          : item.paymentStatus === "disputed"
                            ? "This payment is under dispute review. Please contact support if you need help."
                            : item.paymentStatus === "authorized"
                              ? "Your payment is authorized and is awaiting final capture."
                              : "Your details are saved. Payment is still required to confirm your place."}
                    </p>
                    {item.paymentStatus !== "refund_pending" &&
                    item.paymentStatus !== "disputed" &&
                    item.paymentStatus !== "authorized" ? (
                      <Link
                        to="/register"
                        search={{ event: item.eventSlug }}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-teal-deep"
                      >
                        Continue payment <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>

          {refunded.length > 0 && (
            <section aria-labelledby="refunded-heading">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <h2 id="refunded-heading" className="font-serif text-2xl font-bold text-primary">
                  Refunded registrations
                </h2>
              </div>
              <div className="space-y-3">
                {refunded.map((item) => (
                  <div
                    key={item.registrationId}
                    className="rounded-2xl border border-border/60 bg-card p-5"
                  >
                    <p className="font-semibold text-primary">{item.eventTitle}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Payment refunded</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 text-muted-foreground">
      {text}
    </div>
  );
}

function AccountLoading() {
  return (
    <main className="min-h-screen bg-cream px-6 py-40">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-card p-10 text-center">
        <p className="text-muted-foreground">Loading your account…</p>
      </div>
    </main>
  );
}
