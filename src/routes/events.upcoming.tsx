import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { timeline } from "@/data/events";

import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import speaker3 from "@/assets/speaker-3.jpg";

import poster1 from "@/assets/Alethia poster/Alethia_training_topics.jpeg";
import poster2 from "@/assets/Alethia poster/Alethia_training_topics_tamil.jpeg";
import poster3 from "@/assets/Alethia poster/Alethia_who_can_participate_landscape.jpeg";
import poster4 from "@/assets/Alethia poster/Alethia_who_can_participate_landscape_tamil.jpeg";
import poster5 from "@/assets/Alethia poster/Alethia_who_can_participate_portrait.jpeg";

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

const allPosters = [poster3, poster4, poster1, poster2];

function ThumbnailCard({ images, defaultIndex, onClick }: { images: string[], defaultIndex: number, onClick: (index: number) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    } else {
      setCurrentIndex(defaultIndex);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length, defaultIndex]);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-border/40 shadow-sm cursor-pointer bg-black/5 aspect-video flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(currentIndex)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence initial={false}>
        <motion.img 
          key={currentIndex}
          src={images[currentIndex]} 
          alt="Related Slide" 
          className="absolute inset-0 w-full h-full object-cover" 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </motion.div>
  );
}

function PosterSection() {
  const [mainPosterIndex, setMainPosterIndex] = useState(0); // start with poster3 (index 0)
  const [modalPosterIndex, setModalPosterIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalPosterIndex === null) return;
      if (e.key === "ArrowRight") {
        setModalPosterIndex((prev) => (prev !== null ? (prev + 1) % allPosters.length : null));
      } else if (e.key === "ArrowLeft") {
        setModalPosterIndex((prev) => (prev !== null ? (prev - 1 + allPosters.length) % allPosters.length : null));
      } else if (e.key === "Escape") {
        setModalPosterIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalPosterIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMainPosterIndex((prev) => (prev + 1) % allPosters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => setMainPosterIndex((prev) => (prev - 1 + allPosters.length) % allPosters.length);
  const handleNext = () => setMainPosterIndex((prev) => (prev + 1) % allPosters.length);

  return (
    <>
      <section className="gradient-hero pt-36 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Events · Upcoming
          </span>
          <h1 className="font-serif text-5xl font-medium leading-[1.05] md:text-7xl">
            Upcoming events
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Training, workshops and gatherings you can attend in person & on online platforms
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-background text-center md:text-left">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-4xl">

        {/* FEATURED EVENT EYEBROW */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-deep shadow-card">
            Next Up
          </span>
        </div>

        {/* TITLE */}
        <div className="mb-10 w-full overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-primary leading-[1.1] whitespace-nowrap tracking-tight">
            Aletheia Training Conference
          </h2>
        </div>

        {/* LARGE EVENT POSTER */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={() => setModalPosterIndex(mainPosterIndex)}
          className="w-full aspect-video rounded-[2rem] overflow-hidden bg-black/5 shadow-2xl border border-border/40 relative flex items-center justify-center group cursor-pointer"
        >
          <AnimatePresence initial={false}>
            <motion.img 
              key={mainPosterIndex}
              src={allPosters[mainPosterIndex]} 
              alt="Aletheia Training Conference" 
              className="absolute inset-0 w-full h-full object-contain block" 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }} 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* DETAILS SECTION */}
        <div className="mt-8 max-w-3xl">
          <p className="text-lg font-bold text-primary">
            Nov 7-14 <span className="mx-2 text-muted-foreground font-normal">·</span> Online <span className="mx-2 text-muted-foreground font-normal">·</span> Eight-day
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Training for Youth Leaders, Teachers & Counsellors. Walk away with practical tools to reach and disciple the next generation.
          </p>
          <div className="mt-8">
            <Link to="/register" className="inline-flex items-center justify-center rounded-sm bg-primary px-10 py-3.5 text-base md:text-lg font-bold text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wider shadow-md hover:shadow-lg">
              Register Now
            </Link>
          </div>
        </div>

        <hr className="my-14 border-border/60" />

        {/* RELATED SLIDES */}
        <div>
          <h3 className="text-xl font-bold text-primary mb-6 uppercase tracking-wider text-left">Related Slides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             <ThumbnailCard images={allPosters} defaultIndex={0} onClick={setModalPosterIndex} />
             <ThumbnailCard images={allPosters} defaultIndex={1} onClick={setModalPosterIndex} />
             <ThumbnailCard images={allPosters} defaultIndex={2} onClick={setModalPosterIndex} />
             <ThumbnailCard images={allPosters} defaultIndex={3} onClick={setModalPosterIndex} />
          </div>
        </div>

      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {modalPosterIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalPosterIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
          >
            <div 
              className="relative max-w-5xl w-full aspect-video flex flex-col items-center justify-center cursor-default group"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Keyboard navigation hint */}
              <div className="absolute -top-10 left-0 text-white/50 text-sm hidden md:block">
                Use arrow keys to navigate
              </div>
              <button 
                onClick={() => setModalPosterIndex(null)} 
                className="absolute -top-12 right-0 md:-right-12 md:-top-12 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <button 
                onClick={() => setModalPosterIndex((prev) => (prev !== null ? (prev - 1 + allPosters.length) % allPosters.length : null))} 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20 shadow-md"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <button 
                onClick={() => setModalPosterIndex((prev) => (prev !== null ? (prev + 1) % allPosters.length : null))} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20 shadow-md"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <AnimatePresence initial={false}>
                <motion.img 
                  key={modalPosterIndex}
                  src={allPosters[modalPosterIndex]} 
                  alt="Enlarged Slide" 
                  className="w-full h-full max-h-[85vh] object-contain rounded-lg shadow-2xl absolute inset-0 m-auto" 
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </section>
    </>
  );
}

const speakers = [
  { name: "Roselind Rex", role: "Trainer", org: "Word Life Foundation", bio: "3 decades serving in youth & Teens ministry.", image: speaker1 },
];

function Speakers() {
  return (
    <section className="px-6 py-20 bg-cream">
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-deep shadow-card">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Who You'll Hear From
          </span>
          <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
            Meet Your Facilitators
          </h2>
        </motion.div>
        <div className="mt-12 flex justify-center">
          {speakers.map((s, i) => (
            <motion.article
              key={s.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-4xl border border-border/60 bg-card shadow-card max-w-sm w-full text-left"
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
            The Season Ahead
          </span>
          <h2 className="mt-5 font-serif text-3xl font-bold text-primary md:text-4xl">
            What's coming, month by month.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A quick look at what's on the calendar. Registration opens closer to each date.
          </p>
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

function EmptyState() {
  return (
    <section className="px-6 py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl">
          Nothing on the calendar just yet.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We're planning the next season of training programs and other gatherings. Leave your email and we'll let you know as soon as dates are confirmed. You could also start with an online course: you can take these right now, in your own time.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wider shadow-md">
            Notify me
          </Link>
          <Link to="/courses" className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-teal-soft px-8 py-3 text-base font-bold text-teal-deep hover:bg-teal-soft/80 transition-colors uppercase tracking-wider shadow-md">
            Explore Courses
          </Link>
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
