import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { q as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MentorCTA-CPavxL25.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function MentorCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "mentor",
		className: "px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
				className: "relative overflow-hidden rounded-[2.5rem] gradient-brand p-10 text-white md:p-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.85_0.12_180)]/20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-4xl font-medium leading-tight md:text-5xl",
							children: [
								"Need help understanding ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								" where you fit?"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-white/80",
							children: "Book a 30-minute conversation with a mentor. Our experienced facilitator will listen and offer honest counsel on your next step."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/interaction",
							className: "group inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 md:self-center",
							children: ["Talk to a Mentor", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { MentorCTA as t };
