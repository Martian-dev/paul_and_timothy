import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Paul & Timothy Training Centre" },
      {
        name: "description",
        content:
          "Teaching, encouragement and practical wisdom for believers discovering and walking out their ministry calling.",
      },
      { property: "og:title", content: "Articles — Paul & Timothy Training Centre" },
      {
        property: "og:description",
        content: "Short reads on calling, discipleship, mentorship and ministry in the everyday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlesPage,
});

const articles = [
  {
    tag: "History & Calling",
    title: "The Apostle of Tirunelveli: C. D. Rhenius",
    excerpt:
      "A divine calling that began in the life of a young boy and transformed an entire generation in South India.",
    read: "8 min read",
    link: "/articles/rhenius",
  },
];

function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
      <section className="gradient-hero pt-36 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Resources · Articles
          </span>
          <h1 className="font-serif text-5xl font-medium leading-[1.05] md:text-7xl">Articles</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Teaching and encouragement for every stage of the journey — from wondering to walking it
            out.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-16 md:grid-cols-2">
        {articles.map((a, i) => {
          const CardContent = (
            <>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                {a.tag}
              </span>
              <h2 className="mt-3 font-serif text-xl font-bold text-primary transition-colors group-hover:text-teal-deep">{a.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">{a.read}</p>
            </>
          );

          return (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-4xl border border-border/60 bg-card p-7 shadow-card hover-lift group"
            >
              {a.link ? (
                // @ts-ignore - dynamic link
                <Link to={a.link} className="block h-full w-full">
                  {CardContent}
                </Link>
              ) : (
                <div className="block h-full w-full cursor-not-allowed opacity-80">
                  {CardContent}
                  <div className="mt-4 text-xs font-semibold text-teal-deep">Coming Soon</div>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-4xl gradient-hero px-8 py-10 text-center text-white">
          <h2 className="font-serif text-2xl font-bold">Not sure where you fit?</h2>
          <p className="mt-2 text-sm text-white/75">
            Take the Ministry Calling Assessment and find your people group.
          </p>
          <Link
            to="/assessment"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            Take the assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      </motion.main>
    </div>
  );
}