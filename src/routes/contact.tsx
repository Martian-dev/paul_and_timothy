import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/ui/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav alwaysSolid />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary px-6 py-20 md:py-28 text-white mt-16 md:mt-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,10,78,0.9)_0%,rgba(45,10,78,0.4)_100%)]" />
          <div className="relative mx-auto max-w-7xl pt-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-deep opacity-90 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/50">&gt;</span>
              <span className="text-white">Contact</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                <Phone className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              <h1 className="text-5xl md:text-7xl font-medium tracking-tight">Contact Us</h1>
            </div>
          </div>
        </section>

        {/* Split Content Section */}
        <section className="px-6 py-20 md:py-32">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] text-primary">
                Let's start the conversation about your spiritual journey.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Need guidance, want to learn more about our courses, or just looking to connect? 
                Reach out to our support team for anything related to mentorship, training, or partnerships.
              </p>

              <div className="mt-12 space-y-10">
                <div className="flex items-start gap-5 group">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-white transition-transform group-hover:scale-110 shadow-[0_8px_20px_-8px_rgba(45,10,78,0.5)]">
                    <Mail className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Email</h3>
                    <a href="mailto:hello@paulandtimothy.com" className="mt-1 block text-[15px] text-muted-foreground hover:text-teal-deep transition-colors">
                      hello@paulandtimothy.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-white transition-transform group-hover:scale-110 shadow-[0_8px_20px_-8px_rgba(45,10,78,0.5)]">
                    <Phone className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">General Enquiries</h3>
                    <a href="tel:18001234567" className="mt-1 block text-[15px] text-muted-foreground hover:text-teal-deep transition-colors">
                      1800-123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-white transition-transform group-hover:scale-110 shadow-[0_8px_20px_-8px_rgba(45,10,78,0.5)]">
                    <MapPin className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Training Centre</h3>
                    <p className="mt-1 text-[15px] text-muted-foreground leading-relaxed">
                      123 Ministry Road<br />
                      London, UK, EC1A 1BB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className="bg-card rounded-[2rem] border border-border/40 p-8 md:p-12 shadow-soft">
                <h3 className="text-2xl font-medium text-primary mb-8">
                  Share your details and our team will be in touch soon.
                </h3>
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="sr-only">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="First Name*"
                        className="w-full h-14 rounded-xl border border-border bg-background px-5 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="sr-only">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name*"
                        className="w-full h-14 rounded-xl border border-border bg-background px-5 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                      <input
                        type="tel"
                        id="mobile"
                        placeholder="Mobile Number*"
                        className="w-full h-14 rounded-xl border border-border bg-background px-5 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email (optional)</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email (optional)"
                        className="w-full h-14 rounded-xl border border-border bg-background px-5 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label htmlFor="country" className="sr-only">Select Country</label>
                      <select
                        id="country"
                        className="w-full h-14 rounded-xl border border-border bg-background px-5 pr-10 text-sm text-foreground appearance-none outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>Select Country*</option>
                        <option value="uk">United Kingdom</option>
                        <option value="us">United States</option>
                        <option value="ng">Nigeria</option>
                        <option value="ke">Kenya</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="city" className="sr-only">City</label>
                      <input
                        type="text"
                        id="city"
                        placeholder="Select City*"
                        className="w-full h-14 rounded-xl border border-border bg-background px-5 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="enquiry" className="sr-only">Enquiry Type</label>
                    <select
                      id="enquiry"
                      className="w-full h-14 rounded-xl border border-border bg-background px-5 pr-10 text-sm text-foreground appearance-none outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Select Enquiry Type*</option>
                      <option value="course">Course Enquiry</option>
                      <option value="mentorship">Mentorship</option>
                      <option value="assessment">Assessment Help</option>
                      <option value="partnership">Partnership</option>
                      <option value="general">General</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={4}
                      className="w-full rounded-xl border border-border bg-background p-5 text-sm text-foreground outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/20 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    Submit
                    <Send className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-muted-foreground mt-4">
                    By clicking on "Submit" you agree to our <a href="#" className="underline hover:text-primary">Privacy Policy</a> and allow us to contact you.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
