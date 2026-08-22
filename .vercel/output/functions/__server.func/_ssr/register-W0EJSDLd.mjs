import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./user-sync-CYpMqO27.mjs";
import { i as stringType, n as objectType, o as ZodIssueCode, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-W0EJSDLd.js
var REGISTRABLE_EVENTS = [{
	slug: "alethia",
	label: "Alethia — Online Training (November 7–14)"
}];
var alethiaQuestionsSchema = objectType({
	participatedInAlethiaTraining: enumType(["yes", "no"]),
	involvedInYouthMinistry: enumType([
		"yes",
		"no",
		"wants_to"
	]),
	churchNameArea: stringType().trim().min(1, "Enter your church name and area").max(300),
	youthMinistryQuestions: stringType().trim().max(2e3).default("")
});
var registrationSchema = objectType({
	eventSlug: stringType().trim().min(1).max(100),
	fullName: stringType().trim().min(2, "Enter your full name").max(200),
	phone: stringType().trim().min(5, "Enter a valid phone number").max(40),
	additionalQuestions: alethiaQuestionsSchema.optional()
}).superRefine((data, context) => {
	if (data.eventSlug === "alethia" && !data.additionalQuestions) context.addIssue({
		code: ZodIssueCode.custom,
		path: ["additionalQuestions"],
		message: "Complete the Alethia questionnaire"
	});
});
/** Load the current user's registration without creating or mutating records. */
var getEventRegistration = createServerFn({ method: "GET" }).validator(objectType({ eventSlug: stringType().trim().min(1).max(100) })).handler(createSsrRpc("02c67dcb0b75117414fff2cd4d17640f9f330c40a9fb466a5332f9415f46590b"));
/**
* Register the current Clerk user for an event. The database only receives
* this data from the server, and the email/identity fields come from Clerk,
* not from client-submitted form values.
*/
var registerForEvent = createServerFn({ method: "POST" }).validator(registrationSchema).handler(createSsrRpc("c0d25c2b0c58bb7b565606a38134bed745ea38c285c25f462c08e0add525e060"));
var $$splitComponentImporter = () => import("./register-CO1f4XYQ.mjs");
var requireRegistrationAuth = createServerFn({ method: "GET" }).validator(objectType({ returnTo: stringType().startsWith("/").max(2048) })).handler(createSsrRpc("59e1360793e589c9b42641858ecbd554e01ba6d7565449c41d7f86f38e409a59"));
var Route = createFileRoute("/register")({
	staleTime: 0,
	preloadStaleTime: 0,
	beforeLoad: async ({ search }) => {
		await requireRegistrationAuth({ data: { returnTo: search.event ? `/register?event=${encodeURIComponent(search.event)}` : "/register" } });
	},
	loaderDeps: ({ search }) => ({ event: search.event }),
	loader: async ({ deps }) => {
		const eventSlug = REGISTRABLE_EVENTS.some((item) => item.slug === deps.event) ? deps.event : REGISTRABLE_EVENTS.length === 1 ? REGISTRABLE_EVENTS[0].slug : void 0;
		return { registration: eventSlug ? await getEventRegistration({ data: { eventSlug } }) : null };
	},
	validateSearch: (search) => ({ event: typeof search.event === "string" ? search.event : void 0 }),
	head: () => ({ meta: [{ title: "Register — Paul & Timothy Training Centre" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, registerForEvent as r, REGISTRABLE_EVENTS as t };
