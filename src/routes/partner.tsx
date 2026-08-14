import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Handshake, Heart, Globe, Mail } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner with Us — Paul & Timothy Training Centre" },
      { name: "description", content: "Join hands with us to equip workers for the harvest." },
    ],
  }),
  component: PartnerPage,
});

const waysToPartner = [
  {
    icon: Heart,
    title: "Pray With Us",
    desc: "Join our prayer network to intercede for the leaders and communities we are training across the globe.",
  },
  {
    icon: Globe,
    title: "Host a Training",
    desc: "Bring our equipping courses to your local church or community. We provide the curriculum and mentors.",
  },
  {
    icon: Handshake,
    title: "Financial Support",
    desc: "Your giving allows us to provide scholarships, translate materials, and expand into new regions.",
  },
];

function PartnerPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
      <section className="gradient-hero pt-36 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
            <Handshake className="h-3.5 w-3.5 text-[oklch(0.82_0.14_180)]" /> Partner With Us
          </span>
          <h1 className="font-serif text-5xl font-medium leading-[1.05] md:text-7xl">Join the Mission</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            We are looking for individuals, churches, and organizations to partner with us in equipping workers for the harvest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="text-center">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">Ways to Partner</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            There are many ways you can get involved and help us build God's Kingdom.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {waysToPartner.map((way, i) => (
            <motion.div
              key={way.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-card hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/5 text-primary">
                <way.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-semibold text-primary">{way.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {way.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">Let's Connect</h2>
          <p className="mx-auto mt-4 text-muted-foreground">
            Fill out the form below or reach out to us directly to discuss partnership opportunities.
          </p>
          
          <form className="mt-10 rounded-3xl bg-card p-8 shadow-card text-left">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary" htmlFor="name">Full Name</label>
                <input id="name" type="text" className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary" htmlFor="email">Email Address</label>
                <input id="email" type="email" className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="john@example.com" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium text-primary" htmlFor="interest">Area of Interest</label>
              <select id="interest" className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Prayer Network</option>
                <option>Host a Training</option>
                <option>Financial Support</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium text-primary" htmlFor="message">Message</label>
              <textarea id="message" rows={4} className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Tell us how you'd like to partner..." />
            </div>
            <button type="button" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Send Message <Mail className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
      </motion.main>
    </div>
  );
}
