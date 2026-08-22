import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-up._-AO3bYSNp.js
var $$splitComponentImporter = () => import("./sign-up._-Couko3oJ.mjs");
var Route = createFileRoute("/sign-up/$")({
	validateSearch: (search) => ({ redirect: typeof search.redirect === "string" ? search.redirect : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
