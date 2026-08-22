import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { F as CircleCheck, q as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AssessmentResultGate } from "./AssessmentResultGate-DyUzwrkY.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spiritual-gifts-BRciiPtd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var QUESTIONS = [
	"I desire to use my everyday occupation, family responsibilities, relationships, and available time to serve God.",
	"I have a strong and persistent conviction that God is calling me to make Christian ministry my primary vocation.",
	"I see my workplace or profession as an opportunity to demonstrate Christ and influence people for the Gospel.",
	"I experience joy and fulfilment when serving God through hospitality, encouragement, relationships, practical service, or caring for others.",
	"I am willing to surrender my career plans, ambitions, and personal goals if God clearly calls me into full-time ministry.",
	"I desire to remain in or pursue a profession while intentionally using it as a platform for Christian ministry.",
	"I believe I can faithfully serve God alongside my present occupation, studies, family, or other regular responsibilities.",
	"I feel that God is placing a deep & continuing burden to preach, teach, evangelise, disciple, shepherd, or serve for a people who live far off.",
	"I can support myself financially through my profession while also actively engaging in Christian ministry.",
	"I see my daily responsibilities as opportunities to represent Christ rather than as separate from my Christian service.",
	"I am willing to make significant sacrifices, including financial or lifestyle changes, even to resign my job to obey God's call to ministry.",
	"My professional skills and workplace relationships give me regular opportunities to reach people who may not ordinarily attend church."
];
var SCALE = [
	{
		label: "Not at all true of me",
		val: 1
	},
	{
		label: "Slightly true of me",
		val: 2
	},
	{
		label: "Sometimes true / Unsure",
		val: 3
	},
	{
		label: "Mostly true of me",
		val: 4
	},
	{
		label: "Very true of me",
		val: 5
	}
];
var CALLS = [
	"Part-Time Call",
	"Full-Time Call",
	"Tentmakers' Call"
];
var MAPPING = {
	"Part-Time Call": [
		1,
		4,
		7,
		10
	],
	"Full-Time Call": [
		2,
		5,
		8,
		11
	],
	"Tentmakers' Call": [
		3,
		6,
		9,
		12
	]
};
var DESCRIPTIONS = {
	"Part-Time Call": "A part-time call describes a believer who has a regular occupation or other responsibilities while also actively serving God in their available time and sphere of influence. You do not have to be employed by a church or ministry organisation to serve God — your home, workplace, family, business, and relationships can all become places of Christian service. Biblical example: Philemon, whose ministry included hospitality, relationships, encouragement, and caring for fellow believers (Philemon 1–2, 7; Colossians 3:23).",
	"Full-Time Call": "A full-time call refers to a person called by God who must leave their primary occupation to devote themselves entirely to Christian ministry. It involves making Christian ministry the primary vocational focus of one's life and being willing to surrender personal plans and career ambitions for God's purpose. Biblical example: Peter, who left his fishing occupation to follow Christ in total surrender and availability (Luke 5:10–11; Matthew 4:19–20; Mark 8:34).",
	"Tentmakers' Call": "A tentmaker's call refers to a form of bi-vocational ministry, where a person works in a profession or trade to financially support themselves while also engaging in Christian ministry. Workplaces can be mission fields: Christian professionals engage with people who may not attend church, demonstrating Christ's character and sharing the Gospel naturally. Your profession itself can become a platform for ministry. Biblical example: the Apostle Paul, who worked as a tentmaker while preaching the Gospel (Acts 18:2–4; 20:33–35; Colossians 3:17)."
};
function bandFor(score) {
	if (score >= 16) return {
		label: "Strong Indication",
		text: "Your responses show a strong indication toward this type of calling. Continue seeking God through prayer, Scripture, wise counsel, and practical opportunities to serve."
	};
	if (score >= 11) return {
		label: "Possible Indication",
		text: "Your responses show some evidence of this type of calling. Spend more time discerning your gifts, desires, opportunities, and God's direction."
	};
	if (score >= 6) return {
		label: "Limited Indication",
		text: "Some aspects of this calling may be present, but your responses currently show limited evidence that this is your primary calling."
	};
	return {
		label: "Little Indication",
		text: "Your responses show little indication toward this type of calling at this stage. This does not mean God cannot lead you differently in the future."
	};
}
function TypeOfCallAssessment() {
	const [step, setStep] = (0, import_react.useState)(1);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const answered = Object.keys(answers).length;
	const progress = step === 1 ? Math.round(answered / QUESTIONS.length * 100) : 100;
	const progressLabel = step === 1 ? `${answered}/${QUESTIONS.length}` : "Complete";
	const isQuizComplete = (0, import_react.useMemo)(() => Object.keys(answers).length === QUESTIONS.length, [answers]);
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
			"Part-Time Call": 0,
			"Full-Time Call": 0,
			"Tentmakers' Call": 0
		};
		for (const call of CALLS) MAPPING[call].forEach((qNum) => {
			scores[call] += answers[qNum - 1] || 0;
		});
		const primary = [...CALLS].sort((a, b) => scores[b] - scores[a])[0];
		return {
			scores,
			primary,
			band: bandFor(scores[primary])
		};
	}, [answers, step]);
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
							children: "Ministry Type Assessment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg",
							children: "Prayerfully explore whether God may be leading you to serve through a part-time, full-time, or tentmaking call."
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-10",
						children: QUESTIONS.map((q, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
								className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5",
								children: SCALE.map((opt) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleAnswer(idx, opt.val),
										className: `rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${answers[idx] === opt.val ? "border-teal-deep bg-teal/10 text-teal-deep shadow-sm" : "border-border/60 bg-background text-muted-foreground hover:bg-muted"}`,
										children: opt.label
									}, opt.val);
								})
							})]
						}, idx))
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
					assessmentType: "spiritual_gifts",
					answers: Object.fromEntries(Object.entries(answers)),
					result: {
						scores: results.scores,
						primary: results.primary,
						band: results.band
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
										children: "Your Result"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] uppercase tracking-widest text-teal",
												children: "Your Possible Calling"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-serif text-3xl font-medium md:text-4xl",
												children: results.primary
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 inline-block rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur",
												children: [
													results.scores[results.primary],
													" / 20 — ",
													results.band.label
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80",
										children: results.band.text
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-border/60 bg-card p-8 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-teal-deep",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-6 bg-teal-deep" }), " Your Calling Description"]
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-cream p-8 md:p-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-2xl font-medium text-primary",
										children: "All Scores"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[15px] text-muted-foreground max-w-2xl",
										children: "Each category is scored out of 20. 16–20 is a strong indication, 11–15 a possible indication, 6–10 a limited indication, and 4–5 little indication."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8 space-y-6",
										children: CALLS.map((call) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-b border-border/60 pb-6 last:border-0 last:pb-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline justify-between gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-primary",
													children: call
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-sm font-semibold text-teal-deep",
													children: [
														results.scores[call],
														" / 20 · ",
														bandFor(results.scores[call]).label
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-3 text-[15px] leading-relaxed text-muted-foreground",
												children: DESCRIPTIONS[call]
											})]
										}, call))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-[15px] leading-relaxed text-muted-foreground max-w-2xl mx-auto",
								children: "God calls us in different ways. Some serve in full-time ministry, others through regular jobs while being involved in ministry, and some work as tentmakers, combining both. Know your specific call and remain faithful to it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center pt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setAnswers({});
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
export { TypeOfCallAssessment as component };
