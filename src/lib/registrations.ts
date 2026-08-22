import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { z } from "zod";
import { getDb } from "@/db/client";
import { upsertAppUser } from "@/lib/user-sync";

type DatabaseRow = Record<string, unknown>;

const alethiaQuestionsSchema = z.object({
  participatedInAlethiaTraining: z.enum(["yes", "no"]),
  involvedInYouthMinistry: z.enum(["yes", "no", "wants_to"]),
  churchNameArea: z.string().trim().min(1, "Enter your church name and area").max(300),
  youthMinistryQuestions: z.string().trim().max(2000).default(""),
});

const registrationSchema = z
  .object({
    eventSlug: z.string().trim().min(1).max(100),
    fullName: z.string().trim().min(2, "Enter your full name").max(200),
    phone: z.string().trim().min(5, "Enter a valid phone number").max(40),
    additionalQuestions: alethiaQuestionsSchema.optional(),
  })
  .superRefine((data, context) => {
    if (data.eventSlug === "alethia" && !data.additionalQuestions) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["additionalQuestions"],
        message: "Complete the Alethia questionnaire",
      });
    }
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;

export type RegistrationResult = {
  registrationId: string;
  alreadyRegistered: boolean;
};

/**
 * Register the current Clerk user for an event. The database only receives
 * this data from the server, and the email/identity fields come from Clerk,
 * not from client-submitted form values.
 */
export const registerForEvent = createServerFn({ method: "POST" })
  .validator(registrationSchema)
  .handler(async ({ data }): Promise<RegistrationResult> => {
    const { isAuthenticated, userId } = await auth();
    if (!isAuthenticated || !userId) {
      throw new Error("UNAUTHORIZED");
    }

    const { appUserId } = await upsertAppUser(userId);
    const sql = getDb();

    const eventRows = (await sql`
      SELECT id, status
      FROM events
      WHERE slug = ${data.eventSlug}
      LIMIT 1
    `) as unknown as DatabaseRow[];
    const event = eventRows[0] as { id?: string; status?: string } | undefined;
    if (!event?.id) {
      throw new Error("EVENT_NOT_FOUND");
    }
    if (event.status !== "open") {
      throw new Error("EVENT_CLOSED");
    }

    // Keep the event-specific questionnaire isolated in JSON so future events
    // can use their own questions without changing the registration schema.
    const additionalQuestions =
      data.eventSlug === "alethia" ? (data.additionalQuestions ?? {}) : {};

    const existingRows = (await sql`
      SELECT id
      FROM event_registrations
      WHERE event_id = ${event.id} AND user_id = ${appUserId}
      LIMIT 1
    `) as unknown as DatabaseRow[];

    const registrationRows = (await sql`
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
    `) as unknown as DatabaseRow[];
    const registrationId = registrationRows[0]?.id as string | undefined;
    if (!registrationId) {
      throw new Error("REGISTRATION_FAILED");
    }

    return { registrationId, alreadyRegistered: existingRows.length > 0 };
  });
