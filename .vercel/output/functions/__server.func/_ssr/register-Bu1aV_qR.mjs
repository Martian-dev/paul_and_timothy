import { N as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, n as objectType } from "../_libs/zod.mjs";
import { n as createServerRpc, t as auth } from "./auth-B0IFwJaY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-Bu1aV_qR.js
var requireRegistrationAuth_createServerFn_handler = createServerRpc({
	id: "59e1360793e589c9b42641858ecbd554e01ba6d7565449c41d7f86f38e409a59",
	name: "requireRegistrationAuth",
	filename: "src/routes/register.tsx"
}, (opts) => requireRegistrationAuth.__executeServer(opts));
var requireRegistrationAuth = createServerFn({ method: "GET" }).validator(objectType({ returnTo: stringType().startsWith("/").max(2048) })).handler(requireRegistrationAuth_createServerFn_handler, async ({ data }) => {
	const { isAuthenticated } = await auth();
	if (!isAuthenticated) throw redirect({
		to: "/login/$",
		params: { _splat: "" },
		search: {
			course: void 0,
			redirect: data.returnTo
		}
	});
});
//#endregion
export { requireRegistrationAuth_createServerFn_handler };
