"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Copy, RefreshCw, Download, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpgradeModal from "./UpgradeModal";
import { PLATFORM_ICONS, PLATFORM_LIMITS, WC_MATCHES } from "@/lib/constants";

type ResultItem = {
  platform: string;
  copy: string;
  error?: string;
};

type StoredData = {
  form: {
    businessName: string;
    product: string;
    offer: string;
    audience: string;
    tone: string;
    region: string;
    platforms: string[];
  };
  results: ResultItem[];
};

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getHashtags(product: string, region: string): string[] {
  const base = ["#WorldCup2026", "#FIFA2026", "#WC2026", "#FIFAWorldCup"];
  const regionTags: Record<string, string[]> = {
    "Latin America": ["#LaSeleccion", "#BrasilNasCopas", "#Argentina2026", "#CopaDelMundo2026"],
    "Europe": ["#ThreeLions", "#AllesDeutschland", "#LesBleus", "#WorldCup"],
    "North America": ["#USMNT", "#ElTri", "#CanadaSoccer", "#WorldCup2026USA"],
    "Asia Pacific": ["#SamuraiBlue", "#TaegukWarriors", "#Socceroos", "#AsiaWorldCup"],
    "Middle East & Africa": ["#AtlasLions", "#TerrangaSenegal", "#GreenFalcons", "#AFCWorldCup"],
    "Global": ["#Football", "#Soccer", "#WorldCup2026", "#FIFA"],
  };
  const productWords = product.toLowerCase().split(" ").slice(0, 2);
  const productTags = productWords.map((w) => `#${w.charAt(0).toUpperCase() + w.slice(1)}`);
  const regionSpecific = regionTags[region] || regionTags["Global"];
  return [...base, ...regionSpecific.slice(0, 4), ...productTags].slice(0, 10);
}

export default function ResultsView() {
  const { user } = useUser();
  const router = useRouter();
  const plan = (user?.publicMetadata?.plan as string) || "free";
  const isAgencyOrHigher = plan === "agency" || plan === "enterprise";

  const [data, setData] = useState<StoredData | null>(null);
  const [copies, setCopies] = useState<Record<string, string>>({});
  const [copiedKeys, setCopiedKeys] = useState<Record<string, boolean>>({});
  const [regenerating, setRegenerating] = useState<Record<string, boolean>>({});
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<"free_limit" | "agency_feature" | "enterprise_feature">("agency_feature");

  useEffect(() => {
    const stored = sessionStorage.getItem("goalads_results");
    if (!stored) {
      router.push("/generate");
      return;
    }
    try {
      const parsed: StoredData = JSON.parse(stored);
      setData(parsed);
      const initial: Record<string, string> = {};
      parsed.results.forEach((r) => {
        initial[r.platform] = r.copy;
      });
      setCopies(initial);
    } catch {
      router.push("/generate");
    }
  }, [router]);

  const handleCopy = useCallback(async (platform: string) => {
    const text = copies[platform];
    if (!text) return;
    
    // Add watermark for free tier
    const finalText = plan === "free" ? `${text}\n\n— Made with GoalAds (goalads.io)` : text;
    
    await navigator.clipboard.writeText(finalText);
    setCopiedKeys((prev) => ({ ...prev, [platform]: true }));
    setTimeout(() => setCopiedKeys((prev) => ({ ...prev, [platform]: false })), 2000);
  }, [copies, plan]);

  const handleRegenerate = useCallback(async (platform: string) => {
    if (!data) return;
    setRegenerating((prev) => ({ ...prev, [platform]: true }));
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data.form, platforms: [platform] }),
      });
      if (!res.ok) throw new Error("Failed");
      const result = await res.json();
      const newCopy = result.results?.[0]?.copy;
      if (newCopy) {
        setCopies((prev) => ({ ...prev, [platform]: newCopy }));
      }
    } catch {
      // Keep existing
    } finally {
      setRegenerating((prev) => ({ ...prev, [platform]: false }));
    }
  }, [data]);

  const handlePdfExport = async () => {
    if (!isAgencyOrHigher) {
      setUpgradeReason("agency_feature");
      setShowUpgradeModal(true);
      return;
    }
    if (!data) return;

    try {
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 18;
      const contentW = pageW - margin * 2;
      let y = margin;

      // Strip emojis — jsPDF can't render them
      const stripEmoji = (text: string) =>
        text.replace(/[\u{1F000}-\u{1FFFF}|\u{2600}-\u{27FF}|\u{FE00}-\u{FEFF}]/gu, "").trim();

      // ── Header ──────────────────────────────────────────────────────────────
      doc.setFillColor(10, 79, 46);
      doc.rect(0, 0, pageW, 28, "F");
      doc.setTextColor(240, 180, 41);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("GoalAds", margin, 13);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("World Cup 2026 Ad Creatives", margin, 21);
      doc.text(
        `Generated ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
        pageW - margin, 21, { align: "right" }
      );
      y = 38;

      // ── Campaign info ────────────────────────────────────────────────────────
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text(data.form.businessName, margin, y);
      y += 7;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Product: ${data.form.product}   Tone: ${data.form.tone}   Region: ${data.form.region}   Audience: ${data.form.audience}`,
        margin, y
      );
      if (data.form.offer) {
        y += 5;
        doc.text(`Offer: ${data.form.offer}`, margin, y);
      }
      y += 8;

      // Divider
      doc.setDrawColor(200, 220, 200);
      doc.line(margin, y, pageW - margin, y);
      y += 8;

      // ── Platform labels (no emoji) ────────────────────────────────────────────
      const platformLabel: Record<string, string> = {
        instagram: "Instagram Caption",
        whatsapp: "WhatsApp Broadcast",
        twitter: "Twitter / X Post",
        facebook: "Facebook Post",
        sms: "SMS Blast",
        linkedin: "LinkedIn Post",
      };

      for (const result of data.results) {
        const rawCopy = copies[result.platform] || result.copy;
        if (!rawCopy) continue;

        // Strip emojis from copy text
        const copy = stripEmoji(rawCopy);
        const label = platformLabel[result.platform] || result.platform;

        // Platform label
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(10, 79, 46);
        doc.text(label, margin, y);
        y += 5;

        // Wrap copy text
        doc.setFontSize(9.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
        const lines = doc.splitTextToSize(copy, contentW - 8);

        // New page if needed
        if (y + lines.length * 5 + 14 > 272) {
          doc.addPage();
          y = margin;
        }

        // Copy box
        const boxH = lines.length * 5 + 10;
        doc.setFillColor(250, 252, 250);
        doc.setDrawColor(210, 230, 210);
        doc.roundedRect(margin, y, contentW, boxH, 2, 2, "FD");
        doc.text(lines, margin + 4, y + 6);

        // Word count bottom-right
        const wordCount = copy.trim().split(/\s+/).length;
        doc.setFontSize(8);
        doc.setTextColor(160, 160, 160);
        doc.text(`${wordCount} words`, pageW - margin - 2, y + boxH - 3, { align: "right" });

        y += boxH + 10;
      }

      // ── Footer ───────────────────────────────────────────────────────────────
      const pageCount = doc.getNumberOfPages();
      for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 180);
        doc.text(
          `Generated by GoalAds  |  goalads.io  |  Page ${p} of ${pageCount}`,
          pageW / 2, 290, { align: "center" }
        );
      }

      const filename = `${data.form.businessName.replace(/\s+/g, "-").toLowerCase()}-goalads-wc2026.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("PDF export failed. Please try again.");
    }
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="football-loader text-4xl">⚽</span>
      </div>
    );
  }

  const hashtags = getHashtags(data.form.product, data.form.region);

  return (
    <>
      {showUpgradeModal && (
        <UpgradeModal
          reason={upgradeReason}
          canDismiss
          onClose={() => setShowUpgradeModal(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h1 className="text-2xl font-extrabold text-white">Your creatives are ready</h1>
          </div>
          <p className="text-gray-400 text-sm">
            {data.results.length} platform{data.results.length !== 1 ? "s" : ""} generated for{" "}
            <strong className="text-white">{data.form.businessName}</strong>
          </p>
        </div>
        <Link href="/generate" className="btn-ghost text-sm flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          New campaign
        </Link>
      </div>

      {/* Free tier notice */}
      {plan === "free" && (
        <div className="bg-gold-DEFAULT/10 border border-gold-DEFAULT/30 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            <span className="text-gold-DEFAULT font-semibold">Free tier:</span> Copies include a &quot;Made with GoalAds&quot; watermark.{" "}
            <Link href="/#pricing" className="text-gold-DEFAULT underline">Upgrade to remove it.</Link>
          </p>
        </div>
      )}

      {/* Output Cards */}
      <div className="space-y-4 mb-10">
        {data.results.map((result) => {
          const copy = copies[result.platform] || result.copy;
          const limit = PLATFORM_LIMITS[result.platform];
          const icon = PLATFORM_ICONS[result.platform] || "📢";
          const isRegenerating = regenerating[result.platform];
          const hasError = !!result.error && !copy;
          const wordCount = countWords(copy);
          const charCount = copy.length;

          return (
            <div key={result.platform} className="card p-6 animate-fade-in">
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <h3 className="text-white font-semibold capitalize">
                      {PLATFORM_LIMITS[result.platform]
                        ? result.platform.charAt(0).toUpperCase() + result.platform.slice(1)
                        : result.platform}
                    </h3>
                    <p className="text-gray-500 text-xs capitalize">
                      {limit?.words ? `${limit.words} words max` : limit?.chars ? `${limit.chars} chars max` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {limit?.chars ? (
                    <span className={`badge text-xs ${charCount > limit.chars ? "bg-red-900/30 text-red-400" : "bg-gray-800 text-gray-400"}`}>
                      {charCount} / {limit.chars} chars
                    </span>
                  ) : limit?.words ? (
                    <span className={`badge text-xs ${wordCount > limit.words ? "bg-red-900/30 text-red-400" : "bg-gray-800 text-gray-400"}`}>
                      {wordCount} words
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Content */}
              {hasError ? (
                <div className="flex items-center gap-3 text-red-400 bg-red-900/20 rounded-lg p-4 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {result.error}
                </div>
              ) : (
                <textarea
                  className="w-full bg-gray-800/50 border border-gray-700 text-gray-200 text-sm rounded-xl p-4 min-h-[100px] focus:outline-none focus:border-gold-DEFAULT/50 resize-y leading-relaxed"
                  value={copy}
                  onChange={(e) => setCopies((prev) => ({ ...prev, [result.platform]: e.target.value }))}
                />
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => handleCopy(result.platform)}
                  disabled={!copy}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                >
                  {copiedKeys[result.platform] ? (
                    <><CheckCircle className="w-4 h-4 text-green-400" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy</>
                  )}
                </button>
                <button
                  onClick={() => handleRegenerate(result.platform)}
                  disabled={isRegenerating}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
                  {isRegenerating ? "Regenerating..." : "Regenerate"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hashtag Pack */}
      <div className="card p-6 mb-6">
        <h2 className="text-white font-bold text-lg mb-1">🏷️ World Cup Hashtag Pack</h2>
        <p className="text-gray-500 text-sm mb-4">10 hashtags tailored to your niche and region</p>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#0a4f2e]/40 border border-[#0a4f2e]/60 text-gold-DEFAULT text-sm font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-[#0a4f2e]/60 transition-colors"
              onClick={async () => {
                await navigator.clipboard.writeText(hashtags.join(" "));
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          className="mt-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          onClick={async () => {
            await navigator.clipboard.writeText(hashtags.join(" "));
          }}
        >
          Copy all hashtags →
        </button>
      </div>

      {/* Match Day Calendar */}
      <div className="card p-6 mb-6">
        <h2 className="text-white font-bold text-lg mb-1">📅 Match Day Post Calendar</h2>
        <p className="text-gray-500 text-sm mb-4">Next 5 World Cup fixtures — post 30 mins before kickoff for max reach</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-gray-800">
                <th className="text-left pb-2 pr-4">Date</th>
                <th className="text-left pb-2 pr-4">Match</th>
                <th className="text-left pb-2 pr-4">Kickoff (ET)</th>
                <th className="text-left pb-2">📲 Post at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {WC_MATCHES.map((match, i) => (
                <tr key={i} className="text-gray-300">
                  <td className="py-2.5 pr-4 text-gray-500">{match.date}</td>
                  <td className="py-2.5 pr-4 font-medium">{match.teams}</td>
                  <td className="py-2.5 pr-4">{match.time}</td>
                  <td className="py-2.5 text-gold-DEFAULT font-medium">{match.postTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Export */}
      <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-2xl p-6">
        <div>
          <h3 className="text-white font-semibold">Export as PDF</h3>
          <p className="text-gray-400 text-sm mt-0.5">
            {isAgencyOrHigher
              ? "Download a white-label PDF of all your creatives"
              : "Agency and Enterprise feature — white-label PDF report"}
          </p>
        </div>
        <button
          onClick={handlePdfExport}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isAgencyOrHigher
              ? "bg-[#f0b429] hover:bg-[#f5c84a] text-gray-900"
              : "bg-gray-800 border border-gray-600 text-gray-300 hover:border-[#f0b429]/50 hover:text-white"
          }`}
        >
          <Download className="w-4 h-4" />
          {isAgencyOrHigher ? "Export PDF" : "Upgrade to Export →"}
        </button>
      </div>

      {/* Upgrade prompts */}
      {plan === "pro" && (
        <div className="mt-6 text-center">
          <Link href="/#pricing" className="text-sm text-gray-500 hover:text-gold-DEFAULT transition-colors">
            Need brand profiles and PDF export?{" "}
            <span className="text-gold-DEFAULT">Upgrade to Agency →</span>
          </Link>
        </div>
      )}
      {plan === "agency" && (
        <div className="mt-6 text-center">
          <Link href="/#pricing" className="text-sm text-gray-500 hover:text-gold-DEFAULT transition-colors">
            Want custom AI tone training and API access?{" "}
            <span className="text-gold-DEFAULT">Upgrade to Enterprise →</span>
          </Link>
        </div>
      )}
    </>
  );
}
