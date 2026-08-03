import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    ["Home", "#top"],
    ["Courses", "/courses"],
    ["One-to-one", "/interaction"],
    ["Contact", "#contact"],
  ] as const;

  const resourceLinks = [
    { label: "Assessment", to: "/assessment", desc: "Discover the people group you're called to" },
    { label: "Articles", to: "/articles", desc: "Teaching and encouragement for your journey" },
    { label: "FAQs", to: "/faqs", desc: "Answers to the questions we hear most" },
  ] as const;

  const linkCls = (isScrolled: boolean) =>
    `text-sm font-medium transition-colors duration-500 ${
      isScrolled ? "text-primary/80 hover:text-primary" : "text-white/90 hover:text-white"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_4px_30px_-15px_rgba(45,10,78,0.2)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="Paul & Timothy Training Centre"
            className={`h-9 w-auto md:h-10 transition-[filter] duration-500 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link key={label} to={href as any} className={linkCls(scrolled)}>
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className={linkCls(scrolled)}>
                {label}
              </a>
            )
          )}
          <div className="group relative">
            <button className={`inline-flex items-center gap-1 ${linkCls(scrolled)}`}>
              Resources
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="translate-y-2 rounded-3xl border border-border/60 bg-card p-2 shadow-soft transition-transform duration-300 group-hover:translate-y-0 text-left">
                {resourceLinks.map((r) => (
                  <Link
                    key={r.label}
                    to={r.to}
                    className="block rounded-2xl px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <span className="block font-serif text-base font-semibold text-primary">
                      {r.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{r.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" search={{ course: undefined }} className={linkCls(scrolled)}>
            Login
          </Link>
          <Link
            to="/assessment"
            className={`group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft ${
              scrolled ? "bg-primary text-primary-foreground" : "bg-white text-primary"
            }`}
          >
            Start Here
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className={`rounded-full p-2 transition-colors duration-500 lg:hidden ${
            scrolled ? "text-primary" : "text-white"
          }`}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="glass border-t border-border/40 lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map(([label, href]) =>
              href.startsWith("/") ? (
                <Link
                  key={label}
                  to={href as any}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5 text-left"
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5 text-left"
                >
                  {label}
                </a>
              )
            )}
            <Link
              to="/login"
              search={{ course: undefined }}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5 text-left"
            >
              Login
            </Link>
            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </p>
            {resourceLinks.map((r) => (
              <Link
                key={r.label}
                to={r.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5 text-left"
              >
                {r.label}
              </Link>
            ))}
            <Link
              to="/assessment"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Start Here <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
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
            <a
              href="#assessment"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]"
            >
              Start Here — Discover Your Calling
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              Explore Courses
            </a>
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
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep"
            >
              Start Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function JourneyTimeline() {
  const steps = [
    { icon: ClipboardCheck, title: "Take Assessment", desc: "Answer a few honest questions." },
    { icon: FileText, title: "Personal Report", desc: "Receive a Spirit-led summary." },
    { icon: GraduationCap, title: "Join Training", desc: "Enter a course that fits your call." },
    { icon: HandHeart, title: "Mentorship", desc: "Walk with a mature guide." },
    { icon: Send, title: "Go Minister", desc: "Step into the harvest, equipped." },
  ];
  return (
    <Section id="journey">
      <div className="text-center">
        <SectionEyebrow>Your Journey With Us</SectionEyebrow>
        <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
          A clear path from <span className="text-gradient italic">wondering</span> to walking it
          out.
        </h2>
      </div>

      <div className="relative mt-20">
        {/* connecting line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-deep/30 via-teal-deep/40 to-primary/30 md:left-1/2 md:hidden" />
        <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-teal-deep/40 to-transparent" />

        <div className="grid gap-8 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative flex items-start gap-5 md:flex-col md:items-center md:text-center"
            >
              <div className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-teal-deep/20 bg-background text-primary shadow-card">
                <s.icon className="h-6 w-6" strokeWidth={1.75} />
                <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full gradient-brand text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 md:mt-4">
                <h3 className="text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
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
      title: "Bible Exposition",
      desc: "A guided exploration of Genesis to Revelation — see the redemptive story as one whole.",
    },
    {
      img: courseTeachingImg,
      tag: "Module Two",
      title: "Foundations of Discipleship",
      desc: "Learn to make disciples the way Jesus did — relationally, patiently, reproducibly.",
    },
    {
      img: mentorshipImg,
      tag: "Module Three",
      title: "Called to Lead",
      desc: "Practical formation for spiritual leadership, character and endurance in ministry.",
    },
    {
      img: callingImg,
      tag: "Module Four",
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
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep hover:text-primary"
        >
          View all courses <ArrowRight className="h-4 w-4" />
        </a>
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
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep"
              >
                Explore Course
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
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
      <Nav />
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
