import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  GraduationCap,
  HeartHandshake,
  Play,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import equipmentImg from "@/assets/pttc-equipment.png";
import mentorshipImg from "@/assets/pttc-mentorship.png";
import communityImg from "@/assets/pttc-community-learning.png";
import callingImg from "@/assets/pttc-purpose-calling.png";

export const Route = createFileRoute("/courses/")({ component: CoursesPage });

const courseImages = [equipmentImg, communityImg, mentorshipImg, callingImg];
const courses = [
  {
    title: "Youth & Teens Leadership Training",
    slug: "youth-teens-leadership",
    category: "Leadership training",
    skills: [
      "Lead age-specific discipleship",
      "Plan meaningful gatherings",
      "Mentor emerging leaders",
    ],
  },
  {
    title: "Couples Ministry Training",
    slug: "couples-ministry",
    category: "Specialised ministry",
    skills: [
      "Apply biblical relationship principles",
      "Guide honest conversations",
      "Support couples with care",
    ],
  },
  {
    title: "Counselling Training",
    slug: "counselling-training",
    category: "Care ministry",
    skills: [
      "Listen with wisdom and empathy",
      "Offer Scripture-rooted guidance",
      "Recognise when to refer",
    ],
  },
  {
    title: "Kingdom Shakers (Knowing Your Call)",
    slug: "kingdom-shakers",
    category: "Calling & spiritual gifts",
    skills: [
      "Identify your calling and gifts",
      "Discern a faithful next step",
      "Build rhythms for spiritual growth",
    ],
  },
  {
    title: "One-to-one Evangelism",
    slug: "one-to-one-evangelism",
    category: "Gospel ministry",
    skills: [
      "Share the Gospel clearly",
      "Respond to real questions",
      "Follow up with new believers",
    ],
  },
  {
    title: "Writing",
    slug: "writing",
    category: "Communication ministry",
    skills: [
      "Shape a clear biblical message",
      "Structure stories and devotionals",
      "Edit for your audience",
    ],
  },
].map((course, index) => ({
  ...course,
  image: courseImages[index % courseImages.length],
  number: index + 1,
}));

const recommendedCourses = [
  {
    course: courses[3],
    reason: "For discovering your calling",
    description:
      "Begin here if you want clarity about your gifts, purpose, and next faithful step.",
  },
  {
    course: courses[0],
    reason: "For developing leaders",
    description: "A practical pathway for those serving young people in churches and communities.",
  },
  {
    course: courses[4],
    reason: "For sharing your faith",
    description: "Grow in confidence as you explain the Gospel and walk with people one to one.",
  },
];

const skillGroups = [
  {
    icon: BookOpen,
    title: "Biblical foundations",
    description:
      "Read, understand, and apply Scripture with greater confidence in everyday ministry.",
  },
  {
    icon: Compass,
    title: "Calling & discernment",
    description:
      "Recognise your spiritual gifts and turn a sense of calling into a clear next step.",
  },
  {
    icon: Users,
    title: "Leadership in practice",
    description: "Plan, communicate, mentor, and serve people with wisdom, courage, and care.",
  },
  {
    icon: HeartHandshake,
    title: "Gospel-centred care",
    description:
      "Listen well, share truth graciously, and support people through real-life questions.",
  },
];

const faqs = [
  {
    question: "How do I access a course?",
    answer:
      'Choose "Watch now" on any course. You will be taken to the separate learner access page, where you can sign in or create an account for the learning platform.',
  },
  {
    question: "How long does each training pathway take?",
    answer:
      "Courses are short-term and usually run for 3 to 6 months. The exact weekly or monthly learning rhythm is confirmed before you begin.",
  },
  {
    question: "Do I need previous ministry experience?",
    answer:
      "No. Some pathways are designed for people beginning to explore their calling, while others support those already serving in leadership or ministry.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Eligible pathways can include a certificate after you complete the required lessons and assessments. The requirements for your chosen course will be shown before enrolment.",
  },
  {
    question: "Are the courses online?",
    answer:
      "Yes. The training is designed for online learning, with weekly or monthly lessons and guidance depending on the course.",
  },
];



function CoursesPage() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return courses.filter((course) =>
      [course.title, course.category, ...course.skills]
        .join(" ")
        .toLowerCase()
        .includes(normalisedQuery),
    );
  }, [query]);

  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const phrases = [
      "Search courses...",
      "Search leadership training...",
      "Search Bible courses...",
      "Search ministry pathways...",
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setPlaceholder(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setPlaceholder(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      timeout = setTimeout(type, typeSpeed);
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav alwaysSolid />
      <main>
        <section className="relative overflow-hidden gradient-hero px-6 py-20 text-white md:py-28">
          <div className="absolute -right-28 top-10 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              
              <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-[1.04] md:text-7xl">
                Train. Be equipped. <em className="text-teal not-italic">Be sent.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                Paul & Timothy Training Centre equips ordinary people for an extraordinary mission:
                faithful, confident witnesses for Christ, prepared through intentional training.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <div className="text-sm font-semibold">A focused season of training</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Our short-term courses run for 3 to 6 months, with weekly and monthly online
                learning. Begin by naming the calling God has placed on your life.
              </p>
              <a
                href="/interaction"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal transition hover:text-white"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="course-catalog" className="scroll-mt-6 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
                  <span className="h-px w-8 bg-teal-deep" /> Training specialisations
                </div>
                <h2 className="text-4xl font-medium leading-tight text-primary md:text-5xl">
                  Training for the work{" "}
                  <em className="text-teal-deep not-italic">God has called you to.</em>
                </h2>
              </div>
              <label className="relative block">
                <span className="sr-only">Search courses</span>
                <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={placeholder}
                  className="h-14 w-full rounded-2xl border border-border bg-card pl-14 pr-12 text-sm text-foreground shadow-card outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-primary"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
            </div>
            <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
              {visible.length} of {courses.length} courses available
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((course, index) => (
                <motion.article
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                  key={course.title}
                  className="group flex overflow-hidden rounded-[1.75rem] bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <Link
                    to="/courses/$slug"
                    params={{ slug: course.slug }}
                    className="flex min-w-0 flex-1 flex-col"
                  >
                    <div className="relative aspect-[16/8] overflow-hidden bg-primary">
                      <img
                        src={course.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      <span className="absolute bottom-4 right-5 font-serif text-3xl text-white/90">
                        {String(course.number).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-7">
                      <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-teal-deep">
                        {course.category}
                      </span>
                      <h3 className="mt-5 text-3xl font-medium leading-tight text-primary">
                        {course.title}
                      </h3>
                      <div className="mt-5 flex gap-4 border-y border-border/60 py-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="h-4 w-4 text-teal-deep" />
                          3–6 months
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4 text-teal-deep" />
                          Online learning
                        </span>
                      </div>
                      <div className="mt-5 text-[11px] font-semibold uppercase tracking-[.16em] text-primary">
                        Skills you will gain
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-foreground/75">
                        {course.skills.map((skill) => (
                          <li key={skill} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-deep" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                      <span
                        className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition group-hover:-translate-y-0.5 group-hover:shadow-card"
                      >
                        <Sparkles className="h-4 w-4" /> Explore course
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            {visible.length === 0 && (
              <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
                <GraduationCap className="mx-auto h-9 w-9 text-teal-deep" />
                <h3 className="mt-4 text-2xl text-primary">No training found yet.</h3>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-4 text-sm font-semibold text-teal-deep underline underline-offset-4"
                >
                  Show all training
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-primary px-6 py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-teal">
                What you will gain
              </div>
              <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
                Training that moves from{" "}
                <em className="text-teal not-italic">understanding to action.</em>
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-white/70">
                Each pathway combines biblical grounding with practical ministry skills you can use
                in your church, family, workplace, and community.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((skill) => (
                <article
                  key={skill.title}
                  className="rounded-3xl border border-white/15 bg-white/7 p-6"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/15 text-teal">
                    <skill.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-medium">{skill.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{skill.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div
              className="relative overflow-hidden rounded-[2rem] bg-cream p-6 shadow-soft sm:p-10"
              aria-label="Paul and Timothy Training Centre certificate preview"
              role="img"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[28px] border-teal/15" />
              <div className="relative border border-primary/15 bg-background px-6 py-12 text-center shadow-card sm:px-12">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-teal">
                  <Award className="h-7 w-7" />
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.3em] text-teal-deep">
                  Paul & Timothy Training Centre
                </p>
                <p className="mt-5 font-serif text-3xl text-primary sm:text-4xl">
                  Certificate of Completion
                </p>
                <div className="mx-auto mt-6 h-px max-w-xs bg-border" />
                <p className="mt-5 text-sm text-muted-foreground">
                  Awarded on completion of an eligible training pathway
                </p>
                <div className="mt-8 flex items-end justify-between gap-4 text-[10px] uppercase tracking-[.16em] text-muted-foreground">
                  <span className="border-t border-border px-4 pt-2">Course leader</span>
                  <span className="border-t border-border px-4 pt-2">Date awarded</span>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
                <span className="h-px w-8 bg-teal-deep" /> Certification
              </div>
              <h2 className="mt-5 text-4xl font-medium leading-tight text-primary md:text-5xl">
                Complete the pathway.{" "}
                <em className="text-teal-deep not-italic">Mark the milestone.</em>
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                Eligible courses can lead to a certificate after the required lessons and
                assessments are complete. You will see the exact completion requirements before
                enrolment, so you know what you are working toward.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-foreground/80">
                {[
                  "A clear record of your completed training",
                  "A meaningful milestone for your ministry journey",
                  "Course-specific requirements shared before you begin",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a
                href="/login"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Start an eligible course <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="recommended" className="scroll-mt-6 bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
                  <span className="h-px w-8 bg-teal-deep" /> Recommended courses
                </div>
                <h2 className="mt-5 text-4xl font-medium leading-tight text-primary md:text-5xl">
                  Not sure where to begin?{" "}
                  <em className="text-teal-deep not-italic">Start with your next need.</em>
                </h2>
              </div>
              <p className="max-w-xl leading-relaxed text-muted-foreground lg:ml-auto">
                Choose the pathway closest to the season you are in now. You can build from there as
                your calling and responsibilities grow.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {recommendedCourses.map(({ course, reason, description }, index) => (
                <Link
                  key={course.title}
                  to="/courses/$slug"
                  params={{ slug: course.slug }}
                  className="group rounded-3xl bg-card p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[.16em] text-teal-deep">
                      {reason}
                    </span>
                    <span className="font-serif text-3xl text-primary/25">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-medium leading-tight text-primary">
                    {course.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:text-teal-deep">
                    Explore course <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
                <span className="h-px w-8 bg-teal-deep" /> Our purpose
              </div>
              <h2 className="mt-5 text-4xl font-medium leading-tight text-primary md:text-5xl">
                Raised to share the Gospel.{" "}
                <em className="text-teal-deep not-italic">Equipped to fulfil your call.</em>
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                "And the things you have heard me say in the presence of many witnesses entrust to
                reliable people who will also be qualified to teach others."{" "}
                <span className="font-semibold text-primary">2 Timothy 2:2</span>
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { image: mentorshipImg, label: "Mentorship" },
                { image: equipmentImg, label: "Equipment" },
                { image: communityImg, label: "Community learning" },
                { image: callingImg, label: "Purpose & calling" },
              ].map((item) => (
                <figure
                  key={item.label}
                  className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-primary"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent px-5 pb-5 pt-12 text-lg font-medium text-white">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary px-6 py-20 text-white md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-teal">
                Frequently asked questions
              </div>
              <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
                What to know <em className="text-teal not-italic">before you begin.</em>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/65">
                Find quick answers about course access, timing, experience, and certification.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-white/15 bg-white/7"
                  open={index === 0}
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left text-lg font-medium marker:content-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-teal transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-white/65">{faq.answer}</p>
                </details>
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
