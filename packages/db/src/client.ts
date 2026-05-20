import { DeduplicateJoinsPlugin, Kysely, ParseJSONResultsPlugin, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "./types";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "postgresql://localhost:5432/postgres",
});

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({
  dialect,
  plugins: [new ParseJSONResultsPlugin(), new DeduplicateJoinsPlugin()],
});
