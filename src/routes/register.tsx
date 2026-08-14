import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [{ title: "Register — Paul & Timothy Training Centre" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission delay
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteNav alwaysSolid />
      
      <main className="flex-1 px-6 py-32 md:py-40">
        <div className="mx-auto max-w-xl">
          <Link
            to="/events/upcoming"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Upcoming Events
          </Link>

          <div className="rounded-[2.5rem] bg-card p-8 md:p-12 shadow-card border border-border/60">
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-deep/10">
                  <CheckCircle2 className="h-10 w-10 text-teal-deep" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                  Registration Successful!
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Thank you for registering. We've sent the event details to your email address.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                  Event Registration
                </h1>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below to secure your spot for our upcoming gatherings.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="event" className="block text-sm font-semibold text-primary mb-2">
                      Which event are you registering for?
                    </label>
                    <select
                      id="event"
                      required
                      className="w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                      <option value="">Select an event...</option>
                      <option value="leadership">Leadership Workshop (September)</option>
                      <option value="mission">Mission Conference (October)</option>
                      <option value="youth">Youth Revival Night (November)</option>
                      <option value="christmas">Christmas Outreach (December)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    Confirm Registration
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
