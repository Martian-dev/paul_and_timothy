import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Video,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import mentorshipImg from "@/assets/mentorship.jpg";

export const Route = createFileRoute("/interaction")({ component: InteractionPage });

const topics = ["Calling clarity", "Bible study help", "Ministry coaching", "Spiritual formation"];
const faqs = [
  [
    "Who leads the conversation?",
    "A mature Paul & Timothy mentor—pastors, missionaries, and Bible teachers committed to prayerful, practical counsel.",
  ],
  [
    "Is the first session free?",
    "Yes. Your first 30-minute conversation is free, with no obligation to continue.",
  ],
  [
    "How is the session held?",
    "Choose Zoom or WhatsApp video. We will schedule it around your timezone whenever possible.",
  ],
  [
    "Will my conversation remain private?",
    "Yes. Your request and conversation are treated with pastoral care and confidence.",
  ],
];

function InteractionPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };
  return (
    <div className="min-h-screen bg-background">
      <SiteNav alwaysSolid />
      <main>
        <section className="relative overflow-hidden bg-cream px-6 py-18 md:py-24">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <img
              src={mentorshipImg}
              alt="Mentor listening in conversation"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/25 to-transparent" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
                <span className="h-px w-8 bg-teal-deep" /> One-to-one mentorship
              </div>
              <h1 className="mt-5 text-5xl font-medium leading-[1.04] text-primary md:text-7xl">
                A quiet conversation.{" "}
                <em className="text-teal-deep not-italic">A clearer next step.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Meet with someone who will listen carefully, pray with you, and help you discern
                what faithfulness looks like in this season.
              </p>
              <a
                href="#booking"
                className="mt-8 inline-flex min-h-12 items-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-card"
              >
                Talk to Your Mentor
              </a>
            </div>
          </div>
        </section>
        <section className="bg-primary px-6 py-18 text-white md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-teal">
                What we can hold together
              </div>
              <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
                Bring the question that has been sitting with you.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {topics.map((topic, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  key={topic}
                  className="rounded-3xl border border-white/15 bg-white/7 p-6"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/20 text-teal">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-medium">{topic}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    A spacious, Scripture-rooted conversation focused on your actual next step.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="booking" className="scroll-mt-6 px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
                Book a session
              </div>
              <h2 className="mt-4 text-4xl font-medium leading-tight text-primary md:text-5xl">
                Make room for a <em className="text-teal-deep not-italic">quiet hour.</em>
              </h2>
              <ul className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <Clock3 className="h-5 w-5 shrink-0 text-teal-deep" />
                  30-minute private call with a senior mentor
                </li>
                <li className="flex gap-3">
                  <Video className="h-5 w-5 shrink-0 text-teal-deep" />
                  Zoom or WhatsApp video, in your timezone
                </li>
                <li className="flex gap-3">
                  <CalendarDays className="h-5 w-5 shrink-0 text-teal-deep" />
                  Same-week scheduling whenever possible
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-teal-deep" />
                  Prayerful, confidential and pressure-free
                </li>
              </ul>
            </div>
            <div className="rounded-[2rem] bg-card p-6 shadow-soft md:p-9">
              {sent ? (
                <div className="py-14 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-teal-deep" />
                  <h3 className="mt-5 text-3xl text-primary">Your request is on its way.</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    A mentor will reply within 48 hours to arrange a time with you.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-7 text-sm font-semibold text-teal-deep underline underline-offset-4"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" required />
                    <Field label="Email address" name="email" type="email" required />
                  </div>
                  <Field label="Country / timezone" name="timezone" />
                  <label className="block text-sm font-medium text-primary">
                    What would you like to discuss?
                    <select
                      name="topic"
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
                    >
                      <option>Choose a topic</option>
                      {topics.map((topic) => (
                        <option key={topic}>{topic}</option>
                      ))}
                      <option>Something else</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-primary">
                    A few words about your season
                    <textarea
                      name="message"
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground outline-none focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
                      placeholder="Share only what feels helpful…"
                    />
                  </label>
                  <button className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-ring">
                    Request conversation
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
        <section className="bg-cream px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
                Common questions
              </div>
              <h2 className="mt-4 text-4xl text-primary md:text-5xl">Before we meet.</h2>
            </div>
            <div className="mt-10 space-y-3">
              {faqs.map(([question, answer], index) => (
                <div key={question} className="rounded-2xl bg-card">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-6 text-left text-lg font-medium text-primary"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-teal-deep transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary px-6 py-10 text-center text-sm text-white/65">
        © {new Date().getFullYear()} Paul & Timothy Training Centre. Rooted in Scripture. Sent in
        love.
      </footer>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-primary">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
      />
    </label>
  );
}
