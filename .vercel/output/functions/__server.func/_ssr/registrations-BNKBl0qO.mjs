import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as getDb } from "./client-DgnZcK--.mjs";
import { r as upsertAppUser } from "./user-sync-CYpMqO27.mjs";
import { i as stringType, n as objectType, o as ZodIssueCode, t as enumType } from "../_libs/zod.mjs";
import { n as createServerRpc, t as auth } from "./auth-B0IFwJaY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registrations-BNKBl0qO.js
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
var getEventRegistration_createServerFn_handler = createServerRpc({
	id: "02c67dcb0b75117414fff2cd4d17640f9f330c40a9fb466a5332f9415f46590b",
	name: "getEventRegistration",
	filename: "src/lib/registrations.ts"
}, (opts) => getEventRegistration.__executeServer(opts));
var getEventRegistration = createServerFn({ method: "GET" }).validator(objectType({ eventSlug: stringType().trim().min(1).max(100) })).handler(getEventRegistration_createServerFn_handler, async ({ data }) => {
	const { isAuthenticated, userId } = await auth();
	if (!isAuthenticated || !userId) throw new Error("UNAUTHORIZED");
	const row = (await getDb()`
      SELECT
        registrations.id,
        registrations.full_name,
        registrations.phone,
        registrations.additional_questions,
        registrations.registration_status
      FROM event_registrations AS registrations
      INNER JOIN app_users AS users ON users.id = registrations.user_id
      INNER JOIN events ON events.id = registrations.event_id
      WHERE users.clerk_user_id = ${userId}
        AND events.slug = ${data.eventSlug}
      LIMIT 1
    `)[0];
	if (!row?.id) return null;
	return {
		registrationId: row.id,
		fullName: row.full_name,
		phone: row.phone,
		additionalQuestions: row.additional_questions ?? {},
		registrationStatus: row.registration_status
	};
});
var registerForEvent_createServerFn_handler = createServerRpc({
	id: "c0d25c2b0c58bb7b565606a38134bed745ea38c285c25f462c08e0add525e060",
	name: "registerForEvent",
	filename: "src/lib/registrations.ts"
}, (opts) => registerForEvent.__executeServer(opts));
var registerForEvent = createServerFn({ method: "POST" }).validator(registrationSchema).handler(registerForEvent_createServerFn_handler, async ({ data }) => {
	const { isAuthenticated, userId } = await auth();
	if (!isAuthenticated || !userId) throw new Error("UNAUTHORIZED");
	const { appUserId } = await upsertAppUser(userId);
	const sql = getDb();
	const event = (await sql`
      SELECT id, status
      FROM events
      WHERE slug = ${data.eventSlug}
      LIMIT 1
    `)[0];
	if (!event?.id) throw new Error("EVENT_NOT_FOUND");
	if (event.status !== "open") throw new Error("EVENT_CLOSED");
	const additionalQuestions = data.eventSlug === "alethia" ? data.additionalQuestions ?? {} : {};
	const existingRows = await sql`
      SELECT id, registration_status
      FROM event_registrations
      WHERE event_id = ${event.id} AND user_id = ${appUserId}
      LIMIT 1
    `;
	const registrationId = (await sql`
      INSERT INTO event_registrations (
        event_id,
        user_id,
        full_name,
        phone,
        additional_questions
      )
      VALUES (
        ${event.id},
        ${appUserId},
        ${data.fullName},
        ${data.phone},
        ${JSON.stringify(additionalQuestions)}::jsonb
      )
      ON CONFLICT (event_id, user_id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        additional_questions = EXCLUDED.additional_questions,
        registration_status = 'registered',
        updated_at = NOW()
      RETURNING id
    `)[0]?.id;
	if (!registrationId) throw new Error("REGISTRATION_FAILED");
	return {
		registrationId,
		alreadyRegistered: existingRows[0]?.registration_status === "registered"
	};
});
//#endregion
export { getEventRegistration_createServerFn_handler, registerForEvent_createServerFn_handler };
