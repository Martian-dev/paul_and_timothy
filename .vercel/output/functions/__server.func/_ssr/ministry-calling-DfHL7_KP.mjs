import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { A as Crown, C as HeartHandshake, G as Baby, d as RotateCcw, i as Users, o as Sparkles, q as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AssessmentResultGate } from "./AssessmentResultGate-DyUzwrkY.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ministry-calling-DfHL7_KP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var SECTIONS = [
	{
		key: "children",
		letter: "A",
		title: "Children",
		subtitle: "0–12 Years",
		icon: Baby,
		questions: [
			"I naturally enjoy spending time with children and helping them learn and grow.",
			"When I hear about children who are neglected, abused, poor, or unreached, I feel deeply burdened.",
			"Teaching children about Jesus and helping them become lifelong followers of Christ excites me."
		]
	},
	{
		key: "teenagers",
		letter: "B",
		title: "Teenagers",
		subtitle: "13–19 Years",
		icon: Sparkles,
		questions: [
			"I enjoy listening to teenagers and helping them navigate the challenges of adolescence.",
			"I feel burdened for teenagers struggling with identity, peer pressure, addiction, emotional pain, or broken families.",
			"I desire to mentor teenagers and help them become committed followers and leaders for Christ."
		]
	},
	{
		key: "youth",
		letter: "C",
		title: "Youth",
		subtitle: "20–35 Years",
		icon: Users,
		questions: [
			"I enjoy mentoring young adults as they make important decisions about career, relationships, and purpose.",
			"I feel burdened for young adults who are searching for purpose, direction, or freedom from life's struggles.",
			"I desire to equip young adults to become spiritually mature disciples and leaders."
		]
	},
	{
		key: "women",
		letter: "D",
		title: "Women",
		subtitle: "Ministry to women",
		icon: HeartHandshake,
		questions: [
			"I have a deep compassion for women facing emotional, family, social, or spiritual challenges.",
			"I enjoy encouraging, mentoring, and helping women grow in Christ.",
			"I desire to see women healed, empowered, and equipped to fulfill God's purpose."
		]
	},
	{
		key: "men",
		letter: "E",
		title: "Men",
		subtitle: "Ministry to men",
		icon: Users,
		questions: [
			"I enjoy encouraging and mentoring men to become godly leaders in their homes, workplaces, and churches.",
			"I feel burdened for men who are struggling with addiction, brokenness, loneliness, or spiritual weakness.",
			"I desire to help men grow into mature disciples who influence others for Christ."
		]
	},
	{
		key: "couples",
		letter: "F",
		title: "Married Couples",
		subtitle: "Marriage & family",
		icon: HeartHandshake,
		questions: [
			"I enjoy helping husbands and wives build healthy, Christ-centered marriages.",
			"I feel burdened when I see marriages hurting because of conflict, poor communication, or family challenges.",
			"I desire to strengthen families by equipping couples with biblical principles for marriage and parenting."
		]
	},
	{
		key: "seniors",
		letter: "G",
		title: "Senior Citizens",
		subtitle: "Honouring the elders",
		icon: Crown,
		questions: [
			"I enjoy spending time with senior citizens, listening to their stories, and encouraging them.",
			"I feel burdened for elderly people who are lonely, neglected, grieving, or spiritually searching.",
			"I desire to help senior citizens continue growing in Christ and finish their race faithfully."
		]
	}
];
var SCALE = [
	{
		value: 1,
		label: "Strongly Disagree"
	},
	{
		value: 2,
		label: "Disagree"
	},
	{
		value: 3,
		label: "Neutral"
	},
	{
		value: 4,
		label: "Agree"
	},
	{
		value: 5,
		label: "Strongly Agree"
	}
];
var TOTAL_QUESTIONS = SECTIONS.length * 3;
function interpret(score) {
	if (score >= 13) return {
		label: "Very Strong Calling",
		note: "This people group may be your primary ministry assignment."
	};
	if (score >= 10) return {
		label: "Strong Interest",
		note: "You have significant passion and potential to serve this group."
	};
	if (score >= 7) return {
		label: "Moderate Interest",
		note: "You may enjoy serving this group occasionally or alongside another ministry."
	};
	return {
		label: "Not a Primary Focus",
		note: "This may not be your primary ministry focus at this time."
	};
}
function AssessmentPage() {
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const resultsRef = (0, import_react.useRef)(null);
	const answered = Object.keys(answers).length;
	const progress = Math.round(answered / TOTAL_QUESTIONS * 100);
	const results = (0, import_react.useMemo)(() => SECTIONS.map((s) => ({
		...s,
		score: s.questions.reduce((sum, _q, i) => sum + (answers[`${s.key}-${i}`] ?? 0), 0)
	})).sort((a, b) => b.score - a.score), [answers]);
	const setAnswer = (id, value) => setAnswers((prev) => ({
		...prev,
		[id]: value
	}));
	const reset = () => {
		setAnswers({});
		setSubmitted(false);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden gradient-hero pt-36 pb-24 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-40 [background:radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--teal)_35%,transparent),transparent_60%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto max-w-4xl px-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .6 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-5xl font-medium leading-[1.05] md:text-7xl",
							children: "Ministry Calling Assessment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg",
							children: "God gives each believer unique passions and burdens for different groups of people. This assessment helps you prayerfully identify the people group God may be calling you to serve."
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-[6.5rem] z-40 border-b border-border/60 bg-background/85 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-4xl items-center gap-4 px-6 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 flex-1 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full gradient-brand transition-all duration-500",
							style: { width: `${progress}%` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold text-primary/70",
						children: [
							answered,
							"/",
							TOTAL_QUESTIONS
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-4xl px-6 pt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border/60 bg-card p-6 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-lg font-semibold text-primary",
							children: "How to answer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "For each statement, move the slider to the number that best describes you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-2 sm:grid-cols-5",
							children: SCALE.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-accent/60 px-3 py-2 text-center text-xs text-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-serif text-lg font-bold",
									children: s.value
								}), s.label]
							}, s.value))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl space-y-8 px-6 py-12",
				children: [
					SECTIONS.map((section, si) => {
						const Icon = section.icon;
						const sectionScore = section.questions.reduce((sum, _q, i) => sum + (answers[`${section.key}-${i}`] ?? 0), 0);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
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
							transition: { duration: .5 },
							className: "overflow-hidden rounded-4xl border border-border/60 bg-card shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 border-b border-border/60 bg-cream/60 px-6 py-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-brand text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-deep",
												children: ["Section ", section.letter]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "font-serif text-xl font-bold text-primary",
												children: section.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: section.subtitle
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-full bg-primary/5 px-4 py-2 text-sm font-semibold text-primary",
										children: [sectionScore, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "/15"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border/50",
								children: section.questions.map((q, qi) => {
									const id = `${section.key}-${qi}`;
									const current = answers[id];
									const questionNumber = si * 3 + qi + 1;
									const currentScale = SCALE.find((item) => item.value === current);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-6 py-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm leading-relaxed text-foreground/90",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mr-2 font-serif font-bold text-teal-deep",
												children: [questionNumber, "."]
											}), q]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 rounded-2xl bg-accent/35 px-4 py-3 sm:px-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex min-h-7 items-center justify-between gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-medium text-muted-foreground",
														children: currentScale ? "Your answer" : "Slide to answer"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-sm font-semibold transition-colors duration-200 ${currentScale ? "text-teal-deep" : "text-muted-foreground/70"}`,
														"aria-live": "polite",
														children: currentScale ? `${currentScale.value} — ${currentScale.label}` : "Not answered"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider, {
													min: 1,
													max: 5,
													step: 1,
													value: [current ?? 3],
													onValueChange: ([value]) => setAnswer(id, value),
													className: "relative mt-2 flex h-11 w-full touch-none select-none items-center",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
														className: "relative h-2 w-full grow overflow-hidden rounded-full bg-primary/12",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: `absolute h-full rounded-full ${currentScale ? "gradient-brand" : "bg-transparent"}` })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, {
														"aria-label": `Question ${questionNumber}: ${q}`,
														"aria-valuetext": currentScale?.label ?? "Not answered",
														className: `grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold shadow-card transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/25 ${currentScale ? "border-background gradient-brand text-white shadow-soft" : "border-primary/25 bg-background text-primary/55"}`,
														children: current ?? "?"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-5 px-1",
													"aria-hidden": "true",
													children: SCALE.map((scale) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-center text-xs font-semibold transition-colors duration-200 ${current === scale.value ? "text-teal-deep" : "text-muted-foreground/55"}`,
														children: scale.value
													}, scale.value))
												})
											]
										})]
									}, id);
								})
							})]
						}, section.key);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-4xl gradient-hero px-8 py-10 text-center text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl font-bold md:text-3xl",
								children: "See your calling profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-2 max-w-md text-sm text-white/75",
								children: answered < TOTAL_QUESTIONS ? `Answer all ${TOTAL_QUESTIONS} statements to unlock your full summary — ${TOTAL_QUESTIONS - answered} to go.` : "All answered. Reveal the people groups you scored highest for."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setSubmitted(true);
										setTimeout(() => {
											resultsRef.current?.scrollIntoView({
												behavior: "smooth",
												block: "start"
											});
										}, 100);
									},
									disabled: answered < TOTAL_QUESTIONS,
									className: "group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-50",
									children: ["View my results", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: reset,
									className: "inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Reset"]
								})]
							})
						]
					}),
					submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentResultGate, {
						assessmentType: "ministry_calling",
						answers: Object.fromEntries(Object.entries(answers)),
						result: { rankings: results.map(({ key, title, score }) => ({
							key,
							title,
							score
						})) },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
							ref: resultsRef,
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .5 },
							className: "scroll-mt-24 rounded-4xl border border-border/60 bg-card p-8 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl font-bold text-primary",
									children: "Your scoring summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Ranked from strongest to lightest burden. Hold these before the Lord in prayer."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 space-y-3",
									children: results.map((r) => {
										const meta = interpret(r.score);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border/60 bg-background p-5 hover-lift",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-serif text-lg font-semibold text-primary",
														children: r.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold text-primary",
														children: [r.score, "/15"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-3 h-2 overflow-hidden rounded-full bg-muted",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-full rounded-full gradient-brand transition-all duration-700",
														style: { width: `${r.score / 15 * 100}%` }
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-3 text-sm font-medium text-teal-deep",
													children: meta.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: meta.note
												})
											]
										}, r.key);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 rounded-3xl bg-cream p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-lg font-bold text-primary",
										children: "Interpreting your results"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-3 space-y-1.5 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-primary",
												children: "13–15"
											}), " Very Strong Calling — may be your primary ministry assignment."] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-primary",
												children: "10–12"
											}), " Strong Interest — significant passion and potential."] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-primary",
												children: "7–9"
											}), " Moderate Interest — serve occasionally or alongside another ministry."] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-primary",
												children: "Below 7"
											}), " May not be your primary focus at this time."] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/courses",
									hash: "recommended",
									className: "mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft",
									children: ["Find a course for your calling ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { AssessmentPage as component };
