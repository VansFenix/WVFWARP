import { NextResponse } from "next/server";
import { db, warpKeysPool } from "@/db";
import { generateWireGuardKeyPair } from "@/lib/warp-engine";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Try to pick an unassigned key from pool
    const poolItems = await db
      .select()
      .from(warpKeysPool)
      .where(eq(warpKeysPool.isAssigned, false))
      .limit(1);

    if (poolItems && poolItems.length > 0) {
      const item = poolItems[0];
      return NextResponse.json({
        success: true,
        source: "WARP_POOL",
        keyPair: {
          privateKey: item.privateKey,
          publicKey: item.publicKey,
          clientV4: item.clientIpV4,
          clientV6: item.clientIpV6,
          reservedBits: item.reservedBits || "[0, 0, 0]",
        },
      });
    }

    // Otherwise generate a fresh one
    const keyPair = generateWireGuardKeyPair();

    return NextResponse.json({
      success: true,
      source: "GENERATED_ON_DEMAND",
      keyPair,
    });
  } catch (error) {
    console.error("Warp key error:", error);
    const keyPair = generateWireGuardKeyPair();
    return NextResponse.json({
      success: true,
      source: "FALLBACK_GENERATED",
      keyPair,
    });
  }
}
