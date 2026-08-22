import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as course_teaching_default } from "./course-teaching-ClOqQTQF.mjs";
import { t as mentorship_default } from "./mentorship-Cf_r-G5O.mjs";
import { t as calling_default } from "./calling-uwu8LRAy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assessment-B2plyRmC.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function AssessmentHubPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.main, {
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
			className: "flex-1 px-6 pt-32 pb-24 md:pt-40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "font-serif text-5xl font-bold text-primary md:text-6xl",
						children: "Three quick assessments. One clear direction."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground",
						children: "Our three assessments help you identify what God has already been forming in you: the people you're drawn to, the shape your calling takes, and the gifts you've been given to carry it. Take each one, and you'll move from a general sense that God is asking something of you to a specific understanding of what it is… and which course to begin with."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/ministry-calling",
								className: "group relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2.5rem] overflow-hidden p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:aspect-square",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: calling_default,
										alt: "",
										className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/60 backdrop-blur-[3px] transition-colors duration-500 group-hover:bg-primary/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "relative z-10 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-teal",
										children: [
											"Ministry",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Calling"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "relative z-10 mt-3 max-w-[16rem] text-sm leading-relaxed text-white/85 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0",
										children: "Discover who you're called to serve."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/spiritual-gifts",
								className: "group relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2.5rem] overflow-hidden p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:aspect-square",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: course_teaching_default,
										alt: "",
										className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/60 backdrop-blur-[3px] transition-colors duration-500 group-hover:bg-primary/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "relative z-10 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-teal",
										children: [
											"Ministry",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Type"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "relative z-10 mt-3 max-w-[16rem] text-sm leading-relaxed text-white/85 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0",
										children: "Understand what your call actually looks like."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/apest-assessment",
								className: "group relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2.5rem] overflow-hidden p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:aspect-square",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: mentorship_default,
										alt: "",
										className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/60 backdrop-blur-[3px] transition-colors duration-500 group-hover:bg-primary/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "relative z-10 font-serif text-2xl font-bold leading-tight text-white transition-colors group-hover:text-teal",
										children: [
											"Ministry",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Role"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "relative z-10 mt-3 max-w-[16rem] text-sm leading-relaxed text-white/85 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0",
										children: "Identify the gifts God has placed in you."
									})
								]
							})
						]
					})
				]
			})
		})
	});
}
//#endregion
export { AssessmentHubPage as component };
