import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, HelpCircle, Plus } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Paul & Timothy Training Centre" },
      {
        name: "description",
        content:
          "Answers about the Ministry Calling Assessment, training courses, mentorship and how to get started.",
      },
      { property: "og:title", content: "FAQs — Paul & Timothy Training Centre" },
      {
        property: "og:description",
        content: "Common questions about assessments, courses, mentorship and joining the centre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqsPage,
});

const faqs = [
  {
    q: "What is the Ministry Calling Assessment?",
    a: "It's a 21-statement, prayer-guided tool that scores your burden and passion across seven people groups — children, teenagers, youth, women, men, married couples and senior citizens.",
  },
  {
    q: "How long does the assessment take?",
    a: "About 8–10 minutes. Answer honestly rather than aspirationally — the goal is clarity, not a high score.",
  },
  {
    q: "How are the scores interpreted?",
    a: "Each section is out of 15. 13–15 signals a very strong calling, 10–12 strong interest, 7–9 moderate interest, and below 7 likely isn't your primary focus right now.",
  },
  {
    q: "Do I need ministry experience to join a course?",
    a: "No. Our training is built for ordinary believers. If you're willing and teachable, there is a course and a mentor for you.",
  },
  {
    q: "What does mentorship look like?",
    a: "You're paired with a mature guide who walks with you through your training — regular conversations, prayer, accountability and practical ministry assignments.",
  },
  {
    q: "Is there a cost to get started?",
    a: "The assessment is free. Course fees vary, and support is available for those who need it — reach out and we'll walk you through the options.",
  },
];

function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="gradient-hero pt-36 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <HelpCircle className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Resources · FAQs
          </span>
          <h1 className="font-serif text-5xl font-medium leading-[1.05] md:text-7xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            The questions we hear most from people stepping into their calling.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-3 px-6 py-16">
        {faqs.map((f, i) => (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-serif text-base font-semibold text-primary md:text-lg">
                {f.q}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-teal-deep transition-transform duration-300 ${
                  open === i ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="mt-10 rounded-4xl gradient-hero px-8 py-10 text-center text-white">
          <h2 className="font-serif text-2xl font-bold">Still have a question?</h2>
          <p className="mt-2 text-sm text-white/75">
            Start with the assessment, or reach out and we'll point you in the right direction.
          </p>
          <Link
            to="/assessment"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            Take the assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}