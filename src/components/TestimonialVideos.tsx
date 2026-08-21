import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export const TESTIMONIAL_VIDEOS = [
  { id: "K_K6RJXPcb4", name: "Sis. Sezia", role: "Founder, World Revival Seeds" },
  { id: "wgdw9JGcoyc", name: "Richard", role: "Network Administrator" },
  { id: "HTctnx-ONPg", name: "Beniel Phinehas", role: "Student, MBBS" },
  { id: "ODgcXT-bvrk", name: "Sis. Helena", role: "PTTC Participant" },
];

function TestimonialVideo({
  videoId,
  name,
  role,
  index,
}: {
  videoId: string;
  name: string;
  role: string;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="hover-lift group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card"
    >
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`Testimonial from ${name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={`Testimonial from ${name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play testimonial from ${name}`}
              className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full glass text-primary transition-transform hover:scale-110"
            >
              <Play className="h-6 w-6 fill-current" />
            </button>
          </>
        )}
      </div>
      <figcaption className="p-6">
        <div className="font-semibold text-primary">{name}</div>
        <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{role}</div>
      </figcaption>
    </motion.figure>
  );
}

export function TestimonialVideoGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {TESTIMONIAL_VIDEOS.map((v, i) => (
        <TestimonialVideo key={v.id} videoId={v.id} name={v.name} role={v.role} index={i} />
      ))}
    </div>
  );
}
