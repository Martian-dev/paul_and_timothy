import { neon } from "@neondatabase/serverless";
import { readFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const fileEnv = loadEnv("development", process.cwd(), "");
const databaseUrl = process.env.DATABASE_URL ?? fileEnv.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not configured");
  process.exit(1);
}

const sql = neon(databaseUrl);
const migrationsDir = fileURLToPath(new URL("../src/db/migrations/", import.meta.url));

await sql`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

const appliedRows = await sql`SELECT version FROM schema_migrations`;
const applied = new Set(appliedRows.map(({ version }) => version));
const migrationFiles = (await readdir(migrationsDir))
  .filter((file) => file.endsWith(".sql"))
  .sort();

for (const file of migrationFiles) {
  if (applied.has(file)) {
    console.log(`Skipping ${file}`);
    continue;
  }

  const contents = await readFile(join(migrationsDir, file), "utf8");
  const statements = contents
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(statement);
  }

  await sql`INSERT INTO schema_migrations (version) VALUES (${file})`;
  console.log(`Applied ${file}`);
}

console.log("Database migrations complete");
