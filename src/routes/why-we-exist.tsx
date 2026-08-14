import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

import speaker1 from "@/assets/speaker-1.jpg";
import speaker2 from "@/assets/speaker-2.jpg";
import videoBg from "@/assets/calling.jpg";

export const Route = createFileRoute("/why-we-exist")({
  head: () => ({
    meta: [
      { title: "Why We Exist — Paul & Timothy Training Centre" },
      { name: "description", content: "Learn about our mission, vision, and the trainers behind the centre." },
    ],
  }),
  component: WhyWeExistPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function WhyWeExistPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav alwaysSolid />
      
      <main className="flex-1 pb-20">
        {/* Header & Video Section */}
        <section className="px-6 pt-32 md:pt-40">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl">
              Why we exist
            </h1>
            
            <div className="mt-12 relative overflow-hidden rounded-[2.5rem] bg-card shadow-xl flex items-center justify-center aspect-video md:aspect-[21/9] group cursor-pointer">
              <img src={videoBg} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover blur-[3px]" />
              <div className="absolute inset-0 bg-primary/40 transition-colors group-hover:bg-primary/50" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
                <span className="text-white font-bold text-lg md:text-xl uppercase tracking-widest shadow-black/50 drop-shadow-md">
                  Video coming soon
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="px-6 pt-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">
              Why Paul & Timothy training center exist?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </p>
          </motion.div>
        </section>

        {/* Trainers Section */}
        <section className="px-6 pt-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl mb-12">
              Meet your trainer
            </h2>
            
            <div className="space-y-12">
              {/* Trainer 1 */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 shrink-0">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#2a2a2a] shadow-card">
                     <img src={speaker1} alt="Trainer" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-serif text-xl font-bold text-primary">Name</h3>
                  <p className="text-sm text-teal-deep mt-1">Location</p>
                  <p className="text-sm font-semibold text-primary mt-4">Experience:</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                  </p>
                </div>
              </div>

              {/* Trainer 2 */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 shrink-0">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#2a2a2a] shadow-card">
                     <img src={speaker2} alt="Trainer" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-serif text-xl font-bold text-primary">Name</h3>
                  <p className="text-sm text-teal-deep mt-1">Location</p>
                  <p className="text-sm font-semibold text-primary mt-4">Experience:</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                  </p>
                  <div className="mt-6">
                    <Link to="/courses" className="inline-flex items-center text-sm font-bold text-primary hover:text-teal-deep transition-colors">
                      Explore courses by them &gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Foundation Section */}
        <section className="px-6 mt-24 py-20 bg-cream">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-primary">
              About Word Life Foundation
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
