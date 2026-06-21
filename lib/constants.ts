export const PLATFORM_LIMITS: Record<string, { words?: number; chars?: number; label: string }> = {
  instagram: { words: 150, label: "Instagram Caption" },
  whatsapp: { words: 80, label: "WhatsApp Broadcast" },
  twitter: { chars: 280, label: "Twitter/X Post" },
  facebook: { words: 200, label: "Facebook Post" },
  sms: { chars: 160, label: "SMS Blast" },
  linkedin: { words: 100, label: "LinkedIn Post" },
};

export const PLATFORM_ICONS: Record<string, string> = {
  instagram: "📸",
  whatsapp: "💬",
  twitter: "🐦",
  facebook: "👥",
  sms: "📱",
  linkedin: "💼",
};

export const REGION_TEAM_HINTS: Record<string, string> = {
  "North America": "reference teams like USA, Mexico, Canada, and the excitement of hosting the tournament on home soil",
  "Europe": "reference powerhouses like England, France, Germany, Spain, Portugal, and the massive European fan culture",
  "Latin America": "reference footballing giants like Brazil, Argentina, Colombia, and the passionate Latin American fan culture",
  "Middle East & Africa": "reference teams like Morocco, Senegal, Saudi Arabia, and the growing African and Middle Eastern football pride",
  "Asia Pacific": "reference teams like Japan, South Korea, Australia, and the rising excitement of Asian football",
  "Global": "keep references universal, focusing on the World Cup itself and the shared global passion for football",
};

export const WC_MATCHES = [
  { date: "Jun 11, 2026", teams: "Mexico vs TBC", time: "8:00 PM ET", postTime: "7:30 PM ET" },
  { date: "Jun 12, 2026", teams: "USA vs TBC", time: "9:00 PM ET", postTime: "8:30 PM ET" },
  { date: "Jun 13, 2026", teams: "Canada vs TBC", time: "6:00 PM ET", postTime: "5:30 PM ET" },
  { date: "Jun 14, 2026", teams: "Brazil vs TBC", time: "3:00 PM ET", postTime: "2:30 PM ET" },
  { date: "Jun 15, 2026", teams: "Argentina vs TBC", time: "12:00 PM ET", postTime: "11:30 AM ET" },
];

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    annualPrice: 0,
    features: [
      "3 total generations",
      "All 6 platforms",
      "Watermark on output",
      "Basic hashtag suggestions",
    ],
    cta: "Get Started Free",
    badge: null,
  },
  pro: {
    name: "Pro",
    price: 49,
    annualPrice: 490,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
    annualPriceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID || "",
    features: [
      "Unlimited generations",
      "No watermark",
      "Hashtag packs",
      "Match day scheduling tips",
      "Email support",
    ],
    cta: "Start Pro",
    badge: "Most Popular",
  },
  agency: {
    name: "Agency",
    price: 149,
    annualPrice: 1490,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID || "",
    annualPriceId: process.env.STRIPE_AGENCY_ANNUAL_PRICE_ID || "",
    features: [
      "Everything in Pro",
      "Save up to 10 brand profiles",
      "White-label PDF export",
      "CSV bulk export",
      "Priority support",
    ],
    cta: "Start Agency",
    badge: null,
  },
  enterprise: {
    name: "Enterprise",
    price: 499,
    annualPrice: 4990,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "",
    annualPriceId: process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID || "",
    features: [
      "Unlimited brand profiles",
      "Custom AI tone training",
      "API access",
      "Custom domain support",
      "Dedicated Slack support",
    ],
    cta: "Contact Sales",
    badge: null,
  },
};

export const FAQ_ITEMS = [
  {
    q: "What is GoalAds?",
    a: "GoalAds is an AI-powered ad creative generator built specifically for the FIFA World Cup 2026. You enter your brand info and we generate platform-ready marketing copy for Instagram, WhatsApp, X, Facebook, SMS, and LinkedIn — all tuned to your region and tone.",
  },
  {
    q: "Do I need to know anything about marketing or copywriting?",
    a: "Not at all. Just fill in a simple form: your business name, what you sell, and optionally a promotion. GoalAds does the rest, using senior-level copywriting intelligence powered by Claude AI.",
  },
  {
    q: "How does the free tier work?",
    a: "You get 3 free generations — no credit card required. Each generation creates copy for all platforms you select. After 3 uses, you'll need to upgrade to a paid plan to continue.",
  },
  {
    q: "Can I use the output commercially?",
    a: "Yes. All generated content is yours to use. Pro and Agency plans remove the GoalAds watermark. Enterprise users get full white-label rights with no attribution required.",
  },
  {
    q: "How does regional customization work?",
    a: "When you select your region, GoalAds instructs the AI to use locally relevant cultural references. Latin America gets Brazil and Argentina references; Europe gets England, France, Germany; Asia Pacific gets Japan and South Korea — making the copy feel native to your audience.",
  },
];

export const SAMPLE_OUTPUTS = [
  {
    business: "Bella Vista Restaurant",
    industry: "Restaurant",
    platform: "Instagram",
    copy: "The final whistle hasn't blown yet, but our kitchen is already celebrating 🍽️ Watch every World Cup 2026 match at Bella Vista with our match-day menu — 3 courses, bottomless chips, and a crowd that rivals any stadium. Book your table before they're all gone.",
    tone: "Friendly & Warm",
  },
  {
    business: "PowerFit Gym",
    industry: "Gym",
    platform: "Facebook",
    copy: "The world's best athletes just showed up to your country. So why are you still skipping leg day? Join PowerFit this World Cup season and train like a champion. Founding member rates locked in through tournament end. No excuses. Just results.",
    tone: "Hype & Excited",
  },
  {
    business: "KickOff Clothing",
    industry: "Fashion",
    platform: "Twitter/X",
    copy: "Dress like you belong in the stadium, not the couch. Our World Cup 2026 collection just dropped. 25% off orders over $60 this week only. Link in bio.",
    tone: "Witty & Sarcastic",
  },
];
