import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
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

export const Route = createFileRoute("/events/previous")({
  head: () => ({
    meta: [
      { title: "Previous Events — Paul & Timothy Training Centre" },
      { name: "description", content: "Look back at past conferences, workshops and ministry gatherings." },
    ],
  }),
  component: PreviousEventsPage,
});

function HighlightsGrid() {
  return (
    <section className="px-6 pt-32 pb-16 md:pt-40">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl">
          Previous events
        </h1>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {/* Card 1 */}
          <Link to="/events/gallery" hash="year-2017" className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 text-left shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={a2017_1} alt="Aletheia 2017" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-primary/70 transition-colors duration-500 group-hover:bg-primary/50" />
            <div className="relative z-10 flex justify-end">
              <span className="font-bold text-white text-sm">in-person</span>
            </div>
            <h2 className="relative z-10 font-serif text-3xl font-bold leading-tight text-white">
              Aletheia<br />2017
            </h2>
          </Link>

          {/* Card 2 */}
          <Link to="/events/gallery" hash="year-2026" className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 text-left shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={a2026_1} alt="Aletheia 2026" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#6c6b65]/80 transition-colors duration-500 group-hover:bg-[#6c6b65]/60" />
            <div className="relative z-10 flex justify-end">
              <span className="font-bold text-white text-sm">in-person</span>
            </div>
            <h2 className="relative z-10 font-serif text-3xl font-bold leading-tight text-white">
              Aletheia<br />2026
            </h2>
          </Link>

          {/* Card 3 */}
          <Link to="/events/gallery" className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 text-left shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={a2026_5} alt="Counsellor Trainings" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#75736d]/80 transition-colors duration-500 group-hover:bg-[#75736d]/60" />
            <div className="relative z-10 flex justify-end">
              <span className="font-bold text-white text-sm">Online</span>
            </div>
            <h2 className="relative z-10 font-serif text-3xl font-bold leading-tight text-white">
              Counsellor<br />Trainings
            </h2>
          </Link>
        </div>
      </div>
    </section>
  );
}

const gallery: { src: string; alt: string; year: string; tall?: boolean }[] = [
  { src: a2017_1, alt: "Alethia 2017 Gathering", year: "Alethia - 2017" },
  { src: a2017_2, alt: "Alethia 2017 Gathering", year: "Alethia - 2017" },
  { src: a2017_3, alt: "Alethia 2017 Gathering", year: "Alethia - 2017" },
  { src: a2026_1, alt: "Alethia 2026 Gathering", year: "Alethia - 2026" },
  { src: a2026_2, alt: "Alethia 2026 Gathering", year: "Alethia - 2026" },
  { src: a2026_3, alt: "Alethia 2026 Gathering", year: "Alethia - 2026" },
  { src: a2026_4, alt: "Alethia 2026 Gathering", year: "Alethia - 2026" },
  { src: a2026_5, alt: "Alethia 2026 Gathering", year: "Alethia - 2026" },
  { src: a2026_6, alt: "Alethia 2026 Gathering", year: "Alethia - 2026" },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isPlaying && active !== null) {
      interval = window.setInterval(() => {
        setActive((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
      }, 3000);
    }
    return () => window.clearInterval(interval);
  }, [isPlaying, active]);

  const startHighlights = () => {
    setActive(0);
    setIsPlaying(true);
  };

  const closeGallery = () => {
    setActive(null);
    setIsPlaying(false);
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h3 className="text-center font-serif text-2xl font-bold text-primary md:text-3xl">
          Gallery
        </h3>

        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {gallery.map((g, i) => (
            <motion.button
              key={i}
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
            onClick={startHighlights}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4" /> Watch Highlights
          </button>
          <Link
            to="/events/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent"
          >
            View Full Gallery
          </Link>
        </div>

        {active !== null && (
          <div
            className="fixed inset-0 z-[60] grid place-items-center bg-primary/90 p-6 backdrop-blur-sm animate-fade-in"
            onClick={closeGallery}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={closeGallery}
              aria-label="Close gallery"
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <img
                    src={gallery[active].src}
                    alt={gallery[active].alt}
                    className="max-h-[75vh] w-auto rounded-3xl object-contain shadow-soft"
                  />
                  <p className="mt-6 text-xl font-medium tracking-wide text-white drop-shadow-md">
                    {gallery[active].year}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 py-16 pb-32">
      <div className="mx-auto max-w-4xl text-center">
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
      </div>
    </section>
  );
}

function PreviousEventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav alwaysSolid />
      <main>
        <HighlightsGrid />
        <Gallery />
        <Testimonials />
      </main>
    </div>
  );
}
