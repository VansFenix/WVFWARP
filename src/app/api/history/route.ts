import { NextResponse } from "next/server";
import { db, generatedConfigs } from "@/db";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const recent = await db
      .select({
        id: generatedConfigs.id,
        shareToken: generatedConfigs.shareToken,
        title: generatedConfigs.title,
        protocol: generatedConfigs.protocol,
        dnsProvider: generatedConfigs.dnsProvider,
        dnsServers: generatedConfigs.dnsServers,
        endpoint: generatedConfigs.endpoint,
        mtu: generatedConfigs.mtu,
        warpAccountType: generatedConfigs.warpAccountType,
        routingMode: generatedConfigs.routingMode,
        downloadsCount: generatedConfigs.downloadsCount,
        createdAt: generatedConfigs.createdAt,
      })
      .from(generatedConfigs)
      .orderBy(desc(generatedConfigs.createdAt))
      .limit(12);

    return NextResponse.json({ success: true, history: recent });
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
