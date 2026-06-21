"use client";

import { useRouter } from "next/navigation";
import { X, Zap, Trophy, Star } from "lucide-react";

interface UpgradeModalProps {
  reason: "free_limit" | "agency_feature" | "enterprise_feature";
  onClose?: () => void;
  canDismiss?: boolean;
}

const MODAL_CONTENT = {
  free_limit: {
    title: "You've used all 3 free generations",
    subtitle: "Upgrade to keep creating World Cup campaigns for your business",
    highlight: "Pro plan — $49/month",
    cta: "Upgrade to Pro →",
    plan: "pro",
  },
  agency_feature: {
    title: "Agency feature",
    subtitle: "Brand profiles, PDF export and CSV bulk export are available on the Agency plan",
    highlight: "Agency plan — $149/month",
    cta: "Upgrade to Agency →",
    plan: "agency",
  },
  enterprise_feature: {
    title: "Enterprise feature",
    subtitle: "Custom AI tone training and API access require the Enterprise plan",
    highlight: "Enterprise plan — $499/month",
    cta: "Upgrade to Enterprise →",
    plan: "enterprise",
  },
};

export default function UpgradeModal({ reason, onClose, canDismiss = true }: UpgradeModalProps) {
  const router = useRouter();
  const content = MODAL_CONTENT[reason];

  const handleUpgrade = () => {
    router.push(`/#pricing`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="card max-w-md w-full p-8 relative animate-slide-up">
        {canDismiss && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gold-DEFAULT/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-gold-DEFAULT" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
          <p className="text-gray-400 text-sm">{content.subtitle}</p>
        </div>

        <div className="bg-[#0a4f2e]/30 border border-[#0a4f2e]/60 rounded-xl p-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-gold-DEFAULT font-bold text-lg">
            <Star className="w-5 h-5" />
            {content.highlight}
          </div>
        </div>

        <div className="space-y-3 mb-6 text-sm text-gray-300">
          {reason === "free_limit" && (
            <>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Unlimited generations</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> No watermark on output</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Hashtag packs per niche</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Match day scheduling tips</div>
            </>
          )}
          {reason === "agency_feature" && (
            <>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Save up to 10 brand profiles</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> White-label PDF export</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> CSV bulk export</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Priority support</div>
            </>
          )}
          {reason === "enterprise_feature" && (
            <>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Custom AI tone training</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Unlimited brand profiles</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> API access</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold-DEFAULT" /> Dedicated Slack support</div>
            </>
          )}
        </div>

        <button onClick={handleUpgrade} className="btn-primary w-full text-center text-base">
          {content.cta}
        </button>

        {canDismiss && onClose && (
          <button onClick={onClose} className="w-full text-center text-gray-500 hover:text-gray-300 text-sm mt-3 transition-colors">
            Maybe later
          </button>
        )}
      </div>
    </div>
  );
}
