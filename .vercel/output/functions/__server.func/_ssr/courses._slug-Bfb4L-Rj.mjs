import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { M as Clock, o as Sparkles, p as Plus, q as ArrowRight, s as Signal } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as courses, t as Route } from "./courses._slug-93dYCK5m.mjs";
import { t as TestimonialVideoGrid } from "./TestimonialVideos-CvyTXeTO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses._slug-Bfb4L-Rj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var getYoutubeEmbedUrl = (url) => {
	try {
		const parsedUrl = new URL(url);
		const videoId = parsedUrl.hostname === "youtu.be" ? parsedUrl.pathname.slice(1) : parsedUrl.searchParams.get("v");
		return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
	} catch {
		return null;
	}
};
function CoursePage() {
	const { course } = Route.useLoaderData();
	const [open, setOpen] = (0, import_react.useState)(0);
	const videoEmbedUrl = course.videoUrl ? getYoutubeEmbedUrl(course.videoUrl) : null;
	const allowedSlugs = ["bible-exposition", "kingdom-shakers"];
	const similar = courses.filter((c) => allowedSlugs.includes(c.slug) && c.slug !== course.slug).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 pt-28 pb-24 md:pt-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-primary",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#courses",
							className: "hover:text-primary",
							children: "Courses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: course.title
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .6 },
					className: "relative mt-6 overflow-hidden rounded-4xl gradient-hero px-6 py-12 text-white shadow-soft md:px-14 md:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: course.img,
						alt: "",
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-gold" }),
										" ",
										course.tag
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-4 font-serif text-4xl font-medium leading-[1.05] md:text-5xl",
									children: course.title
								}),
								course.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 font-serif text-xl text-teal md:text-2xl",
									children: course.subtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-[15px] leading-relaxed text-white/75",
									children: course.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-teal" }),
											" ",
											course.duration
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "h-3.5 w-3.5 text-teal" }),
											" ",
											course.level
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/assessment",
									className: "mt-8 inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }), " Start this module"]
								})
							]
						})
					})]
				}),
				videoEmbedUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "course-video-heading",
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						id: "course-video-heading",
						className: "sr-only",
						children: [course.title, " video"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-video w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								src: videoEmbedUrl,
								title: `${course.title} course video`,
								loading: "lazy",
								allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
								allowFullScreen: true,
								referrerPolicy: "strict-origin-when-cross-origin",
								className: "absolute inset-0 h-full w-full border-0"
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 max-w-3xl space-y-5",
					children: course.summary.split("\n\n").map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg leading-relaxed text-muted-foreground",
						children: para
					}, para.slice(0, 24)))
				}),
				course.gains && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl font-medium text-primary md:text-3xl",
							children: course.gainsHeadline ?? "By completing this module, you will:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 grid gap-3 sm:grid-cols-2",
							children: course.gains.map((gain) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 text-sm leading-relaxed text-foreground/80 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-deep" }), gain]
							}, gain))
						}),
						course.gainsClosing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-3xl text-[15px] font-medium leading-relaxed text-primary",
							children: course.gainsClosing
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl font-medium text-primary md:text-3xl",
						children: course.outlineHeadline ?? "Course Outline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: course.outline.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-60px"
							},
							transition: {
								delay: i * .05,
								duration: .5
							},
							className: "overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setOpen(open === i ? null : i),
								className: `flex w-full items-center gap-4 px-6 py-4 text-left transition-colors duration-300 ${open === i ? "gradient-brand text-white" : "bg-card text-primary hover:bg-accent"}`,
								"aria-expanded": open === i,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${open === i ? "bg-gold text-primary" : "bg-primary/10 text-primary"}`,
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate font-serif text-base font-semibold",
										children: o.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: `h-4 w-4 shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}` })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-6 py-5 text-sm leading-relaxed text-muted-foreground",
										children: o.body
									})
								})
							})]
						}, o.title))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl font-medium text-primary md:text-3xl",
						children: course.testimonialsHeadline ?? "Hear from people who have finished the course"
					}), course.sharedTestimonials ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialVideoGrid, {})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-6 sm:grid-cols-2",
						children: course.testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
							initial: {
								opacity: 0,
								y: 20
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-60px"
							},
							transition: { duration: .6 },
							className: "hover-lift rounded-3xl bg-card p-7 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "font-serif text-lg leading-snug text-primary",
								children: [
									"“",
									t.quote,
									"”"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs font-semibold uppercase tracking-wider text-teal-deep",
								children: [
									t.name,
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: t.role
									})
								]
							})]
						}, t.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl font-medium text-primary md:text-3xl",
						children: "Explore Similar Courses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-6 sm:grid-cols-2",
						children: similar.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/courses/$slug",
							params: { slug: c.slug },
							className: "hover-lift group overflow-hidden rounded-3xl bg-card shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[16/9] overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.img,
									alt: c.title,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur",
									children: c.tag
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-7",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-xl font-medium text-primary",
										children: c.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: c.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep",
										children: ["Explore Course", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
									})
								]
							})]
						}, c.slug))
					})]
				})
			]
		})
	});
}
//#endregion
export { CoursePage as component };
