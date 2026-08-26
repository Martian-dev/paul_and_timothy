import { createFileRoute, Link, redirect, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/tanstack-react-start";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import {
  createEventPaymentOrder,
  getPaymentStatus,
  getRegistrationPageData,
  refreshEventPaymentStatus,
  saveRegistrationDraft,
  verifyEventPayment,
  type PaymentOrderResult,
  type PaymentVerificationResult,
} from "@/lib/registrations";

type RazorpayInstance = {
  open: () => void;
  on: (event: string, callback: (payload: unknown) => void) => void;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

type AlethiaTrainingAnswer = "yes" | "no";
type YouthMinistryAnswer = "yes" | "no" | "wants_to";

function isRegistrationConfirmed(
  value: { paymentStatus: string; registrationStatus: string } | null | undefined,
) {
  return (
    value?.paymentStatus === "paid" ||
    (value?.paymentStatus === "not_required" && value.registrationStatus === "registered")
  );
}

const ALETHIA_TRAINING_OPTIONS: Array<[AlethiaTrainingAnswer, string]> = [
  ["yes", "Yes | ஆம்"],
  ["no", "No | இல்லை"],
];

const YOUTH_MINISTRY_OPTIONS: Array<[YouthMinistryAnswer, string]> = [
  ["yes", "Yes | ஆம்"],
  ["no", "No | இல்லை"],
  ["wants_to", "So far no, but wants to | இதுவரை இல்லை, ஆனால் விரும்புகிறேன்"],
];

const requireRegistrationAuth = createServerFn({ method: "GET" })
  .validator(z.object({ returnTo: z.string().startsWith("/").max(2048) }))
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
      throw redirect({
        to: "/login/$",
        params: { _splat: "" },
        search: { course: undefined, redirect: data.returnTo },
      });
    }
  });

// Events open for registration. Add future events here — linking to
// /register?event=<slug> pre-selects that event directly.
const REGISTRABLE_EVENTS = [
  { slug: "alethia", label: "Alethia — Online Training (November 7–14)" },
];

export const Route = createFileRoute("/register")({
  // Registration data is user-scoped; never reuse a preloaded match across
  // auth-session changes, even though public routes use a short cache window.
  staleTime: 0,
  preloadStaleTime: 0,
  beforeLoad: async ({ search }) => {
    const returnTo = search.event
      ? `/register?event=${encodeURIComponent(search.event)}`
      : "/register";
    await requireRegistrationAuth({ data: { returnTo } });
  },
  loaderDeps: ({ search }) => ({ event: search.event }),
  loader: async ({ deps }) => {
    const eventSlug = REGISTRABLE_EVENTS.some((item) => item.slug === deps.event)
      ? deps.event
      : REGISTRABLE_EVENTS.length === 1
        ? REGISTRABLE_EVENTS[0].slug
        : undefined;

    return {
      pageData: eventSlug ? await getRegistrationPageData({ data: { eventSlug } }) : null,
    };
  },
  validateSearch: (search: Record<string, unknown>) => ({
    event: typeof search.event === "string" ? search.event : undefined,
  }),
  head: () => ({
    meta: [{ title: "Register — Paul & Timothy Training Centre" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { event } = Route.useSearch();
  const { pageData } = Route.useLoaderData();
  const registration = pageData?.registration ?? null;
  const eventDetails = pageData?.event ?? null;
  const selectedEvent = REGISTRABLE_EVENTS.some((item) => item.slug === event)
    ? event
    : REGISTRABLE_EVENTS.length === 1
      ? REGISTRABLE_EVENTS[0].slug
      : undefined;
  const { isLoaded: isUserLoaded, user } = useUser();
  const router = useRouter();
  const observedUserId = useRef<string | null | undefined>(undefined);
  const [step, setStep] = useState<"questionnaire" | "payment">("questionnaire");
  const [paymentComplete, setPaymentComplete] = useState(isRegistrationConfirmed(registration));
  const [paymentOrder, setPaymentOrder] = useState<PaymentOrderResult | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(isRegistrationConfirmed(registration));
  const [submitting, setSubmitting] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [fullName, setFullName] = useState(registration?.fullName ?? "");
  const [phone, setPhone] = useState(registration?.phone ?? "");
  const [participatedInAlethiaTraining, setParticipatedInAlethiaTraining] = useState<
    AlethiaTrainingAnswer | ""
  >(
    registration?.additionalQuestions.participatedInAlethiaTraining === "yes" ||
      registration?.additionalQuestions.participatedInAlethiaTraining === "no"
      ? registration.additionalQuestions.participatedInAlethiaTraining
      : "",
  );
  const [involvedInYouthMinistry, setInvolvedInYouthMinistry] = useState<YouthMinistryAnswer | "">(
    registration?.additionalQuestions.involvedInYouthMinistry === "yes" ||
      registration?.additionalQuestions.involvedInYouthMinistry === "no" ||
      registration?.additionalQuestions.involvedInYouthMinistry === "wants_to"
      ? registration.additionalQuestions.involvedInYouthMinistry
      : "",
  );
  const [churchNameArea, setChurchNameArea] = useState(
    typeof registration?.additionalQuestions.churchNameArea === "string"
      ? registration.additionalQuestions.churchNameArea
      : "",
  );
  const [youthMinistryQuestions, setYouthMinistryQuestions] = useState(
    typeof registration?.additionalQuestions.youthMinistryQuestions === "string"
      ? registration.additionalQuestions.youthMinistryQuestions
      : "",
  );
  const [selectedEventSlug, setSelectedEventSlug] = useState(selectedEvent ?? "");
  const [savedRegistrationId, setSavedRegistrationId] = useState(
    registration?.registrationId ?? "",
  );
  const paymentCallbackInFlight = useRef(false);
  const paymentFailureObserved = useRef(false);
  const payableAmountMinor = paymentOrder?.amountMinor ?? eventDetails?.amountMinor;
  const payableCurrency = paymentOrder?.currency ?? eventDetails?.currency;

  useEffect(() => {
    if (!isUserLoaded) return;

    const userId = user?.id ?? null;
    if (observedUserId.current === undefined) {
      observedUserId.current = userId;
      return;
    }
    if (observedUserId.current === userId) return;

    // Do not leave the previous account's registration details visible while
    // TanStack reloads this user-scoped route.
    observedUserId.current = userId;
    setStep("questionnaire");
    setPaymentComplete(false);
    setPaymentOrder(null);
    setAlreadyRegistered(false);
    setFullName("");
    setPhone("");
    setParticipatedInAlethiaTraining("");
    setInvolvedInYouthMinistry("");
    setChurchNameArea("");
    setYouthMinistryQuestions("");
    void router.invalidate();
  }, [isUserLoaded, router, user?.id]);

  useEffect(() => {
    const isPaid = isRegistrationConfirmed(registration);
    setAlreadyRegistered(isPaid);
    setPaymentComplete(isPaid);
    setSavedRegistrationId(registration?.registrationId ?? "");
    setFullName(registration?.fullName ?? "");
    setPhone(registration?.phone ?? "");
    setParticipatedInAlethiaTraining(
      registration?.additionalQuestions.participatedInAlethiaTraining === "yes" ||
        registration?.additionalQuestions.participatedInAlethiaTraining === "no"
        ? registration.additionalQuestions.participatedInAlethiaTraining
        : "",
    );
    setInvolvedInYouthMinistry(
      registration?.additionalQuestions.involvedInYouthMinistry === "yes" ||
        registration?.additionalQuestions.involvedInYouthMinistry === "no" ||
        registration?.additionalQuestions.involvedInYouthMinistry === "wants_to"
        ? registration.additionalQuestions.involvedInYouthMinistry
        : "",
    );
    setChurchNameArea(
      typeof registration?.additionalQuestions.churchNameArea === "string"
        ? registration.additionalQuestions.churchNameArea
        : "",
    );
    setYouthMinistryQuestions(
      typeof registration?.additionalQuestions.youthMinistryQuestions === "string"
        ? registration.additionalQuestions.youthMinistryQuestions
        : "",
    );
  }, [registration, selectedEvent]);

  const email =
    user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses[0]?.emailAddress ?? "";

  useEffect(() => {
    if (!user || fullName) return;
    setFullName([user.firstName, user.lastName].filter(Boolean).join(" "));
  }, [fullName, user]);

  useEffect(() => {
    if (!user || phone) return;
    setPhone(user.primaryPhoneNumber?.phoneNumber ?? user.phoneNumbers[0]?.phoneNumber ?? "");
  }, [phone, user]);

  useEffect(() => {
    setSelectedEventSlug(selectedEvent ?? "");
  }, [selectedEvent]);

  // The loader is authorized on the server, but Clerk still has to restore
  // the browser session before it is safe to render user-scoped form data.
  // Without this gate, a stale server loader result can appear alongside a
  // signed-out Login button in the nav.
  if (!isUserLoaded) {
    return <RegistrationAuthLoading />;
  }

  if (!user) {
    const returnTo = selectedEvent
      ? `/register?event=${encodeURIComponent(selectedEvent)}`
      : "/register";
    return <RegistrationAuthRequired returnTo={returnTo} />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await saveRegistrationDraft({
        data: {
          eventSlug: selectedEventSlug || "alethia",
          fullName,
          phone,
          additionalQuestions:
            selectedEventSlug === "alethia" &&
            participatedInAlethiaTraining !== "" &&
            involvedInYouthMinistry !== ""
              ? {
                  participatedInAlethiaTraining,
                  involvedInYouthMinistry,
                  churchNameArea,
                  youthMinistryQuestions,
                }
              : undefined,
        },
      });
      setSavedRegistrationId(result.registrationId);
      if (!result.paymentRequired) {
        setAlreadyRegistered(true);
        setPaymentComplete(true);
      } else {
        setStep("payment");
      }
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "REGISTRATION_FAILED";
      setError(
        {
          EVENT_CLOSED: "Registration for this event is currently closed.",
          EVENT_NOT_FOUND: "That event could not be found.",
          REGISTRATION_DEADLINE_PASSED: "Registration for this event has closed.",
          EVENT_PRICE_NOT_CONFIGURED: "This event is not ready to accept payments yet.",
          REGISTRATION_ALREADY_PAID: "This registration has already been paid.",
          ACCOUNT_EMAIL_REQUIRED: "Your Clerk account needs a verified email before registering.",
          QUESTIONNAIRE_REQUIRED: "Please complete the questionnaire before starting payment.",
        }[message] ?? "We couldn't complete your registration. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const loadRazorpayCheckout = async () => {
    if (window.Razorpay) return window.Razorpay;
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("CHECKOUT_SCRIPT_FAILED")), {
          once: true,
        });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("CHECKOUT_SCRIPT_FAILED"));
      document.head.appendChild(script);
    });
    if (!window.Razorpay) throw new Error("CHECKOUT_SCRIPT_FAILED");
    return window.Razorpay;
  };

  const markPaymentCaptured = () => {
    setPaymentComplete(true);
    setAlreadyRegistered(true);
    setStep("payment");
    setPaymentError(null);
  };

  const refreshPaymentStatus = async (order: PaymentOrderResult) =>
    refreshEventPaymentStatus({
      data: {
        registrationId: order.registrationId,
        paymentAttemptId: order.paymentAttemptId,
      },
    });

  const waitForPaymentConfirmation = async (
    order: PaymentOrderResult,
    delays = [0, 500, 1000, 2000, 4000, 8000],
  ) => {
    // Check Razorpay immediately, then repeat with a bounded backoff. A failed
    // payment entity is provisional because the same order can receive a later
    // retry; only capture/refund ends the settling window early.
    let latest: PaymentVerificationResult | null = null;
    let providerRefreshFailed = false;
    for (const delay of delays) {
      if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
      try {
        latest = await refreshPaymentStatus(order);
      } catch {
        providerRefreshFailed = true;
        // If Razorpay is temporarily unavailable, retain the locally persisted
        // state and let the next attempt retry the provider lookup.
        try {
          latest = await getPaymentStatus({ data: { registrationId: order.registrationId } });
        } catch {
          // Keep polling while the bounded confirmation window remains.
        }
      }
      if (latest?.status === "captured" || latest?.status === "refunded") {
        return latest;
      }
    }
    // A locally recorded failure is not enough to declare a terminal result if
    // any provider refresh failed during this settling window. The next retry
    // (or reconciliation fallback) can still discover a late capture.
    if (providerRefreshFailed && latest?.status === "failed") return null;
    return latest;
  };

  const handlePay = async () => {
    if (!savedRegistrationId || paying) return;
    setPaying(true);
    setPaymentError(null);
    paymentFailureObserved.current = false;
    try {
      const order =
        paymentOrder ??
        (await createEventPaymentOrder({
          data: {
            registrationId: savedRegistrationId,
            clientIdempotencyKey: crypto.randomUUID(),
          },
        }));
      if (order.alreadyPaid) {
        setPaymentComplete(true);
        setAlreadyRegistered(true);
        setPaying(false);
        return;
      }
      setPaymentOrder(order);
      const Razorpay = await loadRazorpayCheckout();
      const checkout = new Razorpay({
        key: order.keyId,
        amount: order.amountMinor,
        currency: order.currency,
        name: "Paul & Timothy Training Centre",
        description: eventDetails?.title ?? "Event registration",
        order_id: order.orderId,
        prefill: { name: fullName, email, contact: phone },
        notes: { registration_id: order.registrationId },
        theme: { color: "#0f766e" },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            // Razorpay can close the modal before its success callback reaches
            // this page. Reconcile the server-owned order immediately, while
            // leaving the callback to finish if it is already in flight.
            if (paymentCallbackInFlight.current) return;
            void (async () => {
              try {
                // A failed attempt does not close a Razorpay order; the
                // customer may retry inside the same Checkout session. Give
                // the order a bounded settling window before declaring the
                // final result, so a later captured attempt wins over an
                // earlier payment.failed event.
                const refreshed = await waitForPaymentConfirmation(order);
                if (refreshed?.status === "captured") {
                  markPaymentCaptured();
                } else if (refreshed?.status === "failed") {
                  setPaymentError("The payment failed. You can try again.");
                } else if (paymentFailureObserved.current) {
                  setPaymentError(
                    "Payment has not been confirmed yet. You can retry safely; any captured payment will be reconciled automatically.",
                  );
                }
              } catch {
                // Closing an unpaid checkout is not an error. A later retry or
                // the scheduled reconciliation job can recover a lost update.
              } finally {
                if (!paymentCallbackInFlight.current) setPaying(false);
              }
            })();
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          paymentCallbackInFlight.current = true;
          try {
            let verification: PaymentVerificationResult | null = null;
            let verificationError: unknown = null;
            try {
              verification = await verifyEventPayment({
                data: {
                  paymentAttemptId: order.paymentAttemptId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
              });
            } catch (error) {
              verificationError = error;
            }
            if (verification?.status === "captured") {
              markPaymentCaptured();
              return;
            }
            const confirmed = await waitForPaymentConfirmation(order);
            if (confirmed?.status === "captured") {
              markPaymentCaptured();
            } else if (confirmed?.status === "failed") {
              setPaymentError("The payment failed. You can try again.");
            } else if (
              verificationError instanceof Error &&
              verificationError.message === "PAYMENT_SIGNATURE_INVALID"
            ) {
              setPaymentError(
                "We could not verify that payment. Please contact support before trying again.",
              );
            } else {
              setPaymentError(
                "Payment received. We are still confirming it. Check your account shortly.",
              );
            }
          } catch (verificationError) {
            const message =
              verificationError instanceof Error ? verificationError.message : "PAYMENT_FAILED";
            setPaymentError(
              message === "PAYMENT_SIGNATURE_INVALID"
                ? "We could not verify that payment. Please contact support before trying again."
                : "We are still verifying your payment. Please check your account shortly.",
            );
          } finally {
            setPaying(false);
          }
        },
      });
      checkout.on("payment.failed", () => {
        // This event describes one attempt, not necessarily the whole order.
        // Razorpay can emit it and then accept a retry on the same modal.
        paymentFailureObserved.current = true;
      });
      checkout.open();
    } catch (paymentSubmissionError) {
      const message =
        paymentSubmissionError instanceof Error
          ? paymentSubmissionError.message
          : "PAYMENT_ORDER_FAILED";
      setPaymentError(
        {
          PAYMENT_ORDER_FAILED: "We couldn't start payment. Please try again.",
          PAYMENT_ORDER_DETAILS_MISMATCH:
            "The payment provider returned an unexpected order. Please try again or contact support.",
          PAYMENT_ORDER_PERSIST_FAILED:
            "We could not safely save the payment order. No payment was started; please try again.",
          CHECKOUT_SCRIPT_FAILED:
            "The payment form could not load. Check your connection and try again.",
          EVENT_CLOSED: "Registration for this event is currently closed.",
          REGISTRATION_DEADLINE_PASSED: "Registration for this event has closed.",
          PAYMENT_ATTEMPT_IN_PROGRESS:
            "A payment is already being prepared. Refresh the page and continue that payment.",
          PAYMENT_STATUS_UNCONFIRMED:
            "Razorpay has not confirmed this payment yet. Please check your account shortly.",
          PAYMENT_NOT_AVAILABLE:
            "This registration is being refunded or reviewed. Please contact support before making another payment.",
        }[message] ?? "We couldn't start payment. Please try again.",
      );
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex-1 px-6 py-32 md:py-40"
      >
        <div className="mx-auto max-w-xl">
          <Link
            to="/events/upcoming"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Upcoming Events
          </Link>

          <div className="rounded-[2.5rem] bg-card p-8 md:p-12 shadow-card border border-border/60">
            {paymentComplete ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-deep/10">
                  <CheckCircle2 className="h-10 w-10 text-teal-deep" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                  Registration Successful!
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Your payment has been captured and your place is confirmed.
                  {paymentOrder?.receipt ? ` Receipt: ${paymentOrder.receipt}` : ""}
                </p>
                <Link
                  to="/account"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  View registered events
                </Link>
              </div>
            ) : step === "payment" ? (
              <div className="py-6">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-deep/10">
                    <CheckCircle2 className="h-6 w-6 text-teal-deep" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal-deep">
                      Step 2 of 2
                    </p>
                    <h1 className="font-serif text-3xl font-bold text-primary">Complete payment</h1>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <p className="text-sm text-muted-foreground">Event</p>
                  <p className="mt-1 font-semibold text-primary">{eventDetails?.title}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-5">
                    <span className="font-semibold text-primary">Amount to pay</span>
                    <span className="text-2xl font-bold text-primary">
                      {payableAmountMinor !== undefined && payableCurrency
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: payableCurrency,
                          }).format(payableAmountMinor / 100)
                        : "—"}
                    </span>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Your questionnaire has been saved. Razorpay will securely handle the payment, and
                  your registration will be confirmed only after the payment is captured.
                </p>
                {paymentError && (
                  <p
                    role="alert"
                    className="mt-5 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    {paymentError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => void handlePay()}
                  disabled={paying}
                  className="mt-8 w-full rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {paying ? "Opening secure payment…" : "Pay securely with Razorpay"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("questionnaire")}
                  disabled={paying}
                  className="mt-3 w-full rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent disabled:opacity-60"
                >
                  Review questionnaire
                </button>
              </div>
            ) : (
              <>
                {alreadyRegistered && (
                  <div
                    className="mb-8 rounded-2xl border border-teal/30 bg-accent p-4 text-sm text-primary"
                    role="status"
                  >
                    You are already registered for this event. Review your details below and submit
                    to update them.
                  </div>
                )}
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                  {alreadyRegistered ? "Update your registration" : "Event Registration"}
                </h1>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below to secure your spot for our upcoming gatherings.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      readOnly
                      disabled
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="event"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Which event are you registering for?
                    </label>
                    <select
                      id="event"
                      required
                      value={selectedEventSlug}
                      onChange={(e) => {
                        const nextEvent = e.target.value;
                        setSelectedEventSlug(nextEvent);
                        void router.navigate({
                          to: "/register",
                          search: { event: nextEvent || undefined },
                        });
                      }}
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                      {REGISTRABLE_EVENTS.length > 1 && (
                        <option value="">Select an event...</option>
                      )}
                      {REGISTRABLE_EVENTS.map((e) => (
                        <option key={e.slug} value={e.slug}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedEventSlug === "alethia" && (
                    <fieldset className="space-y-6 border-t border-border/60 pt-6">
                      <legend className="mb-1 font-serif text-xl font-bold text-primary">
                        Alethia Questionnaire
                      </legend>

                      <div>
                        <p className="mb-3 text-sm font-semibold leading-6 text-primary">
                          Have you participated in Alethia training before? | நீங்கள் இதற்கு முன்பு
                          அலீத்தியா பயிற்சியில் கலந்து கொண்டிருக்கிறீர்களா?{" "}
                          <span aria-hidden="true">*</span>
                        </p>
                        <div className="space-y-3">
                          {ALETHIA_TRAINING_OPTIONS.map(([value, label]) => (
                            <label
                              key={value}
                              className="flex items-center gap-3 text-sm text-primary"
                            >
                              <input
                                type="radio"
                                name="participatedInAlethiaTraining"
                                value={value}
                                required
                                checked={participatedInAlethiaTraining === value}
                                onChange={(e) => {
                                  if (e.target.value === "yes" || e.target.value === "no") {
                                    setParticipatedInAlethiaTraining(e.target.value);
                                  }
                                }}
                                className="h-4 w-4 accent-primary"
                              />
                              {label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-semibold leading-6 text-primary">
                          Are you involved in youth ministry? | நீங்கள் வாலிப ஊழியத்தில் ஈடுபடுபவரா?{" "}
                          <span aria-hidden="true">*</span>
                        </p>
                        <div className="space-y-3">
                          {YOUTH_MINISTRY_OPTIONS.map(([value, label]) => (
                            <label
                              key={value}
                              className="flex items-center gap-3 text-sm text-primary"
                            >
                              <input
                                type="radio"
                                name="involvedInYouthMinistry"
                                value={value}
                                required
                                checked={involvedInYouthMinistry === value}
                                onChange={(e) => {
                                  if (
                                    e.target.value === "yes" ||
                                    e.target.value === "no" ||
                                    e.target.value === "wants_to"
                                  ) {
                                    setInvolvedInYouthMinistry(e.target.value);
                                  }
                                }}
                                className="h-4 w-4 accent-primary"
                              />
                              {label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="churchNameArea"
                          className="mb-2 block text-sm font-semibold leading-6 text-primary"
                        >
                          CHURCH NAME &amp; AREA | சபை பெயர் &amp; ஊர்{" "}
                          <span aria-hidden="true">*</span>
                        </label>
                        <input
                          type="text"
                          id="churchNameArea"
                          required
                          value={churchNameArea}
                          onChange={(e) => setChurchNameArea(e.target.value)}
                          className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your church name and area"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="youthMinistryQuestions"
                          className="mb-2 block text-sm font-semibold leading-6 text-primary"
                        >
                          Do you have any questions about youth ministry? | வாலிப ஊழியத்தை பற்றி
                          ஏதேனும் கேள்விகள் உள்ளதா?
                        </label>
                        <textarea
                          id="youthMinistryQuestions"
                          value={youthMinistryQuestions}
                          onChange={(e) => setYouthMinistryQuestions(e.target.value)}
                          rows={4}
                          className="w-full resize-y rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Share any questions you have"
                        />
                      </div>
                    </fieldset>
                  )}

                  {error && (
                    <p
                      role="alert"
                      className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-4 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    {submitting ? "Saving your details…" : "Continue to payment"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </motion.main>
    </div>
  );
}

function RegistrationAuthLoading() {
  return (
    <div className="min-h-screen bg-cream px-6 py-40">
      <div className="mx-auto max-w-xl rounded-[2.5rem] border border-border/60 bg-card p-12 text-center shadow-card">
        <div className="mx-auto mb-6 h-10 w-10 animate-pulse rounded-full bg-teal-deep/20" />
        <p className="text-muted-foreground">Checking your account…</p>
      </div>
    </div>
  );
}

function RegistrationAuthRequired({ returnTo }: { returnTo: string }) {
  return (
    <div className="min-h-screen bg-cream px-6 py-40">
      <div className="mx-auto max-w-xl rounded-[2.5rem] border border-border/60 bg-card p-10 text-center shadow-card md:p-12">
        <h1 className="font-serif text-3xl font-bold text-primary">Sign in to continue</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your registration is linked to your account. Sign in to view or update these details.
        </p>
        <Link
          to="/login/$"
          params={{ _splat: "" }}
          search={{ course: undefined, redirect: returnTo }}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
        >
          Sign in to continue
        </Link>
      </div>
    </div>
  );
}
