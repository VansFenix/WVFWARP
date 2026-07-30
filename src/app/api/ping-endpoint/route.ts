import { NextResponse } from "next/server";
import { ENDPOINT_OPTIONS } from "@/lib/warp-engine";

export async function GET() {
  try {
    const results = ENDPOINT_OPTIONS.map((ep, idx) => {
      // Simulate realistic anycast UDP ping variations
      const baseLatencies = [24, 18, 14, 21, 29, 34, 19, 26];
      const randomJitter = Math.floor(Math.random() * 6);
      const ping = (baseLatencies[idx % baseLatencies.length] || 25) + randomJitter;

      let status = "Optimal";
      let statusColor = "emerald";
      if (ping > 30) {
        status = "Good";
        statusColor = "blue";
      } else if (ping < 20) {
        status = "Ultra-Fast";
        statusColor = "cyan";
      }

      return {
        id: ep.id,
        address: ep.address,
        port: ep.port,
        label: ep.label,
        badge: ep.badge,
        region: ep.region,
        pingMs: ping,
        status,
        statusColor,
      };
    });

    return NextResponse.json({ success: true, endpoints: results });
  } catch (error) {
    console.error("Ping error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to ping endpoints" },
      { status: 500 }
    );
  }
}
