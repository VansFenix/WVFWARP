import { NextResponse } from "next/server";
import { db, generatedConfigs } from "@/db";
import { eq, sql } from "drizzle-orm";
import { generateFullConfig, ConfigGenerateRequest, ObfuscationParams } from "@/lib/warp-engine";

export async function GET(
  request: Request,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;
    const [found] = await db
      .select()
      .from(generatedConfigs)
      .where(eq(generatedConfigs.shareToken, token));

    if (!found) {
      return NextResponse.json(
        { success: false, error: "Configuration not found" },
        { status: 404 }
      );
    }

    await db
      .update(generatedConfigs)
      .set({ downloadsCount: sql`${generatedConfigs.downloadsCount} + 1` })
      .where(eq(generatedConfigs.id, found.id));

    const [addr, portStr] = found.endpoint.split(":");
    const obfuscation = JSON.parse(found.obfuscationParams) as ObfuscationParams;
    const reqObj: ConfigGenerateRequest = {
      title: found.title,
      protocol: found.protocol as any,
      dnsProviderId: found.dnsProvider,
      customDnsServers: found.dnsServers,
      endpointAddress: addr || "162.159.193.5",
      endpointPort: parseInt(portStr || "2408", 10),
      mtu: found.mtu,
      obfuscation,
      warpKeyMode: "custom-keypair",
      customPrivateKey: found.privateKey,
      customPublicKey: found.publicKey,
      customClientV4: found.clientAddressV4,
      customClientV6: found.clientAddressV6,
      reservedBits: found.reservedBits || "[0, 0, 0]",
      routingMode: (found.routingMode as any) || "all",
    };

    const payload = generateFullConfig(reqObj);

    return NextResponse.json({
      success: true,
      config: { ...found, obfuscationParams: obfuscation },
      payload,
    });
  } catch (error) {
    console.error("Fetch config error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load config" },
      { status: 500 }
    );
  }
}
