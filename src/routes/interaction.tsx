import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, Clock3, ShieldCheck, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import mentorshipImg from "@/assets/mentorship.jpg";

export const Route = createFileRoute("/interaction")({ component: InteractionPage });

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

const calendlyUrl =
  "https://calendly.com/wordlifefoundation/30min?background_color=ebebeb&primary_color=402158";
const calendlyScriptUrl = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyApi = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
};

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript() {
  if (typeof window !== "undefined" && (window as Window & { Calendly?: CalendlyApi }).Calendly) {
    return Promise.resolve();
  }

  if (calendlyScriptPromise) return calendlyScriptPromise;

  calendlyScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${calendlyScriptUrl}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Calendly failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = calendlyScriptUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}

function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || containerRef.current.querySelector("iframe")) {
          return;
        }

        const calendly = (window as Window & { Calendly?: CalendlyApi }).Calendly;
        calendly?.initInlineWidget({ url: calendlyUrl, parentElement: containerRef.current });
      })
      .catch(() => {
        // Keep the booking area available if a browser extension or network policy blocks Calendly.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget overflow-hidden rounded-[1.5rem]"
      data-url={calendlyUrl}
      data-auto-load="false"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

function InteractionPage() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div className="min-h-screen bg-background">
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
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
            <div className="rounded-[2rem] bg-card p-2 shadow-soft sm:p-3 md:p-4">
              <CalendlyEmbed />
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
                <div
                  key={question}
                  className="rounded-3xl bg-white shadow-sm border border-border/50 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left text-xl font-medium text-primary"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-teal transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-8 pb-6">
                      <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
