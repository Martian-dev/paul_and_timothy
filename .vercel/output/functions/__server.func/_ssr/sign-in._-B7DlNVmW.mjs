import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { r as SignIn$1 } from "./uiComponents-D4xEMHL2.mjs";
import { n as authUrl, t as authRedirectFromSearch } from "./auth-redirect-tOxmlDuY.mjs";
import { t as Route } from "./sign-in._-CX7ffujp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-in._-B7DlNVmW.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Page() {
	const { redirect } = Route.useSearch();
	const destination = authRedirectFromSearch(redirect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignIn$1, {
			signUpUrl: authUrl("/signup", destination),
			forceRedirectUrl: destination,
			fallbackRedirectUrl: destination
		})
	});
}
//#endregion
export { Page as component };
