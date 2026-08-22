import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as clerkClient } from "./clerkClient-C2r7-CwH.mjs";
import { t as getDb } from "./client-DgnZcK--.mjs";
import { n as createServerRpc, t as auth } from "./auth-B0IFwJaY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-sync-BV5xGQDk.js
async function upsertAppUser(clerkUserId) {
	const clerkUser = await clerkClient().users.getUser(clerkUserId);
	const email = clerkUser.primaryEmailAddress?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;
	if (!email) throw new Error("ACCOUNT_EMAIL_REQUIRED");
	const phone = clerkUser.primaryPhoneNumber?.phoneNumber ?? clerkUser.phoneNumbers[0]?.phoneNumber;
	const appUserId = (await getDb()`
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
  `)[0]?.id;
	if (!appUserId) throw new Error("USER_SYNC_FAILED");
	return {
		appUserId,
		email
	};
}
var syncCurrentUser_createServerFn_handler = createServerRpc({
	id: "f483d73d8422fc9c9c874b70d2d1ef1181f9828b8b706943f52d1c904fd47c0f",
	name: "syncCurrentUser",
	filename: "src/lib/user-sync.ts"
}, (opts) => syncCurrentUser.__executeServer(opts));
var syncCurrentUser = createServerFn({ method: "POST" }).handler(syncCurrentUser_createServerFn_handler, async () => {
	const { isAuthenticated, userId } = await auth();
	if (!isAuthenticated || !userId) throw new Error("UNAUTHORIZED");
	return upsertAppUser(userId);
});
//#endregion
export { syncCurrentUser_createServerFn_handler };
