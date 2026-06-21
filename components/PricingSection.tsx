"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { PLANS } from "@/lib/constants";

// Annual pricing is optional — only show toggle if annual price IDs are configured
const HAS_ANNUAL =
  !!(process.env.NEXT_PUBLIC_HAS_ANNUAL_PRICING);

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    { key: "free", ...PLANS.free },
    { key: "pro", ...PLANS.pro },
    { key: "agency", ...PLANS.agency },
    { key: "enterprise", ...PLANS.enterprise },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-400 text-lg mb-8">
            Start free. Scale as your campaigns grow.
          </p>

          {/* Annual toggle — only shown when annual prices are configured */}
          {HAS_ANNUAL && (
            <div className="inline-flex items-center gap-3 bg-gray-900 rounded-full p-1 border border-gray-800">
              <button
                onClick={() => setAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  !annual ? "bg-[#0a4f2e] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  annual ? "bg-[#0a4f2e] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Annual
                <span className="bg-[#f0b429] text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  2 mo. free
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isPopular = plan.badge === "Most Popular";
            // When annual toggle is off or not available, always show monthly price
            const showAnnual = HAS_ANNUAL && annual;
            const price = showAnnual && plan.key !== "free"
              ? plan.annualPrice
              : plan.price;
            const suffix = plan.key === "free"
              ? "forever"
              : showAnnual
              ? "/year"
              : "/month";

            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl p-6 border transition-all ${
                  isPopular
                    ? "bg-[#0a4f2e]/30 border-[#0a4f2e] shadow-lg shadow-[#0a4f2e]/20"
                    : "bg-gray-900 border-gray-800"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#f0b429] text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">
                      {plan.price === 0 ? "Free" : `$${price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-400 text-sm">{suffix}</span>
                    )}
                  </div>
                  {showAnnual && plan.key !== "free" && plan.price > 0 && (
                    <p className="text-gray-500 text-xs mt-1">
                      ${plan.price}/mo billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#f0b429] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={
                    plan.key === "free"
                      ? "/generate"
                      : `/api/checkout?plan=${plan.key}&annual=${showAnnual}`
                  }
                  className={`block text-center font-semibold py-2.5 px-4 rounded-xl transition-all text-sm ${
                    isPopular
                      ? "bg-[#f0b429] hover:bg-[#f5c84a] text-gray-900"
                      : plan.key === "free"
                      ? "border border-gray-700 text-white hover:bg-gray-800"
                      : "border border-[#0a4f2e] text-white hover:bg-[#0a4f2e]/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          All plans include SSL-secured payments via Stripe. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
