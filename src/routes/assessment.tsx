import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, Baby, Crown, HeartHandshake, RotateCcw, Sparkles, Users } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Ministry Calling Assessment — Paul & Timothy Training Centre" },
      {
        name: "description",
        content:
          "Prayerfully discover the people group God may be calling you to serve. 21 questions across seven ministry fields, scored instantly.",
      },
      { property: "og:title", content: "Ministry Calling Assessment" },
      {
        property: "og:description",
        content:
          "Answer 21 honest questions and receive an instant profile of the people group God may be calling you to serve.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentPage,
});

type SectionDef = {
  key: string;
  letter: string;
  title: string;
  subtitle: string;
  icon: typeof Users;
  questions: string[];
};

const SECTIONS: SectionDef[] = [
  {
    key: "children",
    letter: "A",
    title: "Children",
    subtitle: "0–12 Years",
    icon: Baby,
    questions: [
      "I naturally enjoy spending time with children and helping them learn and grow.",
      "When I hear about children who are neglected, abused, poor, or unreached, I feel deeply burdened.",
      "Teaching children about Jesus and helping them become lifelong followers of Christ excites me.",
    ],
  },
  {
    key: "teenagers",
    letter: "B",
    title: "Teenagers",
    subtitle: "13–19 Years",
    icon: Sparkles,
    questions: [
      "I enjoy listening to teenagers and helping them navigate the challenges of adolescence.",
      "I feel burdened for teenagers struggling with identity, peer pressure, addiction, emotional pain, or broken families.",
      "I desire to mentor teenagers and help them become committed followers and leaders for Christ.",
    ],
  },
  {
    key: "youth",
    letter: "C",
    title: "Youth",
    subtitle: "20–35 Years",
    icon: Users,
    questions: [
      "I enjoy mentoring young adults as they make important decisions about career, relationships, and purpose.",
      "I feel burdened for young adults who are searching for purpose, direction, or freedom from life's struggles.",
      "I desire to equip young adults to become spiritually mature disciples and leaders.",
    ],
  },
  {
    key: "women",
    letter: "D",
    title: "Women",
    subtitle: "Ministry to women",
    icon: HeartHandshake,
    questions: [
      "I have a deep compassion for women facing emotional, family, social, or spiritual challenges.",
      "I enjoy encouraging, mentoring, and helping women grow in Christ.",
      "I desire to see women healed, empowered, and equipped to fulfill God's purpose.",
    ],
  },
  {
    key: "men",
    letter: "E",
    title: "Men",
    subtitle: "Ministry to men",
    icon: Users,
    questions: [
      "I enjoy encouraging and mentoring men to become godly leaders in their homes, workplaces, and churches.",
      "I feel burdened for men who are struggling with addiction, brokenness, loneliness, or spiritual weakness.",
      "I desire to help men grow into mature disciples who influence others for Christ.",
    ],
  },
  {
    key: "couples",
    letter: "F",
    title: "Married Couples",
    subtitle: "Marriage & family",
    icon: HeartHandshake,
    questions: [
      "I enjoy helping husbands and wives build healthy, Christ-centered marriages.",
      "I feel burdened when I see marriages hurting because of conflict, poor communication, or family challenges.",
      "I desire to strengthen families by equipping couples with biblical principles for marriage and parenting.",
    ],
  },
  {
    key: "seniors",
    letter: "G",
    title: "Senior Citizens",
    subtitle: "Honouring the elders",
    icon: Crown,
    questions: [
      "I enjoy spending time with senior citizens, listening to their stories, and encouraging them.",
      "I feel burdened for elderly people who are lonely, neglected, grieving, or spiritually searching.",
      "I desire to help senior citizens continue growing in Christ and finish their race faithfully.",
    ],
  },
];

const SCALE = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const TOTAL_QUESTIONS = SECTIONS.length * 3;

function interpret(score: number) {
  if (score >= 13)
    return {
      label: "Very Strong Calling",
      note: "This people group may be your primary ministry assignment.",
    };
  if (score >= 10)
    return {
      label: "Strong Interest",
      note: "You have significant passion and potential to serve this group.",
    };
  if (score >= 7)
    return {
      label: "Moderate Interest",
      note: "You may enjoy serving this group occasionally or alongside another ministry.",
    };
  return {
    label: "Not a Primary Focus",
    note: "This may not be your primary ministry focus at this time.",
  };
}

function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / TOTAL_QUESTIONS) * 100);

  const results = useMemo(
    () =>
      SECTIONS.map((s) => ({
        ...s,
        score: s.questions.reduce((sum, _q, i) => sum + (answers[`${s.key}-${i}`] ?? 0), 0),
      })).sort((a, b) => b.score - a.score),
    [answers],
  );

  const setAnswer = (id: string, value: number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero pt-36 pb-24 text-white">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--teal)_35%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" />
              Resources · Assessment
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">
              Ministry Calling Assessment
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              God gives each believer unique passions and burdens for different groups of people.
              This assessment helps you prayerfully identify the people group God may be calling you
              to serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky progress */}
      <div className="sticky top-[72px] z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-brand transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-primary/70">
            {answered}/{TOTAL_QUESTIONS}
          </span>
        </div>
      </div>

      {/* Scale legend */}
      <div className="mx-auto max-w-4xl px-6 pt-12">
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
          <p className="font-serif text-lg font-semibold text-primary">How to answer</p>
          <p className="mt-1 text-sm text-muted-foreground">
            For each statement, choose the number that best describes you.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-5">
            {SCALE.map((s) => (
              <div
                key={s.value}
                className="rounded-2xl bg-accent/60 px-3 py-2 text-center text-xs text-accent-foreground"
              >
                <span className="block font-serif text-lg font-bold">{s.value}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        {SECTIONS.map((section, si) => {
          const Icon = section.icon;
          const sectionScore = section.questions.reduce(
            (sum, _q, i) => sum + (answers[`${section.key}-${i}`] ?? 0),
            0,
          );
          return (
            <motion.section
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-4xl border border-border/60 bg-card shadow-card"
            >
              <div className="flex items-center gap-4 border-b border-border/60 bg-cream/60 px-6 py-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-brand text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                    Section {section.letter}
                  </p>
                  <h2 className="font-serif text-xl font-bold text-primary">{section.title}</h2>
                  <p className="text-xs text-muted-foreground">{section.subtitle}</p>
                </div>
                <div className="rounded-full bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                  {sectionScore}
                  <span className="text-muted-foreground">/15</span>
                </div>
              </div>

              <div className="divide-y divide-border/50">
                {section.questions.map((q, qi) => {
                  const id = `${section.key}-${qi}`;
                  const current = answers[id];
                  return (
                    <div key={id} className="px-6 py-6">
                      <p className="text-sm leading-relaxed text-foreground/90">
                        <span className="mr-2 font-serif font-bold text-teal-deep">
                          {si * 3 + qi + 1}.
                        </span>
                        {q}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {SCALE.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => setAnswer(id, s.value)}
                            aria-pressed={current === s.value}
                            aria-label={`${s.value} — ${s.label}`}
                            className={`h-11 w-11 rounded-2xl border text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                              current === s.value
                                ? "border-transparent gradient-brand text-white shadow-soft"
                                : "border-border bg-background text-primary/70 hover:border-teal hover:text-primary"
                            }`}
                          >
                            {s.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        {/* Submit */}
        <div className="rounded-4xl gradient-hero px-8 py-10 text-center text-white">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">See your calling profile</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/75">
            {answered < TOTAL_QUESTIONS
              ? `Answer all ${TOTAL_QUESTIONS} statements to unlock your full summary — ${TOTAL_QUESTIONS - answered} to go.`
              : "All answered. Reveal the people groups you scored highest for."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSubmitted(true)}
              disabled={answered === 0}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              View my results
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {submitted && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-4xl border border-border/60 bg-card p-8 shadow-soft"
          >
            <h2 className="font-serif text-2xl font-bold text-primary">Your scoring summary</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ranked from strongest to lightest burden. Hold these before the Lord in prayer.
            </p>

            <div className="mt-6 space-y-3">
              {results.map((r) => {
                const meta = interpret(r.score);
                return (
                  <div
                    key={r.key}
                    className="rounded-3xl border border-border/60 bg-background p-5 hover-lift"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-serif text-lg font-semibold text-primary">{r.title}</p>
                      <span className="rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                        {r.score}/15
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full gradient-brand transition-all duration-700"
                        style={{ width: `${(r.score / 15) * 100}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-teal-deep">{meta.label}</p>
                    <p className="text-xs text-muted-foreground">{meta.note}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl bg-cream p-6">
              <h3 className="font-serif text-lg font-bold text-primary">
                Interpreting your results
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <strong className="text-primary">13–15</strong> Very Strong Calling — may be your
                  primary ministry assignment.
                </li>
                <li>
                  <strong className="text-primary">10–12</strong> Strong Interest — significant
                  passion and potential.
                </li>
                <li>
                  <strong className="text-primary">7–9</strong> Moderate Interest — serve
                  occasionally or alongside another ministry.
                </li>
                <li>
                  <strong className="text-primary">Below 7</strong> May not be your primary focus at
                  this time.
                </li>
              </ul>
            </div>

            <Link
              to="/"
              hash="courses"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              Find a course for your calling <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.section>
        )}
      </div>
    </div>
  );
}