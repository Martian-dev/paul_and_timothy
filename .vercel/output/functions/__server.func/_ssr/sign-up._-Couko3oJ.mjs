import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { i as SignUp$1 } from "./uiComponents-D4xEMHL2.mjs";
import { n as authUrl, t as authRedirectFromSearch } from "./auth-redirect-tOxmlDuY.mjs";
import { t as Route } from "./sign-up._-AO3bYSNp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-up._-Couko3oJ.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Page() {
	const { redirect } = Route.useSearch();
	const destination = authRedirectFromSearch(redirect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUp$1, {
			signInUrl: authUrl("/login", destination),
			forceRedirectUrl: destination,
			fallbackRedirectUrl: destination
		})
	});
}
//#endregion
export { Page as component };
