import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PLATFORM_LIMITS, REGION_TEAM_HINTS } from "@/lib/constants";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are a senior marketing copywriter specializing in global sports event campaigns. You write punchy, culturally relevant ad copy for the FIFA World Cup 2026 (June 11 – July 19, USA/Canada/Mexico). You understand regional differences in humor, formality, and football culture. Never use clichés like "score big" or "kick off your savings". Be specific, emotionally resonant, and brand-appropriate.`;

const TONE_DESCRIPTIONS: Record<string, string> = {
  hype: "Hype & Excited — high energy, exclamation-driven, passionate, urgent",
  friendly: "Friendly & Warm — conversational, approachable, welcoming, community-focused",
  professional: "Professional — polished, authoritative, benefit-focused, clear",
  witty: "Witty & Sarcastic — clever, self-aware, dry humor, punchy one-liners",
};

const PLATFORM_INSTRUCTIONS: Record<string, string> = {
  instagram: "Instagram caption — up to 150 words. Engaging, strong hook in first line. Emojis welcome.",
  whatsapp: "WhatsApp broadcast — up to 80 words. Conversational, direct, 1–2 emojis max.",
  twitter: "Twitter/X post — HARD LIMIT 280 characters. Punchy and shareable.",
  facebook: "Facebook post — up to 200 words. Include a clear CTA line at the end.",
  sms: "SMS blast — HARD LIMIT 160 characters. No emojis. Business name + offer + CTA only.",
  linkedin: "LinkedIn post — up to 100 words. Professional framing.",
};

type GenerateRequest = {
  businessName: string;
  product: string;
  offer?: string;
  audience: string;
  tone: string;
  region: string;
  platforms: string[];
};

// ── Gemini (Google AI Studio — free tier) ────────────────────────────────────
async function generateWithGemini(
  platform: string,
  data: GenerateRequest
): Promise<string> {
  const regionHint = REGION_TEAM_HINTS[data.region] || REGION_TEAM_HINTS["Global"];
  const toneDesc = TONE_DESCRIPTIONS[data.tone] || TONE_DESCRIPTIONS["hype"];
  const offerText = data.offer?.trim() || "no specific offer";

  const prompt = `${SYSTEM_PROMPT}

Write a ${platform} ad for ${data.businessName}, a business selling ${data.product} to ${data.audience}.
Region: ${data.region} — ${regionHint}.
Offer: ${offerText}
Tone: ${toneDesc}
Format rules: ${PLATFORM_INSTRUCTIONS[platform]}

Return ONLY the final copy. No explanation. No hashtags. No label prefix.`;

  const apiKey = process.env.GEMINI_API_KEY!.trim();

  // Use REST API directly — supports both AIza... and AQ... key formats
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 512, temperature: 0.8 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned empty response");
  return text.trim();
}

// ── Groq (free tier) ─────────────────────────────────────────────────────────
async function generateWithGroq(
  platform: string,
  data: GenerateRequest
): Promise<string> {
  const regionHint = REGION_TEAM_HINTS[data.region] || REGION_TEAM_HINTS["Global"];
  const toneDesc = TONE_DESCRIPTIONS[data.tone] || TONE_DESCRIPTIONS["hype"];
  const offerText = data.offer?.trim() || "no specific offer";

  const userPrompt = `Write a ${platform} ad for ${data.businessName}, a business selling ${data.product} to ${data.audience}.
Region: ${data.region} — ${regionHint}.
Offer: ${offerText}
Tone: ${toneDesc}
Format: ${PLATFORM_INSTRUCTIONS[platform]}
Return ONLY the final copy. No explanation. No hashtags.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY!.trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 512,
      temperature: 0.8,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq error: ${err}`);
  }

  const json = await res.json();
  return json.choices[0]?.message?.content?.trim() || "";
}

// ── Anthropic (paid) ─────────────────────────────────────────────────────────
async function generateWithAnthropic(
  platform: string,
  data: GenerateRequest
): Promise<string> {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY!.trim() });

  const regionHint = REGION_TEAM_HINTS[data.region] || REGION_TEAM_HINTS["Global"];
  const toneDesc = TONE_DESCRIPTIONS[data.tone] || TONE_DESCRIPTIONS["hype"];
  const offerText = data.offer?.trim() || "no specific offer";

  const userPrompt = `Write a ${platform} ad for ${data.businessName}, a business selling ${data.product} to ${data.audience}.
Region: ${data.region} — ${regionHint}.
Offer: ${offerText}
Tone: ${toneDesc}
Format: ${PLATFORM_INSTRUCTIONS[platform]}
Return ONLY the final copy. No explanation. No hashtags.`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  return message.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("")
    .trim();
}

// ── Pick whichever AI key is available ───────────────────────────────────────
async function generateCopy(platform: string, data: GenerateRequest): Promise<string> {
  // Try Groq first (most reliable free tier), then Gemini, then Anthropic
  if (process.env.GROQ_API_KEY?.trim()) {
    return generateWithGroq(platform, data);
  }
  if (process.env.GEMINI_API_KEY?.trim()) {
    return generateWithGemini(platform, data);
  }
  if (process.env.ANTHROPIC_API_KEY?.trim()) {
    return generateWithAnthropic(platform, data);
  }
  throw new Error("No AI API key configured. Add GROQ_API_KEY or GEMINI_API_KEY to .env.local");
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: GenerateRequest = await req.json();

    if (!data.businessName || !data.product || !data.platforms?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const validPlatforms = Object.keys(PLATFORM_LIMITS);
    const requestedPlatforms = data.platforms.filter((p) => validPlatforms.includes(p));

    if (!requestedPlatforms.length) {
      return NextResponse.json({ error: "No valid platforms selected" }, { status: 400 });
    }

    // Run platforms in parallel — Groq supports concurrent requests
    const settled = await Promise.allSettled(
      requestedPlatforms.map((platform) => generateCopy(platform, data))
    );

    const results = settled.map((result, i) => {
      const platform = requestedPlatforms[i];
      if (result.status === "fulfilled") {
        return { platform, copy: result.value };
      } else {
        const errMsg = result.reason instanceof Error
          ? result.reason.message
          : String(result.reason);
        console.error(`Failed for ${platform}:`, errMsg);
        return { platform, copy: "", error: `Error: ${errMsg.slice(0, 200)}` };
      }
    });

    // Log to Supabase (optional, non-blocking)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
      if (supabaseUrl && supabaseKey && supabaseUrl.startsWith("https://")) {
        const { getSupabaseClient } = await import("@/lib/supabase");
        const sb = getSupabaseClient();
        await sb.from("generation_logs").insert({
          user_clerk_id: userId,
          platforms: requestedPlatforms,
          tone: data.tone,
          region: data.region,
          business_name: data.businessName,
        });
      }
    } catch {
      // Non-fatal
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Generate API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
