import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
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
import { MentorCTA } from "@/components/MentorCTA";

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
              <AnimatedLetterLine text="Anyone can do" delay={0.05} stagger={0.03} />
            </div>
            <div className="mt-2 block">
              <AnimatedLetterLine text="ministry." delay={0.5} stagger={0.03} />
            </div>
            <div className="mt-6 block text-2xl font-normal text-white/90 md:text-3xl lg:text-4xl">
              <div className="block">
                <AnimatedLetterLine text="Discover your calling" delay={0.8} stagger={0.03} />
              </div>
              <div className="mt-2 block">
                <AnimatedLetterLine text="Get trained" delay={1.6} stagger={0.03} />
              </div>
              <div className="mt-2 block italic text-[oklch(0.85_0.12_180)]">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4, duration: 0.25, ease: [0.2, 0.8, 0.2, 1] as const }}
                >
                  <AnimatedLetterLine text="Serve with confidence" delay={2.55} stagger={0.08} accent />
                </motion.span>
              </div>
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
  containerClassName = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 ${className}`}>
      <div className={`mx-auto ${containerClassName || "max-w-7xl"}`}>{children}</div>
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
      icon: Users,
      title: "Who should I serve?",
      desc: "Discover the people and the places you've been designed to carry the Gospel to.",
    },
    {
      icon: Heart,
      title: "What is my call?",
      desc: "Move from a general sense of purpose to a specific next step you can actually take this year.",
    },
    {
      icon: Compass,
      title: "What is my role?",
      desc: "Find out which gifts God has placed in you, and how they shape the way you're meant to serve.",
    },
  ];
  return (
    <Section id="assessment" className="bg-cream pt-4">
      <div className="relative z-10 -mt-40 grid gap-6 md:grid-cols-3">
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

function JourneyTimeline() {
  const steps = [
    {
      title: "Take the assessment",
      desc: "Answer a few honest questions. It takes minutes.",
      icon: ClipboardCheck,
      bgClass: "bg-primary",
      textClass: "text-gold",
    },
    {
      title: "Receive your report",
      desc: "Get a clear summary of your gifting, your calling and where they meet.",
      icon: FileText,
      bgClass: "bg-teal",
      textClass: "text-teal",
    },
    {
      title: "Join a course",
      desc: "Short-term, focused training built around what you've been called to.",
      icon: GraduationCap,
      bgClass: "bg-gold",
      textClass: "text-gold",
    },
    {
      title: "Meet your mentor",
      desc: "Draw wisdom from those who have triumphantly walked the path before you.",
      icon: HandHeart,
      bgClass: "bg-teal",
      textClass: "text-teal",
    },
    {
      title: "Go and serve",
      desc: "Step into the harvest: trained, supported and sent.",
      icon: Send,
      bgClass: "bg-primary",
      textClass: "text-gold",
    },
  ];

  return (
    <Section
      id="journey"
      className="relative overflow-hidden bg-gradient-to-b from-background via-cream/70 to-background"
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-plum/10 blur-3xl" />

      <div className="relative text-center">
        <SectionEyebrow>Your Journey With Us</SectionEyebrow>
        <h2 className="mx-auto max-w-3xl text-2xl font-medium leading-[1.15] text-primary md:text-3xl">
          From wondering<br/>
          <span className="block my-2 text-5xl md:text-6xl md:leading-[1.1]">“how and where”</span>
          to walking with purpose and clarity.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          We will guide you step by step from discovery to confidence in your purpose and calling.
        </p>
      </div>

      <div className="relative mx-auto mt-20 max-w-6xl md:mt-28">
        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative pb-10">
          <div className="flex justify-between items-start">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <div key={index} className="relative flex flex-col items-center flex-1">
                  {/* Traveling Arrow to next step */}
                  {!isLast && (
                    <div className="absolute top-[55px] left-[calc(50%+56px)] w-[calc(100%-112px)] flex items-center z-0">
                      <motion.div 
                        className="flex items-center w-full overflow-visible"
                        initial={{ width: "0%", opacity: 0 }}
                        whileInView={{ width: "100%", opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.35 + 0.2, duration: 0.5, ease: "easeInOut" }}
                      >
                        <div className="h-[2px] flex-grow bg-gold/60" />
                        <ChevronRight className="h-5 w-5 text-gold/90 -ml-2 flex-shrink-0" />
                      </motion.div>
                    </div>
                  )}

                  {/* Icon Circle */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
                    className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-background border-4 border-background ring-[3px] ring-gold/15 shadow-sm"
                  >
                    <div className={`flex h-[84px] w-[84px] items-center justify-center rounded-full text-white shadow-inner ${step.bgClass}`}>
                       <step.icon className="h-9 w-9" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  {/* Content Below */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    className="mt-8 flex flex-col items-center text-center px-4"
                  >
                    <div className={`text-[15px] font-bold tracking-widest ${step.textClass}`}>
                      0{index + 1}
                    </div>
                    <div className="my-3 h-[2px] w-5 bg-gold/30" />
                    <h3 className="mb-2.5 font-serif text-xl font-bold text-primary leading-tight">
                      {step.title.split(" ").slice(0, -1).join(" ")}
                      <br />
                      {step.title.split(" ").slice(-1)}
                    </h3>
                    <p className="text-[15px] text-muted-foreground/90 leading-relaxed max-w-[200px]">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden relative py-12 px-4 max-w-2xl mx-auto">
          {/* Vertical central line */}
          <div className="absolute left-[47px] sm:left-1/2 top-12 bottom-12 w-[2px] bg-gold/30 sm:-translate-x-1/2" />
          
          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center">
                  {/* Icon Circle */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
                    className="absolute left-[48px] sm:left-1/2 top-0 z-10 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full bg-background border-[5px] border-background ring-[3px] ring-gold/15 shadow-sm"
                  >
                    <div className={`flex h-[72px] w-[72px] items-center justify-center rounded-full text-white shadow-inner ${step.bgClass}`}>
                       <step.icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  {/* Card Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                    className={`flex-1 sm:flex-none sm:w-1/2 ${isEven ? 'sm:text-right sm:pr-[5.5rem]' : 'sm:text-left sm:pl-[5.5rem] sm:ml-auto'} ml-[110px] sm:ml-0 pt-2`}
                  >
                    <div className={`text-[15px] font-bold tracking-widest ${step.textClass}`}>
                      0{index + 1}
                    </div>
                    <div className={`my-3 h-[2px] w-5 bg-gold/30 ${isEven ? 'sm:ml-auto' : ''} ${!isEven ? 'sm:mr-auto' : ''}`} />
                    <h3 className="mb-2 font-serif text-xl font-bold text-primary leading-tight">
                      {step.title.split(" ").slice(0, -1).join(" ")}
                      <br />
                      {step.title.split(" ").slice(-1)}
                    </h3>
                    <p className="text-[15px] text-muted-foreground/90 leading-relaxed max-w-[220px] inline-block">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Audience() {
  const items = [
    {
      title: "I'm still figuring it out.",
      desc: "You want to serve God, but you're not sure what you're made for. Start with the assessment and a personal report.",
      cta: "Take the Assessment",
      img: callingImg,
      link: "/assessment",
    },
    {
      title: "I know my call, but where do I start?",
      desc: "You've sensed it for a while now. A short course gives you the foundation, and a first step you can actually take.",
      cta: "Explore Courses",
      img: mentorshipImg,
      link: "/courses",
    },
    {
      title: "I'm already serving, and want to grow.",
      desc: "Sharpen your spiritual foundation, kingdom values and develop practical skills for your specific calling.",
      cta: "Explore Advance courses",
      img: communityImg,
      link: "/courses?level=Advance#course-catalog",
    },
    {
      title: "Help my team grow.",
      desc: "Train your leaders together. For churches, ministries and teams who need to be equipped and trained.",
      cta: "Explore Courses",
      img: courseTeachingImg,
      link: "/courses",
    },
  ];
  return (
    <Section id="who" className="bg-gradient-to-b from-background to-cream">
      <div className="max-w-2xl">
        <SectionEyebrow>Who Is This For?</SectionEyebrow>
        <h2 className="text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
          Identify the right fit that suits your current situation
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
              <Link
                to={it.link}
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-primary"
              >
                {it.cta}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
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
    <Section id="mission" className="relative overflow-hidden gradient-hero text-white" containerClassName="max-w-[90rem]">
      <div className="absolute inset-0 opacity-20">
        <img src={communityImg} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
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
          <h2 className="text-4xl font-medium leading-[1.05] md:text-5xl">
            "The harvest is plentiful, but the workers are few…" <span className="text-2xl text-white/60 whitespace-nowrap">Luke 10:2</span>
            <br />
            <span className="mt-4 block text-3xl italic text-[oklch(0.85_0.12_180)]">
              … and only a handful have ever been trained.
            </span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-6"
        >
          <div className="space-y-4 text-lg leading-relaxed text-white/75">
            <p>
              Bible colleges provide solid theology education but require three years, leaving out practical ministry training. Most believers want to serve but can't commit that much time. This leads to the misconception that only full-time ministers can do ministry, while the Great Commission to share the Gospel applies to all believers.
            </p>
            <p>
              Paul & Timothy Training Centre closes this gap with short, intentional training designed for ordinary believers with a heart to serve.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              {
                value: 15,
                label: "Years of ground experience",
                format: (n: number) => `${n}+`,
              },
              { value: 2017, label: "Training believers", format: (n: number) => `Since ${n}` },
              { value: 2439, label: "Participants trained", format: (n: number) => `${n}` },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="text-3xl font-medium text-[oklch(0.85_0.12_180)] md:text-4xl">
                  <Counter target={stat.value} format={stat.format} duration={stat.value === 2017 ? 1500 : stat.value === 2439 ? 2500 : 900} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-white/60 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 text-sm text-white/80">
            <p>
              <strong className="text-white">Training programs:</strong>{" "}
              <motion.strong
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: [1.15, 1] }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 260, damping: 14 }}
                className="inline-block text-[oklch(0.85_0.12_180)]"
              >
                9 Online & 4 In-person Training
              </motion.strong>
            </p>
            <p>
              <strong className="text-white">Places Covered:</strong> Various parts of Tamil Nadu, Maharashtra, Karnataka, Pune, Gujarat, Singapore & UK
            </p>
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
      desc: "Ten hours. Ten days. A daily practice that moves you from knowing about Scripture to knowing God's will and your calling within it.",
    },
    {
      img: callingImg,
      tag: "Module Two",
      slug: "kingdom-shakers",
      title: "Kingdom Shakers (Knowing Your Call)",
      desc: "Identify your calling and your gifts, discern a faithful next step, and build the spiritual rhythms to sustain it.",
    },
  ];
  return (
    <Section id="courses" className="pb-12 md:pb-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow>Explore Courses</SectionEyebrow>
          <h2 className="text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            Get Equipped… <br /> … Without Pressing “Pause” on Life.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            All Paul & Timothy Training Centre courses are built for people with lives, jobs and families already in motion.
          </p>
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

function TestimonialVideo({
  videoId,
  name,
  role,
  index,
}: {
  videoId: string;
  name: string;
  role: string;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="hover-lift group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card"
    >
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`Testimonial from ${name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={`Testimonial from ${name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play testimonial from ${name}`}
              className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full glass text-primary transition-transform hover:scale-110"
            >
              <Play className="h-6 w-6 fill-current" />
            </button>
          </>
        )}
      </div>
      <figcaption className="p-6">
        <div className="font-semibold text-primary">{name}</div>
        <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{role}</div>
      </figcaption>
    </motion.figure>
  );
}

function Testimonials() {
  const videos = [
    { id: "K_K6RJXPcb4", name: "Sis. Sezia", role: "Founder, World Revival Seeds" },
    { id: "wgdw9JGcoyc", name: "Richard", role: "Network Administrator" },
    { id: "HTctnx-ONPg", name: "Beniel Phinehas", role: "Student, MBBS" },
    { id: "ODgcXT-bvrk", name: "Sis. Helena", role: "PTTC Participant" },
  ];
  return (
    <Section id="stories" className="bg-cream pt-12 md:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow>How We've Helped</SectionEyebrow>
          <h2 className="text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            Our Stories: How PTTC has <br /> equipped believers like you
          </h2>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {videos.map((v, i) => (
          <TestimonialVideo key={v.id} videoId={v.id} name={v.name} role={v.role} index={i} />
        ))}
      </div>
    </Section>
  );
}


function Home() {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
}
