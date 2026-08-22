import { o as __toESM } from "../_runtime.mjs";
import { _ as Link, b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as createRootRouteWithContext, h as createFileRoute, l as useLocation, m as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, p as require_react, u as QueryClient } from "../_libs/@clerk/react+[...].mjs";
import { n as dist_exports, t as ClerkProvider } from "./dist-DTPgI9Ah.mjs";
import { n as syncCurrentUser } from "./user-sync-CYpMqO27.mjs";
import { B as ChevronDown, g as Menu, k as Facebook, n as X, q as ArrowRight, t as Youtube, x as Instagram } from "../_libs/lucide-react.mjs";
import { t as Route$22 } from "./courses._slug-93dYCK5m.mjs";
import { r as currentPath } from "./auth-redirect-tOxmlDuY.mjs";
import { t as Route$23 } from "./login._-BhCAlxL3.mjs";
import { n as Route$24 } from "./register-W0EJSDLd.mjs";
import { t as Route$25 } from "./sign-in._-CX7ffujp.mjs";
import { t as Route$26 } from "./sign-up._-AO3bYSNp.mjs";
import { t as Route$27 } from "./signup._-CwJ0cucL.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as shadcn } from "../_libs/clerk__ui.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CWZ1eugQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var styles_default = "/assets/styles-DoBoki-N.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var logo_colored_text_default = "/assets/logo_colored_text-DSuJumCv.webp";
var logo_white_text_default = "/assets/logo_white_text-DSTFuSpe.webp";
/**
* Clerk can briefly expose an incomplete session while a browser cookie is
* being refreshed. Keep that transient auth error from taking down public
* route content, and report it for diagnosis instead of hiding it silently.
*/
var AuthRuntimeBoundary = class extends import_react.Component {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, info) {
		reportLovableError(error, {
			boundary: this.props.boundary,
			componentStack: info.componentStack?.slice(0, 2e3)
		});
	}
	render() {
		return this.state.hasError ? this.props.fallback : this.props.children;
	}
};
var mainLinks = [{
	label: "Home",
	to: "/"
}, {
	label: "Why we exist",
	to: "/why-we-exist"
}];
var contactLinks = [{
	label: "Contact Us",
	to: "/contact"
}, {
	label: "Talk to a mentor",
	to: "/interaction"
}];
var eventLinks = [{
	label: "Upcoming Events",
	to: "/events/upcoming"
}, {
	label: "Previous Events",
	to: "/events/previous"
}];
var resources = [
	{
		label: "Assessment",
		to: "/assessment"
	},
	{
		label: "Articles",
		to: "/articles"
	},
	{
		label: "FAQs",
		to: "/faqs"
	}
];
function NavDropdown({ label, links, linkCls }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: `inline-flex items-center gap-1 ${linkCls}`,
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute left-1/2 top-full z-50 w-max min-w-[12rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "origin-top scale-95 rounded-2xl border border-border/60 bg-card p-1.5 shadow-soft transition-all duration-200 group-hover:scale-100 group-focus-within:scale-100",
				children: links.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: r.to,
					className: "group/item block rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium text-primary transition-colors group-hover/item:text-teal-deep",
						children: r.label
					})
				}, r.label))
			})
		})]
	});
}
function AuthNavControls({ authDestination, linkCls, mobile = false, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthRuntimeBoundary, {
		boundary: "site_nav_auth_controls",
		fallback: null,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(dist_exports.Show, {
			when: "signed-out",
			treatPendingAsSignedOut: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login/$",
				params: { _splat: "" },
				search: {
					course: void 0,
					redirect: authDestination
				},
				onClick: onNavigate,
				className: mobile ? "w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-primary/80 hover:bg-primary/5" : linkCls,
				children: "Login"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(dist_exports.Show, {
			when: "signed-in",
			treatPendingAsSignedOut: false,
			children: mobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-primary/80",
					children: "Your account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(dist_exports.UserButton, {})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(dist_exports.UserButton, { showName: true })
		})]
	});
}
function SiteNav({ alwaysSolid = false }) {
	const location = useLocation();
	const [scrolled, setScrolled] = (0, import_react.useState)(alwaysSolid);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [eventsOpen, setEventsOpen] = (0, import_react.useState)(false);
	const [resourcesOpen, setResourcesOpen] = (0, import_react.useState)(false);
	const [contactOpen, setContactOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (alwaysSolid) return;
		const on = () => setScrolled(window.scrollY > 30);
		on();
		window.addEventListener("scroll", on);
		return () => window.removeEventListener("scroll", on);
	}, [alwaysSolid]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);
	const solid = alwaysSolid || scrolled;
	const authDestination = location.pathname === "/login" || location.pathname.startsWith("/login/") || location.pathname === "/signup" || location.pathname.startsWith("/signup/") || location.pathname === "/sign-in" || location.pathname.startsWith("/sign-in/") || location.pathname === "/sign-up" || location.pathname.startsWith("/sign-up/") ? void 0 : currentPath(location);
	const linkCls = `text-sm font-medium transition-colors duration-500 ${solid ? "text-primary/80 hover:text-primary" : "text-white/90 hover:text-white"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? "bg-background shadow-sm border-b border-border/40" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: () => window.scrollTo(0, 0),
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: solid ? logo_colored_text_default : logo_white_text_default,
						alt: "Paul & Timothy Training Centre",
						width: 1774,
						height: 887,
						fetchPriority: "high",
						className: "h-16 w-auto md:h-[4.5rem]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 min-[1180px]:flex",
					children: [
						mainLinks.map((l) => l.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: linkCls,
							children: l.label
						}, l.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: l.href,
							className: linkCls,
							children: l.label
						}, l.label)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropdown, {
							label: "Events",
							links: eventLinks,
							linkCls
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/courses",
							className: linkCls,
							children: "Courses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropdown, {
							label: "Resources",
							links: resources,
							linkCls
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropdown, {
							label: "Contact",
							links: contactLinks,
							linkCls
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/partner",
							className: linkCls,
							children: "Partner with us"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-3 min-[1180px]:-ml-4 min-[1180px]:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthNavControls, {
						authDestination,
						linkCls
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/assessment",
						className: `group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft ${solid ? "bg-primary text-primary-foreground" : "bg-white text-primary"}`,
						children: ["Start Here", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(!open),
					className: `rounded-full p-2 transition-colors duration-500 min-[1180px]:hidden ${solid ? "text-primary" : "text-white"}`,
					"aria-label": "Menu",
					"aria-expanded": open,
					"aria-controls": "mobile-navigation",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "mobile-navigation",
			className: "bg-background border-t border-border/40 min-[1180px]:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 px-6 py-4",
				children: [
					mainLinks.map((l) => l.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5",
						children: l.label
					}, l.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5",
						children: l.label
					}, l.label)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setEventsOpen(!eventsOpen),
						className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5",
						children: ["Events", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform duration-300 ${eventsOpen ? "rotate-180" : ""}` })]
					}),
					eventsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-3 flex flex-col gap-1 border-l-2 border-border/50 pl-3",
						children: eventLinks.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: r.to,
							onClick: () => {
								setOpen(false);
								setEventsOpen(false);
							},
							className: "rounded-lg px-3 py-2 text-sm font-medium text-primary/80 hover:bg-primary/5",
							children: r.label
						}, r.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/courses",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5",
						children: "Courses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setResourcesOpen(!resourcesOpen),
						className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5",
						children: ["Resources", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform duration-300 ${resourcesOpen ? "rotate-180" : ""}` })]
					}),
					resourcesOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-3 flex flex-col gap-1 border-l-2 border-border/50 pl-3",
						children: resources.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: r.to,
							onClick: () => {
								setOpen(false);
								setResourcesOpen(false);
							},
							className: "rounded-lg px-3 py-2 text-sm font-medium text-primary/80 hover:bg-primary/5",
							children: r.label
						}, r.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setContactOpen(!contactOpen),
						className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5",
						children: ["Contact", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform duration-300 ${contactOpen ? "rotate-180" : ""}` })]
					}),
					contactOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-3 flex flex-col gap-1 border-l-2 border-border/50 pl-3",
						children: contactLinks.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: r.to,
							onClick: () => {
								setOpen(false);
								setContactOpen(false);
							},
							className: "rounded-lg px-3 py-2 text-sm font-medium text-primary/80 hover:bg-primary/5",
							children: r.label
						}, r.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/partner",
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5",
						children: "Partner with us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthNavControls, {
						authDestination,
						linkCls,
						mobile: true,
						onNavigate: () => setOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/assessment",
						onClick: () => setOpen(false),
						className: "mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground",
						children: ["Start Here ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		})]
	});
}
var cols = [
	{
		title: "Quick Links",
		links: [
			{
				label: "Home",
				to: "/"
			},
			{
				label: "Why We Exist",
				to: "/why-we-exist"
			},
			{
				label: "Events",
				to: "/events/upcoming"
			},
			{
				label: "Courses",
				to: "/courses"
			},
			{
				label: "Resources",
				to: "/articles"
			},
			{
				label: "Contact Us",
				to: "/contact"
			},
			{
				label: "Partner With Us",
				to: "/partner"
			}
		]
	},
	{
		title: "Events",
		links: [{
			label: "Upcoming Events",
			to: "/events/upcoming"
		}, {
			label: "Previous Events",
			to: "/events/previous"
		}]
	},
	{
		title: "Courses",
		links: [{
			label: "Course Overview",
			to: "/courses"
		}, {
			label: "Talk to a Mentor",
			to: "/interaction"
		}]
	},
	{
		title: "Resources",
		links: [
			{
				label: "Assessment",
				to: "/assessment"
			},
			{
				label: "Articles",
				to: "/articles"
			},
			{
				label: "FAQs",
				to: "/faqs"
			}
		]
	},
	{
		title: "Connect",
		links: [{
			label: "Contact Us",
			to: "/contact"
		}, {
			label: "Find a Mentor",
			to: "/interaction"
		}]
	}
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		id: "contact",
		className: "bg-primary text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-12 px-6 py-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,4fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: () => window.scrollTo(0, 0),
					className: "block w-fit transition-transform hover:-translate-y-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_white_text_default,
						alt: "Paul & Timothy Training Centre",
						width: 1659,
						height: 948,
						loading: "lazy",
						className: "h-16 w-auto"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70",
					children: "Equipping ordinary people for an extraordinary mission. Rooted in Scripture. Sent in love."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex gap-3",
					children: [
						{
							Icon: Instagram,
							href: "https://www.instagram.com/wordlifefoundation?igsi=MXU4dm9rdmdpd243Zw==",
							label: "Instagram"
						},
						{
							Icon: Youtube,
							href: "https://youtube.com/@roselindrex?si=CPGbrdWEXdPTEobu",
							label: "YouTube"
						},
						{
							Icon: Facebook,
							href: "https://www.facebook.com/share/1ERBAxLiB5/?mibextid=wwXIfr",
							label: "Facebook"
						}
					].map(({ Icon, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href,
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": label,
						className: "grid h-10 w-10 place-items-center rounded-full border border-white/15 text-primary-foreground/80 transition hover:bg-white/10 hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
					}, label))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5",
				children: cols.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-primary-foreground/50",
					children: col.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: col.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-sm text-primary-foreground/85 transition hover:text-white",
						children: l.label
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "text-sm text-primary-foreground/85 transition hover:text-white",
						children: l.label
					}) }, l.label))
				})] }, col.title))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-primary-foreground/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Paul & Timothy Training Centre. All rights reserved."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"Designed and Developed by",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://theeagleseye.in/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "font-semibold text-primary-foreground/80 transition hover:text-white",
							children: "The Eagle Eye"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white",
							children: "Privacy Policy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white",
							children: "Terms"
						})]
					})
				]
			})
		})]
	});
}
/**
* FirstLoadConfetti — standalone, removable celebratory confetti burst.
* Fires every time the homepage ("/") loads.
* To remove permanently: delete this file and its usage in routes/__root.tsx.
*/
var DURATION_MS = 6e3;
var PARTICLE_COUNT = 320;
var COLORS = [
	"#2D0A4E",
	"#43DBC3",
	"#E8C25A",
	"#FDF6EC",
	"#7A4FA3"
];
function FirstLoadConfetti() {
	(0, import_react.useEffect)(() => {
		if (window.location.pathname !== "/") return;
		const canvas = document.createElement("canvas");
		canvas.setAttribute("aria-hidden", "true");
		canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
		document.body.appendChild(canvas);
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			canvas.remove();
			return;
		}
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		ctx.scale(dpr, dpr);
		const particles = Array.from({ length: PARTICLE_COUNT }, () => {
			const fromLeft = Math.random() < .5;
			const angle = fromLeft ? -Math.PI / 3 - Math.random() * (Math.PI / 6) : -Math.PI + Math.PI / 6 + Math.random() * (Math.PI / 6);
			const speed = 18 + Math.random() * 12;
			return {
				x: fromLeft ? 0 : window.innerWidth,
				y: window.innerHeight * (.7 + Math.random() * .3),
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				size: 8 + Math.random() * 8,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				rotation: Math.random() * Math.PI * 2,
				rotationSpeed: (Math.random() - .5) * .3,
				shape: Math.random() < .7 ? "rect" : "circle"
			};
		});
		const gravity = .16;
		const drag = .992;
		const start = performance.now();
		let raf = 0;
		const tick = (now) => {
			const elapsed = now - start;
			const fade = Math.max(0, 1 - elapsed / DURATION_MS);
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			for (const p of particles) {
				p.vx *= drag;
				p.vy = p.vy * drag + gravity;
				p.x += p.vx;
				p.y += p.vy;
				p.rotation += p.rotationSpeed;
				ctx.save();
				ctx.globalAlpha = fade;
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.fillStyle = p.color;
				if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
				else {
					ctx.beginPath();
					ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
					ctx.fill();
				}
				ctx.restore();
			}
			if (elapsed < DURATION_MS) raf = requestAnimationFrame(tick);
			else canvas.remove();
		};
		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			canvas.remove();
		};
	}, []);
	return null;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$21 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Paul & Timothy Training Centre — Discover Your Calling" },
			{
				name: "description",
				content: "You were made for a purpose. Discover God's calling, take the assessment, receive mentorship and get equipped for ministry."
			},
			{
				property: "og:title",
				content: "Paul & Timothy Training Centre"
			},
			{
				property: "og:description",
				content: "Equipping ordinary people for an extraordinary mission. Assessments, mentorship and training rooted in Scripture."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700&family=Noto+Sans:wght@300;400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("body", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClerkProvider, {
			appearance: { theme: shadcn },
			prefetchUI: true,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		}) })]
	});
}
function RootComponent() {
	const { queryClient } = Route$21.useRouteContext();
	const location = useRouter().state.location;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthRuntimeBoundary, {
				boundary: "user_record_sync",
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRecordSync, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { alwaysSolid: ![
				"/",
				"/articles",
				"/faqs",
				"/partner",
				"/ministry-calling",
				"/spiritual-gifts",
				"/apest-assessment"
			].includes(location.pathname) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirstLoadConfetti, {})
		]
	});
}
function UserRecordSync() {
	const { isLoaded, isSignedIn, userId } = (0, dist_exports.useAuth)();
	const syncedUserId = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!isLoaded || !isSignedIn || !userId || syncedUserId.current === userId) return;
		syncedUserId.current = userId;
		syncCurrentUser().catch(() => {
			syncedUserId.current = null;
		});
	}, [
		isLoaded,
		isSignedIn,
		userId
	]);
	return null;
}
var $$splitComponentImporter$20 = () => import("./routes-NRHKXQSz.mjs");
var Route$20 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./apest-assessment-DIQEo_ap.mjs");
var Route$19 = createFileRoute("/apest-assessment")({
	head: () => ({ meta: [{ title: "APEST Spiritual Gifts Assessment" }, {
		name: "description",
		content: "Identify your spiritual gifting based on the five-fold ministry roles."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./articles-Dk1mdi2R.mjs");
var Route$18 = createFileRoute("/articles")({
	head: () => ({ meta: [
		{ title: "Articles — Paul & Timothy Training Centre" },
		{
			name: "description",
			content: "Teaching, encouragement and practical wisdom for believers discovering and walking out their ministry calling."
		},
		{
			property: "og:title",
			content: "Articles — Paul & Timothy Training Centre"
		},
		{
			property: "og:description",
			content: "Short reads on calling, discipleship, mentorship and ministry in the everyday."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./assessment-B2plyRmC.mjs");
var Route$17 = createFileRoute("/assessment")({
	head: () => ({ meta: [{ title: "Assessments — Paul & Timothy Training Centre" }, {
		name: "description",
		content: "Discover your calling, gifts, and ministry roles."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./contact-B7uH1bem.mjs");
var Route$16 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./courses-DIBXoHn1.mjs");
var Route$15 = createFileRoute("/courses")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./events-Bh-cUjKB.mjs");
var Route$14 = createFileRoute("/events")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./faqs-DOOXNhPI.mjs");
var Route$13 = createFileRoute("/faqs")({
	head: () => ({ meta: [
		{ title: "FAQs — Paul & Timothy Training Centre" },
		{
			name: "description",
			content: "Answers about the Ministry Calling Assessment, training courses, mentorship and how to get started."
		},
		{
			property: "og:title",
			content: "FAQs — Paul & Timothy Training Centre"
		},
		{
			property: "og:description",
			content: "Common questions about assessments, courses, mentorship and joining the centre."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./interaction-Dfyg2Ndz.mjs");
var Route$12 = createFileRoute("/interaction")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./ministry-calling-DfHL7_KP.mjs");
var Route$11 = createFileRoute("/ministry-calling")({
	head: () => ({ meta: [
		{ title: "Ministry Calling Assessment — Paul & Timothy Training Centre" },
		{
			name: "description",
			content: "Prayerfully discover the people group God may be calling you to serve. 21 questions across seven ministry fields, scored instantly."
		},
		{
			property: "og:title",
			content: "Ministry Calling Assessment"
		},
		{
			property: "og:description",
			content: "Answer 21 honest questions and receive an instant profile of the people group God may be calling you to serve."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./partner-9ts70gje.mjs");
var Route$10 = createFileRoute("/partner")({
	head: () => ({ meta: [{ title: "Partner with Us — Paul & Timothy Training Centre" }, {
		name: "description",
		content: "Join hands with us to equip workers for the harvest."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./spiritual-gifts-BRciiPtd.mjs");
var Route$9 = createFileRoute("/spiritual-gifts")({
	head: () => ({ meta: [{ title: "Type of Calling Assessment" }, {
		name: "description",
		content: "Identify the type of Christian calling that best describes God's present direction for your life."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./why-we-exist-DzzqsQQ4.mjs");
var Route$8 = createFileRoute("/why-we-exist")({
	head: () => ({ meta: [{ title: "Why We Exist — Paul & Timothy Training Centre" }, {
		name: "description",
		content: "Learn about our mission, vision, and the trainers behind the centre."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./articles_.calling-BNkaxown.mjs");
var Route$7 = createFileRoute("/articles_/calling")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./articles_.rhenius-BRKhWYSB.mjs");
var Route$6 = createFileRoute("/articles_/rhenius")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./articles_.scudder-DhGk_nJf.mjs");
var Route$5 = createFileRoute("/articles_/scudder")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./articles_.spiritual-gifts-CO3ZkBbc.mjs");
var Route$4 = createFileRoute("/articles_/spiritual-gifts")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./courses.index-DwOwZ6M7.mjs");
var Route$3 = createFileRoute("/courses/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./events.gallery-CfepPy2Y.mjs");
var Route$2 = createFileRoute("/events/gallery")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./events.previous-CLWJMJM4.mjs");
var Route$1 = createFileRoute("/events/previous")({
	head: () => ({ meta: [{ title: "Previous Events — Paul & Timothy Training Centre" }, {
		name: "description",
		content: "Look back at past conferences, workshops and ministry gatherings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./events.upcoming-CXVbQAvr.mjs");
var Route = createFileRoute("/events/upcoming")({
	head: () => ({ meta: [{ title: "Upcoming Events — Paul & Timothy Training Centre" }, {
		name: "description",
		content: "Browse upcoming conferences, workshops, retreats and prayer gatherings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var ApestAssessmentRoute = Route$19.update({
	id: "/apest-assessment",
	path: "/apest-assessment",
	getParentRoute: () => Route$21
});
var ArticlesRoute = Route$18.update({
	id: "/articles",
	path: "/articles",
	getParentRoute: () => Route$21
});
var AssessmentRoute = Route$17.update({
	id: "/assessment",
	path: "/assessment",
	getParentRoute: () => Route$21
});
var ContactRoute = Route$16.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$21
});
var CoursesRoute = Route$15.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => Route$21
});
var EventsRoute = Route$14.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$21
});
var FaqsRoute = Route$13.update({
	id: "/faqs",
	path: "/faqs",
	getParentRoute: () => Route$21
});
var InteractionRoute = Route$12.update({
	id: "/interaction",
	path: "/interaction",
	getParentRoute: () => Route$21
});
var MinistryCallingRoute = Route$11.update({
	id: "/ministry-calling",
	path: "/ministry-calling",
	getParentRoute: () => Route$21
});
var PartnerRoute = Route$10.update({
	id: "/partner",
	path: "/partner",
	getParentRoute: () => Route$21
});
var RegisterRoute = Route$24.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$21
});
var SpiritualGiftsRoute = Route$9.update({
	id: "/spiritual-gifts",
	path: "/spiritual-gifts",
	getParentRoute: () => Route$21
});
var WhyWeExistRoute = Route$8.update({
	id: "/why-we-exist",
	path: "/why-we-exist",
	getParentRoute: () => Route$21
});
var ArticlesCallingRoute = Route$7.update({
	id: "/articles_/calling",
	path: "/articles/calling",
	getParentRoute: () => Route$21
});
var ArticlesRheniusRoute = Route$6.update({
	id: "/articles_/rhenius",
	path: "/articles/rhenius",
	getParentRoute: () => Route$21
});
var ArticlesScudderRoute = Route$5.update({
	id: "/articles_/scudder",
	path: "/articles/scudder",
	getParentRoute: () => Route$21
});
var ArticlesSpiritualGiftsRoute = Route$4.update({
	id: "/articles_/spiritual-gifts",
	path: "/articles/spiritual-gifts",
	getParentRoute: () => Route$21
});
var CoursesIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => CoursesRoute
});
var CoursesSlugRoute = Route$22.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => CoursesRoute
});
var EventsGalleryRoute = Route$2.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => EventsRoute
});
var EventsPreviousRoute = Route$1.update({
	id: "/previous",
	path: "/previous",
	getParentRoute: () => EventsRoute
});
var EventsUpcomingRoute = Route.update({
	id: "/upcoming",
	path: "/upcoming",
	getParentRoute: () => EventsRoute
});
var LoginSplatRoute = Route$23.update({
	id: "/login/$",
	path: "/login/$",
	getParentRoute: () => Route$21
});
var SignInSplatRoute = Route$25.update({
	id: "/sign-in/$",
	path: "/sign-in/$",
	getParentRoute: () => Route$21
});
var SignUpSplatRoute = Route$26.update({
	id: "/sign-up/$",
	path: "/sign-up/$",
	getParentRoute: () => Route$21
});
var SignupSplatRoute = Route$27.update({
	id: "/signup/$",
	path: "/signup/$",
	getParentRoute: () => Route$21
});
var CoursesRouteChildren = {
	CoursesSlugRoute,
	CoursesIndexRoute
};
var CoursesRouteWithChildren = CoursesRoute._addFileChildren(CoursesRouteChildren);
var EventsRouteChildren = {
	EventsGalleryRoute,
	EventsPreviousRoute,
	EventsUpcomingRoute
};
var rootRouteChildren = {
	IndexRoute,
	ApestAssessmentRoute,
	ArticlesRoute,
	AssessmentRoute,
	ContactRoute,
	CoursesRoute: CoursesRouteWithChildren,
	EventsRoute: EventsRoute._addFileChildren(EventsRouteChildren),
	FaqsRoute,
	InteractionRoute,
	MinistryCallingRoute,
	PartnerRoute,
	RegisterRoute,
	SpiritualGiftsRoute,
	WhyWeExistRoute,
	ArticlesCallingRoute,
	ArticlesRheniusRoute,
	ArticlesScudderRoute,
	ArticlesSpiritualGiftsRoute,
	LoginSplatRoute,
	SignInSplatRoute,
	SignUpSplatRoute,
	SignupSplatRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		defaultPreloadStaleTime: 3e4
	});
};
//#endregion
export { getRouter };
