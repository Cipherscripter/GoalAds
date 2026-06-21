"use client";

import Link from "next/link";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { Trophy, Zap } from "lucide-react";

const PLAN_BADGES: Record<string, { label: string; cls: string }> = {
  pro: { label: "Pro plan", cls: "bg-[#f0b429]/20 text-[#f0b429] border border-[#f0b429]/30" },
  agency: { label: "Agency plan", cls: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
  enterprise: { label: "Enterprise plan", cls: "bg-purple-500/20 text-purple-400 border border-purple-500/30" },
};

export default function Header() {
  const { user, isSignedIn } = useUser();
  const plan = (user?.publicMetadata?.plan as string) || "free";
  const badge = PLAN_BADGES[plan];

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl">
          <div className="w-8 h-8 bg-[#0a4f2e] rounded-lg flex items-center justify-center">
            <span className="text-lg">⚽</span>
          </div>
          <span className="text-white">Goal</span>
          <span className="text-[#f0b429]">Ads</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <Link href="/generate" className="hover:text-white transition-colors">Generate</Link>
          <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
          {isSignedIn && (
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          )}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              {badge && (
                <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.cls}`}>
                  <Zap className="w-3 h-3" />
                  {badge.label}
                </span>
              )}
              <Link href="/generate" className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />
                Generate
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn-ghost text-sm">Sign in</button>
              </SignInButton>
              <Link href="/generate" className="btn-primary text-sm py-2 px-4">
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
