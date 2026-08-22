import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-in._-CX7ffujp.js
var $$splitComponentImporter = () => import("./sign-in._-B7DlNVmW.mjs");
var Route = createFileRoute("/sign-in/$")({
	validateSearch: (search) => ({ redirect: typeof search.redirect === "string" ? search.redirect : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
