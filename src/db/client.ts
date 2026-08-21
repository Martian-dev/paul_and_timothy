import { neon } from "@neondatabase/serverless";

type NeonSql = ReturnType<typeof neon>;

let sqlClient: NeonSql | undefined;

/**
 * Create the Neon client lazily so builds and public browser bundles never
 * evaluate the database connection unless a server function actually runs.
 */
export function getDb(): NeonSql {
  if (sqlClient) return sqlClient;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  sqlClient = neon(databaseUrl);
  return sqlClient;
}
