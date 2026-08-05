import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Play,
  Plus,
  Quote,
  Search,
  Sparkles,
  Star,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { events } from "@/data/events";
import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import communityImg from "@/assets/community.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";
import callingImg from "@/assets/calling.jpg";
import courseBibleImg from "@/assets/course-bible.jpg";
import courseTeachingImg from "@/assets/course-teaching.jpg";
import prayerImg from "@/assets/event-prayer.jpg";
import eventsHero from "@/assets/events-hero.jpg";

export const Route = createFileRoute("/events/previous")({
  head: () => ({
    meta: [
      { title: "Previous Events — Paul & Timothy Training Centre" },
      {
        name: "description",
        content:
          "Look back at past conferences, workshops and ministry gatherings that equipped believers across East Africa.",
      },
    ],
  }),
  component: PreviousEventsPage,
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
    <section className="relative min-h-[60vh] overflow-hidden gradient-hero">
      <div className="absolute inset-0">
        <img
          src={eventsHero}
          alt="Believers gathered at a past ministry conference"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.1_310)]/70 via-transparent to-[oklch(0.15_0.1_310)]" />
      </div>
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-[oklch(0.78_0.13_180)]/20 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[35%] h-44 w-44 rounded-full bg-[oklch(0.78_0.14_85)]/15 blur-3xl"
      />
      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-6 pt-32 pb-16 text-white">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <CalendarDays className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Previous Events · Archive
          </span>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl font-bold leading-[1.08] md:text-6xl">
            Moments from the Road So Far
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            A record of conferences, workshops and ministry gatherings that have shaped believers
            across East Africa and beyond.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#past-grid"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              Browse Past Events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/events/upcoming"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              View Upcoming Events
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Past Events Grid ---------------- */

const filterOptions = ["All", "Conference", "Workshop", "Leadership", "Discipleship", "Online", "Offline"];
const monthOptions = ["All Months", "March", "May"];

function PastGrid() {
  const [filter, setFilter] = useState("All");
  const [month, setMonth] = useState("All Months");
  const [query, setQuery] = useState("");

  const pastEvents = events.filter((e) => e.when === "Past");

  const list = useMemo(() => {
    return pastEvents.filter((e) => {
      const matchesMonth = month === "All Months" || e.month === month;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.speakers.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      const matchesFilter =
        filter === "All" ||
        e.tags.includes(filter) ||
        e.format === filter ||
        e.category.includes(filter);
      return matchesMonth && matchesQuery && matchesFilter;
    });
  }, [filter, month, query, pastEvents]);

  return (
    <Section id="past-grid" className="bg-cream">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
        <Eyebrow>Previous Events</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Every gathering leaves a legacy
        </h2>
      </motion.div>

      <div className="sticky top-20 z-30 mt-10 rounded-4xl glass p-4 shadow-card md:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search past events, speakers, cities…"
              aria-label="Search past events"
              className="w-full bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            aria-label="Filter by month"
            className="rounded-full border border-border/70 bg-card px-4 py-2.5 text-sm text-primary focus:outline-none"
          >
            {monthOptions.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {filterOptions.map((f) => (
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
              <img src={e.image} alt={e.title} loading="lazy" width={1280} height={853}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur">
                {e.category}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary">
                Past
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              <div className="mt-4 space-y-2 text-xs text-primary/75">
                <div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-teal-deep" /> {e.date} · {e.time}</div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-teal-deep" /> {e.location}</div>
                <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-teal-deep" /> {e.speakers}</div>
                <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-teal-deep" /> {e.duration}</div>
              </div>
              <div className="mt-6 pt-2">
                <a href="#gallery" className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-accent">
                  View Highlights
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {list.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          No past events match those filters.
        </p>
      )}
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
    <Section id="gallery">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
        <Eyebrow>Photo Gallery</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Captured moments from past gatherings
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
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${g.tall ? "h-80" : "h-56"}`}
            />
          </motion.button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setActive(0)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <Play className="h-4 w-4" /> Watch Highlights
        </button>
        <button
          onClick={() => setActive(0)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent"
        >
          View Full Gallery
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
    quote: "I came looking for a conference and left with a calling. The mentors prayed with me until it was clear.",
    name: "Esther N.",
    church: "Grace Chapel, Nairobi",
    image: speaker2,
  },
  {
    quote: "The leadership workshop reshaped how I pastor. Practical, gracious and deeply rooted in Scripture.",
    name: "Michael A.",
    church: "Hope Chapel, Kampala",
    image: speaker1,
  },
  {
    quote: "Our youth came back different. They're leading small groups now — that's the fruit we prayed for.",
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
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
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
        <p className="mt-6 font-serif text-xl leading-relaxed text-primary md:text-2xl">"{t.quote}"</p>
        <div className="mt-6 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-gold text-gold" />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <img src={t.image} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
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
            className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-primary" : "w-2 bg-primary/25"}`}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Speakers ---------------- */

const speakers = [
  { name: "Pastor Daniel Okoye", role: "Lead Trainer", org: "Grace Chapel, Nairobi", bio: "Three decades of shepherding pastors and planting churches across East Africa.", image: speaker1 },
  { name: "Rev. Grace Mwangi", role: "Director of Discipleship", org: "Paul & Timothy Training Centre", bio: "Teacher and author helping women and couples build homes rooted in Scripture.", image: speaker2 },
  { name: "Pastor Samuel Lim", role: "Youth & Missions Pastor", org: "Hope Chapel, Kampala", bio: "Mobilises young adults into local mission and Spirit-led everyday discipleship.", image: speaker3 },
];

function PastSpeakers() {
  return (
    <Section>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
        <Eyebrow>Past Speakers</Eyebrow>
        <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
          Voices that shaped our gatherings
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
              <img src={s.image} alt={s.name} loading="lazy" width={768} height={768}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">{s.name}</h3>
              <p className="text-sm font-medium text-teal-deep">{s.role}</p>
              <p className="text-xs text-muted-foreground">{s.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
              <div className="mt-5 flex gap-2">
                {[Instagram, Twitter, Facebook].map((Icon, k) => (
                  <a key={k} href="#" aria-label={`${s.name} social profile`}
                    className="grid h-8 w-8 place-items-center rounded-full border border-border text-primary/70 transition-colors hover:bg-accent"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.article>
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
    <Section className="bg-cream">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
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
              <span className="font-serif text-base font-semibold text-primary md:text-lg">{f.q}</span>
              <Plus className={`h-5 w-5 shrink-0 text-teal-deep transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
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

/* ---------------- Final CTA ---------------- */

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
        <img src={callingImg} alt="" aria-hidden="true" loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="relative">
          <h2 className="font-serif text-3xl font-bold md:text-5xl">Ready for What's Next?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            The best gathering is the one still ahead. See what's coming up and reserve your place.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/events/upcoming"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              See Upcoming Events <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
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

/* ---------------- Page ---------------- */

function PreviousEventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav alwaysSolid={false} />
      <main>
        <Hero />
        <PastGrid />
        <Gallery />
        <Testimonials />
        <PastSpeakers />
        <Faq />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
