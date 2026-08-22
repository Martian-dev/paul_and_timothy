import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as clerkClient } from "./clerkClient-C2r7-CwH.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Ubm7332a.mjs";
import { t as getDb } from "./client-DgnZcK--.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-sync-CYpMqO27.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
/** Ensure every signed-in Clerk user has a local application record. */
var syncCurrentUser = createServerFn({ method: "POST" }).handler(createSsrRpc("f483d73d8422fc9c9c874b70d2d1ef1181f9828b8b706943f52d1c904fd47c0f"));
//#endregion
export { syncCurrentUser as n, upsertAppUser as r, createSsrRpc as t };
