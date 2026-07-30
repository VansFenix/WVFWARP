import { getPool, getDb } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const details: Record<string, any> = {};
  try {
    const pool = getPool();
    details.totalCount = pool.totalCount;
    details.waitingCount = pool.waitingCount;
    details.idleCount = pool.idleCount;

    const client = await pool.connect();
    try {
      const res = await client.query("SELECT 1 AS ok");
      details.queryOk = res.rows[0].ok;
    } finally {
      client.release();
    }
    return Response.json({ ok: true, details });
  } catch (e: any) {
    const errInfo = {
      message: e?.message,
      code: e?.code,
      errno: e?.errno,
      syscall: e?.syscall,
      hostname: e?.hostname,
      stack: e?.stack?.split("\n").slice(0, 6).join(" | "),
    };
    return Response.json(
      { ok: false, error: e?.message, ...errInfo },
      { status: 500 }
    );
  }
}
