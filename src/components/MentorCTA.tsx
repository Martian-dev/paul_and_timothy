import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function MentorCTA() {
  return (
    <section id="mentor" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] gradient-brand p-10 text-white md:p-16"
        >
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.85_0.12_180)]/20 blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h2 className="text-4xl font-medium leading-tight md:text-5xl">
                Need help understanding <br /> where you fit?
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Book a 30-minute conversation with a mentor. Our experienced facilitator will listen and offer honest counsel on your next step.
              </p>
            </div>
            <a
              href="/interaction"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 md:self-center"
            >
              Talk to a Mentor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
