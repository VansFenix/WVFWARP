import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
export * from "./schema";

let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function getPool(): Pool {
  if (!_pool) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required");
    }
    const url = new URL(databaseUrl);
    url.searchParams.set("sslmode", "no-verify");
    _pool = new Pool({
      connectionString: url.toString(),
      ssl: { rejectUnauthorized: false },
    });
  }
  return _pool;
}

function getDb() {
  if (!_db) {
    _db = drizzle(getPool(), { schema });
  }
  return _db;
}

export { getPool, getDb };
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop: string | symbol) {
    return (getDb() as any)[prop];
  },
  has(_, prop) {
    return prop in getDb();
  },
});
