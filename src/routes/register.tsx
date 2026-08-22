import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/tanstack-react-start";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { registerForEvent } from "@/lib/registrations";

type AlethiaTrainingAnswer = "yes" | "no";
type YouthMinistryAnswer = "yes" | "no" | "wants_to";

const ALETHIA_TRAINING_OPTIONS: Array<[AlethiaTrainingAnswer, string]> = [
  ["yes", "Yes | ஆம்"],
  ["no", "No | இல்லை"],
];

const YOUTH_MINISTRY_OPTIONS: Array<[YouthMinistryAnswer, string]> = [
  ["yes", "Yes | ஆம்"],
  ["no", "No | இல்லை"],
  ["wants_to", "So far no, but wants to | இதுவரை இல்லை, ஆனால் விரும்புகிறேன்"],
];

const requireRegistrationAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw redirect({
      to: "/login",
      search: { course: undefined, redirect: "/register?event=alethia" },
    });
  }
});

// Events open for registration. Add future events here — linking to
// /register?event=<slug> pre-selects that event directly.
const REGISTRABLE_EVENTS = [
  { slug: "alethia", label: "Alethia — Online Training (November 7–14)" },
];

export const Route = createFileRoute("/register")({
  beforeLoad: async () => {
    await requireRegistrationAuth();
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
  const selectedEvent = REGISTRABLE_EVENTS.some((item) => item.slug === event)
    ? event
    : REGISTRABLE_EVENTS.length === 1
      ? REGISTRABLE_EVENTS[0].slug
      : undefined;
  const { user } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [participatedInAlethiaTraining, setParticipatedInAlethiaTraining] = useState<
    AlethiaTrainingAnswer | ""
  >("");
  const [involvedInYouthMinistry, setInvolvedInYouthMinistry] = useState<YouthMinistryAnswer | "">(
    "",
  );
  const [churchNameArea, setChurchNameArea] = useState("");
  const [youthMinistryQuestions, setYouthMinistryQuestions] = useState("");
  const [selectedEventSlug, setSelectedEventSlug] = useState(selectedEvent ?? "");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await registerForEvent({
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
      setAlreadyRegistered(result.alreadyRegistered);
      setSubmitted(true);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "REGISTRATION_FAILED";
      setError(
        {
          EVENT_CLOSED: "Registration for this event is currently closed.",
          EVENT_NOT_FOUND: "That event could not be found.",
          ACCOUNT_EMAIL_REQUIRED: "Your Clerk account needs a verified email before registering.",
        }[message] ?? "We couldn't complete your registration. Please try again.",
      );
    } finally {
      setSubmitting(false);
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
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-deep/10">
                  <CheckCircle2 className="h-10 w-10 text-teal-deep" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                  {alreadyRegistered ? "Registration Updated!" : "Registration Successful!"}
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  {alreadyRegistered
                    ? "Your registration details are up to date."
                    : "Your registration is saved. Event details will be shared with your Clerk account email."}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                  Event Registration
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
                      onChange={(e) => setSelectedEventSlug(e.target.value)}
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
                    {submitting ? "Saving your registration…" : "Confirm Registration"}
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
