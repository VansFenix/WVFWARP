import { NextResponse } from "next/server";
import { db, generatedConfigs } from "@/db";
import { generateFullConfig, ConfigGenerateRequest } from "@/lib/warp-engine";

export async function POST(request: Request) {
  try {
    const body: ConfigGenerateRequest = await request.json();

    if (!body.protocol || !body.endpointAddress) {
      return NextResponse.json(
        { success: false, error: "Protocol and endpoint are required" },
        { status: 400 }
      );
    }

    const payload = generateFullConfig(body);

    let dbRecordId = 0;
    try {
      const [saved] = await db
        .insert(generatedConfigs)
        .values({
          shareToken: payload.shareToken,
          title: payload.title,
          protocol: payload.protocol,
          dnsProvider: body.dnsProviderId || "cloudflare-default",
          dnsServers: payload.dnsString,
          endpoint: payload.endpointString,
          mtu: payload.mtu,
          obfuscationParams: payload.obfuscation,
          warpAccountType: body.warpKeyMode === "warp-plus-key" ? "WARP_PLUS" : "FREE",
          privateKey: payload.privateKey,
          publicKey: payload.publicKey,
          clientAddressV4: payload.clientV4,
          clientAddressV6: payload.clientV6,
          reservedBits: payload.reservedBits,
          routingMode: body.routingMode || "all",
          downloadsCount: 0,
        })
        .returning({ id: generatedConfigs.id });
      dbRecordId = saved.id;
    } catch (dbErr: any) {
      console.warn("Could not save to DB (will return generated config):", dbErr?.message);
    }

    return NextResponse.json({
      success: true,
      configId: dbRecordId,
      ...payload,
    });
  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate configuration" },
      { status: 500 }
    );
  }
}
