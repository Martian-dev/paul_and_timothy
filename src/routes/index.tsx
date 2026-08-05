import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Users,
  Heart,
  Sparkles,
  Play,
  ChevronRight,
  ChevronDown,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Menu,
  X,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HandHeart,
  Send,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";
import communityImg from "@/assets/community.jpg";
import callingImg from "@/assets/calling.jpg";
import courseBibleImg from "@/assets/course-bible.jpg";
import courseTeachingImg from "@/assets/course-teaching.jpg";
import logoImg from "@/assets/logo.png";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
  component: Home,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function AnimatedLetterLine({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  accent = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  accent?: boolean;
}) {
  const chars = text.split("");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
      className={className}
    >
      {chars.map((char, index) => {
        const isSpace = char === " ";
        const content = isSpace ? "\u00A0" : char;

        return (
          <motion.span
            key={`${content}-${index}`}
            variants={{
              hidden: accent
                ? { opacity: 0, y: 8, filter: "drop-shadow(0 0 0 rgba(130, 242, 230, 0))" }
                : { opacity: 0 },
              visible: accent
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "drop-shadow(0 0 14px rgba(130, 242, 230, 0.18))",
                    transition: {
                      duration: 0.16,
                      ease: [0.2, 0.8, 0.2, 1] as const,
                    },
                  }
                : {
                    opacity: 1,
                    transition: {
                      duration: 0.04,
                      ease: [0.2, 0.8, 0.2, 1] as const,
                    },
                  },
            }}
            className={accent ? "inline-block text-[oklch(0.85_0.12_180)]" : "inline-block"}
          >
            {content}
          </motion.span>
        );
      })}
    </motion.span>
  );
}



function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden gradient-hero">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Worship gathering"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.15_0.1_310)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-3xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl"
          >
            <div className="block">
              <AnimatedLetterLine text="You are not here" delay={0.05} stagger={0.03} />
            </div>
            <div className="mt-2 block">
              <AnimatedLetterLine text="by accident." delay={0.8} stagger={0.03} />
            </div>
            <div className="mt-6 block italic text-[oklch(0.85_0.12_180)]">
              <AnimatedLetterLine text="You were made" delay={1.4} stagger={0.03} />
            </div>
            <div className="mt-2 block">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.25, ease: [0.2, 0.8, 0.2, 1] as const }}
              >
                <AnimatedLetterLine text="for a purpose." delay={2.35} stagger={0.14} accent />
              </motion.span>
            </div>
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/assessment"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]"
            >
              Discover Your Calling
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Explore Courses
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50"
        >
          
        </motion.div>
      </div>
    </section>
  );
}

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal-deep">
      <span className="h-px w-8 bg-teal-deep" />
      {children}
    </div>
  );
}

function AssessmentCards() {
  const cards = [
    {
      icon: Compass,
      title: "What is your role?",
      desc: "Discover the spiritual gifts and leadership shape God has designed uniquely in you.",
    },
    {
      icon: Users,
      title: "Who are you meant to minister to?",
      desc: "Uncover the people and places you're wired to reach with the Gospel.",
    },
    {
      icon: Heart,
      title: "What is your call?",
      desc: "Move from general purpose into the specific mission God is inviting you into.",
    },
  ];
  return (
    <Section id="assessment" className="bg-cream">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-end">
        <div>
          <SectionEyebrow>Begin Your Journey</SectionEyebrow>
          <h2 className="text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            Three questions <br /> that change everything.
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-right lg:ml-auto">
          Our assessment helps you name what God has been quietly forming in you — so you can walk
          it out with clarity and confidence.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.1 }}
            className="hover-lift group relative flex flex-col rounded-3xl bg-card p-8 shadow-card"
          >
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white">
              <c.icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl font-medium text-primary">{c.title}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
            <Link
              to="/assessment"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep"
            >
              Start Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function JourneyRoad({
  path,
  viewBox,
  id,
  active,
  className,
}: {
  path: string;
  viewBox: string;
  id: string;
  active: boolean;
  className: string;
}) {
  return (
    <svg viewBox={viewBox} preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--teal-deep)" />
          <stop offset="0.55" stopColor="var(--gold)" />
          <stop offset="1" stopColor="var(--teal)" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={path}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.14"
        strokeWidth="70"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.92"
        strokeWidth="58"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke="var(--cream)"
        strokeOpacity="0.1"
        strokeWidth="48"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke="var(--cream)"
        strokeOpacity="0.68"
        strokeWidth="2.5"
        strokeDasharray="12 14"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${id}-light)`}
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: [0, 0.85, 0.35] } : undefined}
        transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], times: [0, 0.15, 1] }}
      />
      <motion.path
        d={path}
        pathLength={1}
        fill="none"
        stroke={`url(#${id}-light)`}
        strokeWidth="10"
        strokeDasharray="0.025 0.975"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#${id}-glow)`}
        initial={{ strokeDashoffset: 0, opacity: 0 }}
        animate={active ? { strokeDashoffset: -1, opacity: [0, 1, 1, 0] } : undefined}
        transition={{ duration: 2.8, ease: "easeInOut", times: [0, 0.1, 0.88, 1] }}
      />
    </svg>
  );
}

function JourneyTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(roadmapRef, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;
  const desktopPath =
    "M -50 318 C 40 270 70 238 120 260 C 210 305 300 290 315 220 C 330 155 265 92 348 108 C 455 125 445 300 590 265 C 720 240 680 115 835 145 C 950 170 970 90 1080 120 C 1160 142 1195 74 1250 42";
  const mobilePath =
    "M 48 58 C 80 100 16 160 48 208 C 78 250 16 310 48 358 C 78 400 16 460 48 508 C 78 550 16 610 48 658";
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Take Assessment",
      desc: "Answer a few honest questions.",
      position: { left: "10%", top: 260 },
      labelClass:
        "bottom-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 text-center",
      markerClass: "bg-teal-deep text-white",
    },
    {
      icon: FileText,
      title: "Personal Report",
      desc: "Receive a Spirit-led summary.",
      position: { left: "29%", top: 108 },
      labelClass:
        "bottom-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 text-center",
      markerClass: "bg-primary text-white",
    },
    {
      icon: GraduationCap,
      title: "Join Training",
      desc: "Enter a course that fits your call.",
      position: { left: "49%", top: 265 },
      labelClass: "left-1/2 top-[calc(100%+1.25rem)] -translate-x-1/2 text-center",
      markerClass: "bg-gold text-primary",
    },
    {
      icon: HandHeart,
      title: "Mentorship",
      desc: "Walk with a mature guide.",
      position: { left: "69.5%", top: 145 },
      labelClass:
        "bottom-[calc(100%+1.5rem)] left-1/2 -translate-x-1/2 text-center",
      markerClass: "bg-teal-deep text-white",
    },
    {
      icon: Send,
      title: "Go Minister",
      desc: "Step into the harvest, equipped.",
      position: { left: "90%", top: 120 },
      labelClass: "left-1/2 top-[calc(100%+1.25rem)] -translate-x-1/2 text-center",
      markerClass: "bg-primary text-white",
    },
  ];

  const checkpointMotion = (index: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0.42, scale: 0.9 },
    animate:
      isInView || prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0.42, scale: 0.9 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { delay: 0.18 + index * 0.52, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <Section
      id="journey"
      className="relative overflow-hidden bg-gradient-to-b from-background via-cream/70 to-background"
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-plum/10 blur-3xl" />

      <div className="relative text-center">
        <SectionEyebrow>Your Journey With Us</SectionEyebrow>
        <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
          A clear path from <span className="text-gradient italic">wondering</span> to walking it
          out.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Every step builds on the last, taking you from discovery to confident, equipped ministry.
        </p>
      </div>

      <div ref={roadmapRef} className="relative mt-14 md:mt-16">
        <div className="relative lg:hidden">
          <JourneyRoad
            path={mobilePath}
            viewBox="0 0 96 658"
            id="journey-mobile"
            active={shouldAnimate}
            className="pointer-events-none absolute left-0 top-0 h-[658px] w-24 overflow-visible"
          />

          <ol className="relative">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <li key={step.title} className="min-h-[150px] last:min-h-0">
                  <motion.button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveStep(index)}
                    {...checkpointMotion(index)}
                    className="group grid w-full grid-cols-[96px_minmax(0,1fr)] items-start text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <div className="relative z-10 h-16 w-14 justify-self-center">
                      <motion.span
                        className="pointer-events-none absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full border-2 border-gold"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={
                          shouldAnimate
                            ? { opacity: [0, 0.8, 0], scale: [0.85, 1.38, 1.6] }
                            : undefined
                        }
                        transition={{ delay: 0.18 + index * 0.52, duration: 0.75 }}
                      />
                      <span
                        className={`absolute left-1/2 top-9 h-5 w-5 -translate-x-1/2 rotate-45 ${step.markerClass}`}
                      />
                      <span
                        className={`absolute left-1/2 top-0 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-4 border-background shadow-card transition-transform duration-300 group-active:scale-95 ${step.markerClass} ${
                          isActive ? "scale-105 shadow-soft" : "group-hover:scale-105"
                        }`}
                      >
                        <step.icon className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                    </div>
                    <div className="ml-5 pt-0.5 pr-2">
                      <div
                        className={`mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                          isActive ? "text-teal-deep" : "text-muted-foreground/70"
                        }`}
                      >
                        Step {String(index + 1).padStart(2, "0")}
                        <span className="h-px w-8 bg-current opacity-40" />
                      </div>
                      <h3
                        className={`text-xl font-semibold transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-primary/75 group-hover:text-primary"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-sm text-base leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </motion.button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative hidden h-[390px] lg:block">
          <JourneyRoad
            path={desktopPath}
            viewBox="0 0 1200 360"
            id="journey-desktop"
            active={shouldAnimate}
            className="pointer-events-none absolute inset-x-0 top-0 h-[360px] w-full overflow-visible"
          />

          <ol className="absolute inset-0">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <li
                  key={step.title}
                  style={step.position}
                  className="absolute -translate-x-1/2 -translate-y-[58px]"
                >
                  <motion.button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveStep(index)}
                    {...checkpointMotion(index)}
                    className="group relative block h-16 w-14 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <motion.span
                      className="pointer-events-none absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full border-2 border-gold"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={
                        shouldAnimate
                          ? { opacity: [0, 0.8, 0], scale: [0.85, 1.38, 1.6] }
                          : undefined
                      }
                      transition={{ delay: 0.18 + index * 0.52, duration: 0.75 }}
                    />
                    <span
                      className={`absolute left-1/2 top-9 h-5 w-5 -translate-x-1/2 rotate-45 ${step.markerClass}`}
                    />
                    <span
                      className={`absolute left-1/2 top-0 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-4 border-background shadow-card transition-transform duration-300 group-active:scale-95 ${step.markerClass} ${
                        isActive ? "scale-105 shadow-soft" : "group-hover:scale-105"
                      }`}
                    >
                      <step.icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>

                    <div
                      className={`absolute w-44 xl:w-52 ${step.labelClass}`}
                    >
                      <div className="mb-1 inline-flex items-center gap-2">
                        <span
                          className={`h-px w-7 bg-current transition-colors duration-300 ${
                            isActive ? "text-teal-deep" : "text-muted-foreground/40"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                          isActive ? "text-teal-deep" : "text-muted-foreground/60"
                        }`}
                        >
                          Step {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-primary/70 group-hover:text-primary"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </motion.button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

function Audience() {
  const items = [
    {
      title: "I'm trying to understand my calling",
      desc: "Start with clarity. Take the assessment and receive a personal report.",
      cta: "Learn More",
      img: callingImg,
    },
    {
      title: "I already know my calling",
      desc: "Take a relevant course and sharpen the gift God has entrusted to you.",
      cta: "Take a Course",
      img: mentorshipImg,
    },
    {
      title: "I am serving in a church",
      desc: "Get equipped with tools, teaching and mentorship for the long haul.",
      cta: "Equip Now",
      img: communityImg,
    },
    {
      title: "I lead a church",
      desc: "Train your team and disciple leaders across your community.",
      cta: "Train My Church",
      img: courseTeachingImg,
    },
  ];
  return (
    <Section id="who" className="bg-gradient-to-b from-background to-cream">
      <div className="max-w-2xl">
        <SectionEyebrow>Who is this for?</SectionEyebrow>
        <h2 className="text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
          Wherever you are on the journey.
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
            className="hover-lift group grid grid-cols-[minmax(0,1fr)_140px] overflow-hidden rounded-3xl bg-card shadow-card sm:grid-cols-[minmax(0,1fr)_200px]"
          >
            <div className="flex flex-col p-8">
              <h3 className="text-xl font-semibold text-primary md:text-2xl">{it.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <a
                href="#"
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-primary"
              >
                {it.cta}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={it.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Counter({
  target,
  format,
  duration = 900,
}: {
  target: number;
  format: (value: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-80px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setValue(current);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return <span ref={ref}>{format(value)}</span>;
}

function Mission() {
  return (
    <Section id="mission" className="relative overflow-hidden gradient-hero text-white">
      <div className="absolute inset-0 opacity-20">
        <img src={communityImg} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.85_0.12_180)]">
            <span className="h-px w-8 bg-[oklch(0.85_0.12_180)]" />
            Let's Increase the Count
          </div>
          <h2 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            "The harvest is plenty,
            <br />
            <span className="italic text-[oklch(0.85_0.12_180)]">and the workers are few</span>
            <br />— and only a handful are equipped."
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-6"
        >
          <p className="text-lg leading-relaxed text-white/75">
            We exist to equip and send out ordinary people for an extraordinary mission. We raise
            and train faithful leaders who build God's Kingdom — starting in their own homes,
            workplaces and cities.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              {
                value: 12000,
                label: "Equipped",
                format: (n: number) => `${Math.floor(n / 1000)}k+`,
              },
              { value: 40, label: "Nations", format: (n: number) => `${n}+` },
              { value: 300, label: "Mentors", format: (n: number) => `${n}` },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-medium text-white md:text-4xl">
                  <Counter target={stat.value} format={stat.format} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <a
            href="/courses"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

function Courses() {
  const courses = [
    {
      img: courseBibleImg,
      tag: "Module One",
      slug: "bible-exposition",
      title: "Bible Exposition",
      desc: "A guided exploration of Genesis to Revelation — see the redemptive story as one whole.",
    },
    {
      img: courseTeachingImg,
      tag: "Module Two",
      slug: "foundations-of-discipleship",
      title: "Foundations of Discipleship",
      desc: "Learn to make disciples the way Jesus did — relationally, patiently, reproducibly.",
    },
    {
      img: mentorshipImg,
      tag: "Module Three",
      slug: "called-to-lead",
      title: "Called to Lead",
      desc: "Practical formation for spiritual leadership, character and endurance in ministry.",
    },
    {
      img: callingImg,
      tag: "Module Four",
      slug: "sent-to-the-nations",
      title: "Sent to the Nations",
      desc: "For those wired for mission — discern where and how to go.",
    },
  ];
  return (
    <Section id="courses">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow>Explore Courses</SectionEyebrow>
          <h2 className="text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            Training that forms <br /> both character and craft.
          </h2>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep hover:text-primary"
        >
          View all courses <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {courses.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
            className="hover-lift group overflow-hidden rounded-3xl bg-card shadow-card"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                {c.tag}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-medium text-primary">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.desc}</p>
              <Link
                to="/courses/$slug"
                params={{ slug: c.slug }}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep"
              >
                Explore Course
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const items = [
    {
      img: mentorshipImg,
      name: "Daniel M.",
      role: "Pastor, Nairobi",
      quote:
        "The assessment named things I'd been sensing for years. I finally have the vocabulary — and the confidence — to walk in my calling.",
    },
    {
      img: communityImg,
      name: "Priya R.",
      role: "Marketplace leader",
      quote:
        "I thought ministry meant leaving my job. Paul & Timothy showed me my workplace is my mission field.",
    },
    {
      img: callingImg,
      name: "Josh T.",
      role: "Missionary",
      quote:
        "The mentorship was the missing piece. I'm no longer serving alone — I'm being formed as I go.",
    },
  ];
  return (
    <Section id="stories" className="bg-cream">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow>Stories</SectionEyebrow>
          <h2 className="text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            Hear from people <br /> like you.
          </h2>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="hover-lift group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <button
                aria-label={`Play testimonial from ${t.name}`}
                className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full glass text-primary transition-transform hover:scale-110"
              >
                <Play className="h-6 w-6 fill-current" />
              </button>
            </div>
            <figcaption className="flex flex-1 flex-col p-7">
              <blockquote className="flex-1 text-[15px] italic leading-relaxed text-foreground/80">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 border-t border-border/60 pt-4">
                <div className="font-semibold text-primary">{t.name}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t.role}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

function MentorCTA() {
  return (
    <Section id="mentor">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] gradient-brand p-10 text-white md:p-16"
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.85_0.12_180)]/20 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
              <BookOpen className="h-3.5 w-3.5" /> It's Free
            </div>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">
              Still confused about <br /> your calling?
            </h2>
            <p className="mt-4 max-w-xl text-white/80">
              Book a free 30-minute conversation with a mentor. No pressure — just prayer, listening
              and honest counsel.
            </p>
          </div>
          <a
            href="/interaction"
            className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 md:self-center"
          >
            Talk to a Mentor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

function Footer() {
  const cols = [
    { title: "Explore", links: ["Home", "Why We Exist", "Assessment", "Courses"] },
    { title: "Resources", links: ["Articles", "Podcast", "Library", "Events"] },
    { title: "Connect", links: ["Contact", "Find a Mentor", "Partner With Us", "Prayer"] },
  ];
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <a href="#top" className="block rounded-2xl bg-white/95 p-4 w-fit hover:shadow-card transition">
            <img src={logoImg} alt="Paul & Timothy Training Centre" className="h-10 w-auto" />
          </a>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Equipping ordinary people for an extraordinary mission. Rooted in Scripture. Sent in
            love.
          </p>

          <form className="mt-8 flex max-w-sm items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 backdrop-blur">
            <Mail className="ml-3 h-4 w-4 text-primary-foreground/60" />
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary transition hover:bg-cream"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-8 flex gap-3">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-primary-foreground/80 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/85 transition hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-primary-foreground/60">
          <div>
            © {new Date().getFullYear()} Paul & Timothy Training Centre. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <AssessmentCards />
        <JourneyTimeline />
        <Audience />
        <Mission />
        <Courses />
        <Testimonials />
        <MentorCTA />
      </main>
      <Footer />
    </div>
  );
}
