import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Handshake, Heart, Globe, Send, ArrowRight, Quote, User, Church, Building } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { useState, useRef } from "react";

import mentorshipImg from "@/assets/pttc-mentorship.png";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner with Us — Paul & Timothy Training Centre" },
      { name: "description", content: "Join hands with us to equip workers for the harvest." },
    ],
  }),
  component: PartnerPage,
});

function PartnerPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [interest, setInterest] = useState("Prayer network");

  const scrollToForm = (selectedInterest: string) => {
    setInterest(selectedInterest);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteNav />
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
      
      {/* 1. HERO */}
      <section className="gradient-hero pt-36 pb-32 text-white text-center">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight">
            The harvest needs workers.<br />
            <span className="text-gradient font-bold leading-tight block mt-2">The workers… need training.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-white/90 leading-relaxed font-medium">
            We can't train them alone. Individuals, churches and organisations partner with us to equip ordinary believers, who go on to equip others.
          </p>
          <div className="mt-12">
            <button 
              onClick={() => scrollToForm("Something else")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary transition-colors hover:bg-white/90 shadow-md uppercase tracking-wider"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHY PARTNERSHIP MULTIPLIES */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Text Side */}
            <div className="flex-1 space-y-8">
              <div className="text-xs font-bold uppercase tracking-widest text-teal">
                Why Partnership Multiplies
              </div>
              <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl leading-[1.1]">
                One trained believer is never just one.
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground font-medium">
                <p>
                  Paul entrusted what he knew to Timothy. Timothy taught others. Those others taught others still… and the Gospel travelled further than one man ever could.
                </p>
                <p>
                  That's the model we work from. When you help train one believer, you're not funding a single course. You're setting off a chain you may never fully see: a woman who starts a prayer cell in her home, a young man who begins sharing the Gospel in his workplace, a couple who lead a group in a village nobody else has reached.
                </p>
              </div>

              <blockquote className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm">
                <Quote className="h-8 w-8 text-gold mb-4" />
                <p className="text-xl font-serif italic text-primary/90 leading-relaxed">
                  "And the things you have heard me say in the presence of many witnesses, entrust to reliable people who will also be qualified to teach others."
                </p>
                <footer className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">2 Timothy 2:2</footer>
              </blockquote>
            </div>

            {/* Image Side */}
            <div className="flex-1 w-full">
              <div className="aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-card">
                <img src={mentorshipImg} alt="Two men reading together" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WAYS TO PARTNER */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Three ways to stand with us.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground font-medium">
              Whatever you have to give — time, space, or resources — there's a place for it here.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Pray */}
            <div className="flex flex-col rounded-[2.5rem] bg-white p-10 shadow-soft h-full">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-deep text-white shadow-md">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">Pray With Us</h3>
              <p className="text-teal font-medium mb-6 text-sm">Ministry work relies on the support of people who pray.</p>
              <p className="text-sm leading-relaxed text-muted-foreground mb-8 flex-1">
                Join our prayer network and we'll send you what to pray for: the believers currently in training, the training programs coming up, the places we're being invited into, and the specific needs of the team. No obligation beyond prayer, and no fundraising in disguise.
              </p>
              <button onClick={() => scrollToForm("Prayer network")} className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 group">
                Join the prayer network <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Host */}
            <div className="flex flex-col rounded-[2.5rem] bg-white p-10 shadow-soft h-full">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-deep text-white shadow-md">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">Host a Training</h3>
              <p className="text-teal font-medium mb-6 text-sm">Bring PTTC to your church, your community or your organisation.</p>
              <p className="text-sm leading-relaxed text-muted-foreground mb-8 flex-1">
                You provide the people and the venue; we bring the curriculum, the trainers and the structure. Our courses are built to be short and intensive — so your members can attend without stepping away from work and family for weeks or months. This is often how a whole church begins to change: not by sending one person away to be trained, but by being trained together.
              </p>
              <button onClick={() => scrollToForm("Host a training")} className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 group">
                Enquire about hosting <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Give */}
            <div className="flex flex-col rounded-[2.5rem] bg-white p-10 shadow-soft h-full relative overflow-hidden">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-deep text-white shadow-md">
                <Handshake className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">Give</h3>
              
              <p className="text-teal font-medium mb-6 text-sm">
                Our fees are kept deliberately low, so that cost is never the reason someone with a calling stays untrained.
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground mb-8 flex-1">
                Giving is what makes that possible. Your support goes towards training materials, travel to reach churches outside the city, subsidised course fees for those who can't afford it, and translation into Tamil.
              </p>
              <button onClick={() => scrollToForm("Give")} className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 group mt-auto">
                Talk to us about giving <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO THIS IS FOR */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Who this is for.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[2.5rem] bg-white p-10 shadow-soft">
              <User className="h-6 w-6 text-teal mb-6" />
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Individuals</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">People who've been trained themselves, or who simply want the next believer to have what they didn't.</p>
            </div>
            <div className="rounded-[2.5rem] bg-white p-10 shadow-soft">
              <Church className="h-6 w-6 text-teal mb-6" />
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Churches</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">Pastors and leaders who want their congregation equipped, not just taught.</p>
            </div>
            <div className="rounded-[2.5rem] bg-white p-10 shadow-soft">
              <Building className="h-6 w-6 text-teal mb-6" />
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Organisations & ministries</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">Those already working in the field, who want their teams sharpened for the work they're doing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section ref={formRef} className="bg-cream py-16 md:py-24 pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Let's talk.</h2>
          <p className="mx-auto mt-6 text-lg text-muted-foreground font-medium">
            Tell us how you'd like to be involved and we'll get back to you personally.
          </p>
          
          <form className="mt-12 rounded-[2.5rem] bg-white p-8 md:p-12 shadow-card text-left">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="name">Full name</label>
                <input id="name" type="text" className="w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal" placeholder="Your name" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">Email address</label>
                <input id="email" type="email" className="w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal" placeholder="you@email.com" />
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 mt-8">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="phone">Phone number</label>
                <input id="phone" type="tel" className="w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal" placeholder="+91 ..." />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="interest">How would you like to partner?</label>
                <div className="relative">
                  <select 
                    id="interest" 
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal appearance-none"
                  >
                    <option value="Prayer network">Prayer network</option>
                    <option value="Host a training">Host a training</option>
                    <option value="Give">Give</option>
                    <option value="Something else">Something else</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="message">Your message</label>
              <textarea id="message" rows={4} className="w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal" placeholder="Tell us a little about you and your church or organisation..." />
            </div>
            
            <button type="button" onClick={() => alert("Thank you, we've received your message. Someone from our team will be in touch within [X] working days.")} className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-teal-deep px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md">
              Send message <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      </motion.main>
    </div>
  );
}
