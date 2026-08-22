import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { B as ChevronDown, H as CalendarDays, N as Clock3, c as ShieldCheck, r as Video } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as mentorship_default } from "./mentorship-Cf_r-G5O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interaction-Dfyg2Ndz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var faqs = [
	["Who leads the conversation?", "A mature Paul & Timothy mentor—pastors, missionaries, and Bible teachers committed to prayerful, practical counsel."],
	["Is the first session free?", "Yes. Your first 30-minute conversation is free, with no obligation to continue."],
	["How is the session held?", "Choose Zoom or WhatsApp video. We will schedule it around your timezone whenever possible."],
	["Will my conversation remain private?", "Yes. Your request and conversation are treated with pastoral care and confidence."]
];
var calendlyUrl = "https://calendly.com/wordlifefoundation/30min?background_color=ebebeb&primary_color=402158";
var calendlyScriptUrl = "https://assets.calendly.com/assets/external/widget.js";
var calendlyScriptPromise = null;
function loadCalendlyScript() {
	if (typeof window !== "undefined" && window.Calendly) return Promise.resolve();
	if (calendlyScriptPromise) return calendlyScriptPromise;
	calendlyScriptPromise = new Promise((resolve, reject) => {
		const existingScript = document.querySelector(`script[src="${calendlyScriptUrl}"]`);
		if (existingScript) {
			existingScript.addEventListener("load", () => resolve(), { once: true });
			existingScript.addEventListener("error", () => reject(/* @__PURE__ */ new Error("Calendly failed to load")), { once: true });
			return;
		}
		const script = document.createElement("script");
		script.src = calendlyScriptUrl;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(/* @__PURE__ */ new Error("Calendly failed to load"));
		document.body.appendChild(script);
	});
	return calendlyScriptPromise;
}
function CalendlyEmbed() {
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		loadCalendlyScript().then(() => {
			if (cancelled || !containerRef.current || containerRef.current.querySelector("iframe")) return;
			window.Calendly?.initInlineWidget({
				url: calendlyUrl,
				parentElement: containerRef.current
			});
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "calendly-inline-widget overflow-hidden rounded-[1.5rem]",
		"data-url": calendlyUrl,
		"data-auto-load": "false",
		style: {
			width: "100%",
			minWidth: 0,
			height: "700px"
		}
	});
}
function InteractionPage() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
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
					className: "relative overflow-hidden bg-cream px-6 py-18 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-y-0 right-0 hidden w-1/2 lg:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: mentorship_default,
							alt: "Mentor listening in conversation",
							className: "h-full w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-cream via-cream/25 to-transparent" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mx-auto max-w-7xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-teal-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-teal-deep" }), " One-to-one mentorship"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-5 text-5xl font-medium leading-[1.04] text-primary md:text-7xl",
									children: [
										"A quiet conversation.",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
											className: "text-teal-deep not-italic",
											children: "A clearer next step."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground",
									children: "Meet with someone who will listen carefully, pray with you, and help you discern what faithfulness looks like in this season."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#booking",
									className: "mt-8 inline-flex min-h-12 items-center rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-card",
									children: "Talk to Your Mentor"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "booking",
					className: "scroll-mt-6 px-6 py-20 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[.22em] text-teal-deep",
								children: "Book a session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 text-4xl font-medium leading-tight text-primary md:text-5xl",
								children: ["Make room for a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-teal-deep not-italic",
									children: "quiet hour."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-5 w-5 shrink-0 text-teal-deep" }), "30-minute private call with a senior mentor"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-5 w-5 shrink-0 text-teal-deep" }), "Zoom or WhatsApp video, in your timezone"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5 shrink-0 text-teal-deep" }), "Same-week scheduling whenever possible"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 shrink-0 text-teal-deep" }), "Prayerful, confidential and pressure-free"]
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-[2rem] bg-card p-2 shadow-soft sm:p-3 md:p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendlyEmbed, {})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-cream px-6 py-20 md:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[.22em] text-teal-deep",
								children: "Common questions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-4xl text-primary md:text-5xl",
								children: "Before we meet."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 space-y-3",
							children: faqs.map(([question, answer], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-white shadow-sm border border-border/50 overflow-hidden transition-all duration-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setOpenFaq(openFaq === index ? -1 : index),
									className: "flex w-full items-center justify-between gap-4 px-8 py-6 text-left text-xl font-medium text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-5 w-5 shrink-0 text-teal transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}` })]
								}), openFaq === index && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-8 pb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted-foreground",
										children: answer
									})
								})]
							}, question))
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { InteractionPage as component };
