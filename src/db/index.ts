import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

const dbPath = process.env.DB_PATH || path.join(process.cwd(), "data", "database.sqlite");

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const globalForDb = globalThis as typeof globalThis & {
  __wvfwarpSqliteClient?: ReturnType<typeof createClient>;
};

const client =
  globalForDb.__wvfwarpSqliteClient ??
  createClient({
    url: `file:${dbPath}`,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__wvfwarpSqliteClient = client;
}

export const db = drizzle(client, { schema });
export * from "./schema";
