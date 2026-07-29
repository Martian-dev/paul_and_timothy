import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Check, Clock3, GraduationCap, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import logoImg from "@/assets/logo.png";
import equipmentImg from "@/assets/pttc-equipment.png";
import mentorshipImg from "@/assets/pttc-mentorship.png";
import communityImg from "@/assets/pttc-community-learning.png";
import callingImg from "@/assets/pttc-purpose-calling.png";

export const Route = createFileRoute("/courses")({ component: CoursesPage });

const courseImages = [equipmentImg, communityImg, mentorshipImg, callingImg];
const courses = [
  ["Youth & Teens Leadership Training", "Leadership training"],
  ["Couples Ministry Training", "Specialised ministry"],
  ["Counselling Training", "Care ministry"],
  ["Kingdom Shakers (Knowing Your Call)", "Calling & spiritual gifts"],
  ["One-to-one Evangelism", "Gospel ministry"],
  ["Writing", "Communication ministry"],
  ["Media & Digital Media Ministry", "Communication ministry"],
  ["Prayer Ministry & Prayer Cells", "Prayer ministry"],
  ["Mentorship", "Formation & discipleship"],
  ["Team Building & Team Management", "Leadership training"],
].map(([title, category], index) => ({
  title,
  category,
  image: courseImages[index % courseImages.length],
}));

function Header() {
  return (
    <header className="border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
          <img src={logoImg} className="h-10 w-auto" alt="Paul & Timothy Training Centre" />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-primary/80 md:flex">
          <a href="/" className="transition hover:text-teal-deep">
            Home
          </a>
          <a href="/courses" className="text-primary">
            Courses
          </a>
          <a href="/interaction" className="transition hover:text-teal-deep">
            One-to-one
          </a>
        </nav>
        <a
          href="/interaction#booking"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Talk to a mentor
        </a>
      </div>
    </header>
  );
}

function CoursesPage() {
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      courses.filter((course) =>
        `${course.title} ${course.category}`.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden gradient-hero px-6 py-20 text-white md:py-28">
          <div className="absolute -right-28 top-10 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide">
                <Sparkles className="h-4 w-4 text-teal" /> Training pathways
              </div>
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
                Start a conversation <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
        <section className="px-6 py-20 md:py-28">
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
                  placeholder="Search leadership, prayer, media…"
                  className="h-14 w-full rounded-2xl border border-border bg-card pl-14 pr-12 text-sm text-foreground shadow-card outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
                />
                {query && (
                  <button
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
              {visible.length} specialisations available
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((course, index) => (
                <motion.article
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                  key={course.title}
                  className="group overflow-hidden rounded-[1.75rem] bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
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
                      {String(index + 1).padStart(2, "0")}
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
                    <ul className="mt-5 space-y-2 text-xs text-foreground/75">
                      {[
                        "Basic biblical doctrines",
                        "Calling & spiritual gifts",
                        "Field-worker testimonies",
                      ].map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-teal-deep" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/interaction#booking"
                      className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-4 text-sm font-semibold text-primary transition hover:border-teal-deep hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      Ask about this training
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
            {visible.length === 0 && (
              <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
                <GraduationCap className="mx-auto h-9 w-9 text-teal-deep" />
                <h3 className="mt-4 text-2xl text-primary">No training found yet.</h3>
                <button
                  onClick={() => setQuery("")}
                  className="mt-4 text-sm font-semibold text-teal-deep underline underline-offset-4"
                >
                  Show all training
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="bg-cream px-6 py-20 md:py-28">
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
                “And the things you have heard me say in the presence of many witnesses entrust to
                reliable people who will also be qualified to teach others.”{" "}
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
      </main>
      <footer className="bg-primary px-6 py-10 text-center text-sm text-white/65">
        © {new Date().getFullYear()} Paul & Timothy Training Centre. Rooted in Scripture. Sent in
        love.
      </footer>
    </div>
  );
}
