import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Handshake, Heart, Globe, Mail, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { useState, useRef } from "react";

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
    <div className="min-h-screen bg-background">
      <SiteNav />
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
      
      {/* 1. HERO */}
      <section className="gradient-hero pt-36 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <Handshake className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Partner With Us
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.05] tracking-tight">
            The harvest needs workers.<br className="hidden sm:block" /> The workers… need training.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
            We can't train them alone. Individuals, churches and organisations partner with us to equip ordinary believers, who go on to equip others.
          </p>
          <div className="mt-10">
            <button 
              onClick={() => scrollToForm("Something else")}
              className="inline-flex items-center gap-2 rounded-sm bg-white px-8 py-3.5 text-base font-bold text-primary transition-colors hover:bg-white/90 shadow-md uppercase tracking-wider"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHY PARTNERSHIP MULTIPLIES */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-primary md:text-5xl">One trained believer is never just one.</h2>
        </div>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Paul entrusted what he knew to Timothy. Timothy taught others. Those others taught others still… and the Gospel travelled further than one man ever could.
          </p>
          <p>
            That's the model we work from. When you help train one believer, you're not funding a single course. You're setting off a chain you may never fully see: a woman who starts a prayer cell in her home, a young man who begins sharing the Gospel in his workplace, a couple who lead a group in a village nobody else has reached.
          </p>
        </div>
        <blockquote className="mt-12 border-l-4 border-teal-deep pl-6 italic text-primary/80">
          <p className="text-xl font-serif">
            "And the things you have heard me say in the presence of many witnesses, entrust to reliable people who will also be qualified to teach others."
          </p>
          <footer className="mt-3 font-semibold text-teal-deep">— 2 Timothy 2:2</footer>
        </blockquote>
      </section>

      {/* 3. WAYS TO PARTNER */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Three ways to stand with us.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Whatever you have to give - time, space, or resources - there's a place for it here.
            </p>
          </div>

          <div className="space-y-16 md:space-y-32">
            {/* Pray */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary">Pray With Us</h3>
                <p className="text-lg text-primary font-medium">Ministry work relies on the support of people who pray.</p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Join our prayer network and we'll send you what to pray for: the believers currently in training, the training programs coming up, the places we're being invited into, and the specific needs of the team. No obligation beyond prayer, and no fundraising in disguise.
                </p>
                <button onClick={() => scrollToForm("Prayer network")} className="text-teal-deep font-bold hover:underline inline-flex items-center gap-1">
                  Join the prayer network <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 w-full rounded-4xl bg-card border border-border/60 p-8 md:p-12 shadow-card">
                <div className="aspect-video w-full rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-teal-deep/50" />
                </div>
              </div>
            </div>

            {/* Host */}
            <div className="flex flex-col md:flex-row-reverse gap-10 md:gap-16 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary">Host a Training</h3>
                <p className="text-lg text-primary font-medium">Bring PTTC to your church, your community or your organisation.</p>
                <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    You provide the people and the venue; we bring the curriculum, the trainers and the structure. Our courses are built to be short and intensive: so your members can attend without stepping away from work and family for weeks or months.
                  </p>
                  <p>
                    This is often how a whole church begins to change: not by sending one person away to be trained, but by being trained together.
                  </p>
                </div>
                <button onClick={() => scrollToForm("Host a training")} className="text-teal-deep font-bold hover:underline inline-flex items-center gap-1">
                  Enquire about hosting <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 w-full rounded-4xl bg-card border border-border/60 p-8 md:p-12 shadow-card">
                <div className="aspect-video w-full rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Globe className="h-16 w-16 text-teal-deep/50" />
                </div>
              </div>
            </div>

            {/* Give */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Handshake className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary">Give</h3>
                
                <div className="rounded-xl border border-orange-300 bg-orange-50 p-4 text-sm font-medium text-orange-900 mb-4">
                  <span className="block font-bold mb-1 text-orange-700">PLACEHOLDER MESSAGE</span>
                  Our fees are kept deliberately low, so that cost is never the reason someone with a calling stays untrained.
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Giving is what makes that possible. Your support goes towards [specific uses to be confirmed: eg. training materials, travel to reach churches outside the city, subsidised course fees for those who can't afford it, translation into Tamil].
                </p>
                <button onClick={() => scrollToForm("Give")} className="text-teal-deep font-bold hover:underline inline-flex items-center gap-1">
                  Talk to us about giving <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 w-full rounded-4xl bg-card border border-border/60 p-8 md:p-12 shadow-card">
                <div className="aspect-video w-full rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Handshake className="h-16 w-16 text-teal-deep/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO PARTNERS WITH US */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary md:text-5xl">Who this is for.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Individuals</h3>
            <p className="text-muted-foreground leading-relaxed">People who've been trained themselves, or who simply want the next believer to have what they didn't.</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Churches</h3>
            <p className="text-muted-foreground leading-relaxed">Pastors and leaders who want their congregation equipped, not just taught.</p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Organisations</h3>
            <p className="text-muted-foreground leading-relaxed">Those already working in the field, who want their teams sharpened for the work they're doing.</p>
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section ref={formRef} className="bg-primary py-20 md:py-32 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Let's talk.</h2>
          <p className="mx-auto mt-4 text-lg text-white/80">
            Tell us how you'd like to be involved and we'll get back to you personally.
          </p>
          
          <form className="mt-12 rounded-3xl bg-white p-8 md:p-10 shadow-xl text-left text-foreground">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary" htmlFor="name">Full name</label>
                <input id="name" type="text" className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary" htmlFor="phone">Phone number</label>
                <input id="phone" type="tel" className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+91 98765 43210" />
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <label className="text-sm font-semibold text-primary" htmlFor="email">Email address</label>
              <input id="email" type="email" className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="john@example.com" />
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-semibold text-primary" htmlFor="interest">How would you like to partner?</label>
              <select 
                id="interest" 
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Prayer network">Prayer network</option>
                <option value="Host a training">Host a training</option>
                <option value="Give">Give</option>
                <option value="Something else">Something else</option>
              </select>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-semibold text-primary" htmlFor="message">Your message</label>
              <textarea id="message" rows={4} className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Tell us more about yourself and how you'd like to get involved..." />
            </div>
            
            <button type="button" onClick={() => alert("Thank you, we've received your message. Someone from our team will be in touch within [X] working days.")} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 shadow-md">
              Send Message <Mail className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 6. CLOSING */}
      <section className="gradient-hero py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            Anyone can do ministry, but not everyone gets the chance.
          </h2>
          <p className="mt-6 text-xl text-white/80">Help us change that.</p>
          <button onClick={() => scrollToForm("Something else")} className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-primary transition-colors hover:bg-white/90 shadow-md">
            Partner with us today <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      </motion.main>
    </div>
  );
}
