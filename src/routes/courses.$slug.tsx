import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Clock, Plus, Signal, Sparkles } from "lucide-react";
import { courses, getCourse, type Course } from "@/data/courses";
import { TestimonialVideoGrid } from "@/components/TestimonialVideos";

const getYoutubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const videoId =
      parsedUrl.hostname === "youtu.be"
        ? parsedUrl.pathname.slice(1)
        : parsedUrl.searchParams.get("v");

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
};

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course unavailable — Paul & Timothy" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    const title = `${course.title} — Paul & Timothy Training Centre`;
    return {
      meta: [
        { title },
        { name: "description", content: course.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: course.desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData() as { course: Course };
  const [open, setOpen] = useState<number | null>(0);
  const videoEmbedUrl = course.videoUrl ? getYoutubeEmbedUrl(course.videoUrl) : null;
  const allowedSlugs = ["bible-exposition", "kingdom-shakers"];
  const similar = courses.filter((c) => allowedSlugs.includes(c.slug) && c.slug !== course.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">

      <div className="mx-auto max-w-6xl px-6 pt-28 pb-24 md:pt-32">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <a href="/#courses" className="hover:text-primary">
            Courses
          </a>
          <span>/</span>
          <span className="text-primary">{course.title}</span>
        </nav>

        {/* Hero panel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mt-6 overflow-hidden rounded-4xl gradient-hero px-6 py-12 text-white shadow-soft md:px-14 md:py-16"
        >
          <img
            src={course.img}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="relative">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                <Sparkles className="h-3 w-3 text-gold" /> {course.tag}
              </span>
              <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.05] md:text-5xl">
                {course.title}
              </h1>
              {course.subtitle && (
                <div className="mt-2 font-serif text-xl text-teal md:text-2xl">{course.subtitle}</div>
              )}
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">{course.desc}</p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-teal" /> {course.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Signal className="h-3.5 w-3.5 text-teal" /> {course.level}
                </span>
              </div>

              <Link
                to="/assessment"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-primary"
              >
                <ArrowRight className="h-4 w-4" /> Start this module
              </Link>
            </div>
          </div>
        </motion.section>

        {videoEmbedUrl && (
          <section aria-labelledby="course-video-heading" className="mt-10">
            <h2 id="course-video-heading" className="sr-only">
              {course.title} video
            </h2>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card">
              <div className="relative aspect-video w-full">
                <iframe
                  src={videoEmbedUrl}
                  title={`${course.title} course video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </section>
        )}

        <div className="mt-12 max-w-3xl space-y-5">
          {course.summary.split("\n\n").map((para) => (
            <p key={para.slice(0, 24)} className="text-lg leading-relaxed text-muted-foreground">{para}</p>
          ))}
        </div>

        {/* What You'll Gain */}
        {course.gains && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-medium text-primary md:text-3xl">{course.gainsHeadline ?? "By completing this module, you will:"}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {course.gains.map((gain) => (
                <li key={gain} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 text-sm leading-relaxed text-foreground/80 shadow-sm">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-deep" />
                  {gain}
                </li>
              ))}
            </ul>
            {course.gainsClosing && (
              <p className="mt-6 max-w-3xl text-[15px] font-medium leading-relaxed text-primary">
                {course.gainsClosing}
              </p>
            )}
          </section>
        )}

        {/* Outline */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-medium text-primary md:text-3xl">{course.outlineHeadline ?? "Course Outline"}</h2>
          <div className="mt-6 space-y-3">
            {course.outline.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className={`flex w-full items-center gap-4 px-6 py-4 text-left transition-colors duration-300 ${
                    open === i ? "gradient-brand text-white" : "bg-card text-primary hover:bg-accent"
                  }`}
                  aria-expanded={open === i}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                      open === i ? "bg-gold text-primary" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-serif text-base font-semibold">
                    {o.title}
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
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
                    <p className="px-6 py-5 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-medium text-primary md:text-3xl">
            {course.testimonialsHeadline ?? "Hear from people who have finished the course"}
          </h2>
          {course.sharedTestimonials ? (
            <div className="mt-6">
              <TestimonialVideoGrid />
            </div>
          ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {course.testimonials.map((t) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="hover-lift rounded-3xl bg-card p-7 shadow-card"
              >
                <blockquote className="font-serif text-lg leading-snug text-primary">
                  “{t.quote}”
                </blockquote>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-teal-deep">
                  {t.name} · <span className="text-muted-foreground">{t.role}</span>
                </p>
              </motion.figure>
            ))}
          </div>
          )}
        </section>

        {/* Similar courses */}
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-medium text-primary md:text-3xl">
            Explore Similar Courses
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {similar.map((c) => (
              <Link
                key={c.slug}
                to="/courses/$slug"
                params={{ slug: c.slug }}
                className="hover-lift group overflow-hidden rounded-3xl bg-card shadow-card"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                    {c.tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-xl font-medium text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep">
                    Explore Course
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
