import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Compass,
  Facebook,
  HandHeart,
  Heart,
  Instagram,
  MapPin,
  Play,
  Plus,
  Quote,
  Search,
  Sparkles,
  Star,
  Ticket,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Counter } from "@/components/Counter";
import { events, featuredEvent, timeline } from "@/data/events";
import eventsHero from "@/assets/events-hero.jpg";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import communityImg from "@/assets/community.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";
import callingImg from "@/assets/calling.jpg";
import courseBibleImg from "@/assets/course-bible.jpg";
import courseTeachingImg from "@/assets/course-teaching.jpg";
import prayerImg from "@/assets/event-prayer.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Paul & Timothy Training Centre" },
      {
        name: "description",
        content:
          "Conferences, workshops, retreats and prayer gatherings that equip believers to discover and fulfil God's calling.",
      },
      { property: "og:title", content: "Events — Paul & Timothy Training Centre" },
      {
        property: "og:description",
        content:
          "Discover upcoming ministry events, register for conferences and workshops, and grow together in calling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-deep shadow-card">
      <Sparkles className="h-3.5 w-3.5 text-gold" />
      {children}
    </span>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden gradient-hero">
      <div className="absolute inset-0">
        <img
          src={eventsHero}
          alt="Believers worshipping together at a ministry conference"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.1_310)]/70 via-transparent to-[oklch(0.15_0.1_310)]" />
      </div>

      {/* floating decorative shapes */}
      <motion.div
        animate={{ y: [0, -22, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[22%] h-28 w-28 rounded-full bg-[oklch(0.78_0.13_180)]/25 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 26, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[12%] top-[30%] h-40 w-40 rounded-full bg-[oklch(0.78_0.14_85)]/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[18%] left-[45%] h-20 w-20 rounded-3xl border border-white/15 backdrop-blur-sm"
      />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-32 pb-24 text-white">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <CalendarDays className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Events · 2026 Season
          </span>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-bold leading-[1.08] md:text-6xl lg:text-7xl">
            Grow Together. Be Equipped. Impact the World.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Join conferences, workshops, leadership training, prayer gatherings, and ministry events
            designed to help you discover and fulfil God's calling.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#upcoming"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              View Upcoming Events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Host an Event
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */

const stats = [
  { value: 150, format: (v: number) => `${v}+`, label: "Events Conducted" },
  { value: 4500, format: (v: number) => `${v.toLocaleString()}+`, label: "Participants Equipped" },
  { value: 30, format: (v: number) => `${v}+`, label: "Partner Churches" },
  { value: 12, format: (v: number) => `${v}`, label: "Countries Reached" },
];

function Stats() {
  return (
    <Section className="bg-cream">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="hover-lift rounded-4xl border border-border/60 bg-card p-8 text-center shadow-card"
          >
            <div className="font-serif text-4xl font-bold text-gradient md:text-5xl">
              <Counter target={s.value} format={s.format} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Countdown + Featured ---------------- */

function useCountdown(target: string) {
  const [left, setLeft] = useState<number>(0);
  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => setLeft(Math.max(end - Date.now(), 0));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Featured() {
  const c = useCountdown(featuredEvent.startsAt);
  const units = [
    { label: "Days", value: c.days },
    { label: "Hours", value: c.hours },
    { label: "Mins", value: c.minutes },
    { label: "Secs", value: c.seconds },
  ];

  return (
    <Section id="featured">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>Featured Event</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          The next gathering you don't want to miss
        </h2>
      </motion.div>

      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mt-12 grid overflow-hidden rounded-4xl border border-border/60 bg-card shadow-soft lg:grid-cols-2"
      >
        <div className="group relative min-h-[280px] overflow-hidden">
          <img
            src={featuredEvent.image}
            alt={featuredEvent.title}
            loading="lazy"
            width={1280}
            height={853}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-primary">
            {featuredEvent.seats} seats remaining
          </span>
        </div>

        <div className="p-8 md:p-10">
          <div className="flex flex-wrap gap-2">
            {featuredEvent.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="mt-5 font-serif text-2xl font-bold text-primary md:text-3xl">
            {featuredEvent.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {featuredEvent.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { Icon: CalendarDays, text: featuredEvent.date },
              { Icon: Clock, text: featuredEvent.time },
              { Icon: MapPin, text: featuredEvent.venue },
              { Icon: Ticket, text: featuredEvent.deadline },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-sm text-primary/80">
                <Icon className="h-4 w-4 shrink-0 text-teal-deep" />
                {text}
              </div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-4 gap-2">
            {units.map((u) => (
              <div
                key={u.label}
                className="rounded-2xl gradient-brand px-2 py-3 text-center text-primary-foreground"
              >
                <div className="font-serif text-xl font-bold tabular-nums md:text-2xl">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-80">{u.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#upcoming"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              Register Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#upcoming"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
            >
              View Details
            </a>
          </div>
        </div>
      </motion.article>
    </Section>
  );
}

/* ---------------- Filters + Grid ---------------- */

const filters = [
  "All Events",
  "Conference",
  "Workshop",
  "Retreat",
  "Prayer",
  "Youth",
  "Leadership",
  "Online",
  "Offline",
  "Upcoming",
  "Past",
];

const months = ["All Months", "March", "May", "September", "October", "November", "December"];

function EventsGrid() {
  const [filter, setFilter] = useState("All Events");
  const [month, setMonth] = useState("All Months");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    return events.filter((e) => {
      const matchesMonth = month === "All Months" || e.month === month;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.speakers.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      const matchesFilter =
        filter === "All Events" ||
        e.tags.includes(filter) ||
        e.format === filter ||
        e.when === filter ||
        e.category.includes(filter);
      return matchesMonth && matchesQuery && matchesFilter;
    });
  }, [filter, month, query]);

  return (
    <Section id="upcoming" className="bg-cream">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>Upcoming Events</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Find the gathering that fits your season
        </h2>
      </motion.div>

      <div className="sticky top-20 z-30 mt-10 rounded-4xl glass p-4 shadow-card md:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, speakers, cities…"
              aria-label="Search events"
              className="w-full bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            aria-label="Filter by month"
            className="rounded-full border border-border/70 bg-card px-4 py-2.5 text-sm text-primary focus:outline-none"
          >
            {months.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "border border-border/70 bg-card text-primary/70 hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => (
          <motion.article
            layout
            key={e.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
            className="hover-lift group flex flex-col overflow-hidden rounded-4xl border border-border/60 bg-card shadow-card"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={e.image}
                alt={e.title}
                loading="lazy"
                width={1280}
                height={853}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur">
                {e.category}
              </span>
              {e.when === "Past" && (
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary">
                  Past
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>

              <div className="mt-4 space-y-2 text-xs text-primary/75">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-teal-deep" /> {e.date} · {e.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-teal-deep" /> {e.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-teal-deep" /> {e.speakers}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-teal-deep" /> {e.duration}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-2">
                <a
                  href="#featured"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-accent"
                >
                  Learn More
                </a>
                <a
                  href="#newsletter"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Register <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {list.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          No events match those filters yet — try another category or month.
        </p>
      )}
    </Section>
  );
}

/* ---------------- Timeline ---------------- */

function Timeline() {
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>Season Timeline</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          What's ahead, month by month
        </h2>
      </motion.div>

      <div className="relative mx-auto mt-14 max-w-3xl">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-teal-deep via-primary to-gold md:left-1/2"
        />
        {timeline.map((t, i) => (
          <motion.div
            key={t.month}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className={`relative mb-10 pl-16 md:w-1/2 md:pl-0 ${
              i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
            }`}
          >
            <span
              className={`absolute left-6 top-6 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full gradient-brand ring-4 ring-background md:left-auto ${
                i % 2 === 0 ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
              }`}
            />
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                {t.month}
              </span>
              <h3 className="mt-1.5 font-serif text-lg font-semibold text-primary">{t.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Why attend ---------------- */

const reasons = [
  { Icon: Users, title: "Learn from experienced mentors", desc: "Sit under leaders who have walked the road and are eager to hand it on." },
  { Icon: Heart, title: "Connect with like-minded believers", desc: "Fellowship that outlasts the weekend — friendships forged in shared purpose." },
  { Icon: HandHeart, title: "Grow in ministry and leadership", desc: "Practical, tested training you can apply in your church the very next Sunday." },
  { Icon: Compass, title: "Discover your God-given calling", desc: "Space to listen, discern and name the people group you are sent to." },
];

function WhyAttend() {
  return (
    <Section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[oklch(0.78_0.13_180)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[oklch(0.78_0.14_85)]/20 blur-3xl" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="relative text-center"
      >
        <Eyebrow>Why Attend?</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          More than a meeting — a turning point
        </h2>
      </motion.div>

      <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="hover-lift rounded-4xl glass p-8 shadow-card"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-primary-foreground">
              <r.Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-lg font-semibold text-primary">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Speakers ---------------- */

const speakers = [
  {
    name: "Pastor Daniel Okoye",
    role: "Lead Trainer",
    org: "Grace Chapel, Nairobi",
    bio: "Three decades of shepherding pastors and planting churches across East Africa.",
    image: speaker1,
  },
  {
    name: "Rev. Grace Mwangi",
    role: "Director of Discipleship",
    org: "Paul & Timothy Training Centre",
    bio: "Teacher and author helping women and couples build homes rooted in Scripture.",
    image: speaker2,
  },
  {
    name: "Pastor Samuel Lim",
    role: "Youth & Missions Pastor",
    org: "Hope Chapel, Kampala",
    bio: "Mobilises young adults into local mission and Spirit-led everyday discipleship.",
    image: speaker3,
  },
];

function Speakers() {
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>Guest Speakers</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Voices you'll hear this season
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {speakers.map((s, i) => (
          <motion.article
            key={s.name}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="hover-lift group overflow-hidden rounded-4xl border border-border/60 bg-card shadow-card"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={768}
                height={768}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{s.name}</h3>
              <p className="text-sm font-medium text-teal-deep">{s.role}</p>
              <p className="text-xs text-muted-foreground">{s.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  {[Instagram, Twitter, Facebook].map((Icon, k) => (
                    <a
                      key={k}
                      href="#"
                      aria-label={`${s.name} social profile`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-border text-primary/70 transition-colors hover:bg-accent"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
                <a
                  href="#featured"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform hover:translate-x-0.5"
                >
                  View Profile <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Registration stepper ---------------- */

const steps = [
  { n: "1", title: "Choose Event", desc: "Browse the season and pick your fit." },
  { n: "2", title: "Register Online", desc: "A short form — under two minutes." },
  { n: "3", title: "Receive Confirmation", desc: "Details and prep notes by email." },
  { n: "4", title: "Attend & Grow", desc: "Come expectant. Leave equipped." },
];

function Stepper() {
  return (
    <Section className="bg-cream">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>Registration Process</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Four simple steps
        </h2>
      </motion.div>

      <div className="relative mt-14">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-to-r from-teal-deep via-primary to-gold lg:block"
        />
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full gradient-brand font-serif text-xl font-bold text-primary-foreground ring-8 ring-cream">
                {s.n}
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Gallery ---------------- */

const gallery = [
  { src: communityImg, alt: "Small group Bible study", tall: false },
  { src: mentorshipImg, alt: "Mentor and mentee", tall: true },
  { src: prayerImg, alt: "Prayer gathering", tall: false },
  { src: courseTeachingImg, alt: "Teaching session", tall: true },
  { src: callingImg, alt: "Sunrise on the mountain", tall: false },
  { src: courseBibleImg, alt: "Bible and coffee", tall: false },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>Past Events</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Moments from the road so far
        </h2>
      </motion.div>

      <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {gallery.map((g, i) => (
          <motion.button
            key={g.alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            onClick={() => setActive(i)}
            className="group block w-full overflow-hidden rounded-3xl shadow-card"
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                g.tall ? "h-80" : "h-56"
              }`}
            />
          </motion.button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href="#featured"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <Play className="h-4 w-4" /> Watch Highlights
        </a>
        <button
          onClick={() => setActive(0)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent"
        >
          View Gallery
        </button>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-primary/90 p-6 backdrop-blur-sm animate-fade-in"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close gallery"
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={gallery[active].src}
            alt={gallery[active].alt}
            className="max-h-[80vh] w-auto rounded-3xl object-contain shadow-soft"
          />
        </div>
      )}
    </Section>
  );
}

/* ---------------- Testimonials ---------------- */

const testimonials = [
  {
    quote:
      "I came looking for a conference and left with a calling. The mentors prayed with me until it was clear.",
    name: "Esther N.",
    church: "Grace Chapel, Nairobi",
    image: speaker2,
  },
  {
    quote:
      "The leadership workshop reshaped how I pastor. Practical, gracious and deeply rooted in Scripture.",
    name: "Michael A.",
    church: "Hope Chapel, Kampala",
    image: speaker1,
  },
  {
    quote:
      "Our youth came back different. They're leading small groups now — that's the fruit we prayed for.",
    name: "Joseph K.",
    church: "City Life Church",
    image: speaker3,
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <Section className="bg-cream">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>Testimonials</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          What attendees carry home
        </h2>
      </motion.div>

      <motion.div
        key={i}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto mt-12 max-w-3xl rounded-4xl border border-border/60 bg-card p-8 text-center shadow-card md:p-12"
      >
        <Quote className="mx-auto h-8 w-8 text-teal-deep" />
        <p className="mt-6 font-serif text-xl leading-relaxed text-primary md:text-2xl">
          “{t.quote}”
        </p>
        <div className="mt-6 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <img
            src={t.image}
            alt={t.name}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="text-left">
            <div className="text-sm font-semibold text-primary">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.church}</div>
          </div>
        </div>
        <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-accent">
          <Play className="h-3.5 w-3.5" /> Watch video testimony
        </button>
      </motion.div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Testimonial ${k + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              k === i ? "w-8 bg-primary" : "w-2 bg-primary/25"
            }`}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */

const faqs = [
  { q: "Who can attend?", a: "Anyone — members, leaders, seekers and friends. Most events have no prerequisites." },
  { q: "Are events free?", a: "Prayer gatherings and online sessions are free. Conferences and retreats carry a modest fee, and support is available." },
  { q: "Can I bring friends?", a: "Please do. Group registrations of five or more receive a discount — just note it on the form." },
  { q: "Will food be provided?", a: "Full-day events include lunch and refreshments. Dietary needs can be flagged during registration." },
  { q: "How do I register?", a: "Pick an event, click Register, complete the short form and watch for a confirmation email." },
  { q: "Can churches host events?", a: "Yes — we regularly partner with local churches. Reach out and we'll plan the season together." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-center"
      >
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Questions before you come
        </h2>
      </motion.div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
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
      </div>
    </Section>
  );
}

/* ---------------- Newsletter + Final CTA ---------------- */

function Newsletter() {
  return (
    <Section id="newsletter" className="bg-cream">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="rounded-4xl border border-border/60 bg-card p-10 text-center shadow-soft md:p-16"
      >
        <Eyebrow>Stay Connected</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Never Miss an Event
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Receive updates about conferences, workshops, leadership training, and ministry
          opportunities.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            aria-label="Email address"
            className="flex-1 rounded-full border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="relative overflow-hidden rounded-4xl gradient-hero px-8 py-16 text-center text-white md:px-16 md:py-20"
      >
        <img
          src={callingImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="relative">
          <h2 className="font-serif text-3xl font-bold md:text-5xl">
            Ready to Grow in Your Calling?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            Join believers from around the world as we learn, serve, and build God's Kingdom
            together.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#upcoming"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              Browse Events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Talk to a Mentor
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Stats />
        <Featured />
        <EventsGrid />
        <Timeline />
        <WhyAttend />
        <Speakers />
        <Stepper />
        <Gallery />
        <Testimonials />
        <Faq />
        <Newsletter />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}