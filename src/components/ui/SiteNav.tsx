import { Link } from "@tanstack/react-router";
import { Show, UserButton } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";

type NavLink = { label: string; to?: string; href?: string; desc?: string };

const mainLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Why we exist", to: "/why-we-exist" },
];

const contactLinks: NavLink[] = [
  { label: "Contact Us", to: "/contact" },
  { label: "Talk to a mentor", to: "/interaction" },
];

const eventLinks: NavLink[] = [
  { label: "Upcoming Events", to: "/events/upcoming" },
  { label: "Previous Events", to: "/events/previous" },
];

const resources: NavLink[] = [
  { label: "Assessment", to: "/assessment" },
  { label: "Articles", to: "/articles" },
  { label: "FAQs", to: "/faqs" },
];

function NavDropdown({
  label,
  links,
  linkCls,
}: {
  label: string;
  links: NavLink[];
  linkCls: string;
}) {
  return (
    <div className="group relative">
      <button className={`inline-flex items-center gap-1 ${linkCls}`}>
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-max min-w-[12rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div className="origin-top scale-95 rounded-2xl border border-border/60 bg-card p-1.5 shadow-soft transition-all duration-200 group-hover:scale-100 group-focus-within:scale-100">
          {links.map((r) => (
            <Link
              key={r.label}
              to={r.to!}
              className="group/item block rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            >
              <span className="block text-sm font-medium text-primary transition-colors group-hover/item:text-teal-deep">
                {r.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteNav({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [open, setOpen] = useState(false);

  // Mobile dropdown states
  const [eventsOpen, setEventsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (alwaysSolid) return;
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, [alwaysSolid]);

  const solid = alwaysSolid || scrolled;
  const linkCls = `text-sm font-medium transition-colors duration-500 ${
    solid ? "text-primary/80 hover:text-primary" : "text-white/90 hover:text-white"
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? "bg-background shadow-sm border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="Paul & Timothy Training Centre"
            className={`h-11 w-auto md:h-12 transition-[filter] duration-500 ${
              solid ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {mainLinks.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className={linkCls}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className={linkCls}>
                {l.label}
              </a>
            ),
          )}

          <NavDropdown label="Events" links={eventLinks} linkCls={linkCls} />
          <Link to="/courses" className={linkCls}>
            Courses
          </Link>
          <NavDropdown label="Resources" links={resources} linkCls={linkCls} />
          <NavDropdown label="Contact" links={contactLinks} linkCls={linkCls} />
          <Link to="/partner" className={linkCls}>
            Partner with us
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Show when="signed-out" treatPendingAsSignedOut>
            <Link to="/login" search={{ course: undefined }} className={linkCls}>
              Login
            </Link>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Link
            to="/assessment"
            className={`group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft ${
              solid ? "bg-primary text-primary-foreground" : "bg-white text-primary"
            }`}
          >
            Start Here
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`rounded-full p-2 transition-colors duration-500 lg:hidden ${
            solid ? "text-primary" : "text-white"
          }`}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="bg-background border-t border-border/40 lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {mainLinks.map((l) =>
              l.to ? (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
                >
                  {l.label}
                </a>
              ),
            )}

            {/* Mobile Events Dropdown */}
            <button
              onClick={() => setEventsOpen(!eventsOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
            >
              Events
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${eventsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {eventsOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l-2 border-border/50 pl-3">
                {eventLinks.map((r) => (
                  <Link
                    key={r.label}
                    to={r.to!}
                    onClick={() => {
                      setOpen(false);
                      setEventsOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-primary/80 hover:bg-primary/5"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Courses Link */}
            <Link
              to="/courses"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
            >
              Courses
            </Link>

            {/* Mobile Resources Dropdown */}
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
            >
              Resources
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {resourcesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l-2 border-border/50 pl-3">
                {resources.map((r) => (
                  <Link
                    key={r.label}
                    to={r.to!}
                    onClick={() => {
                      setOpen(false);
                      setResourcesOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-primary/80 hover:bg-primary/5"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Contact Dropdown */}
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
            >
              Contact
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${contactOpen ? "rotate-180" : ""}`}
              />
            </button>
            {contactOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l-2 border-border/50 pl-3">
                {contactLinks.map((r) => (
                  <Link
                    key={r.label}
                    to={r.to!}
                    onClick={() => {
                      setOpen(false);
                      setContactOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-primary/80 hover:bg-primary/5"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/partner"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
            >
              Partner with us
            </Link>

            <Show when="signed-out" treatPendingAsSignedOut>
              <Link
                to="/login"
                search={{ course: undefined }}
                onClick={() => setOpen(false)}
                className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-primary/80 hover:bg-primary/5"
              >
                Login
              </Link>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-3 px-3 py-2.5">
                <span className="text-sm font-medium text-primary/80">Your account</span>
                <UserButton />
              </div>
            </Show>

            <Link
              to="/assessment"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Start Here <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
