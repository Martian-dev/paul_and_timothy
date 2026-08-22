import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { r as SignIn$1 } from "./uiComponents-D4xEMHL2.mjs";
import { n as authUrl, t as authRedirectFromSearch } from "./auth-redirect-tOxmlDuY.mjs";
import { t as Route } from "./login._-BhCAlxL3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login._-DyzCRbiY.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function LoginCallbackPage() {
	const { redirect } = Route.useSearch();
	const destination = authRedirectFromSearch(redirect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-cream px-6 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignIn$1, {
			signUpUrl: authUrl("/signup", destination),
			forceRedirectUrl: destination,
			fallbackRedirectUrl: destination
		})
	});
}
//#endregion
export { LoginCallbackPage as component };
