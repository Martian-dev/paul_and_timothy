import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { B as ChevronDown, C as HeartHandshake, K as Award, N as Clock3, V as Check, W as BookOpen, i as Users, j as Compass, n as X, o as Sparkles, q as ArrowRight, u as Search } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as pttc_equipment_default, t as pttc_community_learning_default } from "./pttc-community-learning-BsdFwABa.mjs";
import { t as pttc_mentorship_default } from "./pttc-mentorship-DIC_Svl-.mjs";
import { t as MentorCTA } from "./MentorCTA-CPavxL25.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses.index-DwOwZ6M7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var pttc_purpose_calling_default = "/assets/pttc-purpose-calling-CF_CHh1E.webp";
var courseImages = [
	pttc_equipment_default,
	pttc_community_learning_default,
	pttc_mentorship_default,
	pttc_purpose_calling_default
];
var courses = [{
	title: "Bible Explosion",
	slug: "bible-exposition",
	category: "Module One",
	level: "Foundational",
	desc: "A fast, guided journey through all 66 books from Genesis to Revelation, until the whole story fits together.",
	sessions: "14 sessions",
	tag: "Foundational"
}, {
	title: "Kingdom Shakers (Knowing Your Call)",
	slug: "kingdom-shakers",
	category: "Module Two",
	level: "Foundational",
	desc: "Discover your calling, understand how God has designed you, and take your first real step into ministry.",
	sessions: "10 sessions over 10 days",
	tag: "Foundational"
}].map((course, index) => ({
	...course,
	image: courseImages[index % courseImages.length],
	number: index + 1
}));
var skillGroups = [
	{
		icon: BookOpen,
		title: "Biblical foundations",
		description: "Read, understand, and apply Scripture with greater confidence in everyday ministry."
	},
	{
		icon: Compass,
		title: "Calling & discernment",
		description: "Recognise your spiritual gifts and turn a sense of calling into a clear next step."
	},
	{
		icon: Users,
		title: "Leadership in practice",
		description: "Plan, communicate, mentor, and serve people with wisdom, courage, and care."
	},
	{
		icon: HeartHandshake,
		title: "Gospel-centred care",
		description: "Listen well, share truth graciously, and support people through real-life questions."
	}
];
var faqs = [
	{
		question: "How do I access a course?",
		answer: "Choose \"Start course\" on either module. You'll be taken to the page where you can sign up and get started."
	},
	{
		question: "How long does each module take?",
		answer: "Bible Explosion runs across 14 sessions. Kingdom Shakers runs across 10 sessions, and is designed to be taken one a day, over ten days."
	},
	{
		question: "Do I need previous ministry experience?",
		answer: "No. Both modules are built for believers beginning to explore their calling, as well as those already serving who want a stronger foundation."
	},
	{
		question: "Will I receive a certificate?",
		answer: "Yes: on completing the required lessons for your module."
	},
	{
		question: "Are the courses online?",
		answer: "Both modules are available online. We also run in-person training programs. See Upcoming Events for dates."
	}
];
function CoursesPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const levels = [
		"All",
		"Foundational",
		"Advance"
	];
	const [level, setLevel] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const levelParam = new URLSearchParams(window.location.search).get("level");
			if (levelParam && levels.includes(levelParam)) return levelParam;
		}
		return "All";
	});
	const visible = (0, import_react.useMemo)(() => {
		const normalisedQuery = query.trim().toLowerCase();
		return courses.filter((course) => (level === "All" || course.level === level) && [
			course.title,
			course.category,
			course.desc
		].join(" ").toLowerCase().includes(normalisedQuery));
	}, [query, level]);
	const [placeholder, setPlaceholder] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const phrases = [
			"Search courses...",
			"Search leadership training...",
			"Search Bible courses...",
			"Search ministry pathways..."
		];
		let currentPhraseIndex = 0;
		let currentCharIndex = 0;
		let isDeleting = false;
		let timeout;
		const type = () => {
			const currentPhrase = phrases[currentPhraseIndex];
			if (isDeleting) {
				setPlaceholder(currentPhrase.substring(0, currentCharIndex - 1));
				currentCharIndex--;
			} else {
				setPlaceholder(currentPhrase.substring(0, currentCharIndex + 1));
				currentCharIndex++;
			}
			let typeSpeed = isDeleting ? 40 : 80;
			if (!isDeleting && currentCharIndex === currentPhrase.length) {
				typeSpeed = 2e3;
				isDeleting = true;
			} else if (isDeleting && currentCharIndex === 0) {
				isDeleting = false;
				currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
				typeSpeed = 400;
			}
			timeout = setTimeout(type, typeSpeed);
		};
		timeout = setTimeout(type, 800);
		return () => clearTimeout(timeout);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .7,
				ease: [
					.2,
					.8,
					.2,
					1
				]
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden gradient-hero px-6 py-20 text-white md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-28 top-10 h-96 w-96 rounded-full bg-teal/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 max-w-3xl text-5xl font-medium leading-[1.04] md:text-7xl",
							children: ["Get trained. Get equipped. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-teal not-italic",
								children: "Get sent."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg leading-relaxed text-white/75",
							children: "Short, focused training for ordinary believers with a heart to serve: built for people with jobs, families and lives already in motion."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: "Two modules to begin with."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-white/70",
									children: "Start by understanding the whole of Scripture, or by naming the calling God has already placed on you."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/interaction",
									className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal transition hover:text-white",
									children: ["Start a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "course-catalog",
					className: "scroll-mt-6 px-6 py-20 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-teal-deep" }), " Our Modules"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-4xl font-medium leading-tight text-primary md:text-5xl",
									children: [
										"Training for the work",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
											className: "text-teal-deep not-italic",
											children: "God has called you to."
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "relative block w-full max-w-md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Search courses"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/70" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: query,
											onChange: (event) => setQuery(event.target.value),
											placeholder,
											className: "h-14 w-full rounded-full border border-border/50 bg-white pl-12 pr-12 text-sm text-primary shadow-sm outline-none transition focus:border-teal-deep focus:ring-2 focus:ring-teal/30"
										}),
										query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setQuery(""),
											className: "absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-primary/70 transition hover:bg-muted hover:text-primary",
											"aria-label": "Clear search",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex flex-wrap justify-start gap-3",
								children: levels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setLevel(l),
									className: `px-8 py-3 rounded-full text-base font-semibold transition-colors ${level === l ? "bg-primary text-white shadow-md" : "bg-[#e8e6e1] text-primary hover:bg-[#dcd9d2]"}`,
									children: l
								}, l))
							}),
							visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-20 flex flex-col items-center text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-medium text-primary",
									children: "No training found yet."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setLevel("All"),
									className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-deep transition hover:text-teal",
									children: ["Show all training ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-12 text-sm text-muted-foreground",
								"aria-live": "polite",
								children: [
									visible.length,
									" of ",
									level === "All" ? courses.length : courses.filter((c) => c.level === level).length,
									" courses available ",
									level !== "All" ? `in ${level}` : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3",
								children: visible.map((course, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
									initial: {
										opacity: 0,
										y: 18
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: index * .04,
										duration: .35
									},
									className: "group flex overflow-hidden rounded-[1.75rem] bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/courses/$slug",
										params: { slug: course.slug },
										className: "flex min-w-0 flex-1 flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-[16/8] overflow-hidden bg-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: course.image,
													alt: "",
													className: "h-full w-full object-cover transition duration-700 group-hover:scale-105",
													loading: "lazy"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "absolute bottom-4 right-5 font-serif text-3xl text-white/90",
													children: String(course.number).padStart(2, "0")
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex min-w-0 flex-1 flex-col p-7",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-semibold uppercase tracking-[.18em] text-teal-deep",
													children: course.category
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-5 text-3xl font-medium leading-tight text-primary",
													children: course.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-5 flex gap-4 border-y border-border/60 py-4 text-xs text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4 text-teal-deep" }), course.sessions]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-teal-deep" }), course.tag]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-5 flex-1 text-sm leading-relaxed text-foreground/75",
													children: course.desc
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition group-hover:-translate-y-0.5 group-hover:shadow-card",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Explore course"]
												})
											]
										})]
									})
								}, course.title))
							})] })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-primary px-6 py-20 text-white md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold uppercase tracking-[.22em] text-teal",
									children: "What you will gain"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-4 text-4xl font-medium leading-tight md:text-5xl",
									children: [
										"Training that moves from",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
											className: "text-teal not-italic",
											children: "understanding to action."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-2xl leading-relaxed text-white/70",
									children: "Each pathway combines biblical grounding with practical ministry skills you can use in your church, family, workplace, and community."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: skillGroups.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-3xl border border-white/15 bg-white/7 p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-12 w-12 place-items-center rounded-2xl bg-teal/15 text-teal",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(skill.icon, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 text-xl font-medium",
										children: skill.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-relaxed text-white/65",
										children: skill.description
									})
								]
							}, skill.title))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "px-6 py-20 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-[2rem] bg-cream p-6 shadow-soft sm:p-10",
							"aria-label": "Paul and Timothy Training Centre certificate preview",
							role: "img",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 -top-16 h-48 w-48 rounded-full border-[28px] border-teal/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative border border-primary/15 bg-background px-6 py-12 text-center shadow-card sm:px-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-teal",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-7 w-7" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 text-[10px] font-semibold uppercase tracking-[.3em] text-teal-deep",
										children: "Paul & Timothy Training Centre"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-5 font-serif text-3xl text-primary sm:text-4xl",
										children: "Certificate of Completion"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-6 h-px max-w-xs bg-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-5 text-sm text-muted-foreground",
										children: "Awarded on completion of an eligible training pathway"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex items-end justify-between gap-4 text-[10px] uppercase tracking-[.16em] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border-t border-border px-4 pt-2",
											children: "Course leader"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border-t border-border px-4 pt-2",
											children: "Date awarded"
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-teal-deep" }), " Certification"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-5 text-4xl font-medium leading-tight text-primary md:text-5xl",
								children: [
									"Complete the pathway.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-teal-deep not-italic",
										children: "Mark the milestone."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl leading-relaxed text-muted-foreground",
								children: "Eligible courses can lead to a certificate after the required lessons and assessments are complete. You will see the exact completion requirements before enrolment, so you know what you are working toward."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-7 space-y-3 text-sm text-foreground/80",
								children: [
									"A clear record of your completed training",
									"A meaningful milestone for your ministry journey",
									"Course-specific requirements shared before you begin"
								].map((benefit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-teal-deep" }), benefit]
								}, benefit))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login/$",
								params: { _splat: "" },
								search: {
									course: void 0,
									redirect: "/courses"
								},
								className: "mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-ring",
								children: ["Start an eligible course ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "px-6 py-20 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-teal-deep" }), " Our purpose"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-5 text-4xl font-medium leading-tight text-primary md:text-5xl",
								children: [
									"Raised to share the Gospel.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-teal-deep not-italic",
										children: "Equipped to fulfil your call."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 max-w-xl leading-relaxed text-muted-foreground",
								children: [
									"\"And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others.\"",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-primary",
										children: "2 Timothy 2:2"
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								{
									image: pttc_mentorship_default,
									label: "Mentorship"
								},
								{
									image: pttc_equipment_default,
									label: "Equipment"
								},
								{
									image: pttc_community_learning_default,
									label: "Community learning"
								},
								{
									image: pttc_purpose_calling_default,
									label: "Purpose & calling"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "group relative aspect-[4/3] overflow-hidden rounded-3xl bg-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: item.label,
									loading: "lazy",
									className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
									className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 to-transparent px-5 pb-5 pt-12 text-lg font-medium text-white",
									children: item.label
								})]
							}, item.label))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-cream px-6 py-20 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[.22em] text-teal-deep",
								children: "Frequently asked questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 text-4xl font-medium leading-tight text-primary md:text-5xl",
								children: ["What to know ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-teal-deep not-italic",
									children: "before you begin."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-md leading-relaxed text-muted-foreground",
								children: "Find quick answers about course access, timing, experience, and certification."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: faqs.map((faq, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group rounded-2xl border border-border/60 bg-card shadow-sm",
								open: index === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left text-lg font-medium text-primary marker:content-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: faq.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-5 w-5 shrink-0 text-teal-deep transition-transform group-open:rotate-180" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-6 pb-6 text-sm leading-relaxed text-muted-foreground",
									children: faq.answer
								})]
							}, faq.question))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentorCTA, {})
			]
		})
	});
}
//#endregion
export { CoursesPage as component };
