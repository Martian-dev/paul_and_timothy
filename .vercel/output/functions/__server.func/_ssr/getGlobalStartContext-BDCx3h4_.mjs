import { u as getStartContext } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/getGlobalStartContext-BDCx3h4_.js
var getGlobalStartContext = () => {
	const context = getStartContext().contextAfterGlobalMiddlewares;
	if (!context) throw new Error(`Global context not set yet, you are calling getGlobalStartContext() before the global middlewares are applied.`);
	return context;
};
//#endregion
export { getGlobalStartContext as t };
