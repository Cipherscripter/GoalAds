import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await currentUser();
    const plan = user?.publicMetadata?.plan as string;

    if (plan !== "agency" && plan !== "enterprise") {
      return NextResponse.json({ error: "Agency or Enterprise plan required" }, { status: 403 });
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("brand_profiles")
      .select("*")
      .eq("user_clerk_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ brands: data });
  } catch (error) {
    console.error("Brands GET error:", error);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await currentUser();
    const plan = user?.publicMetadata?.plan as string;

    if (plan !== "agency" && plan !== "enterprise") {
      return NextResponse.json({ error: "Agency or Enterprise plan required" }, { status: 403 });
    }

    const body = await req.json();
    const { name, product, tone, region, logo_url, brand_voice } = body;

    if (!name || !product) {
      return NextResponse.json({ error: "Name and product required" }, { status: 400 });
    }

    const supabase = getSupabaseClient();

    // Check limit for agency (max 10)
    if (plan === "agency") {
      const { count } = await supabase
        .from("brand_profiles")
        .select("*", { count: "exact", head: true })
        .eq("user_clerk_id", userId);

      if ((count || 0) >= 10) {
        return NextResponse.json(
          { error: "Maximum 10 brand profiles reached. Upgrade to Enterprise for unlimited." },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase
      .from("brand_profiles")
      .insert({
        user_clerk_id: userId,
        name,
        product,
        tone: tone || "hype",
        region: region || "Global",
        logo_url: logo_url || null,
        brand_voice: brand_voice || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ brand: data }, { status: 201 });
  } catch (error) {
    console.error("Brands POST error:", error);
    return NextResponse.json({ error: "Failed to save brand" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("id");

    if (!brandId) return NextResponse.json({ error: "Brand ID required" }, { status: 400 });

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("brand_profiles")
      .delete()
      .eq("id", brandId)
      .eq("user_clerk_id", userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Brands DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}
