import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import logoImg from "@/assets/logo.png";

type FooterLink = { label: string; to?: string; href?: string };

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Why We Exist", to: "/why-we-exist" },
      { label: "Events", to: "/events/upcoming" },
      { label: "Courses", to: "/courses" },
      { label: "Resources", to: "/articles" },
      { label: "Contact Us", to: "/contact" },
      { label: "Partner With Us", to: "/partner" },
    ],
  },
  {
    title: "Events",
    links: [
      { label: "Upcoming Events", to: "/events/upcoming" },
      { label: "Previous Events", to: "/events/previous" },
    ],
  },
  {
    title: "Courses",
    links: [
      { label: "Course Overview", to: "/courses" },
      { label: "Group Training", to: "/courses" },
      { label: "Talk to a Mentor", to: "/interaction" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Assessment", to: "/assessment" },
      { label: "Articles", to: "/articles" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "Find a Mentor", to: "/interaction" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,4fr)]">
        <div>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="block w-fit rounded-2xl bg-white/95 p-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={logoImg} alt="Paul & Timothy Training Centre" className="h-10 w-auto" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Equipping ordinary people for an extraordinary mission. Rooted in Scripture. Sent in
            love.
          </p>

          <div className="mt-8 flex gap-3">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-primary-foreground/80 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="text-sm text-primary-foreground/85 transition hover:text-white"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-primary-foreground/85 transition hover:text-white"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-primary-foreground/60">
          <div>
            © {new Date().getFullYear()} Paul & Timothy Training Centre. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}