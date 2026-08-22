import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  UserPlus,
} from "lucide-react";
import { FormEvent, useState } from "react";
import logoColored from "@/assets/logo_colored_text.png";
import equipmentImg from "@/assets/pttc-equipment.png";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : undefined,
    redirect:
      typeof search.redirect === "string" &&
      search.redirect.startsWith("/") &&
      !search.redirect.startsWith("//")
        ? search.redirect
        : undefined,
  }),
  component: LoginPage,
});

const learnerBenefits = [
  "Continue lessons from any device",
  "Keep track of your course progress",
  "Access eligible completion certificates",
];

type AccessMode = "login" | "signup";

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <SignIn signUpUrl="/signup" forceRedirectUrl="/" />
    </div>
  );
}

const accessHref = (path: "/login" | "/signup", course?: string) =>
  course ? `${path}?course=${encodeURIComponent(course)}` : path;

export function LearnerAccessPage({ mode, course }: { mode: AccessMode; course?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
            <img
              src={logoColored}
              className="h-11 w-auto"
              alt="Paul & Timothy Training Centre"
            />
          </a>
          <a
            href="/courses"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/15 px-5 text-sm font-semibold text-primary transition hover:border-teal-deep hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </a>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="px-6 py-12 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-card shadow-soft lg:grid-cols-[.9fr_1.1fr]">
          <section className="relative min-h-[28rem] overflow-hidden bg-primary p-8 text-white sm:p-12">
            <img
              src={equipmentImg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/70" />
            <div className="relative flex h-full flex-col">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em]">
                <BookOpen className="h-4 w-4 text-teal" /> Learner access
              </div>
              <h1 className="mt-8 max-w-md text-4xl font-medium leading-tight sm:text-5xl">
                Your training continues{" "}
                <em className="text-teal not-italic">in one learning space.</em>
              </h1>
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                Sign in to the Paul & Timothy learning platform, or create an account before
                beginning your first course.
              </p>
              <ul className="mt-9 space-y-4 text-sm text-white/80">
                {learnerBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                      <Check className="h-3 w-3" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-12 text-xs leading-relaxed text-white/50">
                Course access is private and intended for registered learners.
              </p>
            </div>
          </section>

          <section className="p-6 sm:p-10 lg:p-12" aria-labelledby="access-heading">
            <div className="inline-flex rounded-xl bg-muted p-1" aria-label="Choose learner access">
              <a
                href={accessHref("/login", course)}
                aria-current={mode === "login" ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-background text-primary shadow-card"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <LockKeyhole className="h-4 w-4" /> Sign in
              </a>
              <a
                href={accessHref("/signup", course)}
                aria-current={mode === "signup" ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${
                  mode === "signup"
                    ? "bg-background text-primary shadow-card"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <UserPlus className="h-4 w-4" /> Create account
              </a>
            </div>

            <h2 id="access-heading" className="mt-8 text-3xl font-medium text-primary sm:text-4xl">
              {mode === "login" ? "Welcome back." : "Create your learner account."}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {mode === "login"
                ? "Enter the details connected to your learner account."
                : "Create your learner profile to access course lessons and progress."}
            </p>

            {course && (
              <div className="mt-6 rounded-2xl border border-border bg-cream p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-teal-deep">
                  Selected course
                </p>
                <p className="mt-2 text-sm font-medium text-primary">{course}</p>
              </div>
            )}

            <div className="mt-6 flex gap-3 rounded-2xl border border-teal/30 bg-accent p-4">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" />
              <div>
                <p className="text-sm font-semibold text-primary">LMS connection status</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  The official LMS connection is not live yet. This preview will not send or store
                  your account details.
                </p>
              </div>
            </div>

            {submitted ? (
              <div
                className="mt-8 rounded-2xl border border-teal/30 bg-accent p-6"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="h-9 w-9 text-teal-deep" />
                <h3 className="mt-4 text-xl font-medium text-primary">
                  LMS connection coming soon
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This access flow is ready for the official learning-platform connection. No
                  account details were sent or stored.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-sm font-semibold text-teal-deep underline underline-offset-4"
                >
                  Return to {mode === "login" ? "sign in" : "account setup"}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-5">
                {mode === "signup" && (
                  <Field label="Full name" name="name" autoComplete="name" required />
                )}
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <label className="block text-sm font-medium text-primary">
                  Password
                  <span className="relative mt-2 block">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                      minLength={8}
                      required
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-primary"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>
                {mode === "login" && (
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground">
                      <input
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 rounded border-border accent-primary"
                      />
                      Remember me
                    </label>
                    <a href="/interaction" className="font-semibold text-teal-deep hover:underline">
                      Need help?
                    </a>
                  </div>
                )}
                <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-ring">
                  {mode === "login" ? (
                    <>
                      <LockKeyhole className="h-4 w-4" /> Preview LMS sign in
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" /> Create learner account
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
              By continuing, you agree to use this learning space respectfully and keep your account
              details private.
            </p>
          </section>
        </div>
      </motion.main>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-primary">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
      />
    </label>
  );
}
