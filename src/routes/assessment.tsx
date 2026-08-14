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

      <main className="flex-1 px-6 pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-primary md:text-6xl"
          >
            Assessment page
          </motion.h1>

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
                APEST
              </h2>
            </Link>

            <Link
              to="/spiritual-gifts"
              className="group relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2.5rem] overflow-hidden p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:aspect-square"
            >
              <img src={mentorshipImg} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/60 backdrop-blur-[3px] transition-colors duration-500 group-hover:bg-primary/40" />
              <h2 className="relative z-10 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-teal">
                Spiritual<br />gifts
              </h2>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-20 text-center sm:text-left mx-auto max-w-3xl"
          >
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary text-center">
              About the assessment
            </h3>
            
            <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                to="/ministry-calling"
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-8 py-3.5 text-base md:text-lg font-semibold text-primary transition-colors hover:bg-accent hover:text-teal-deep shadow-sm"
              >
                Take the assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
