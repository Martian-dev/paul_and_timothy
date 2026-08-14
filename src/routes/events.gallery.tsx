import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import a2017_1 from "@/assets/Alethia2018/IMG-20171002-WA0017.jpg";
import a2017_2 from "@/assets/Alethia2018/IMG-20171002-WA0019.jpg";
import a2017_3 from "@/assets/Alethia2018/IMG-20171002-WA0020.jpg";
import a2026_1 from "@/assets/Alethia2026/WhatsApp Image 2026-07-14 at 11.18.51.jpeg";
import a2026_2 from "@/assets/Alethia2026/WhatsApp Image 2026-07-14 at 11.18.53.jpeg";
import a2026_3 from "@/assets/Alethia2026/WhatsApp Image 2026-07-14 at 11.19.22.jpeg";
import a2026_4 from "@/assets/Alethia2026/WhatsApp Image 2026-07-14 at 11.24.07.jpeg";
import a2026_5 from "@/assets/Alethia2026/WhatsApp Image 2026-07-31 at 17.17.55.jpeg";
import a2026_6 from "@/assets/Alethia2026/WhatsApp Image 2026-07-31 at 17.18.46.jpeg";

export const Route = createFileRoute("/events/gallery")({
  component: GalleryPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-deep shadow-card">
      <Sparkles className="h-3.5 w-3.5 text-gold" />
      {children}
    </span>
  );
}

const galleryData = [
  { year: "2026", images: [a2026_1, a2026_2, a2026_3, a2026_4, a2026_5, a2026_6] },
  { year: "2017", images: [a2017_1, a2017_2, a2017_3] },
];

function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav alwaysSolid />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/events/previous"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Previous Events
          </Link>

          <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-16">
            <Eyebrow>Full Archive</Eyebrow>
            <h1 className="mt-6 font-serif text-4xl font-bold text-primary md:text-5xl">
              Captured moments across the years
            </h1>
          </motion.div>

          <div className="space-y-24">
            {galleryData.map((section, idx) => (
              <motion.section
                key={section.year}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 id={`year-${section.year}`} className="mb-8 font-serif text-3xl font-bold text-primary border-b border-border/50 pb-4">
                  Alethia - {section.year}
                </h2>
                <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                  {section.images.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                      className="break-inside-avoid overflow-hidden rounded-3xl shadow-card"
                    >
                      <img
                        src={src}
                        alt={`Alethia ${section.year} memory`}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
