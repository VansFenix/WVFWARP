import { NextResponse } from "next/server";
import { db, obfuscationPresets } from "@/db";
import { ensureSeeded } from "@/lib/seed";
import { builtinPresets, presetCategories } from "@/lib/presets-data";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    await ensureSeeded();
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
    return NextResponse.json({ success: true, presets, categories: presetCategories, source: "db" });
  } catch (error) {
    console.warn("DB presets unavailable, using embedded data:", error);
    let result = builtinPresets;
    if (category && category !== "ALL") {
      result = builtinPresets.filter((p) => p.category === category);
    }
    result.sort((a, b) => b.likesCount - a.likesCount);
    return NextResponse.json({ success: true, presets: result, categories: presetCategories, source: "embedded" });
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

    const [created] = await db
      .insert(obfuscationPresets)
      .values({
        name,
        description: description || "Custom Community DPI Preset",
        category,
        protocol,
        params,
        recommendedEndpoint,
        recommendedDns,
        isOfficial: false,
        likesCount: 1,
      })
      .returning();

    return NextResponse.json({ success: true, preset: created });
  } catch (error) {
    console.error("Failed to create preset:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create preset" },
      { status: 500 }
    );
  }
}
