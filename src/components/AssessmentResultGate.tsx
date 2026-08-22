import { useClerk, useAuth } from "@clerk/tanstack-react-start";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AlertCircle, LockKeyhole, LoaderCircle } from "lucide-react";
import { saveAssessmentResult, type AssessmentResultInput } from "@/lib/assessment-results";

type Props = AssessmentResultInput & {
  children: ReactNode;
};

/** Keeps assessment results private until sign-in is complete and the result is persisted. */
export function AssessmentResultGate({ assessmentType, answers, result, children }: Props) {
  const clerk = useClerk();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [retryCount, setRetryCount] = useState(0);
  const attemptedPayload = useRef<string | null>(null);
  const [savedPayload, setSavedPayload] = useState<string | null>(null);
  const [errorPayload, setErrorPayload] = useState<string | null>(null);
  const payloadKey = useMemo(
    () => JSON.stringify({ userId, assessmentType, answers, result }),
    [answers, assessmentType, result, userId],
  );

  useEffect(() => {
    if (!isLoaded || !isSignedIn || attemptedPayload.current === payloadKey) return;

    attemptedPayload.current = payloadKey;
    setStatus("saving");
    void saveAssessmentResult({
      data: { assessmentType, answers, result },
    })
      .then(() => {
        if (attemptedPayload.current !== payloadKey) return;
        setErrorPayload(null);
        setSavedPayload(payloadKey);
        setStatus("saved");
      })
      .catch(() => {
        if (attemptedPayload.current !== payloadKey) return;
        attemptedPayload.current = null;
        setErrorPayload(payloadKey);
        setStatus("error");
      });
  }, [answers, assessmentType, isLoaded, isSignedIn, payloadKey, result, retryCount]);

  if (!isLoaded) {
    return (
      <GateMessage
        icon={<LoaderCircle className="h-6 w-6 animate-spin" />}
        title="Checking your account…"
      />
    );
  }

  if (!isSignedIn) {
    return (
      <GateMessage
        icon={<LockKeyhole className="h-6 w-6" />}
        title="Sign in to see your results"
        description="Your answers are ready. Sign in or create a free account and we’ll save this assessment to your profile before revealing the results."
        action={
          <button
            type="button"
            onClick={() => clerk.openSignIn({ withSignUp: true })}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            Sign in to continue <LockKeyhole className="h-4 w-4" />
          </button>
        }
      />
    );
  }

  if (status === "error" && errorPayload === payloadKey) {
    return (
      <GateMessage
        icon={<AlertCircle className="h-6 w-6" />}
        title="We couldn’t save your results"
        description="Please try again. Your results will remain hidden until they’re safely attached to your account."
        action={
          <button
            type="button"
            onClick={() => {
              setErrorPayload(null);
              setStatus("idle");
              setRetryCount((count) => count + 1);
            }}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            Try again
          </button>
        }
      />
    );
  }

  if (savedPayload !== payloadKey) {
    return (
      <GateMessage
        icon={<LoaderCircle className="h-6 w-6 animate-spin" />}
        title="Saving your results…"
      />
    );
  }

  return <>{children}</>;
}

function GateMessage({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-border/60 bg-card p-8 text-center shadow-soft md:p-12">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-teal-deep">
        {icon}
      </div>
      <h2 className="mt-5 font-serif text-2xl font-medium text-primary">{title}</h2>
      {description && (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
