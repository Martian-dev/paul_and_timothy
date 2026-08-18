import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

import trainerImage from "@/assets/Trainer_image.jpg";
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
            <div className="mb-6 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
              Why We Exist
            </div>
            <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl leading-tight">
              Anyone can do ministry...
            </h1>
            <h2 className="mt-4 font-serif text-3xl font-medium text-primary/80 md:text-4xl">
              ...and we exist to make this happen.
            </h2>
            <p className="mt-8 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              Ministry isn't only for Bible school graduates and those behind the pulpit. At Paul & Timothy Training Centre (PTTC), we make sure you are used effectively in God's Kingdom — with guidance and short, focused training.
            </p>
            
            <div className="mt-16 relative overflow-hidden rounded-[2.5rem] bg-card shadow-xl flex items-center justify-center aspect-video md:aspect-[21/9] group cursor-pointer">
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

        {/* The Gap Section */}
        <section className="px-6 pt-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl">
             <div className="mb-4 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep text-center">
              The Problem
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl text-center">
              Very few know where to begin.
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>Many passionate believers feel the urge to serve God, but don't have any clarity beyond that. They struggle to discover their calling, understand their spiritual gifts, grasp the Gospel clearly, or confidently share it with others.</p>
              <p>Bible colleges give a strong theological foundation. But formal programmes require years — most working people and parents simply can't afford to commit that much time. The desire to serve stays exactly where it started: as a desire, with nowhere to go.</p>
              <p className="font-semibold text-primary pt-4 border-t border-border/60">PTTC exists to bridge that gap: between theological knowledge and practical ministry.</p>
            </div>
          </motion.div>
        </section>

        {/* What We Help You Do */}
        <section className="px-6 pt-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl bg-cream rounded-[3rem] p-10 md:p-16">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep">
              What This Looks Like
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl leading-snug">
              Through short, focused, intentional training, we help you:
            </h2>
            <div className="relative mt-16 mx-auto max-w-4xl">
              {/* Central Line */}
              <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-teal/30 md:-translate-x-1/2" />
              
              <div className="space-y-8 md:space-y-12">
                {[
                  "Discover your God-given calling",
                  "Identify your spiritual gifts and natural abilities",
                  "Understand the Gospel and foundational biblical doctrine",
                  "Develop practical ministry and leadership skills",
                  "Learn to communicate and present the Gospel with confidence",
                  "Become a fruitful, confident servant of God's Kingdom"
                ].map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                    >
                      {/* Node */}
                      <div className="absolute left-[20px] md:left-1/2 flex h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cream bg-teal-deep shadow-sm" />
                      
                      {/* Card */}
                      <div className={`ml-12 w-full md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="rounded-3xl bg-white p-8 shadow-sm border border-border/40 hover:shadow-md transition-shadow">
                           <div className="text-xs font-bold uppercase tracking-[.22em] text-teal/80 mb-2">Step {index + 1}</div>
                           <h3 className="font-serif text-xl font-bold text-primary">{item}</h3>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Our Heart */}
        <section className="px-6 pt-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-4xl bg-primary text-white rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            
            <div className="relative z-10">
              <div className="mb-6 text-xs font-semibold uppercase tracking-[.22em] text-teal">
                Our Heart
              </div>
              <h2 className="font-serif text-4xl font-bold md:text-5xl">
                Anyone can do ministry.
              </h2>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/80 max-w-2xl mx-auto">
                <p>Every believer is called to take part in God's Kingdom work — not just a chosen few.</p>
                <p>We want to raise confident, competent and committed believers who carry the Gospel beyond the church: to their families, their workplaces, their communities, and the nations. Because anyone can do ministry — with a heart to serve, and the right training to back it.</p>
              </div>
              <div className="mt-14 pt-10 border-t border-white/10 max-w-3xl mx-auto">
                <p className="font-serif text-2xl italic leading-snug text-white/90">
                  "And the things you have heard me say in the presence of many witnesses, entrust to reliable people who will also be qualified to teach others."
                </p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[.2em] text-teal">2 Timothy 2:2</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trainers Section (Kept for UI layout, placeholders remain) */}
        <section className="px-6 pt-28">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep text-center">
              Our Team
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl mb-16 text-center">
              Meet your trainers
            </h2>
            
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row gap-10 items-start group">
                <div className="w-full md:w-1/3 shrink-0">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-muted shadow-soft transition-transform duration-500 group-hover:-translate-y-2">
                     <img src={trainerImage} alt="Trainer" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="font-serif text-2xl font-bold text-primary">Name</h3>
                  <p className="text-sm font-semibold uppercase tracking-wider text-teal-deep mt-2">Location</p>
                  <p className="text-sm font-bold text-primary mt-6">Experience:</p>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </p>
                  <div className="mt-8">
                    <Link to="/courses" className="inline-flex items-center text-sm font-bold text-primary hover:text-teal-deep transition-colors">
                      Explore courses by them &gt;
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-10 items-start group">
                <div className="w-full md:w-1/3 shrink-0">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-muted shadow-soft transition-transform duration-500 group-hover:-translate-y-2">
                     <img src={speaker2} alt="Trainer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="font-serif text-2xl font-bold text-primary">Name</h3>
                  <p className="text-sm font-semibold uppercase tracking-wider text-teal-deep mt-2">Location</p>
                  <p className="text-sm font-bold text-primary mt-6">Experience:</p>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </p>
                  <div className="mt-8">
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
        <section className="px-6 mt-28 py-24 bg-cream border-t border-border/40">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl">
              An initiative of Word Life Foundation.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              PTTC is an initiative by Word Life Foundation, a ministry devoted to raising Christ-centred families and equipping believers to serve their communities. What began as a prayer in 2019 became PTTC in 2020 - the training arm of a much larger vision to see ordinary people trained, equipped and sent out.
            </p>
          </motion.div>
        </section>
        
        {/* Closing CTA */}
        <section className="px-6 py-24 bg-background">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl leading-tight">
              Equipping ordinary believers for extraordinary Kingdom impact.
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Not sure where to start? Take the assessment and find out what God has already been forming in you.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link to="/assessment" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:shadow-card">
                Discover Your Calling
              </Link>
              <Link to="/courses" className="inline-flex h-14 items-center justify-center rounded-full bg-cream px-10 text-lg font-semibold text-primary transition-colors hover:bg-[#d8d6ce]">
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
