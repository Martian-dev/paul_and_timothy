import { o as __toESM } from "../_runtime.mjs";
import { _ as Link, b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { n as dist_exports } from "./dist-DTPgI9Ah.mjs";
import { F as CircleCheck, J as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as Route, r as registerForEvent, t as REGISTRABLE_EVENTS } from "./register-W0EJSDLd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-CO1f4XYQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ALETHIA_TRAINING_OPTIONS = [["yes", "Yes | ஆம்"], ["no", "No | இல்லை"]];
var YOUTH_MINISTRY_OPTIONS = [
	["yes", "Yes | ஆம்"],
	["no", "No | இல்லை"],
	["wants_to", "So far no, but wants to | இதுவரை இல்லை, ஆனால் விரும்புகிறேன்"]
];
function RegisterPage() {
	const { event } = Route.useSearch();
	const { registration } = Route.useLoaderData();
	const selectedEvent = REGISTRABLE_EVENTS.some((item) => item.slug === event) ? event : REGISTRABLE_EVENTS.length === 1 ? REGISTRABLE_EVENTS[0].slug : void 0;
	const { isLoaded: isUserLoaded, user } = (0, dist_exports.useUser)();
	const router = useRouter();
	const observedUserId = (0, import_react.useRef)(void 0);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [alreadyRegistered, setAlreadyRegistered] = (0, import_react.useState)(registration?.registrationStatus === "registered");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [fullName, setFullName] = (0, import_react.useState)(registration?.fullName ?? "");
	const [phone, setPhone] = (0, import_react.useState)(registration?.phone ?? "");
	const [participatedInAlethiaTraining, setParticipatedInAlethiaTraining] = (0, import_react.useState)(registration?.additionalQuestions.participatedInAlethiaTraining === "yes" || registration?.additionalQuestions.participatedInAlethiaTraining === "no" ? registration.additionalQuestions.participatedInAlethiaTraining : "");
	const [involvedInYouthMinistry, setInvolvedInYouthMinistry] = (0, import_react.useState)(registration?.additionalQuestions.involvedInYouthMinistry === "yes" || registration?.additionalQuestions.involvedInYouthMinistry === "no" || registration?.additionalQuestions.involvedInYouthMinistry === "wants_to" ? registration.additionalQuestions.involvedInYouthMinistry : "");
	const [churchNameArea, setChurchNameArea] = (0, import_react.useState)(typeof registration?.additionalQuestions.churchNameArea === "string" ? registration.additionalQuestions.churchNameArea : "");
	const [youthMinistryQuestions, setYouthMinistryQuestions] = (0, import_react.useState)(typeof registration?.additionalQuestions.youthMinistryQuestions === "string" ? registration.additionalQuestions.youthMinistryQuestions : "");
	const [selectedEventSlug, setSelectedEventSlug] = (0, import_react.useState)(selectedEvent ?? "");
	(0, import_react.useEffect)(() => {
		if (!isUserLoaded) return;
		const userId = user?.id ?? null;
		if (observedUserId.current === void 0) {
			observedUserId.current = userId;
			return;
		}
		if (observedUserId.current === userId) return;
		observedUserId.current = userId;
		setSubmitted(false);
		setAlreadyRegistered(false);
		setFullName("");
		setPhone("");
		setParticipatedInAlethiaTraining("");
		setInvolvedInYouthMinistry("");
		setChurchNameArea("");
		setYouthMinistryQuestions("");
		router.invalidate();
	}, [
		isUserLoaded,
		router,
		user?.id
	]);
	(0, import_react.useEffect)(() => {
		setAlreadyRegistered(registration?.registrationStatus === "registered");
		setFullName(registration?.fullName ?? "");
		setPhone(registration?.phone ?? "");
		setParticipatedInAlethiaTraining(registration?.additionalQuestions.participatedInAlethiaTraining === "yes" || registration?.additionalQuestions.participatedInAlethiaTraining === "no" ? registration.additionalQuestions.participatedInAlethiaTraining : "");
		setInvolvedInYouthMinistry(registration?.additionalQuestions.involvedInYouthMinistry === "yes" || registration?.additionalQuestions.involvedInYouthMinistry === "no" || registration?.additionalQuestions.involvedInYouthMinistry === "wants_to" ? registration.additionalQuestions.involvedInYouthMinistry : "");
		setChurchNameArea(typeof registration?.additionalQuestions.churchNameArea === "string" ? registration.additionalQuestions.churchNameArea : "");
		setYouthMinistryQuestions(typeof registration?.additionalQuestions.youthMinistryQuestions === "string" ? registration.additionalQuestions.youthMinistryQuestions : "");
	}, [registration, selectedEvent]);
	const email = user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses[0]?.emailAddress ?? "";
	(0, import_react.useEffect)(() => {
		if (!user || fullName) return;
		setFullName([user.firstName, user.lastName].filter(Boolean).join(" "));
	}, [fullName, user]);
	(0, import_react.useEffect)(() => {
		if (!user || phone) return;
		setPhone(user.primaryPhoneNumber?.phoneNumber ?? user.phoneNumbers[0]?.phoneNumber ?? "");
	}, [phone, user]);
	(0, import_react.useEffect)(() => {
		setSelectedEventSlug(selectedEvent ?? "");
	}, [selectedEvent]);
	if (!isUserLoaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationAuthLoading, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationAuthRequired, { returnTo: selectedEvent ? `/register?event=${encodeURIComponent(selectedEvent)}` : "/register" });
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setError(null);
		try {
			const result = await registerForEvent({ data: {
				eventSlug: selectedEventSlug || "alethia",
				fullName,
				phone,
				additionalQuestions: selectedEventSlug === "alethia" && participatedInAlethiaTraining !== "" && involvedInYouthMinistry !== "" ? {
					participatedInAlethiaTraining,
					involvedInYouthMinistry,
					churchNameArea,
					youthMinistryQuestions
				} : void 0
			} });
			setAlreadyRegistered(result.alreadyRegistered);
			setSubmitted(true);
		} catch (submissionError) {
			const message = submissionError instanceof Error ? submissionError.message : "REGISTRATION_FAILED";
			setError({
				EVENT_CLOSED: "Registration for this event is currently closed.",
				EVENT_NOT_FOUND: "That event could not be found.",
				ACCOUNT_EMAIL_REQUIRED: "Your Clerk account needs a verified email before registering."
			}[message] ?? "We couldn't complete your registration. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-cream flex flex-col",
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
			className: "flex-1 px-6 py-32 md:py-40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/events/upcoming",
					className: "mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Upcoming Events"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-[2.5rem] bg-card p-8 md:p-12 shadow-card border border-border/60",
					children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-12 animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-deep/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-teal-deep" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-3xl font-bold text-primary mb-4",
								children: alreadyRegistered ? "Registration Updated!" : "Registration Successful!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-lg mb-8",
								children: alreadyRegistered ? "Your registration details are up to date." : "Your registration is saved. Event details will be shared with your Clerk account email."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md",
								children: "Return to Home"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						alreadyRegistered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-8 rounded-2xl border border-teal/30 bg-accent p-4 text-sm text-primary",
							role: "status",
							children: "You are already registered for this event. Review your details below and submit to update them."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-3xl md:text-4xl font-bold text-primary mb-2",
							children: alreadyRegistered ? "Update your registration" : "Event Registration"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mb-8",
							children: "Fill out the form below to secure your spot for our upcoming gatherings."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "name",
									className: "block text-sm font-semibold text-primary mb-2",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									id: "name",
									required: true,
									value: fullName,
									onChange: (e) => setFullName(e.target.value),
									className: "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
									placeholder: "Enter your full name"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "email",
									className: "block text-sm font-semibold text-primary mb-2",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									id: "email",
									value: email,
									readOnly: true,
									disabled: true,
									className: "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
									placeholder: "Enter your email address"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "phone",
									className: "block text-sm font-semibold text-primary mb-2",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									id: "phone",
									required: true,
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									className: "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
									placeholder: "Enter your phone number"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "event",
									className: "block text-sm font-semibold text-primary mb-2",
									children: "Which event are you registering for?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "event",
									required: true,
									value: selectedEventSlug,
									onChange: (e) => {
										const nextEvent = e.target.value;
										setSelectedEventSlug(nextEvent);
										router.navigate({
											to: "/register",
											search: { event: nextEvent || void 0 }
										});
									},
									className: "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none",
									children: [REGISTRABLE_EVENTS.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select an event..."
									}), REGISTRABLE_EVENTS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: e.slug,
										children: e.label
									}, e.slug))]
								})] }),
								selectedEventSlug === "alethia" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
									className: "space-y-6 border-t border-border/60 pt-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
											className: "mb-1 font-serif text-xl font-bold text-primary",
											children: "Alethia Questionnaire"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mb-3 text-sm font-semibold leading-6 text-primary",
											children: [
												"Have you participated in Alethia training before? | நீங்கள் இதற்கு முன்பு அலீத்தியா பயிற்சியில் கலந்து கொண்டிருக்கிறீர்களா?",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													children: "*"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-3",
											children: ALETHIA_TRAINING_OPTIONS.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center gap-3 text-sm text-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "participatedInAlethiaTraining",
													value,
													required: true,
													checked: participatedInAlethiaTraining === value,
													onChange: (e) => {
														if (e.target.value === "yes" || e.target.value === "no") setParticipatedInAlethiaTraining(e.target.value);
													},
													className: "h-4 w-4 accent-primary"
												}), label]
											}, value))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mb-3 text-sm font-semibold leading-6 text-primary",
											children: [
												"Are you involved in youth ministry? | நீங்கள் வாலிப ஊழியத்தில் ஈடுபடுபவரா?",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													children: "*"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-3",
											children: YOUTH_MINISTRY_OPTIONS.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex items-center gap-3 text-sm text-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													name: "involvedInYouthMinistry",
													value,
													required: true,
													checked: involvedInYouthMinistry === value,
													onChange: (e) => {
														if (e.target.value === "yes" || e.target.value === "no" || e.target.value === "wants_to") setInvolvedInYouthMinistry(e.target.value);
													},
													className: "h-4 w-4 accent-primary"
												}), label]
											}, value))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: "churchNameArea",
											className: "mb-2 block text-sm font-semibold leading-6 text-primary",
											children: [
												"CHURCH NAME & AREA | சபை பெயர் & ஊர்",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													children: "*"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											id: "churchNameArea",
											required: true,
											value: churchNameArea,
											onChange: (e) => setChurchNameArea(e.target.value),
											className: "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
											placeholder: "Enter your church name and area"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "youthMinistryQuestions",
											className: "mb-2 block text-sm font-semibold leading-6 text-primary",
											children: "Do you have any questions about youth ministry? | வாலிப ஊழியத்தை பற்றி ஏதேனும் கேள்விகள் உள்ளதா?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "youthMinistryQuestions",
											value: youthMinistryQuestions,
											onChange: (e) => setYouthMinistryQuestions(e.target.value),
											rows: 4,
											className: "w-full resize-y rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
											placeholder: "Share any questions you have"
										})] })
									]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: submitting,
									className: "w-full mt-4 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md",
									children: submitting ? "Saving your registration…" : alreadyRegistered ? "Update registration" : "Confirm Registration"
								})
							]
						})
					] })
				})]
			})
		})
	});
}
function RegistrationAuthLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-cream px-6 py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl rounded-[2.5rem] border border-border/60 bg-card p-12 text-center shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-6 h-10 w-10 animate-pulse rounded-full bg-teal-deep/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Checking your account…"
			})]
		})
	});
}
function RegistrationAuthRequired({ returnTo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-cream px-6 py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl rounded-[2.5rem] border border-border/60 bg-card p-10 text-center shadow-card md:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl font-bold text-primary",
					children: "Sign in to continue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-md text-muted-foreground",
					children: "Your registration is linked to your account. Sign in to view or update these details."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login/$",
					params: { _splat: "" },
					search: {
						course: void 0,
						redirect: returnTo
					},
					className: "mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md",
					children: "Sign in to continue"
				})
			]
		})
	});
}
//#endregion
export { RegisterPage as component };
