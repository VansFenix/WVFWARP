import { NextResponse } from "next/server";
import { db, obfuscationPresets } from "@/db";
import { ensureSeeded } from "@/lib/seed";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    await ensureSeeded();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let presets;
    if (category && category !== "ALL") {
      presets = await db
        .select()
        .from(obfuscationPresets)
        .where(eq(obfuscationPresets.category, category))
        .orderBy(desc(obfuscationPresets.likesCount));
    } else {
      presets = await db
        .select()
        .from(obfuscationPresets)
        .orderBy(desc(obfuscationPresets.likesCount));
    }

    const parsed = presets.map((p) => ({
      ...p,
      params: JSON.parse(p.params),
    }));

    return NextResponse.json({ success: true, presets: parsed });
  } catch (error) {
    console.error("Failed to fetch presets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch presets" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      category = "AWG-2.0",
      protocol = "amneziawg-2.0",
      params,
      recommendedEndpoint = "162.159.193.5:2408",
      recommendedDns = "1.1.1.1, 1.0.0.1",
    } = body;

    if (!name || !params) {
      return NextResponse.json(
        { success: false, error: "Name and params are required" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(obfuscationPresets)
      .values({
        name,
        description: description || "Custom Community DPI Preset",
        category,
        protocol,
        params: JSON.stringify(params),
        recommendedEndpoint,
        recommendedDns,
        isOfficial: false,
        likesCount: 1,
      })
      .run();

    const created = {
      id: Number(result.lastInsertRowid),
      name,
      description: description || "Custom Community DPI Preset",
      category,
      protocol,
      params,
      recommendedEndpoint,
      recommendedDns,
      isOfficial: false,
      likesCount: 1,
    };

    return NextResponse.json({ success: true, preset: created });
  } catch (error) {
    console.error("Failed to create preset:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create preset" },
      { status: 500 }
    );
  }
}
