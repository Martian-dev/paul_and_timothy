import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { z } from "zod";
import { getDb } from "@/db/client";
import { upsertAppUser } from "@/lib/user-sync";

export const assessmentTypes = ["ministry_calling", "spiritual_gifts", "apest"] as const;
export type AssessmentType = (typeof assessmentTypes)[number];

const assessmentResultSchema = z.object({
  assessmentType: z.enum(assessmentTypes),
  answers: z.record(z.string(), z.unknown()),
  result: z.record(z.string(), z.unknown()),
});

export type AssessmentResultInput = z.infer<typeof assessmentResultSchema>;

/** Save a completed assessment against the authenticated local application user. */
export const saveAssessmentResult = createServerFn({ method: "POST" })
  .validator(assessmentResultSchema)
  .handler(async ({ data }) => {
    const { isAuthenticated, userId } = await auth();
    if (!isAuthenticated || !userId) {
      throw new Error("UNAUTHORIZED");
    }

    const { appUserId } = await upsertAppUser(userId);
    const rows = (await getDb()`
      INSERT INTO assessment_results (user_id, clerk_user_id, assessment_type, answers, result)
      VALUES (${appUserId}, ${userId}, ${data.assessmentType}, ${JSON.stringify(data.answers)}::jsonb, ${JSON.stringify(data.result)}::jsonb)
      RETURNING id
    `) as unknown as Array<{ id?: string }>;

    const assessmentResultId = rows[0]?.id;
    if (!assessmentResultId) {
      throw new Error("ASSESSMENT_RESULT_SAVE_FAILED");
    }

    return { assessmentResultId };
  });
