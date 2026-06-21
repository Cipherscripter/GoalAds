import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ad Templates | GoalAds — World Cup 2026",
  description: "Browse World Cup 2026 ad copy examples by industry. Restaurant, gym, fashion, travel, retail, and more.",
};

const TEMPLATES = [
  {
    industry: "Restaurant",
    emoji: "🍽️",
    platform: "Instagram",
    tone: "Friendly & Warm",
    copy: "The final whistle hasn't blown yet, but our kitchen is already celebrating. Watch every World Cup 2026 match at Bella Vista — 3-course match-day menu, bottomless chips, and a crowd that rivals any stadium. Book your table before they're gone.",
  },
  {
    industry: "Gym",
    emoji: "💪",
    platform: "Facebook",
    tone: "Hype & Excited",
    copy: "The world's best athletes just showed up in your city. So why are you still skipping leg day? Join PowerFit this World Cup season and train like a champion. Founding member rates locked through tournament end. No excuses. Just results.",
  },
  {
    industry: "Fashion",
    emoji: "👟",
    platform: "Twitter/X",
    tone: "Witty & Sarcastic",
    copy: "Dress like you belong in the stadium, not the couch. Our World Cup 2026 collection just dropped. 25% off orders over $60 this week only. Link in bio.",
  },
  {
    industry: "Travel",
    emoji: "✈️",
    platform: "LinkedIn",
    tone: "Professional",
    copy: "The 2026 World Cup spans three host countries and 16 cities. Whether your clients are traveling for business or the beautiful game, our corporate travel packages cover every match city — with guaranteed hotel availability through July 19.",
  },
  {
    industry: "Retail",
    emoji: "🛍️",
    platform: "WhatsApp",
    tone: "Friendly & Warm",
    copy: "Hi! Celebrating the World Cup with a special in-store offer this week 🎉 Show this message at checkout for 20% off everything. Offer runs until Sunday. See you soon!",
  },
  {
    industry: "Bar & Nightlife",
    emoji: "🍺",
    platform: "Instagram",
    tone: "Hype & Excited",
    copy: "Big screens. Cold pints. The loudest crowd this side of the stadium. Every World Cup match live at The Crossbar — doors open 90 mins before kickoff. No cover charge, no reservations. First come, first served.",
  },
  {
    industry: "Real Estate",
    emoji: "🏠",
    platform: "Facebook",
    tone: "Professional",
    copy: "The World Cup brought 3 million visitors to our region last cycle. Properties near host venues saw rental yields jump 40%. If you've been thinking about investing in short-term rental property, now is the time to talk. Book a free consultation.",
  },
  {
    industry: "E-commerce",
    emoji: "📦",
    platform: "SMS",
    tone: "Friendly & Warm",
    copy: "GoalAds: World Cup sale is LIVE! 30% off sitewide for 48hrs. Use code WC2026 at checkout. Shop: goalads.io/shop",
  },
  {
    industry: "Sports Brand",
    emoji: "⚽",
    platform: "Instagram",
    tone: "Hype & Excited",
    copy: "104 matches. 48 nations. One world watching. Our World Cup 2026 training collection was built for players who don't just watch history — they make it. Limited drops every match week. Follow to stay first.",
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-DEFAULT/10 border border-gold-DEFAULT/30 rounded-full px-4 py-1.5 text-gold-DEFAULT text-sm font-semibold mb-4">
            ⚽ Sample Output Gallery
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Ad Copy Templates</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse real GoalAds output by industry. Each example was generated using the same form you&apos;ll fill out — just with different inputs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TEMPLATES.map((t, i) => (
            <div key={i} className="card p-5 hover:border-gray-700 transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{t.emoji}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.industry}</p>
                    <p className="text-gray-500 text-xs">{t.platform}</p>
                  </div>
                </div>
                <span className="badge bg-[#0a4f2e]/30 text-gold-DEFAULT text-xs whitespace-nowrap">
                  {t.tone}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.copy}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-600">
                {t.copy.split(" ").length} words · {t.copy.length} characters
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#0a4f2e]/30 to-[#0a4f2e]/10 border border-[#0a4f2e]/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Generate copy for your business
          </h2>
          <p className="text-gray-400 mb-6">
            These took 10 seconds each. Yours will too.
          </p>
          <Link href="/generate" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3">
            ⚽ Start generating free →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
