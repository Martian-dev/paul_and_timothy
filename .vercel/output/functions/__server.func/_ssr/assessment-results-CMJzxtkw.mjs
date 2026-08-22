import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as getDb } from "./client-DgnZcK--.mjs";
import { r as upsertAppUser } from "./user-sync-CYpMqO27.mjs";
import { a as unknownType, i as stringType, n as objectType, r as recordType, t as enumType } from "../_libs/zod.mjs";
import { n as createServerRpc, t as auth } from "./auth-B0IFwJaY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assessment-results-CMJzxtkw.js
var assessmentResultSchema = objectType({
	assessmentType: enumType([
		"ministry_calling",
		"spiritual_gifts",
		"apest"
	]),
	answers: recordType(stringType(), unknownType()),
	result: recordType(stringType(), unknownType())
});
var saveAssessmentResult_createServerFn_handler = createServerRpc({
	id: "f74d90c6929cbdf44c3fe24c93293046fa62f7b045cb62a17f224f21990fa71f",
	name: "saveAssessmentResult",
	filename: "src/lib/assessment-results.ts"
}, (opts) => saveAssessmentResult.__executeServer(opts));
var saveAssessmentResult = createServerFn({ method: "POST" }).validator(assessmentResultSchema).handler(saveAssessmentResult_createServerFn_handler, async ({ data }) => {
	const { isAuthenticated, userId } = await auth();
	if (!isAuthenticated || !userId) throw new Error("UNAUTHORIZED");
	const { appUserId } = await upsertAppUser(userId);
	const assessmentResultId = (await getDb()`
      INSERT INTO assessment_results (user_id, clerk_user_id, assessment_type, answers, result)
      VALUES (${appUserId}, ${userId}, ${data.assessmentType}, ${JSON.stringify(data.answers)}::jsonb, ${JSON.stringify(data.result)}::jsonb)
      RETURNING id
    `)[0]?.id;
	if (!assessmentResultId) throw new Error("ASSESSMENT_RESULT_SAVE_FAILED");
	return { assessmentResultId };
});
//#endregion
export { saveAssessmentResult_createServerFn_handler };
