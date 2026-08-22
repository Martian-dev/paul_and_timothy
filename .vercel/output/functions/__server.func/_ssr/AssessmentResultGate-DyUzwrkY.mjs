import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { n as dist_exports } from "./dist-DTPgI9Ah.mjs";
import { t as createSsrRpc } from "./user-sync-CYpMqO27.mjs";
import { a as unknownType, i as stringType, n as objectType, r as recordType, t as enumType } from "../_libs/zod.mjs";
import { I as CircleAlert, b as LoaderCircle, y as LockKeyhole } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AssessmentResultGate-DyUzwrkY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var assessmentResultSchema = objectType({
	assessmentType: enumType([
		"ministry_calling",
		"spiritual_gifts",
		"apest"
	]),
	answers: recordType(stringType(), unknownType()),
	result: recordType(stringType(), unknownType())
});
/** Save a completed assessment against the authenticated local application user. */
var saveAssessmentResult = createServerFn({ method: "POST" }).validator(assessmentResultSchema).handler(createSsrRpc("f74d90c6929cbdf44c3fe24c93293046fa62f7b045cb62a17f224f21990fa71f"));
/** Keeps assessment results private until sign-in is complete and the result is persisted. */
function AssessmentResultGate({ assessmentType, answers, result, children }) {
	const clerk = (0, dist_exports.useClerk)();
	const { isLoaded, isSignedIn, userId } = (0, dist_exports.useAuth)();
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [retryCount, setRetryCount] = (0, import_react.useState)(0);
	const attemptedPayload = (0, import_react.useRef)(null);
	const [savedPayload, setSavedPayload] = (0, import_react.useState)(null);
	const [errorPayload, setErrorPayload] = (0, import_react.useState)(null);
	const payloadKey = (0, import_react.useMemo)(() => JSON.stringify({
		userId,
		assessmentType,
		answers,
		result
	}), [
		answers,
		assessmentType,
		result,
		userId
	]);
	(0, import_react.useEffect)(() => {
		if (!isLoaded || !isSignedIn || attemptedPayload.current === payloadKey) return;
		attemptedPayload.current = payloadKey;
		setStatus("saving");
		saveAssessmentResult({ data: {
			assessmentType,
			answers,
			result
		} }).then(() => {
			if (attemptedPayload.current !== payloadKey) return;
			setErrorPayload(null);
			setSavedPayload(payloadKey);
			setStatus("saved");
		}).catch(() => {
			if (attemptedPayload.current !== payloadKey) return;
			attemptedPayload.current = null;
			setErrorPayload(payloadKey);
			setStatus("error");
		});
	}, [
		answers,
		assessmentType,
		isLoaded,
		isSignedIn,
		payloadKey,
		result,
		retryCount
	]);
	if (!isLoaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateMessage, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }),
		title: "Checking your account…"
	});
	if (!isSignedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateMessage, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-6 w-6" }),
		title: "Sign in to see your results",
		description: "Your answers are ready. Sign in or create a free account and we’ll save this assessment to your profile before revealing the results.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => clerk.openSignIn({ withSignUp: true }),
			className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-soft",
			children: ["Sign in to continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4" })]
		})
	});
	if (status === "error" && errorPayload === payloadKey) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateMessage, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-6 w-6" }),
		title: "We couldn’t save your results",
		description: "Please try again. Your results will remain hidden until they’re safely attached to your account.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				setErrorPayload(null);
				setStatus("idle");
				setRetryCount((count) => count + 1);
			},
			className: "rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-soft",
			children: "Try again"
		})
	});
	if (savedPayload !== payloadKey) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateMessage, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }),
		title: "Saving your results…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function GateMessage({ icon, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[2rem] border border-border/60 bg-card p-8 text-center shadow-soft md:p-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-teal-deep",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-serif text-2xl font-medium text-primary",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			})
		]
	});
}
//#endregion
export { AssessmentResultGate as t };
