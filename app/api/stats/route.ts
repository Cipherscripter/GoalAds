import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getSupabaseClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("generation_logs")
      .select("*")
      .eq("user_clerk_id", userId);

    if (error || !data || data.length === 0) {
      return NextResponse.json({
        total_generations: 0,
        top_platform: null,
        top_tone: null,
        top_region: null,
      });
    }

    // Count platform occurrences
    const platformCounts: Record<string, number> = {};
    const toneCounts: Record<string, number> = {};
    const regionCounts: Record<string, number> = {};

    for (const log of data) {
      if (Array.isArray(log.platforms)) {
        for (const p of log.platforms) {
          platformCounts[p] = (platformCounts[p] || 0) + 1;
        }
      }
      if (log.tone) {
        toneCounts[log.tone] = (toneCounts[log.tone] || 0) + 1;
      }
      if (log.region) {
        regionCounts[log.region] = (regionCounts[log.region] || 0) + 1;
      }
    }

    const topPlatform = Object.entries(platformCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    const topTone = Object.entries(toneCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    const topRegion = Object.entries(regionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return NextResponse.json({
      total_generations: data.length,
      top_platform: topPlatform,
      top_tone: topTone,
      top_region: topRegion,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
