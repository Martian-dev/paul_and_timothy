//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Ubm7332a.js
var manifest = {
	"02c67dcb0b75117414fff2cd4d17640f9f330c40a9fb466a5332f9415f46590b": {
		functionName: "getEventRegistration_createServerFn_handler",
		importer: () => import("./_ssr/registrations-BNKBl0qO.mjs")
	},
	"59e1360793e589c9b42641858ecbd554e01ba6d7565449c41d7f86f38e409a59": {
		functionName: "requireRegistrationAuth_createServerFn_handler",
		importer: () => import("./_ssr/register-Bu1aV_qR.mjs")
	},
	"c0d25c2b0c58bb7b565606a38134bed745ea38c285c25f462c08e0add525e060": {
		functionName: "registerForEvent_createServerFn_handler",
		importer: () => import("./_ssr/registrations-BNKBl0qO.mjs")
	},
	"f483d73d8422fc9c9c874b70d2d1ef1181f9828b8b706943f52d1c904fd47c0f": {
		functionName: "syncCurrentUser_createServerFn_handler",
		importer: () => import("./_ssr/user-sync-BV5xGQDk.mjs")
	},
	"f74d90c6929cbdf44c3fe24c93293046fa62f7b045cb62a17f224f21990fa71f": {
		functionName: "saveAssessmentResult_createServerFn_handler",
		importer: () => import("./_ssr/assessment-results-CMJzxtkw.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
