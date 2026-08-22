import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { D as Globe, L as Church, S as Heart, U as Building, a as User, f as Quote, l as Send, q as ArrowRight, w as Handshake } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as pttc_mentorship_default } from "./pttc-mentorship-DIC_Svl-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner-9ts70gje.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function PartnerPage() {
	const formRef = (0, import_react.useRef)(null);
	const [interest, setInterest] = (0, import_react.useState)("Prayer network");
	const scrollToForm = (selectedInterest) => {
		setInterest(selectedInterest);
		formRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
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
					className: "gradient-hero pt-36 pb-32 text-white text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-5xl px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-serif text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight",
								children: [
									"The harvest needs workers.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient font-bold leading-tight block mt-2",
										children: "The workers… need training."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-8 max-w-2xl text-xl text-white/90 leading-relaxed font-medium",
								children: "We can't train them alone. Individuals, churches and organisations partner with us to equip ordinary believers, who go on to equip others."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => scrollToForm("Something else"),
									className: "inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary transition-colors hover:bg-white/90 shadow-md uppercase tracking-wider",
									children: ["Start a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-cream py-24 md:py-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-7xl px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col lg:flex-row gap-16 lg:gap-24 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-bold uppercase tracking-widest text-teal",
										children: "Why Partnership Multiplies"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-serif text-4xl font-bold text-primary md:text-5xl leading-[1.1]",
										children: "One trained believer is never just one."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-6 text-lg leading-relaxed text-muted-foreground font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paul entrusted what he knew to Timothy. Timothy taught others. Those others taught others still… and the Gospel travelled further than one man ever could." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That's the model we work from. When you help train one believer, you're not funding a single course. You're setting off a chain you may never fully see: a woman who starts a prayer cell in her home, a young man who begins sharing the Gospel in his workplace, a couple who lead a group in a village nobody else has reached." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
										className: "mt-8 rounded-[2rem] bg-white p-8 shadow-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-8 w-8 text-gold mb-4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xl font-serif italic text-primary/90 leading-relaxed",
												children: "\"And the things you have heard me say in the presence of many witnesses, entrust to reliable people who will also be qualified to teach others.\""
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
												className: "mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground",
												children: "2 Timothy 2:2"
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-card",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: pttc_mentorship_default,
										alt: "Two men reading together",
										className: "w-full h-full object-cover"
									})
								})
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-cream py-16 md:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-16",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-4xl font-bold text-primary md:text-5xl",
								children: "Three ways to stand with us."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground font-medium",
								children: "Whatever you have to give — time, space, or resources — there's a place for it here."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col rounded-[2.5rem] bg-white p-10 shadow-soft h-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-deep text-white shadow-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-2xl font-bold text-primary mb-3",
											children: "Prayer Partner"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-teal font-medium mb-6 text-sm",
											children: "Ministry work relies on the support of people who pray."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed text-muted-foreground mb-8 flex-1",
											children: "Join our prayer network and we'll send you what to pray for: the believers currently in training, the training programs coming up, the places we're being invited into, and the specific needs of the team. No obligation beyond prayer, and no fundraising in disguise."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => scrollToForm("Prayer network"),
											className: "text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 group",
											children: ["Join the prayer network ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col rounded-[2.5rem] bg-white p-10 shadow-soft h-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-deep text-white shadow-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-2xl font-bold text-primary mb-3",
											children: "Training Partner"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-teal font-medium mb-6 text-sm",
											children: "Bring PTTC to your church, your community or your organisation."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed text-muted-foreground mb-8 flex-1",
											children: "You provide the people and the venue; we bring the curriculum, the trainers and the structure. Our courses are built to be short and intensive — so your members can attend without stepping away from work and family for weeks or months. This is often how a whole church begins to change: not by sending one person away to be trained, but by being trained together."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => scrollToForm("Host a training"),
											className: "text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 group",
											children: ["Enquire about hosting ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col rounded-[2.5rem] bg-white p-10 shadow-soft h-full relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-deep text-white shadow-md",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-2xl font-bold text-primary mb-3",
											children: "Giving Partner"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-teal font-medium mb-6 text-sm",
											children: "Our fees are kept deliberately low, so that cost is never the reason someone with a calling stays untrained."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed text-muted-foreground mb-6",
											children: "Giving is what makes that possible. Your support goes towards training materials, travel to reach churches outside the city, subsidised course fees for those who can't afford it, and translation into Tamil."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-8 flex-1 rounded-2xl bg-cream/60 p-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] font-bold uppercase tracking-widest text-primary/70 mb-3",
												children: "You can sponsor"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
												className: "space-y-2 text-sm text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-baseline justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A participant — Beginner course" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-primary",
															children: "₹500"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-baseline justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A participant — Intermediate course" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-primary",
															children: "₹750"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-baseline justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A participant — Advance course" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-primary",
															children: "₹1,000"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-baseline justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A course video" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-primary",
															children: "₹2,500"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-baseline justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A full course module (12 videos)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-primary",
															children: "₹30,000"
														})]
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => scrollToForm("Give"),
											className: "text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 group mt-auto",
											children: ["Talk to us about giving ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
										})
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-cream py-16 md:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center mb-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-4xl font-bold text-primary md:text-5xl",
								children: "Who this is for."
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[2.5rem] bg-white p-10 shadow-soft",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6 text-teal mb-6" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-2xl font-bold text-primary mb-4",
											children: "Individuals"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-sm leading-relaxed font-medium",
											children: "People who've been trained themselves, or who simply want the next believer to have what they didn't."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[2.5rem] bg-white p-10 shadow-soft",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Church, { className: "h-6 w-6 text-teal mb-6" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-2xl font-bold text-primary mb-4",
											children: "Churches"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-sm leading-relaxed font-medium",
											children: "Pastors and leaders who want their congregation equipped, not just taught."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[2.5rem] bg-white p-10 shadow-soft",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-6 w-6 text-teal mb-6" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-2xl font-bold text-primary mb-4",
											children: "Organisations & ministries"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-sm leading-relaxed font-medium",
											children: "Those already working in the field, who want their teams sharpened for the work they're doing."
										})
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					ref: formRef,
					className: "bg-cream py-16 md:py-24 pb-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-3xl px-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-4xl font-bold text-primary md:text-5xl",
								children: "Let's talk."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 text-lg text-muted-foreground font-medium",
								children: "Tell us how you'd like to be involved and we'll get back to you personally."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-12 rounded-[2.5rem] bg-white p-8 md:p-12 shadow-card text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-8 md:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
												htmlFor: "name",
												children: "Full name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "name",
												type: "text",
												className: "w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal",
												placeholder: "Your name"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
												htmlFor: "email",
												children: "Email address"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "email",
												type: "email",
												className: "w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal",
												placeholder: "you@email.com"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-8 md:grid-cols-2 mt-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
												htmlFor: "phone",
												children: "WhatsApp number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "phone",
												type: "tel",
												className: "w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal",
												placeholder: "+91 ..."
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
												htmlFor: "interest",
												children: "How would you like to partner?"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													id: "interest",
													value: interest,
													onChange: (e) => setInterest(e.target.value),
													className: "w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal appearance-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Prayer network",
															children: "Prayer network"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Host a training",
															children: "Host a training"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Give",
															children: "Give"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Something else",
															children: "Something else"
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pointer-events-none absolute inset-y-0 right-5 flex items-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
														className: "h-4 w-4 text-muted-foreground",
														fill: "none",
														stroke: "currentColor",
														viewBox: "0 0 24 24",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
															strokeLinecap: "round",
															strokeLinejoin: "round",
															strokeWidth: "2",
															d: "M19 9l-7 7-7-7"
														})
													})
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
											htmlFor: "message",
											children: "Your message"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "message",
											rows: 4,
											className: "w-full rounded-2xl border border-border/40 bg-cream/30 px-5 py-4 text-sm focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal",
											placeholder: "Tell us a little about you and your church or organisation..."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => alert("Thank you, we've received your message. Someone from our team will be in touch within [X] working days."),
										className: "mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-teal-deep px-8 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md",
										children: ["Send message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })]
									})
								]
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "gradient-hero px-6 py-24 text-center text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-4xl font-bold md:text-5xl leading-[1.1]",
						children: "Anyone can do ministry, but not everyone gets the chance."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-white/80 font-medium",
						children: "Help us change that."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => scrollToForm("Something else"),
							className: "inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary transition-colors hover:bg-white/90 shadow-md uppercase tracking-wider",
							children: ["Partner with us today ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { PartnerPage as component };
