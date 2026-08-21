import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getDb } from "@/db/client";

type DatabaseRow = Record<string, unknown>;

export async function upsertAppUser(clerkUserId: string) {
  const clerkUser = await clerkClient().users.getUser(clerkUserId);
  const email =
    clerkUser.primaryEmailAddress?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error("ACCOUNT_EMAIL_REQUIRED");
  }

  const phone = clerkUser.primaryPhoneNumber?.phoneNumber ?? clerkUser.phoneNumbers[0]?.phoneNumber;
  const rows = (await getDb()`
    INSERT INTO app_users (clerk_user_id, email, first_name, last_name, phone, updated_at)
    VALUES (
      ${clerkUserId},
      ${email},
      ${clerkUser.firstName},
      ${clerkUser.lastName},
      ${phone},
      NOW()
    )
    ON CONFLICT (clerk_user_id) DO UPDATE SET
      email = EXCLUDED.email,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      phone = COALESCE(EXCLUDED.phone, app_users.phone),
      updated_at = NOW()
    RETURNING id
  `) as unknown as DatabaseRow[];

  const appUserId = rows[0]?.id as string | undefined;
  if (!appUserId) {
    throw new Error("USER_SYNC_FAILED");
  }

  return { appUserId, email };
}

/** Ensure every signed-in Clerk user has a local application record. */
export const syncCurrentUser = createServerFn({ method: "POST" }).handler(async () => {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) {
    throw new Error("UNAUTHORIZED");
  }

  return upsertAppUser(userId);
});
