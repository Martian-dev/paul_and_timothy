import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import logoImg from "@/assets/logo.png";

type FooterLink = { label: string; to?: string; href?: string };

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Why We Exist", href: "/#mission" },
      { label: "Courses", href: "/#courses" },
      { label: "Events", to: "/events" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Assessment", to: "/assessment" },
      { label: "Articles", to: "/articles" },
      { label: "FAQs", to: "/faqs" },
      { label: "Library", href: "/#courses" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/#contact" },
      { label: "Find a Mentor", href: "/#contact" },
      { label: "Partner With Us", href: "/#contact" },
      { label: "Prayer", href: "/#contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <div className="w-fit rounded-2xl bg-white/95 p-4">
            <img src={logoImg} alt="Paul & Timothy Training Centre" className="h-10 w-auto" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Equipping ordinary people for an extraordinary mission. Rooted in Scripture. Sent in
            love.
          </p>

          <form className="mt-8 flex max-w-sm items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 backdrop-blur">
            <Mail className="ml-3 h-4 w-4 text-primary-foreground/60" />
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary transition hover:bg-cream"
            >
              Subscribe
            </button>
          </form>

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

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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