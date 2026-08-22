import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AssessmentResultGate } from "@/components/AssessmentResultGate";
import {
  clearPendingAssessment,
  readAssessmentResumeFromUrl,
  readPendingAssessment,
  savePendingAssessment,
} from "@/lib/assessment-state";

export const Route = createFileRoute("/apest-assessment")({
  head: () => ({
    meta: [
      { title: "APEST Spiritual Gifts Assessment" },
      {
        name: "description",
        content: "Identify your spiritual gifting based on the five-fold ministry roles.",
      },
    ],
  }),
  component: ApestAssessment,
});

const QUESTIONS = [
  "You often find yourself starting new initiatives or organisations from scratch.",
  "When you see injustice or moral compromise, you feel compelled to speak up immediately.",
  "You naturally look for opportunities to share your beliefs and convictions with others.",
  "People often seek you out for emotional support and guidance.",
  "You enjoy breaking down complex concepts into understandable parts.",
  "You're energised by creating systems and structures that others can build upon.",
  "You have a strong sense of what needs to change in organisations or communities.",
  "You find it easy to adapt your communication style to connect with different audiences.",
  "You're deeply concerned about the personal growth and well-being of others.",
  "You love researching and discovering new insights about familiar topics.",
  "You're comfortable challenging traditional ways of doing things to pioneer new approaches.",
  "You can often sense underlying problems before they become apparent to others.",
  "You're energised by helping others discover and embrace new ideas or beliefs.",
  "You naturally create environments where people feel safe and accepted.",
  "You find fulfilment in helping others develop their understanding and skills.",
  "You see opportunities and possibilities where others see obstacles.",
  "You feel a strong responsibility to speak truth, even when it's uncomfortable.",
  "You're good at persuading others and building enthusiasm for ideas or causes.",
  "You're patient with people's growth process and celebrate small victories.",
  "You have a gift for making complex information accessible and practical.",
];

const ROLES = ["Apostle", "Prophet", "Evangelist", "Shepherd", "Teacher"];

const MAPPING = {
  Apostle: [1, 6, 11, 16],
  Prophet: [2, 7, 12, 17],
  Evangelist: [3, 8, 13, 18],
  Shepherd: [4, 9, 14, 19],
  Teacher: [5, 10, 15, 20],
};

const DESCRIPTIONS = {
  Apostle:
    "Apostle is a visionary and pioneer who establishes new initiatives, builds ministries, sees opportunities in challenges, creates systems & structures, and equips others for Kingdom expansion (I Cor 3:10).",
  Prophet:
    "The Prophet serves as a spiritual watchman, discerning God's voice & deeper truths & injustice, speaks with moral clarity, brings spiritual insight and calls people to righteousness and accountability or moral change (Jeremiah 1:5).",
  Evangelist:
    "The Evangelist communicates the Gospel with passion and clarity, connects with diverse audiences, and leads others toward spiritual transformation through Christ (2 Corinthians 5:20).",
  Shepherd:
    "Compassionate caregiver, protects, provides emotional support and nurtures personal growth in their faith (1 Peter 5:2-3).",
  Teacher: "Explains and applies God's Word accurately, helping others mature in biblical truth.",
};

function ApestAssessment() {
  const [step, setStep] = useState<1 | 3>(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [q21, setQ21] = useState<string>("");

  const scrollToResults = () => {
    window.setTimeout(
      () =>
        document
          .querySelector("#assessment-results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0,
    );
  };

  useEffect(() => {
    const pending = readAssessmentResumeFromUrl("apest") ?? readPendingAssessment("apest");
    if (pending) {
      setAnswers(pending.answers as Record<number, number>);
      setQ21(pending.q21 ?? "");
      setStep(3);
      scrollToResults();
    }
  }, []);

  const answered = Object.keys(answers).length + (q21 ? 1 : 0);
  const progress = step === 1 ? Math.round((answered / 21) * 100) : 100;
  const progressLabel = step === 1 ? `${answered}/21` : "Complete";
  const isQuizComplete = useMemo(() => {
    return Object.keys(answers).length === 20 && q21 !== "";
  }, [answers, q21]);

  const handleAnswer = (qIndex: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const showStep = (nextStep: 1 | 3) => {
    if (nextStep === 3) {
      savePendingAssessment("apest", {
        version: 1,
        answers: Object.fromEntries(Object.entries(answers)),
        submitted: true,
        q21,
      });
    }
    setStep(nextStep);
    if (nextStep === 3) scrollToResults();
    else
      window.setTimeout(
        () => document.querySelector("#assessment-content")?.scrollIntoView({ behavior: "smooth" }),
        0,
      );
  };

  const results = useMemo(() => {
    if (step !== 3) return null;

    const scores = { Apostle: 0, Prophet: 0, Evangelist: 0, Shepherd: 0, Teacher: 0 };

    // Add scores based on mapping
    for (const [role, qIndices] of Object.entries(MAPPING)) {
      qIndices.forEach((qNum) => {
        scores[role as keyof typeof scores] += answers[qNum - 1] || 0;
      });
    }

    // Add extra weight for Q21 (the final choice)
    if (q21 && scores[q21 as keyof typeof scores] !== undefined) {
      scores[q21 as keyof typeof scores] += 2; // small tie breaker boost
    }

    const sortedRoles = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primary = sortedRoles[0][0];
    const secondary = sortedRoles[1][0];

    return { scores, primary, secondary };
  }, [answers, q21, step]);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden gradient-hero pb-24 pt-36 text-white">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--teal)_35%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl font-medium leading-[1.05] md:text-7xl">
              Ministry Role Assessment
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Discover how your gifts may align with the five ministry roles of apostle, prophet,
              evangelist, shepherd, and teacher.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-[6.5rem] z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-brand transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="min-w-16 text-right text-xs font-semibold text-primary/70">
            {progressLabel}
          </span>
        </div>
      </div>

      <motion.main
        id="assessment-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="mx-auto max-w-3xl scroll-mt-28 px-6 pb-24 pt-12 md:pt-16"
      >
        {/* STEP 1: Quiz */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="space-y-10">
              {QUESTIONS.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
                >
                  <p className="text-[15px] font-medium text-primary">
                    <span className="mr-2 text-teal-deep font-semibold">{idx + 1}.</span> {q}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Not at all", val: 0 },
                      { label: "Somewhat", val: 1 },
                      { label: "In every way", val: 2 },
                    ].map((opt) => {
                      const isSelected = answers[idx] === opt.val;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleAnswer(idx, opt.val)}
                          className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                            isSelected
                              ? "border-teal-deep bg-teal/10 text-teal-deep shadow-sm"
                              : "border-border/60 bg-background text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <p className="text-[15px] font-medium text-primary">
                  <span className="mr-2 text-teal-deep font-semibold">21.</span>
                  In a group setting, which role do you naturally gravitate toward?
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {ROLES.map((role) => {
                    const isSelected = q21 === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setQ21(role)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-teal-deep bg-teal/10 text-teal-deep shadow-sm"
                            : "border-border/60 bg-background text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button
                type="button"
                disabled={!isQuizComplete}
                onClick={() => showStep(3)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-card disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                View Results <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Results */}
        {step === 3 && results && (
          <>
            <div id="assessment-results" className="scroll-mt-28" />
            <AssessmentResultGate
              assessmentType="apest"
              answers={{ ...Object.fromEntries(Object.entries(answers)), q21 }}
              result={{
                scores: results.scores,
                primary: results.primary,
                secondary: results.secondary,
                q21,
              }}
              onSaved={() => {
                clearPendingAssessment("apest");
                scrollToResults();
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
            <div className="rounded-[2rem] gradient-hero p-8 text-center text-white shadow-soft md:p-12">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold mb-6" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Your Results
              </h2>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row justify-center sm:gap-12">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-teal">
                    Primary Gifting
                  </div>
                  <div className="mt-1 font-serif text-3xl font-medium">{results.primary}</div>
                </div>
                <div className="hidden w-px bg-white/20 sm:block" />
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-white/50">
                    Secondary Gifting
                  </div>
                  <div className="mt-1 font-serif text-3xl font-medium text-white/90">
                    {results.secondary}
                  </div>
                </div>
              </div>
              <div className="mt-8 inline-block rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur">
                Your final choice was <span className="font-semibold text-white">{q21}</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
                <h3 className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-teal-deep">
                  <span className="h-px w-6 bg-teal-deep" /> Primary Role Description
                </h3>
                <h4 className="mt-4 text-2xl font-medium text-primary">{results.primary}</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {DESCRIPTIONS[results.primary as keyof typeof DESCRIPTIONS]}
                </p>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
                <h3 className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <span className="h-px w-6 bg-muted-foreground/50" /> Secondary Role Description
                </h3>
                <h4 className="mt-4 text-2xl font-medium text-primary">{results.secondary}</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {DESCRIPTIONS[results.secondary as keyof typeof DESCRIPTIONS]}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-cream p-8 md:p-10">
              <h3 className="font-serif text-2xl font-medium text-primary">All Roles</h3>
              <p className="mt-2 text-[15px] text-muted-foreground max-w-2xl">
                Remember: Everyone has aspects of each gifting, but most people have one or two
                dominant areas. Your gifting can develop over time, but focus on the dominant areas
                first and know that all roles are equally valuable to the community.
              </p>

              <div className="mt-8 space-y-6">
                {ROLES.map((role) => (
                  <div
                    key={role}
                    className="flex gap-4 border-b border-border/60 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="font-semibold text-primary min-w-[100px]">{role}</div>
                    <div className="text-[15px] text-muted-foreground flex-1">
                      {DESCRIPTIONS[role as keyof typeof DESCRIPTIONS]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => {
                  clearPendingAssessment("apest");
                  setAnswers({});
                  setQ21("");
                  showStep(1);
                }}
                className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-teal-deep transition-colors"
              >
                Retake Assessment
              </button>
            </div>
              </motion.div>
            </AssessmentResultGate>
          </>
        )}
      </motion.main>
    </div>
  );
}
