import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { F as CircleCheck, q as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AssessmentResultGate } from "./AssessmentResultGate-DyUzwrkY.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/apest-assessment-DIQEo_ap.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var QUESTIONS = [
	"You often find yourself starting new initiatives or organisations from scratch.",
	"When you see injustice or moral compromise, you feel compelled to speak up immediately.",
	"You naturally look for opportunities to share your beliefs and convictions with others.",
	"People often seek you out for emotional support and guidance.",
	"You enjoy breaking down complex concepts into understandable parts.",
	"You're energised by creating systems and structures that others can build upon.",
	"You have a strong sense of what needs to change in organisations or communities.",
	"You find it easy to adapt your communication style to connect with different audiences.",
	"You're deeply concerned about the personal growth and well-being of others.",
	"You love researching and discovering new insights about familiar topics.",
	"You're comfortable challenging traditional ways of doing things to pioneer new approaches.",
	"You can often sense underlying problems before they become apparent to others.",
	"You're energised by helping others discover and embrace new ideas or beliefs.",
	"You naturally create environments where people feel safe and accepted.",
	"You find fulfilment in helping others develop their understanding and skills.",
	"You see opportunities and possibilities where others see obstacles.",
	"You feel a strong responsibility to speak truth, even when it's uncomfortable.",
	"You're good at persuading others and building enthusiasm for ideas or causes.",
	"You're patient with people's growth process and celebrate small victories.",
	"You have a gift for making complex information accessible and practical."
];
var ROLES = [
	"Apostle",
	"Prophet",
	"Evangelist",
	"Shepherd",
	"Teacher"
];
var MAPPING = {
	Apostle: [
		1,
		6,
		11,
		16
	],
	Prophet: [
		2,
		7,
		12,
		17
	],
	Evangelist: [
		3,
		8,
		13,
		18
	],
	Shepherd: [
		4,
		9,
		14,
		19
	],
	Teacher: [
		5,
		10,
		15,
		20
	]
};
var DESCRIPTIONS = {
	Apostle: "Apostle is a visionary and pioneer who establishes new initiatives, builds ministries, sees opportunities in challenges, creates systems & structures, and equips others for Kingdom expansion (I Cor 3:10).",
	Prophet: "The Prophet serves as a spiritual watchman, discerning God's voice & deeper truths & injustice, speaks with moral clarity, brings spiritual insight and calls people to righteousness and accountability or moral change (Jeremiah 1:5).",
	Evangelist: "The Evangelist communicates the Gospel with passion and clarity, connects with diverse audiences, and leads others toward spiritual transformation through Christ (2 Corinthians 5:20).",
	Shepherd: "Compassionate caregiver, protects, provides emotional support and nurtures personal growth in their faith (1 Peter 5:2-3).",
	Teacher: "Explains and applies God's Word accurately, helping others mature in biblical truth."
};
function ApestAssessment() {
	const [step, setStep] = (0, import_react.useState)(1);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [q21, setQ21] = (0, import_react.useState)("");
	const answered = Object.keys(answers).length + (q21 ? 1 : 0);
	const progress = step === 1 ? Math.round(answered / 21 * 100) : 100;
	const progressLabel = step === 1 ? `${answered}/21` : "Complete";
	const isQuizComplete = (0, import_react.useMemo)(() => {
		return Object.keys(answers).length === 20 && q21 !== "";
	}, [answers, q21]);
	const handleAnswer = (qIndex, value) => {
		setAnswers((prev) => ({
			...prev,
			[qIndex]: value
		}));
	};
	const showStep = (nextStep) => {
		setStep(nextStep);
		window.setTimeout(() => document.querySelector("#assessment-content")?.scrollIntoView({ behavior: "smooth" }), 0);
	};
	const results = (0, import_react.useMemo)(() => {
		if (step !== 3) return null;
		const scores = {
			Apostle: 0,
			Prophet: 0,
			Evangelist: 0,
			Shepherd: 0,
			Teacher: 0
		};
		for (const [role, qIndices] of Object.entries(MAPPING)) qIndices.forEach((qNum) => {
			scores[role] += answers[qNum - 1] || 0;
		});
		if (q21 && scores[q21] !== void 0) scores[q21] += 2;
		const sortedRoles = Object.entries(scores).sort((a, b) => b[1] - a[1]);
		return {
			scores,
			primary: sortedRoles[0][0],
			secondary: sortedRoles[1][0]
		};
	}, [
		answers,
		q21,
		step
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden gradient-hero pb-24 pt-36 text-white",
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
							children: "Ministry Role Assessment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg",
							children: "Discover how your gifts may align with the five ministry roles of apostle, prophet, evangelist, shepherd, and teacher."
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-16 text-right text-xs font-semibold text-primary/70",
						children: progressLabel
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
				id: "assessment-content",
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
				className: "mx-auto max-w-3xl scroll-mt-28 px-6 pb-24 pt-12 md:pt-16",
				children: [step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-10",
						children: [QUESTIONS.map((q, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[15px] font-medium text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mr-2 text-teal-deep font-semibold",
										children: [idx + 1, "."]
									}),
									" ",
									q
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid grid-cols-3 gap-3",
								children: [
									{
										label: "Not at all",
										val: 0
									},
									{
										label: "Somewhat",
										val: 1
									},
									{
										label: "In every way",
										val: 2
									}
								].map((opt) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleAnswer(idx, opt.val),
										className: `rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${answers[idx] === opt.val ? "border-teal-deep bg-teal/10 text-teal-deep shadow-sm" : "border-border/60 bg-background text-muted-foreground hover:bg-muted"}`,
										children: opt.label
									}, opt.label);
								})
							})]
						}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[15px] font-medium text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-2 text-teal-deep font-semibold",
									children: "21."
								}), "In a group setting, which role do you naturally gravitate toward?"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3",
								children: ROLES.map((role) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setQ21(role),
										className: `rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${q21 === role ? "border-teal-deep bg-teal/10 text-teal-deep shadow-sm" : "border-border/60 bg-background text-muted-foreground hover:bg-muted"}`,
										children: role
									}, role);
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !isQuizComplete,
							onClick: () => showStep(3),
							className: "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-card disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none",
							children: ["View Results ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})]
				}), step === 3 && results && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentResultGate, {
					assessmentType: "apest",
					answers: {
						...Object.fromEntries(Object.entries(answers)),
						q21
					},
					result: {
						scores: results.scores,
						primary: results.primary,
						secondary: results.secondary,
						q21
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						className: "space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[2rem] gradient-hero p-8 text-center text-white shadow-soft md:p-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-12 w-12 text-gold mb-6" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xs font-semibold uppercase tracking-[0.2em] text-white/70",
										children: "Your Results"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 flex flex-col gap-4 sm:flex-row justify-center sm:gap-12",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] uppercase tracking-widest text-teal",
												children: "Primary Gifting"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-serif text-3xl font-medium",
												children: results.primary
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden w-px bg-white/20 sm:block" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] uppercase tracking-widest text-white/50",
												children: "Secondary Gifting"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-serif text-3xl font-medium text-white/90",
												children: results.secondary
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 inline-block rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur",
										children: ["Your final choice was ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-white",
											children: q21
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-border/60 bg-card p-8 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-teal-deep",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-6 bg-teal-deep" }), " Primary Role Description"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mt-4 text-2xl font-medium text-primary",
											children: results.primary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
											children: DESCRIPTIONS[results.primary]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-border/60 bg-card p-8 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-6 bg-muted-foreground/50" }), " Secondary Role Description"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mt-4 text-2xl font-medium text-primary",
											children: results.secondary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
											children: DESCRIPTIONS[results.secondary]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-cream p-8 md:p-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-2xl font-medium text-primary",
										children: "All Roles"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[15px] text-muted-foreground max-w-2xl",
										children: "Remember: Everyone has aspects of each gifting, but most people have one or two dominant areas. Your gifting can develop over time, but focus on the dominant areas first and know that all roles are equally valuable to the community."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8 space-y-6",
										children: ROLES.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4 border-b border-border/60 pb-6 last:border-0 last:pb-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-primary min-w-[100px]",
												children: role
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[15px] text-muted-foreground flex-1",
												children: DESCRIPTIONS[role]
											})]
										}, role))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center pt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setAnswers({});
										setQ21("");
										showStep(1);
									},
									className: "text-sm font-semibold text-primary underline underline-offset-4 hover:text-teal-deep transition-colors",
									children: "Retake Assessment"
								})
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { ApestAssessment as component };
