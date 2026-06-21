import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import { FAQ_ITEMS, SAMPLE_OUTPUTS } from "@/lib/constants";
import { ChevronDown, Globe, Zap, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main>
        <HeroSection />
        <SocialProofBar />
        <SampleOutputsSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a4f2e]/30 via-gray-950 to-gray-950 pt-20 pb-24 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0a4f2e]/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 text-8xl opacity-5 select-none">⚽</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-5 select-none">🏆</div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold-DEFAULT/10 border border-gold-DEFAULT/30 rounded-full px-4 py-1.5 text-gold-DEFAULT text-sm font-semibold mb-8">
          <span>⚽</span>
          FIFA World Cup 2026 · June 11 – July 19
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Turn the World Cup into{" "}
          <span className="text-gold-DEFAULT">your biggest campaign</span>{" "}
          of 2026
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-generated ad copy for{" "}
          <span className="text-white font-medium">Instagram, WhatsApp, X, Facebook,</span> and{" "}
          <span className="text-white font-medium">SMS</span> — tuned to your brand in 30 seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/generate"
            className="btn-primary text-base sm:text-lg px-8 py-4 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Zap className="w-5 h-5" />
            Generate Free Creatives →
          </Link>
          <Link
            href="/#samples"
            className="btn-ghost text-base px-6 py-4 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            See examples
            <ChevronDown className="w-4 h-4" />
          </Link>
        </div>

        {/* Micro copy */}
        <p className="text-gray-600 text-sm">
          No credit card required · 3 free generations · Takes 30 seconds
        </p>
      </div>
    </section>
  );
}

function SocialProofBar() {
  return (
    <div className="bg-[#0a4f2e]/20 border-y border-[#0a4f2e]/40 py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gold-DEFAULT" />
          <span>Built for businesses in <strong className="text-white">every region</strong> of the world</span>
        </div>
        <span className="hidden sm:block text-gray-700">·</span>
        <div className="flex items-center gap-1 text-gold-DEFAULT">
          {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
          <span className="text-gray-400 ml-1">World Cup 2026 ready</span>
        </div>
        <span className="hidden sm:block text-gray-700">·</span>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-gold-DEFAULT" />
          <span>Copy for <strong className="text-white">6 platforms</strong> in under 30 seconds</span>
        </div>
        <span className="hidden sm:block text-gray-700">·</span>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-DEFAULT" />
          <span>Powered by <strong className="text-white">Groq AI</strong></span>
        </div>
      </div>
    </div>
  );
}

function SampleOutputsSection() {
  return (
    <section id="samples" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">See what GoalAds creates</h2>
          <p className="text-gray-400 text-lg">Real output samples across different industries and tones</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SAMPLE_OUTPUTS.map((sample, i) => (
            <div key={i} className="card p-6 hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gold-DEFAULT font-semibold text-sm">{sample.business}</p>
                  <p className="text-gray-500 text-xs">{sample.industry}</p>
                </div>
                <span className="badge bg-gray-800 text-gray-400 text-xs">
                  {sample.platform}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                &ldquo;{sample.copy}&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Tone: {sample.tone}</span>
                <span>{sample.copy.split(" ").length} words</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/templates" className="btn-secondary">
            Browse all templates →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "🌍",
      title: "Region-aware copy",
      desc: "References Brazil & Argentina for Latin America, England & France for Europe, Japan & South Korea for Asia Pacific. Copy that feels local.",
    },
    {
      icon: "⚡",
      title: "6 platforms at once",
      desc: "One form generates Instagram captions, WhatsApp broadcasts, X posts, Facebook copy, SMS blasts, and LinkedIn posts simultaneously.",
    },
    {
      icon: "🎨",
      title: "Brand-tuned tone",
      desc: "Choose Hype & Excited, Friendly & Warm, Professional, or Witty & Sarcastic. The AI writes in your brand's voice, not a generic one.",
    },
    {
      icon: "📅",
      title: "Match day calendar",
      desc: "Know exactly when to post. Get a schedule of upcoming World Cup fixtures with optimal post times for maximum reach.",
    },
    {
      icon: "🏷️",
      title: "Hashtag packs",
      desc: "10 tailored hashtags per generation, specific to your niche and region. No generic #WorldCup spam.",
    },
    {
      icon: "🔒",
      title: "Brand profiles (Agency+)",
      desc: "Save up to 10 brand profiles and reload them instantly. Perfect for agencies managing multiple clients.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-[#0a4f2e]/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Everything you need to win the season</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From a corner shop to a marketing agency — GoalAds scales with your business
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card p-6 hover:border-gray-700 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Frequently asked questions</h2>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="card p-6 group">
              <summary className="cursor-pointer flex items-center justify-between text-white font-semibold list-none">
                {item.q}
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
              </summary>
              <p className="text-gray-400 text-sm leading-relaxed mt-4">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
