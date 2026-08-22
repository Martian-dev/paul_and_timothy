import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { q as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles-Dk1mdi2R.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var articles = [
	{
		tag: "Ministry & Calling",
		title: "Stay Faithful to Your Calling",
		excerpt: "Ministry can take many forms, but every believer must ask a deeper question: How to discover God’s calling and run faithfully in it?",
		read: "5 min read",
		link: "/articles/calling"
	},
	{
		tag: "History & Calling",
		title: "A Cry for Help… A Calling… A Legacy",
		excerpt: "The unforgettable journey of Dr Ida Sophia Scudder: One night. Three women. Three deaths. And a 20-year-old woman whose life was changed forever.",
		read: "6 min read",
		link: "/articles/scudder"
	},
	{
		tag: "History & Calling",
		title: "The Apostle of Tirunelveli: C. D. Rhenius",
		excerpt: "A divine calling that began in the life of a young boy and transformed an entire generation in South India.",
		read: "8 min read",
		link: "/articles/rhenius"
	},
	{
		tag: "Ministry & Calling",
		title: "Spiritual Gifts: Essential Resources for Ministry",
		excerpt: "Understanding our calling is important, but it is equally important to recognise the spiritual gifts God has given us to fulfil that calling.",
		read: "4 min read",
		link: "/articles/spiritual-gifts"
	}
];
function ArticlesPage() {
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "gradient-hero pt-36 pb-20 text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-4xl px-6 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-5xl font-medium leading-[1.05] md:text-7xl",
							children: "Articles"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-white/80",
							children: "Teaching and encouragement for every stage of the journey — from wondering to walking it out."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-5xl gap-6 px-6 py-16 md:grid-cols-2",
					children: articles.map((a, i) => {
						const CardContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-deep",
								children: a.tag
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-serif text-xl font-bold text-primary transition-colors group-hover:text-teal-deep",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: a.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-muted-foreground",
								children: a.read
							})
						] });
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
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
							transition: {
								duration: .5,
								delay: i * .06
							},
							className: "rounded-4xl border border-border/60 bg-card p-7 shadow-card hover-lift group",
							children: a.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: a.link,
								className: "block h-full w-full",
								children: CardContent
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "block h-full w-full cursor-not-allowed opacity-80",
								children: [CardContent, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 text-xs font-semibold text-teal-deep",
									children: "Coming Soon"
								})]
							})
						}, a.title);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-5xl px-6 pb-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-4xl gradient-hero px-8 py-10 text-center text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl font-bold",
								children: "Not sure where you fit?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-white/75",
								children: "Take the Ministry Calling Assessment and find your people group."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/assessment",
								className: "mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft",
								children: ["Take the assessment ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { ArticlesPage as component };
