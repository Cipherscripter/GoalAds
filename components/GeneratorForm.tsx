"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Zap, Info } from "lucide-react";
import UpgradeModal from "./UpgradeModal";
import { isFreeTierExhausted, incrementGenerationCount } from "@/lib/utils";

const TONES = [
  { key: "hype", label: "Hype & Excited" },
  { key: "friendly", label: "Friendly & Warm" },
  { key: "professional", label: "Professional" },
  { key: "witty", label: "Witty & Sarcastic" },
];

const AUDIENCES = [
  "General public",
  "Football fans",
  "Families",
  "Corporate clients",
  "Young adults 18–30",
];

const REGIONS = [
  "North America",
  "Europe",
  "Latin America",
  "Middle East & Africa",
  "Asia Pacific",
  "Global",
];

const PLATFORMS = [
  { key: "instagram", label: "Instagram caption", icon: "📸" },
  { key: "whatsapp", label: "WhatsApp broadcast", icon: "💬" },
  { key: "twitter", label: "Twitter/X post", icon: "🐦" },
  { key: "facebook", label: "Facebook post", icon: "👥" },
  { key: "sms", label: "SMS blast", icon: "📱" },
  { key: "linkedin", label: "LinkedIn post", icon: "💼" },
];

type FormData = {
  businessName: string;
  product: string;
  offer: string;
  audience: string;
  tone: string;
  region: string;
  platforms: string[];
};

export default function GeneratorForm() {
  const { user } = useUser();
  const router = useRouter();

  const plan = (user?.publicMetadata?.plan as string) || "free";
  const isFree = plan === "free";

  const [showUpgrade, setShowUpgrade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    businessName: "",
    product: "",
    offer: "",
    audience: "General public",
    tone: "hype",
    region: "Global",
    platforms: ["instagram", "facebook"],
  });

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePlatform(key: string) {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(key)
        ? prev.platforms.filter((p) => p !== key)
        : [...prev.platforms, key],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.businessName.trim() || !form.product.trim()) {
      setError("Please fill in your business name and what you sell.");
      return;
    }
    if (form.platforms.length === 0) {
      setError("Please select at least one platform.");
      return;
    }

    // Free tier check
    if (isFree && isFreeTierExhausted()) {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed. Please try again.");
      }

      const data = await res.json();

      // Increment free tier count
      if (isFree) {
        const newCount = incrementGenerationCount();
        if (newCount >= 3) {
          // Will show modal on next attempt
        }
      }

      // Store results and redirect
      sessionStorage.setItem("goalads_results", JSON.stringify({ form, results: data.results }));
      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showUpgrade && (
        <UpgradeModal reason="free_limit" canDismiss={false} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Free tier notice */}
        {isFree && (
          <div className="bg-gold-DEFAULT/10 border border-gold-DEFAULT/30 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-gold-DEFAULT flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="text-gold-DEFAULT font-semibold">Free tier: </span>
              <span className="text-gray-300">
                You have used{" "}
                <strong>
                  {typeof window !== "undefined"
                    ? parseInt(localStorage.getItem("goalads_generation_count") || "0")
                    : 0}
                </strong>{" "}
                of 3 free generations. Upgrade for unlimited access.
              </span>
            </div>
          </div>
        )}

        {/* Business Name */}
        <div>
          <label className="label">Business name <span className="text-red-400">*</span></label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Bella Vista Restaurant"
            value={form.businessName}
            onChange={(e) => setField("businessName", e.target.value)}
            required
          />
        </div>

        {/* Product */}
        <div>
          <label className="label">What you sell <span className="text-red-400">*</span></label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Italian food, gym memberships, sneakers"
            value={form.product}
            onChange={(e) => setField("product", e.target.value)}
            required
          />
        </div>

        {/* Offer */}
        <div>
          <label className="label">Offer or promotion <span className="text-gray-500 font-normal">(optional)</span></label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Buy 2 get 1 free during match days"
            value={form.offer}
            onChange={(e) => setField("offer", e.target.value)}
          />
        </div>

        {/* Audience */}
        <div>
          <label className="label">Target audience <span className="text-red-400">*</span></label>
          <select
            className="input-field"
            value={form.audience}
            onChange={(e) => setField("audience", e.target.value)}
          >
            {AUDIENCES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Tone */}
        <div>
          <label className="label">Tone <span className="text-red-400">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setField("tone", t.key)}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                  form.tone === t.key
                    ? "bg-[#0a4f2e] border-[#0a4f2e] text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="label">Market / Region <span className="text-red-400">*</span></label>
          <select
            className="input-field"
            value={form.region}
            onChange={(e) => setField("region", e.target.value)}
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <p className="text-gray-600 text-xs mt-1.5">
            Adjusts cultural references — Latin America gets Brazil/Argentina, Europe gets England/France, etc.
          </p>
        </div>

        {/* Platforms */}
        <div>
          <label className="label">Platforms <span className="text-red-400">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => togglePlatform(p.key)}
                className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                  form.platforms.includes(p.key)
                    ? "bg-[#0a4f2e] border-[#0a4f2e] text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <span>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-1.5">
            Select all platforms you want copy for
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-base py-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="football-loader inline-block">⚽</span>
              Generating your creatives...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate my creatives →
            </>
          )}
        </button>

        {loading && (
          <p className="text-center text-gray-500 text-xs animate-pulse">
            Running {form.platforms.length} parallel AI requests... usually takes 5–10 seconds
          </p>
        )}
      </form>
    </>
  );
}
