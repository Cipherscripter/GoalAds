"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Zap, BarChart3, Globe, Palette, CheckCircle, ExternalLink,
  Plus, Trash2, Save, BookOpen
} from "lucide-react";
import UpgradeModal from "./UpgradeModal";

type BrandProfile = {
  id: string;
  name: string;
  product: string;
  tone: string;
  region: string;
  logo_url?: string;
  brand_voice?: string;
};

type Stats = {
  total_generations: number;
  top_platform: string;
  top_tone: string;
  top_region: string;
};

interface DashboardViewProps {
  plan: string;
  checkoutSuccess: boolean;
}

const PLAN_COLORS: Record<string, string> = {
  free: "bg-gray-700 text-gray-300",
  pro: "bg-gold-DEFAULT/20 text-gold-DEFAULT border border-gold-DEFAULT/40",
  agency: "bg-blue-500/20 text-blue-400 border border-blue-400/40",
  enterprise: "bg-purple-500/20 text-purple-400 border border-purple-400/40",
};

export default function DashboardView({ plan, checkoutSuccess }: DashboardViewProps) {
  const { user } = useUser();
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "", product: "", tone: "hype", region: "Global" });

  const isAgencyOrHigher = plan === "agency" || plan === "enterprise";

  useEffect(() => {
    if (isAgencyOrHigher) {
      fetchBrands();
    }
    fetchStats();
  }, [isAgencyOrHigher]);

  async function fetchBrands() {
    setLoadingBrands(true);
    try {
      const res = await fetch("/api/brands");
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands || []);
      }
    } catch {}
    setLoadingBrands(false);
  }

  async function fetchStats() {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {}
  }

  async function saveBrand() {
    if (!newBrand.name || !newBrand.product) return;
    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBrand),
      });
      if (res.ok) {
        const data = await res.json();
        setBrands((prev) => [data.brand, ...prev]);
        setNewBrand({ name: "", product: "", tone: "hype", region: "Global" });
        setShowBrandForm(false);
      }
    } catch {}
  }

  async function deleteBrand(id: string) {
    try {
      await fetch(`/api/brands?id=${id}`, { method: "DELETE" });
      setBrands((prev) => prev.filter((b) => b.id !== id));
    } catch {}
  }

  return (
    <>
      {showUpgrade && (
        <UpgradeModal reason="agency_feature" canDismiss onClose={() => setShowUpgrade(false)} />
      )}

      {/* Welcome */}
      {checkoutSuccess && (
        <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <p className="text-green-300 font-medium">
            Welcome to GoalAds {plan.charAt(0).toUpperCase() + plan.slice(1)}! Your subscription is now active.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back, {user?.firstName || "there"}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge text-xs px-3 py-1 ${PLAN_COLORS[plan] || PLAN_COLORS.free}`}>
            {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
          </span>
          {plan !== "free" && (
            <a
              href="/api/billing-portal"
              className="btn-ghost text-sm flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              Manage billing
            </a>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Zap className="w-5 h-5 text-gold-DEFAULT" />}
          label="Total generations"
          value={stats?.total_generations?.toString() || "—"}
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5 text-blue-400" />}
          label="Top platform"
          value={stats?.top_platform ? stats.top_platform.charAt(0).toUpperCase() + stats.top_platform.slice(1) : "—"}
        />
        <StatCard
          icon={<Palette className="w-5 h-5 text-purple-400" />}
          label="Favourite tone"
          value={stats?.top_tone || "—"}
        />
        <StatCard
          icon={<Globe className="w-5 h-5 text-green-400" />}
          label="Primary region"
          value={stats?.top_region || "—"}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link href="/generate" className="card p-5 hover:border-gray-700 transition-colors flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0a4f2e]/40 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-gold-DEFAULT" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">New Campaign</p>
            <p className="text-gray-500 text-xs">Generate ad creatives</p>
          </div>
        </Link>
        <Link href="/templates" className="card p-5 hover:border-gray-700 transition-colors flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-900/40 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Browse Templates</p>
            <p className="text-gray-500 text-xs">Industry examples</p>
          </div>
        </Link>
        {plan === "free" && (
          <Link href="/#pricing" className="card p-5 hover:border-gold-DEFAULT/30 transition-colors flex items-center gap-3 border-gold-DEFAULT/20">
            <div className="w-10 h-10 bg-gold-DEFAULT/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold-DEFAULT" />
            </div>
            <div>
              <p className="text-gold-DEFAULT font-semibold text-sm">Upgrade Plan</p>
              <p className="text-gray-500 text-xs">Unlock unlimited access</p>
            </div>
          </Link>
        )}
      </div>

      {/* Brand Profiles */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-bold text-lg">Saved Brand Profiles</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {isAgencyOrHigher
                ? `${brands.length}${plan === "agency" ? " / 10" : ""} brand profiles`
                : "Agency and Enterprise feature"}
            </p>
          </div>
          {isAgencyOrHigher ? (
            <button
              onClick={() => setShowBrandForm(!showBrandForm)}
              className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Brand
            </button>
          ) : (
            <button
              onClick={() => setShowUpgrade(true)}
              className="btn-secondary text-sm py-2 px-4"
            >
              Upgrade to Agency →
            </button>
          )}
        </div>

        {/* New Brand Form */}
        {showBrandForm && isAgencyOrHigher && (
          <div className="bg-gray-800 rounded-xl p-4 mb-4 grid sm:grid-cols-2 gap-3">
            <div>
              <label className="label text-xs">Business Name</label>
              <input
                type="text"
                className="input-field text-sm py-2"
                placeholder="Bella Vista Restaurant"
                value={newBrand.name}
                onChange={(e) => setNewBrand((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="label text-xs">What you sell</label>
              <input
                type="text"
                className="input-field text-sm py-2"
                placeholder="Italian food, coffee, gym"
                value={newBrand.product}
                onChange={(e) => setNewBrand((prev) => ({ ...prev, product: e.target.value }))}
              />
            </div>
            <div>
              <label className="label text-xs">Default Tone</label>
              <select
                className="input-field text-sm py-2"
                value={newBrand.tone}
                onChange={(e) => setNewBrand((prev) => ({ ...prev, tone: e.target.value }))}
              >
                {["hype", "friendly", "professional", "witty"].map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label text-xs">Default Region</label>
              <select
                className="input-field text-sm py-2"
                value={newBrand.region}
                onChange={(e) => setNewBrand((prev) => ({ ...prev, region: e.target.value }))}
              >
                {["North America", "Europe", "Latin America", "Middle East & Africa", "Asia Pacific", "Global"].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button onClick={saveBrand} className="btn-primary text-sm py-2 flex items-center gap-1.5">
                <Save className="w-4 h-4" /> Save Brand
              </button>
              <button onClick={() => setShowBrandForm(false)} className="btn-ghost text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Brand List */}
        {isAgencyOrHigher && (
          <div className="space-y-2">
            {loadingBrands ? (
              <div className="text-gray-500 text-sm py-4 text-center">Loading brands...</div>
            ) : brands.length === 0 ? (
              <div className="text-gray-600 text-sm py-6 text-center border border-dashed border-gray-700 rounded-xl">
                No brand profiles yet. Add your first one above.
              </div>
            ) : (
              brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-between bg-gray-800 rounded-xl p-4"
                >
                  <div>
                    <p className="text-white font-semibold text-sm">{brand.name}</p>
                    <p className="text-gray-500 text-xs">
                      {brand.product} · {brand.tone} · {brand.region}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/generate?brand=${brand.id}`}
                      className="text-xs text-gold-DEFAULT hover:underline"
                    >
                      Use →
                    </Link>
                    <button
                      onClick={() => deleteBrand(brand.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {!isAgencyOrHigher && (
          <div className="border border-dashed border-gray-700 rounded-xl p-8 text-center">
            <p className="text-gray-500 text-sm mb-3">
              Save brand profiles to pre-fill the generator instantly for any client.
            </p>
            <Link href="/#pricing" className="btn-secondary text-sm">
              Upgrade to Agency →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
