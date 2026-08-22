import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { E as GraduationCap, O as FileText, P as ClipboardCheck, R as ChevronRight, S as Heart, T as HandHeart, i as Users, j as Compass, l as Send, q as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as course_teaching_default } from "./course-teaching-ClOqQTQF.mjs";
import { t as mentorship_default } from "./mentorship-Cf_r-G5O.mjs";
import { t as calling_default } from "./calling-uwu8LRAy.mjs";
import { t as course_bible_default } from "./course-bible-DPZd6LQ1.mjs";
import { t as MentorCTA } from "./MentorCTA-CPavxL25.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NRHKXQSz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var community_default = "/assets/community-BbnecPax.jpg";
var hero_default = "/assets/hero-DeoVg3dP.jpg";
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 24
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .7,
			ease: [
				.2,
				.8,
				.2,
				1
			]
		}
	}
};
function AnimatedLetterLine({ text, className = "", delay = 0, stagger = .03, accent = false }) {
	const chars = text.split("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		initial: "hidden",
		animate: "visible",
		variants: {
			hidden: {},
			visible: { transition: {
				delayChildren: delay,
				staggerChildren: stagger
			} }
		},
		className,
		children: chars.map((char, index) => {
			const content = char === " " ? "\xA0" : char;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				variants: {
					hidden: accent ? {
						opacity: 0,
						y: 8,
						filter: "drop-shadow(0 0 0 rgba(130, 242, 230, 0))"
					} : { opacity: 0 },
					visible: accent ? {
						opacity: 1,
						y: 0,
						filter: "drop-shadow(0 0 14px rgba(130, 242, 230, 0.18))",
						transition: {
							duration: .16,
							ease: [
								.2,
								.8,
								.2,
								1
							]
						}
					} : {
						opacity: 1,
						transition: {
							duration: .04,
							ease: [
								.2,
								.8,
								.2,
								1
							]
						}
					}
				},
				className: accent ? "inline-block text-[oklch(0.85_0.12_180)]" : "inline-block",
				children: content
			}, `${content}-${index}`);
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative min-h-screen overflow-hidden gradient-hero",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_default,
				alt: "Worship gathering",
				width: 1920,
				height: 1280,
				className: "h-full w-full object-cover opacity-40 mix-blend-luminosity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.15_0.1_310)]" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: "hidden",
				animate: "show",
				variants: { show: { transition: { staggerChildren: .15 } } },
				className: "max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
					variants: fadeUp,
					className: "text-4xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedLetterLine, {
								text: "Anyone can do",
								delay: .05,
								stagger: .03
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedLetterLine, {
								text: "ministry.",
								delay: .5,
								stagger: .03
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 block text-2xl font-normal text-white/90 md:text-3xl lg:text-4xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedLetterLine, {
										text: "Discover your calling",
										delay: .8,
										stagger: .03
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedLetterLine, {
										text: "Get trained",
										delay: 1.6,
										stagger: .03
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 block italic text-[oklch(0.85_0.12_180)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										initial: { opacity: 0 },
										animate: { opacity: 1 },
										transition: {
											delay: 2.4,
											duration: .25,
											ease: [
												.2,
												.8,
												.2,
												1
											]
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedLetterLine, {
											text: "Serve with confidence",
											delay: 2.55,
											stagger: .08,
											accent: true
										})
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "mt-10 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/assessment",
						className: "group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]",
						children: ["Discover Your Calling", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/courses",
						className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10",
						children: "Explore Courses"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					delay: 1,
					duration: 1
				},
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50"
			})]
		})]
	});
}
function Section({ children, id, className = "", containerClassName = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: `px-6 py-24 md:py-32 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mx-auto ${containerClassName || "max-w-7xl"}`,
			children
		})
	});
}
function SectionEyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal-deep",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-teal-deep" }), children]
	});
}
function AssessmentCards() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		id: "assessment",
		className: "bg-cream pt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 -mt-40 grid gap-6 md:grid-cols-3",
			children: [
				{
					icon: Users,
					title: "Who should I serve?",
					desc: "Discover the people and the places you've been designed to carry the Gospel to.",
					to: "/ministry-calling"
				},
				{
					icon: Heart,
					title: "What is my call?",
					desc: "Move from a general sense of purpose to a specific next step you can actually take this year.",
					to: "/spiritual-gifts"
				},
				{
					icon: Compass,
					title: "What is my role?",
					desc: "Find out which gifts God has placed in you, and how they shape the way you're meant to serve.",
					to: "/apest-assessment"
				}
			].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: "hidden",
				whileInView: "show",
				viewport: {
					once: true,
					margin: "-80px"
				},
				variants: fadeUp,
				transition: { delay: i * .1 },
				className: "hover-lift group relative flex flex-col rounded-3xl bg-card p-8 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, {
							className: "h-6 w-6",
							strokeWidth: 1.75
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-medium text-primary",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground",
						children: c.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: c.to,
						className: "mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep",
						children: ["Start Assessment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
					})
				]
			}, c.title))
		})
	});
}
function JourneyTimeline() {
	const steps = [
		{
			title: "Take the assessment",
			desc: "Answer a few honest questions. It takes minutes.",
			icon: ClipboardCheck,
			bgClass: "bg-primary",
			textClass: "text-gold"
		},
		{
			title: "Receive your report",
			desc: "Get a clear summary of your gifting, your calling and where they meet.",
			icon: FileText,
			bgClass: "bg-teal",
			textClass: "text-teal"
		},
		{
			title: "Join a course",
			desc: "Short-term, focused training built around what you've been called to.",
			icon: GraduationCap,
			bgClass: "bg-gold",
			textClass: "text-gold"
		},
		{
			title: "Meet your mentor",
			desc: "Draw wisdom from those who have triumphantly walked the path before you.",
			icon: HandHeart,
			bgClass: "bg-teal",
			textClass: "text-teal"
		},
		{
			title: "Go and serve",
			desc: "Step into the harvest: trained, supported and sent.",
			icon: Send,
			bgClass: "bg-primary",
			textClass: "text-gold"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "journey",
		className: "relative overflow-hidden bg-gradient-to-b from-background via-cream/70 to-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-plum/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEyebrow, { children: "Your Journey With Us" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mx-auto max-w-3xl text-2xl font-medium leading-[1.15] text-primary md:text-3xl",
						children: [
							"From wondering",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "my-2 block text-4xl leading-[1.1] sm:text-5xl md:text-6xl",
								children: "“how and where”"
							}),
							"to walking with purpose and clarity."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground",
						children: "We will guide you step by step from discovery to confidence in your purpose and calling."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto mt-20 max-w-6xl md:mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative hidden pb-10 min-[1180px]:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-between items-start",
						children: steps.map((step, index) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex flex-col items-center flex-1",
								children: [
									!(index === steps.length - 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-[55px] left-[calc(50%+56px)] w-[calc(100%-112px)] flex items-center z-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											className: "flex items-center w-full overflow-visible",
											initial: {
												width: "0%",
												opacity: 0
											},
											whileInView: {
												width: "100%",
												opacity: 1
											},
											viewport: {
												once: true,
												amount: .1
											},
											transition: {
												delay: index * .35 + .2,
												duration: .5,
												ease: "easeInOut"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[2px] flex-grow bg-gold/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 text-gold/90 -ml-2 flex-shrink-0" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											scale: 0,
											opacity: 0
										},
										whileInView: {
											scale: 1,
											opacity: 1
										},
										viewport: {
											once: true,
											amount: .1
										},
										transition: {
											delay: index * .15,
											duration: .5,
											type: "spring"
										},
										className: "relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-background border-4 border-background ring-[3px] ring-gold/15 shadow-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `flex h-[84px] w-[84px] items-center justify-center rounded-full text-white shadow-inner ${step.bgClass}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
												className: "h-9 w-9",
												strokeWidth: 1.5
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 15
										},
										whileInView: {
											opacity: 1,
											y: 0
										},
										viewport: {
											once: true,
											amount: .1
										},
										transition: {
											delay: index * .15 + .2,
											duration: .5
										},
										className: "mt-8 flex flex-col items-center text-center px-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `text-[15px] font-bold tracking-widest ${step.textClass}`,
												children: ["0", index + 1]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-[2px] w-5 bg-gold/30" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "mb-2.5 font-serif text-xl font-bold text-primary leading-tight",
												children: [
													step.title.split(" ").slice(0, -1).join(" "),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													step.title.split(" ").slice(-1)
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[15px] text-muted-foreground/90 leading-relaxed max-w-[200px]",
												children: step.desc
											})
										]
									})
								]
							}, index);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-2xl py-12 min-[1180px]:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-12 left-12 top-12 w-[2px] bg-gold/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-16",
						children: steps.map((step, index) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-x-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										scale: 0,
										opacity: 0
									},
									whileInView: {
										scale: 1,
										opacity: 1
									},
									viewport: {
										once: true,
										amount: .1
									},
									transition: {
										delay: index * .15,
										duration: .5,
										type: "spring"
									},
									className: "relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-background border-[5px] border-background ring-[3px] ring-gold/15 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex h-[72px] w-[72px] items-center justify-center rounded-full text-white shadow-inner ${step.bgClass}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
											className: "h-8 w-8",
											strokeWidth: 1.5
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 15
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: {
										once: true,
										amount: .1
									},
									transition: {
										delay: index * .15 + .2,
										duration: .5
									},
									className: "min-w-0 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `text-[15px] font-bold tracking-widest ${step.textClass}`,
											children: ["0", index + 1]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-[2px] w-5 bg-gold/30" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "mb-2 font-serif text-xl font-bold text-primary leading-tight",
											children: [
												step.title.split(" ").slice(0, -1).join(" "),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												step.title.split(" ").slice(-1)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "max-w-[220px] text-[15px] leading-relaxed text-muted-foreground/90",
											children: step.desc
										})
									]
								})]
							}, index);
						})
					})]
				})]
			})
		]
	});
}
function Audience() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "who",
		className: "bg-gradient-to-b from-background to-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEyebrow, { children: "Who Is This For?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-4xl font-medium leading-[1.05] text-primary md:text-5xl",
				children: "Identify the right fit that suits your current situation"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-16 grid gap-6 md:grid-cols-2",
			children: [
				{
					title: "I'm still figuring it out.",
					desc: "You want to serve God, but you're not sure what you're made for. Start with the assessment and a personal report.",
					cta: "Take the Assessment",
					img: calling_default,
					link: "/assessment"
				},
				{
					title: "I know my call, but where do I start?",
					desc: "You've sensed it for a while now. A short course gives you the foundation, and a first step you can actually take.",
					cta: "Explore Courses",
					img: mentorship_default,
					link: "/courses"
				},
				{
					title: "I'm already serving, and want to grow.",
					desc: "Sharpen your spiritual foundation, kingdom values and develop practical skills for your specific calling.",
					cta: "Explore Advance courses",
					img: community_default,
					link: "/courses?level=Advance#course-catalog"
				},
				{
					title: "Help my team grow.",
					desc: "Train your leaders together. For churches, ministries and teams who need to be equipped and trained.",
					cta: "Explore Courses",
					img: course_teaching_default,
					link: "/courses"
				}
			].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				initial: {
					opacity: 0,
					y: 24
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
					delay: i % 2 * .1,
					duration: .6
				},
				className: "hover-lift group grid grid-cols-[minmax(0,1fr)_140px] overflow-hidden rounded-3xl bg-card shadow-card sm:grid-cols-[minmax(0,1fr)_200px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-semibold text-primary md:text-2xl",
							children: it.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-sm leading-relaxed text-muted-foreground",
							children: it.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: it.link,
							className: "mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-deep transition-colors hover:text-primary",
							children: [it.cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: it.img,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					})
				})]
			}, it.title))
		})]
	});
}
function Counter({ target, format, duration = 900 }) {
	const ref = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	const [value, setValue] = (0, import_react.useState)(0);
	const startedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
				observer.disconnect();
			}
		}, {
			threshold: 0,
			rootMargin: "-80px 0px -80px 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!inView || startedRef.current) return;
		startedRef.current = true;
		const start = performance.now();
		let raf;
		const tick = (now) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = Math.floor(eased * target);
			setValue(current);
			if (progress < 1) raf = requestAnimationFrame(tick);
			else setValue(target);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		inView,
		target,
		duration
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		children: format(value)
	});
}
function Mission() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "mission",
		className: "relative overflow-hidden gradient-hero text-white",
		containerClassName: "max-w-[90rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: community_default,
				alt: "",
				className: "h-full w-full object-cover",
				loading: "lazy"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 24
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .7 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.85_0.12_180)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-[oklch(0.85_0.12_180)]" }), "Let's Increase the Count"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl font-medium leading-[1.05] md:text-5xl",
					children: [
						"\"The harvest is plentiful, but the workers are few…\"",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl text-white/60",
							children: "Luke 10:2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-4 block text-3xl italic text-[oklch(0.85_0.12_180)]",
							children: "… and only a handful have ever been trained."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 24
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .7,
					delay: .15
				},
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-lg leading-relaxed text-white/75",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bible colleges provide solid theology education but require three years, leaving out practical ministry training. Most believers want to serve but can't commit that much time. This leads to the misconception that only full-time ministers can do ministry, while the Great Commission to share the Gospel applies to all believers." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paul & Timothy Training Centre closes this gap with short, intentional training designed for ordinary believers with a heart to serve." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-6 border-t border-white/10 pt-8",
						children: [
							{
								value: 15,
								label: "Years of ground experience",
								format: (n) => `${n}+`
							},
							{
								value: 2017,
								label: "Training believers",
								format: (n) => `Since ${n}`
							},
							{
								value: 2439,
								label: "Participants trained",
								format: (n) => `${n}`
							}
						].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl font-medium text-[oklch(0.85_0.12_180)] md:text-4xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
									target: stat.value,
									format: stat.format,
									duration: stat.value === 2017 ? 1500 : stat.value === 2439 ? 2500 : 900
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-xs uppercase tracking-widest text-white/60 leading-snug",
								children: stat.label
							})]
						}, stat.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-3 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 text-sm text-white/80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "Training programs:"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.strong, {
								initial: {
									opacity: 0,
									scale: .7
								},
								whileInView: {
									opacity: 1,
									scale: [1.15, 1]
								},
								viewport: {
									once: true,
									margin: "-80px"
								},
								transition: {
									delay: .4,
									duration: .6,
									type: "spring",
									stiffness: 260,
									damping: 14
								},
								className: "inline-block text-[oklch(0.85_0.12_180)]",
								children: "9 Online & 4 In-person Training"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-white",
							children: "Places Covered:"
						}), " Various parts of Tamil Nadu, Maharashtra, Karnataka, Pune, Gujarat, Singapore & UK"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/courses",
						className: "group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5",
						children: ["Learn More", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
					})
				]
			})]
		})]
	});
}
function Courses() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "courses",
		className: "pb-12 md:pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEyebrow, { children: "Explore Courses" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl font-medium leading-[1.05] text-primary md:text-5xl",
					children: [
						"Get Equipped… ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						" … Without Pressing “Pause” on Life."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground",
					children: "All Paul & Timothy Training Centre courses are built for people with lives, jobs and families already in motion."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/courses",
				className: "inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep hover:text-primary",
				children: ["View all courses ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-14 grid gap-6 md:grid-cols-2",
			children: [{
				img: course_bible_default,
				tag: "Module One",
				slug: "bible-exposition",
				title: "Bible Explosion",
				desc: "Ten hours. Ten days. A daily practice that moves you from knowing about Scripture to knowing God's will and your calling within it."
			}, {
				img: calling_default,
				tag: "Module Two",
				slug: "kingdom-shakers",
				title: "Kingdom Shakers (Knowing Your Call)",
				desc: "Identify your calling and your gifts, discern a faithful next step, and build the spiritual rhythms to sustain it."
			}].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				initial: {
					opacity: 0,
					y: 24
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
					delay: i % 2 * .1,
					duration: .6
				},
				className: "hover-lift group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/9] overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.img,
						alt: c.title,
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur",
						children: c.tag
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-medium text-primary",
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground",
							children: c.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/courses/$slug",
							params: { slug: c.slug },
							className: "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-teal-deep",
							children: ["Explore Course", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
						})
					]
				})]
			}, c.title))
		})]
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		id: "stories",
		className: "bg-cream pt-12 md:pt-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-end justify-between gap-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEyebrow, { children: "How We've Helped" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-4xl font-medium leading-[1.05] text-primary md:text-5xl",
				children: [
					"Our Stories: How PTTC has ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					" equipped believers like you"
				]
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-14 grid gap-6 md:grid-cols-3",
			children: [
				{
					quote: "I now feel prepared and confident to step into ministry — and to strengthen my own family along the way.",
					name: "Bro. Akash",
					role: "Kingdom Shakers 2026"
				},
				{
					quote: "I've been encouraged and equipped to serve young people more effectively.",
					name: "Sis. Lilly",
					role: "Aletheia 2026, Tirunelveli"
				},
				{
					quote: "This training gave me a clear understanding of what counselling is, and helped me see the importance of this ministry.",
					name: "Pastor S. Joe Vimal",
					role: "Counsellors Training 2025, Coimbatore"
				}
			].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
				initial: {
					opacity: 0,
					y: 24
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
					delay: i * .1,
					duration: .6
				},
				className: "hover-lift flex flex-col rounded-3xl bg-card p-8 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "flex-1 font-serif text-lg leading-snug text-primary",
					children: [
						"“",
						t.quote,
						"”"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-xs font-semibold uppercase tracking-wider text-teal-deep",
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
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentCards, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyTimeline, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Audience, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mission, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Courses, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentorCTA, {})
		] })
	});
}
//#endregion
export { Home as component };
