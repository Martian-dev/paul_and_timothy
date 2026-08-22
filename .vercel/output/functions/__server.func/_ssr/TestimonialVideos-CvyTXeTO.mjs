import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { m as Play } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TestimonialVideos-CvyTXeTO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var TESTIMONIAL_VIDEOS = [
	{
		id: "K_K6RJXPcb4",
		name: "Sis. Sezia",
		role: "Founder, World Revival Seeds"
	},
	{
		id: "wgdw9JGcoyc",
		name: "Richard",
		role: "Network Administrator"
	},
	{
		id: "HTctnx-ONPg",
		name: "Beniel Phinehas",
		role: "Student, MBBS"
	},
	{
		id: "ODgcXT-bvrk",
		name: "Dr Helena",
		role: "Business"
	}
];
function TestimonialVideo({ videoId, name, role, index }) {
	const [playing, setPlaying] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
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
			delay: index * .1,
			duration: .6
		},
		className: "hover-lift group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-video overflow-hidden",
			children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
				title: `Testimonial from ${name}`,
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
				allowFullScreen: true,
				className: "h-full w-full"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
					alt: `Testimonial from ${name}`,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPlaying(true),
					"aria-label": `Play testimonial from ${name}`,
					className: "absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full glass text-primary transition-transform hover:scale-110",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-6 w-6 fill-current" })
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold text-primary",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground",
				children: role
			})]
		})]
	});
}
function TestimonialVideoGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 md:grid-cols-2",
		children: TESTIMONIAL_VIDEOS.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialVideo, {
			videoId: v.id,
			name: v.name,
			role: v.role,
			index: i
		}, v.id))
	});
}
//#endregion
export { TestimonialVideoGrid as t };
