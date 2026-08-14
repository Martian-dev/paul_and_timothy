import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { timeline } from "@/data/events";

import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";
import eventsHero from "@/assets/events-hero.jpg";

export const Route = createFileRoute("/events/upcoming")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — Paul & Timothy Training Centre" },
      { name: "description", content: "Browse upcoming conferences, workshops, retreats and prayer gatherings." },
    ],
  }),
  component: UpcomingEventsPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function PosterSection() {
  return (
    <section className="px-6 pt-32 pb-16 md:pt-40 text-center">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-5xl">
        <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl">
          Upcoming events
        </h1>

        <div className="mt-12 relative overflow-hidden rounded-[2.5rem] bg-card shadow-lg flex items-center justify-center min-h-[300px] md:min-h-[450px]">
          <img src={eventsHero} alt="Event Poster" className="absolute inset-0 w-full h-full object-cover blur-[2px]" />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-white font-bold text-lg md:text-xl tracking-widest uppercase mb-6">Poster or video</h2>
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-white bg-transparent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary">
              Register now
            </Link>
          </div>
        </div>

        <div className="mt-16 text-left">
          <h2 className="font-serif text-3xl font-bold text-primary">Name of the event</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
          </p>
        </div>
      </motion.div>
    </section>
  );
}

const speakers = [
  { name: "Pastor Daniel Okoye", role: "Lead Trainer", org: "Grace Chapel, Nairobi", bio: "Three decades of shepherding pastors and planting churches across East Africa.", image: speaker1 },
  { name: "Rev. Grace Mwangi", role: "Director of Discipleship", org: "Paul & Timothy Training Centre", bio: "Teacher and author helping women and couples build homes rooted in Scripture.", image: speaker2 },
  { name: "Pastor Samuel Lim", role: "Youth & Missions Pastor", org: "Hope Chapel, Kampala", bio: "Mobilises young adults into local mission and Spirit-led everyday discipleship.", image: speaker3 },
];

function Speakers() {
  return (
    <section className="px-6 py-20 bg-cream">
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-deep shadow-card">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Guest Speakers
          </span>
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
              className="group overflow-hidden rounded-4xl border border-border/60 bg-card shadow-card"
            >
              <div className="h-64 overflow-hidden">
                <img src={s.image} alt={s.name} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-primary">{s.name}</h3>
                <p className="text-sm font-medium text-teal-deep">{s.role}</p>
                <p className="text-xs text-muted-foreground">{s.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base md:text-lg font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md">
            Register now
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 py-20">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-4xl text-center">
        <h3 className="font-serif text-2xl font-bold text-primary md:text-3xl">
          Hear from people who have<br />attended this session
        </h3>
        
        <div className="mt-12 space-y-12">
          <p className="mx-auto max-w-2xl text-base italic leading-relaxed text-muted-foreground md:text-lg">
            "Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
          </p>
          <p className="mx-auto max-w-2xl text-base italic leading-relaxed text-muted-foreground md:text-lg">
            "Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="px-6 py-20 bg-cream">
      <div className="mx-auto max-w-4xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-deep shadow-card">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Season Timeline
          </span>
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
              className={`relative mb-10 pl-16 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
            >
              <span className={`absolute top-6 z-10 grid h-4 w-4 place-items-center rounded-full gradient-brand ring-4 ring-background left-6 -translate-x-1/2 ${i % 2 === 0 ? "md:left-auto md:-right-2 md:translate-x-0" : "md:-left-2 md:translate-x-0"}`} />
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">{t.month}</span>
                <h3 className="mt-1.5 font-serif text-lg font-semibold text-primary">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingEventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav alwaysSolid />
      <main>
        <PosterSection />
        <Speakers />
        <Testimonials />
        <Timeline />
      </main>
    </div>
  );
}
