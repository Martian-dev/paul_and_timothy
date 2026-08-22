import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { J as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { a as WhatsApp_Image_2026_07_14_at_11_18_53_default, c as WhatsApp_Image_2026_07_31_at_17_17_55_default, i as WhatsApp_Image_2026_07_14_at_11_18_51_default, l as WhatsApp_Image_2026_07_31_at_17_18_46_default, n as IMG_20171002_WA0019_default, o as WhatsApp_Image_2026_07_14_at_11_19_22_default, r as IMG_20171002_WA0020_default, s as WhatsApp_Image_2026_07_14_at_11_24_07_default, t as IMG_20171002_WA0017_default } from "./WhatsApp Image 2026-07-31 at 17.18.46-CXzTlldC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events.gallery-CfepPy2Y.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
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
var galleryData = [{
	year: "2026",
	images: [
		WhatsApp_Image_2026_07_14_at_11_18_51_default,
		WhatsApp_Image_2026_07_14_at_11_18_53_default,
		WhatsApp_Image_2026_07_14_at_11_19_22_default,
		WhatsApp_Image_2026_07_14_at_11_24_07_default,
		WhatsApp_Image_2026_07_31_at_17_17_55_default,
		WhatsApp_Image_2026_07_31_at_17_18_46_default
	]
}, {
	year: "2017",
	images: [
		IMG_20171002_WA0017_default,
		IMG_20171002_WA0019_default,
		IMG_20171002_WA0020_default
	]
}];
function GalleryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
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
			className: "pt-32 pb-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/events/previous",
						className: "mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Previous Events"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: "hidden",
						animate: "show",
						variants: fadeUp,
						className: "mb-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-4xl font-bold text-primary md:text-5xl",
							children: "Captured moments across the years"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-24",
						children: galleryData.map((section, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
							initial: "hidden",
							whileInView: "show",
							viewport: {
								once: true,
								margin: "-80px"
							},
							variants: fadeUp,
							transition: { delay: idx * .1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								id: `year-${section.year}`,
								className: "mb-8 font-serif text-3xl font-bold text-primary border-b border-border/50 pb-4",
								children: ["Alethia - ", section.year]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6",
								children: section.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
										margin: "-40px"
									},
									transition: {
										duration: .5,
										delay: i % 4 * .1
									},
									className: "break-inside-avoid overflow-hidden rounded-3xl shadow-card",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src,
										alt: `Alethia ${section.year} memory`,
										loading: "lazy",
										className: "w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
									})
								}, i))
							})]
						}, section.year))
					})
				]
			})
		})
	});
}
//#endregion
export { GalleryPage as component };
