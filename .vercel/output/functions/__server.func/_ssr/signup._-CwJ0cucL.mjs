import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup._-CwJ0cucL.js
var $$splitComponentImporter = () => import("./signup._-CzAz5uje.mjs");
var Route = createFileRoute("/signup/$")({
	validateSearch: (search) => ({
		course: typeof search.course === "string" ? search.course : void 0,
		redirect: typeof search.redirect === "string" ? search.redirect : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
