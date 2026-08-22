import { t as cs } from "../_libs/neondatabase__serverless.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-DgnZcK--.js
var sqlClient;
/**
* Create the Neon client lazily so builds and public browser bundles never
* evaluate the database connection unless a server function actually runs.
*/
function getDb() {
	if (sqlClient) return sqlClient;
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) throw new Error("DATABASE_URL is not configured");
	sqlClient = cs(databaseUrl);
	return sqlClient;
}
//#endregion
export { getDb as t };
