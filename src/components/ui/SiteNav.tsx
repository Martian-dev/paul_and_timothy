import { Link, useLocation } from "@tanstack/react-router";
import { Show, UserButton } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import logoColored from "@/assets/logo_colored_text.webp";
import logoWhite from "@/assets/logo_white_text.webp";
import { AuthRuntimeBoundary } from "@/components/AuthRuntimeBoundary";
import { currentPath } from "@/lib/auth-redirect";

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

function AuthNavControls({
  authDestination,
  linkCls,
  mobile = false,
  onNavigate,
}: {
  authDestination?: string;
  linkCls: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const loginClass = mobile
    ? "w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-primary/80 hover:bg-primary/5"
    : linkCls;
  const fallback = (
    <Link
      to="/login"
      search={{ course: undefined, redirect: authDestination }}
      onClick={onNavigate}
      className={loginClass}
    >
      Login
    </Link>
  );

  return (
    <AuthRuntimeBoundary boundary="site_nav_auth_controls" fallback={fallback}>
      <Show when="signed-out" treatPendingAsSignedOut>
        <Link
          to="/login"
          search={{ course: undefined, redirect: authDestination }}
          onClick={onNavigate}
          className={loginClass}
        >
          Login
        </Link>
      </Show>
      <Show when="signed-in">
        {mobile ? (
          <div className="flex items-center gap-3 px-3 py-2.5">
            <span className="text-sm font-medium text-primary/80">Your account</span>
            <UserButton />
          </div>
        ) : (
          <UserButton showName />
        )}
      </Show>
    </AuthRuntimeBoundary>
  );
}

export function SiteNav({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const location = useLocation();
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

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const solid = alwaysSolid || scrolled;
  const isAuthRoute =
    location.pathname === "/login" ||
    location.pathname.startsWith("/login/") ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/signup/") ||
    location.pathname === "/sign-in" ||
    location.pathname.startsWith("/sign-in/") ||
    location.pathname === "/sign-up" ||
    location.pathname.startsWith("/sign-up/");
  const authDestination = isAuthRoute ? undefined : currentPath(location);
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
            src={solid ? logoColored : logoWhite}
            alt="Paul & Timothy Training Centre"
            width={1774}
            height={887}
            fetchPriority="high"
            className="h-16 w-auto md:h-[4.5rem]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 min-[1180px]:flex">
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

        <div className="hidden items-center gap-3 min-[1180px]:-ml-4 min-[1180px]:flex">
          <AuthNavControls authDestination={authDestination} linkCls={linkCls} />
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
          className={`rounded-full p-2 transition-colors duration-500 min-[1180px]:hidden ${
            solid ? "text-primary" : "text-white"
          }`}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-navigation"
          className="bg-background border-t border-border/40 min-[1180px]:hidden"
        >
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

            <AuthNavControls
              authDestination={authDestination}
              linkCls={linkCls}
              mobile
              onNavigate={() => setOpen(false)}
            />

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
