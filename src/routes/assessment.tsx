import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";

import callingImg from "@/assets/calling.jpg";
import courseTeachingImg from "@/assets/course-teaching.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Assessments — Paul & Timothy Training Centre" },
      { name: "description", content: "Discover your calling, gifts, and ministry roles." },
    ],
  }),
  component: AssessmentHubPage,
});

function AssessmentHubPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav alwaysSolid />

      <motion.main initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} className="flex-1 px-6 pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-primary md:text-6xl"
          >
            Three quick assessments. One clear direction.
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground"
          >
            Our three assessments help you identify what God has already been forming in you: the people you're drawn to, the shape your calling takes, and the gifts you've been given to carry it. Take each one, and you'll move from a general sense that God is asking something of you to a specific understanding of what it is… and which course to begin with.
          </motion.p>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <Link
              to="/ministry-calling"
              className="group relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2.5rem] overflow-hidden p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:aspect-square"
            >
              <img src={callingImg} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/60 backdrop-blur-[3px] transition-colors duration-500 group-hover:bg-primary/40" />
              <h2 className="relative z-10 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-teal">
                Ministry<br />Calling
              </h2>
            </Link>

            <Link
              to="/apest-assessment"
              className="group relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2.5rem] overflow-hidden p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:aspect-square"
            >
              <img src={courseTeachingImg} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/60 backdrop-blur-[3px] transition-colors duration-500 group-hover:bg-primary/40" />
              <h2 className="relative z-10 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-teal">
                Ministry<br />Type
              </h2>
            </Link>

            <Link
              to="/spiritual-gifts"
              className="group relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2.5rem] overflow-hidden p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:aspect-square"
            >
              <img src={mentorshipImg} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/60 backdrop-blur-[3px] transition-colors duration-500 group-hover:bg-primary/40" />
              <h2 className="relative z-10 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-teal">
                Ministry<br />Role
              </h2>
            </Link>
          </div>

        </div>
      </motion.main>
    </div>
  );
}
