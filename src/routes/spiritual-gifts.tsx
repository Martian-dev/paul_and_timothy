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

export const Route = createFileRoute("/spiritual-gifts")({
  head: () => ({
    meta: [
      { title: "Type of Calling Assessment" },
      {
        name: "description",
        content:
          "Identify the type of Christian calling that best describes God's present direction for your life.",
      },
    ],
  }),
  component: TypeOfCallAssessment,
});

const QUESTIONS = [
  "I desire to use my everyday occupation, family responsibilities, relationships, and available time to serve God.",
  "I have a strong and persistent conviction that God is calling me to make Christian ministry my primary vocation.",
  "I see my workplace or profession as an opportunity to demonstrate Christ and influence people for the Gospel.",
  "I experience joy and fulfilment when serving God through hospitality, encouragement, relationships, practical service, or caring for others.",
  "I am willing to surrender my career plans, ambitions, and personal goals if God clearly calls me into full-time ministry.",
  "I desire to remain in or pursue a profession while intentionally using it as a platform for Christian ministry.",
  "I believe I can faithfully serve God alongside my present occupation, studies, family, or other regular responsibilities.",
  "I feel that God is placing a deep & continuing burden to preach, teach, evangelise, disciple, shepherd, or serve for a people who live far off.",
  "I can support myself financially through my profession while also actively engaging in Christian ministry.",
  "I see my daily responsibilities as opportunities to represent Christ rather than as separate from my Christian service.",
  "I am willing to make significant sacrifices, including financial or lifestyle changes, even to resign my job to obey God's call to ministry.",
  "My professional skills and workplace relationships give me regular opportunities to reach people who may not ordinarily attend church.",
];

const SCALE = [
  { label: "Not at all true of me", val: 1 },
  { label: "Slightly true of me", val: 2 },
  { label: "Sometimes true / Unsure", val: 3 },
  { label: "Mostly true of me", val: 4 },
  { label: "Very true of me", val: 5 },
];

const CALLS = ["Part-Time Call", "Full-Time Call", "Tentmakers' Call"] as const;
type Call = (typeof CALLS)[number];

const MAPPING: Record<Call, number[]> = {
  "Part-Time Call": [1, 4, 7, 10],
  "Full-Time Call": [2, 5, 8, 11],
  "Tentmakers' Call": [3, 6, 9, 12],
};

const DESCRIPTIONS: Record<Call, string> = {
  "Part-Time Call":
    "A part-time call describes a believer who has a regular occupation or other responsibilities while also actively serving God in their available time and sphere of influence. You do not have to be employed by a church or ministry organisation to serve God — your home, workplace, family, business, and relationships can all become places of Christian service. Biblical example: Philemon, whose ministry included hospitality, relationships, encouragement, and caring for fellow believers (Philemon 1–2, 7; Colossians 3:23).",
  "Full-Time Call":
    "A full-time call refers to a person called by God who must leave their primary occupation to devote themselves entirely to Christian ministry. It involves making Christian ministry the primary vocational focus of one's life and being willing to surrender personal plans and career ambitions for God's purpose. Biblical example: Peter, who left his fishing occupation to follow Christ in total surrender and availability (Luke 5:10–11; Matthew 4:19–20; Mark 8:34).",
  "Tentmakers' Call":
    "A tentmaker's call refers to a form of bi-vocational ministry, where a person works in a profession or trade to financially support themselves while also engaging in Christian ministry. Workplaces can be mission fields: Christian professionals engage with people who may not attend church, demonstrating Christ's character and sharing the Gospel naturally. Your profession itself can become a platform for ministry. Biblical example: the Apostle Paul, who worked as a tentmaker while preaching the Gospel (Acts 18:2–4; 20:33–35; Colossians 3:17).",
};

function bandFor(score: number): { label: string; text: string } {
  if (score >= 16)
    return {
      label: "Strong Indication",
      text: "Your responses show a strong indication toward this type of calling. Continue seeking God through prayer, Scripture, wise counsel, and practical opportunities to serve.",
    };
  if (score >= 11)
    return {
      label: "Possible Indication",
      text: "Your responses show some evidence of this type of calling. Spend more time discerning your gifts, desires, opportunities, and God's direction.",
    };
  if (score >= 6)
    return {
      label: "Limited Indication",
      text: "Some aspects of this calling may be present, but your responses currently show limited evidence that this is your primary calling.",
    };
  return {
    label: "Little Indication",
    text: "Your responses show little indication toward this type of calling at this stage. This does not mean God cannot lead you differently in the future.",
  };
}

function TypeOfCallAssessment() {
  const [step, setStep] = useState<1 | 3>(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});

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
    const pending =
      readAssessmentResumeFromUrl("spiritual_gifts") ?? readPendingAssessment("spiritual_gifts");
    if (pending) {
      setAnswers(pending.answers as Record<number, number>);
      setStep(3);
      scrollToResults();
    }
  }, []);

  const answered = Object.keys(answers).length;
  const progress = step === 1 ? Math.round((answered / QUESTIONS.length) * 100) : 100;
  const progressLabel = step === 1 ? `${answered}/${QUESTIONS.length}` : "Complete";
  const isQuizComplete = useMemo(() => Object.keys(answers).length === QUESTIONS.length, [answers]);

  const handleAnswer = (qIndex: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const showStep = (nextStep: 1 | 3) => {
    if (nextStep === 3) {
      savePendingAssessment("spiritual_gifts", {
        version: 1,
        answers: Object.fromEntries(Object.entries(answers)),
        submitted: true,
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

    const scores = { "Part-Time Call": 0, "Full-Time Call": 0, "Tentmakers' Call": 0 } as Record<
      Call,
      number
    >;
    for (const call of CALLS) {
      MAPPING[call].forEach((qNum) => {
        scores[call] += answers[qNum - 1] || 0;
      });
    }

    const sorted = [...CALLS].sort((a, b) => scores[b] - scores[a]);
    const primary = sorted[0];

    return { scores, primary, band: bandFor(scores[primary]) };
  }, [answers, step]);

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
              Ministry Type Assessment
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Prayerfully explore whether God may be leading you to serve through a part-time,
              full-time, or tentmaking call.
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
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {SCALE.map((opt) => {
                      const isSelected = answers[idx] === opt.val;
                      return (
                        <button
                          key={opt.val}
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
              assessmentType="spiritual_gifts"
              answers={Object.fromEntries(Object.entries(answers))}
              result={{
                scores: results.scores,
                primary: results.primary,
                band: results.band,
              }}
              onSaved={() => {
                clearPendingAssessment("spiritual_gifts");
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
                Your Result
              </h2>
              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-widest text-teal">
                  Your Possible Calling
                </div>
                <div className="mt-1 font-serif text-3xl font-medium md:text-4xl">
                  {results.primary}
                </div>
                <div className="mt-3 inline-block rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur">
                  {results.scores[results.primary]} / 20 — {results.band.label}
                </div>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80">
                {results.band.text}
              </p>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
              <h3 className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-teal-deep">
                <span className="h-px w-6 bg-teal-deep" /> Your Calling Description
              </h3>
              <h4 className="mt-4 text-2xl font-medium text-primary">{results.primary}</h4>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {DESCRIPTIONS[results.primary]}
              </p>
            </div>

            <div className="rounded-3xl bg-cream p-8 md:p-10">
              <h3 className="font-serif text-2xl font-medium text-primary">All Scores</h3>
              <p className="mt-2 text-[15px] text-muted-foreground max-w-2xl">
                Each category is scored out of 20. 16–20 is a strong indication, 11–15 a possible
                indication, 6–10 a limited indication, and 4–5 little indication.
              </p>

              <div className="mt-8 space-y-6">
                {CALLS.map((call) => (
                  <div
                    key={call}
                    className="border-b border-border/60 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="font-semibold text-primary">{call}</div>
                      <div className="text-sm font-semibold text-teal-deep">
                        {results.scores[call]} / 20 · {bandFor(results.scores[call]).label}
                      </div>
                    </div>
                    <div className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {DESCRIPTIONS[call]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-[15px] leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              God calls us in different ways. Some serve in full-time ministry, others through
              regular jobs while being involved in ministry, and some work as tentmakers, combining
              both. Know your specific call and remain faithful to it.
            </p>

            <div className="text-center pt-8">
              <button
                onClick={() => {
                  clearPendingAssessment("spiritual_gifts");
                  setAnswers({});
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
