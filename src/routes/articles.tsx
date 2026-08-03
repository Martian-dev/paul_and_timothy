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
    tag: "Calling",
    title: "How do I know what God is calling me to?",
    excerpt:
      "Calling rarely arrives as a lightning bolt. It usually shows up as a burden you can't put down and a joy you can't explain.",
    read: "5 min read",
  },
  {
    tag: "Discipleship",
    title: "The Paul & Timothy pattern",
    excerpt:
      "Paul didn't hand Timothy a curriculum — he handed him a life. Why mentorship is still the primary engine of the church.",
    read: "6 min read",
  },
  {
    tag: "Ministry",
    title: "Serving the group God has burdened you for",
    excerpt:
      "Children, teenagers, women, men, couples, seniors — every field needs labourers. Here's how to start where you are.",
    read: "4 min read",
  },
  {
    tag: "Growth",
    title: "Faithful in small rooms",
    excerpt:
      "Before the platform comes the practice. Habits that keep your ministry rooted when nobody is watching.",
    read: "7 min read",
  },
];

function ArticlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="gradient-hero pt-36 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Resources · Articles
          </span>
          <h1 className="font-serif text-4xl font-bold md:text-5xl">Articles</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Teaching and encouragement for every stage of the journey — from wondering to walking it
            out.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-16 md:grid-cols-2">
        {articles.map((a, i) => (
          <motion.article
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-4xl border border-border/60 bg-card p-7 shadow-card hover-lift"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
              {a.tag}
            </span>
            <h2 className="mt-3 font-serif text-xl font-bold text-primary">{a.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
            <p className="mt-4 text-xs text-muted-foreground">{a.read}</p>
          </motion.article>
        ))}
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
    </div>
  );
}