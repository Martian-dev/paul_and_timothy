import { o as __toESM } from "../_runtime.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { R as ChevronRight, n as X, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { t as TestimonialVideoGrid } from "./TestimonialVideos-CvyTXeTO.mjs";
import { t as Trainer_image_default } from "./Trainer_image-DLE5Gifh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events.upcoming-CXVbQAvr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var timeline = [
	{
		month: "September 14–15",
		title: "Mumbai",
		detail: "14th: Women's meeting (morning) & Wedlock — pre-marital seminar (evening). 15th: Mumbai volunteers meet."
	},
	{
		month: "October 1–4",
		title: "Joyful Family Camp — Season 5",
		detail: "Yelagiri."
	},
	{
		month: "October 19–20",
		title: "Couples Camp",
		detail: "Ooty."
	},
	{
		month: "November 7–14",
		title: "Alethia",
		detail: "Online training."
	},
	{
		month: "November 20–29",
		title: "Mission Trip",
		detail: "Bihar."
	}
];
var Alethia_training_topics_default = "/assets/Alethia_training_topics-D2iw4tH2.jpeg";
var Alethia_training_topics_tamil_default = "/assets/Alethia_training_topics_tamil-C6PgYaUy.jpeg";
var Alethia_who_can_participate_landscape_default = "/assets/Alethia_who_can_participate_landscape-nwpyJrEs.jpeg";
var Alethia_who_can_participate_landscape_tamil_default = "/assets/Alethia_who_can_participate_landscape_tamil-gPGghO0Z.jpeg";
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
var allPosters = [
	Alethia_who_can_participate_landscape_default,
	Alethia_who_can_participate_landscape_tamil_default,
	Alethia_training_topics_default,
	Alethia_training_topics_tamil_default
];
function ThumbnailCard({ images, defaultIndex, onClick }) {
	const [isHovered, setIsHovered] = (0, import_react.useState)(false);
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(defaultIndex);
	(0, import_react.useEffect)(() => {
		let interval;
		if (isHovered) interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % images.length);
		}, 2e3);
		else setCurrentIndex(defaultIndex);
		return () => clearInterval(interval);
	}, [
		isHovered,
		images.length,
		defaultIndex
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "relative overflow-hidden rounded-xl border border-border/40 shadow-sm cursor-pointer bg-black/5 aspect-video flex items-center justify-center group",
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false),
		onClick: () => onClick(currentIndex),
		whileHover: {
			scale: 1.05,
			zIndex: 10
		},
		transition: { duration: .2 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: images[currentIndex],
				alt: "Related Slide",
				className: "absolute inset-0 w-full h-full object-cover",
				initial: { x: "100%" },
				animate: { x: 0 },
				exit: { x: "-100%" },
				transition: {
					duration: .4,
					ease: "easeInOut"
				}
			}, currentIndex)
		})
	});
}
function PosterSection() {
	const [mainPosterIndex, setMainPosterIndex] = (0, import_react.useState)(0);
	const [modalPosterIndex, setModalPosterIndex] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (modalPosterIndex === null) return;
			if (e.key === "ArrowRight") setModalPosterIndex((prev) => prev !== null ? (prev + 1) % allPosters.length : null);
			else if (e.key === "ArrowLeft") setModalPosterIndex((prev) => prev !== null ? (prev - 1 + allPosters.length) % allPosters.length : null);
			else if (e.key === "Escape") setModalPosterIndex(null);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [modalPosterIndex]);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setMainPosterIndex((prev) => (prev + 1) % allPosters.length);
		}, 3e3);
		return () => clearInterval(interval);
	}, []);
	const handlePrev = () => setMainPosterIndex((prev) => (prev - 1 + allPosters.length) % allPosters.length);
	const handleNext = () => setMainPosterIndex((prev) => (prev + 1) % allPosters.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "gradient-hero pt-36 pb-20 text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-5xl font-medium leading-[1.05] md:text-7xl",
				children: "Upcoming events"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-xl text-white/80",
				children: "Training, workshops and gatherings you can attend in person & on online platforms"
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-6 py-16 bg-background text-center md:text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: "hidden",
			whileInView: "show",
			viewport: {
				once: true,
				margin: "-80px"
			},
			variants: fadeUp,
			className: "mx-auto max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-10 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-3xl font-bold leading-[1.1] tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-[3.4rem]",
						children: "Aletheia Training Conference"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					whileHover: { scale: 1.02 },
					transition: { duration: .2 },
					onClick: () => setModalPosterIndex(mainPosterIndex),
					className: "w-full aspect-video rounded-[2rem] overflow-hidden bg-black/5 shadow-2xl border border-border/40 relative flex items-center justify-center group cursor-pointer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								src: allPosters[mainPosterIndex],
								alt: "Aletheia Training Conference",
								className: "absolute inset-0 w-full h-full object-contain block",
								initial: { x: "100%" },
								animate: { x: 0 },
								exit: { x: "-100%" },
								transition: {
									duration: .5,
									ease: "easeInOut"
								}
							}, mainPosterIndex)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: (e) => {
								e.stopPropagation();
								handlePrev();
							},
							className: "absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10 shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-6 h-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: (e) => {
								e.stopPropagation();
								handleNext();
							},
							className: "absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10 shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-6 h-6" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg font-bold text-primary",
							children: [
								"Nov 7-14 ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2 text-muted-foreground font-normal",
									children: "·"
								}),
								" Online",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2 text-muted-foreground font-normal",
									children: "·"
								}),
								" Eight-day"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg leading-relaxed text-muted-foreground",
							children: "Training for Youth Leaders, Teachers & Counsellors. Walk away with practical tools to reach and disciple the next generation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								search: { event: "alethia" },
								className: "inline-flex items-center justify-center rounded-sm bg-primary px-10 py-3.5 text-base md:text-lg font-bold text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wider shadow-md hover:shadow-lg",
								children: "Register Now"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-14 border-border/60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-bold text-primary mb-6 uppercase tracking-wider text-left",
					children: "Related Slides"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbnailCard, {
							images: allPosters,
							defaultIndex: 0,
							onClick: setModalPosterIndex
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbnailCard, {
							images: allPosters,
							defaultIndex: 1,
							onClick: setModalPosterIndex
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbnailCard, {
							images: allPosters,
							defaultIndex: 2,
							onClick: setModalPosterIndex
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbnailCard, {
							images: allPosters,
							defaultIndex: 3,
							onClick: setModalPosterIndex
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: modalPosterIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setModalPosterIndex(null),
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-pointer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-5xl w-full aspect-video flex flex-col items-center justify-center cursor-default group",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-10 left-0 text-white/50 text-sm hidden md:block",
						children: "Use arrow keys to navigate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setModalPosterIndex(null),
						className: "absolute -top-12 right-0 md:-right-12 md:-top-12 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6 md:w-8 md:h-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setModalPosterIndex((prev) => prev !== null ? (prev - 1 + allPosters.length) % allPosters.length : null),
						className: "absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20 shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-6 h-6 md:w-8 md:h-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setModalPosterIndex((prev) => prev !== null ? (prev + 1) % allPosters.length : null),
						className: "absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20 shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-6 h-6 md:w-8 md:h-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
							src: allPosters[modalPosterIndex],
							alt: "Enlarged Slide",
							className: "w-full h-full max-h-[85vh] object-contain rounded-lg shadow-2xl absolute inset-0 m-auto",
							initial: { x: "100%" },
							animate: { x: 0 },
							exit: { x: "-100%" },
							transition: {
								duration: .4,
								ease: "easeInOut"
							}
						}, modalPosterIndex)
					})
				]
			})
		}) })]
	})] });
}
var speakers = [{
	name: "Roselind Rex",
	role: "Trainer",
	org: "Word Life Foundation",
	bio: "3 decades serving in youth & Teens ministry.",
	image: Trainer_image_default
}];
function Speakers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-20 bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: "hidden",
					whileInView: "show",
					viewport: {
						once: true,
						margin: "-80px"
					},
					variants: fadeUp,
					className: "text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-3xl font-bold text-primary md:text-4xl",
						children: "Meet Your Facilitator"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 flex justify-center",
					children: speakers.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						initial: "hidden",
						whileInView: "show",
						viewport: {
							once: true,
							margin: "-60px"
						},
						variants: fadeUp,
						transition: { delay: i * .08 },
						className: "group overflow-hidden rounded-4xl border border-border/60 bg-card shadow-card max-w-sm w-full text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s.image,
								alt: s.name,
								loading: "lazy",
								className: "h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-lg font-semibold text-primary",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-teal-deep",
									children: s.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: s.org
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: s.bio
								})
							]
						})]
					}, s.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						search: { event: "alethia" },
						className: "inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base md:text-lg font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md",
						children: "Register now"
					})
				})
			]
		})
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h3, {
				initial: "hidden",
				whileInView: "show",
				viewport: {
					once: true,
					margin: "-80px"
				},
				variants: fadeUp,
				className: "text-center font-serif text-2xl font-bold text-primary md:text-3xl",
				children: [
					"Hear from people who have",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"attended this session"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialVideoGrid, {})
			})]
		})
	});
}
function Timeline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-20 bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: "hidden",
				whileInView: "show",
				viewport: {
					once: true,
					margin: "-80px"
				},
				variants: fadeUp,
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-3xl font-bold text-primary md:text-4xl",
					children: "What's coming, month by month."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
					children: "A quick look at what's on the calendar. Registration opens closer to each date."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto mt-14 max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scaleY: 0 },
					whileInView: { scaleY: 1 },
					viewport: {
						once: true,
						margin: "-100px"
					},
					transition: {
						duration: 1.2,
						ease: "easeOut"
					},
					className: "absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-teal-deep via-primary to-gold md:left-1/2"
				}), timeline.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						margin: "-80px"
					},
					transition: {
						duration: .55,
						delay: i * .1
					},
					className: `relative mb-10 pl-16 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-6 z-10 grid h-4 w-4 place-items-center rounded-full gradient-brand ring-4 ring-background left-6 -translate-x-1/2 ${i % 2 === 0 ? "md:left-auto md:-right-2 md:translate-x-0" : "md:-left-2 md:translate-x-0"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border/60 bg-card p-6 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-widest text-gold",
								children: t.month
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1.5 font-serif text-lg font-semibold text-primary",
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: t.detail
							})
						]
					})]
				}, t.month))]
			})]
		})
	});
}
function UpcomingEventsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speakers, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {})
		] })
	});
}
//#endregion
export { UpcomingEventsPage as component };
