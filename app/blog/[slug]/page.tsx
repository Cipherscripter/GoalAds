import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const POSTS: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  "world-cup-marketing-guide": {
    title: "The Ultimate World Cup 2026 Marketing Guide for Small Businesses",
    date: "April 15, 2026",
    readTime: "8 min read",
    category: "Strategy",
    content: `
The FIFA World Cup 2026 — hosted across USA, Canada, and Mexico from June 11 to July 19 — represents one of the biggest marketing opportunities in recent memory. With 48 teams, 104 matches, and an estimated global audience of 5 billion viewers, the commercial opportunity for brands of every size is real.

## Why the World Cup matters for small businesses

Unlike the Super Bowl (US-focused) or the Olympics (diffuse sport interest), the World Cup generates concentrated, passionate attention from virtually every demographic and geography simultaneously. Your customers in Brazil, the UK, Japan, and your local neighborhood are all watching the same thing.

That shared moment is marketing gold — if you use it correctly.

## The biggest mistake: generic copy

"Score big on our deals!" "Kick off your savings!" These phrases are so overused they've become invisible. Consumers tune them out instantly.

The businesses that win the World Cup marketing cycle are the ones who make their copy feel specific, surprising, and genuinely relevant to the moment — not a brand message with a football emoji slapped on it.

## What works: region-specific cultural hooks

If you're selling to a Latin American audience, referencing the specific passions around Brazil and Argentina lands differently than generic World Cup content. If your customers are in England, the emotional weight of the Three Lions' World Cup history is something you can acknowledge without exploiting.

This is why GoalAds was built — to help businesses generate culturally-tuned copy that actually resonates, not generic tournament filler.

## Platform strategy by channel

Instagram: Visuals win here, but a great caption extends the post's reach. Focus on emotion and brevity. One strong hook sentence, then context, then CTA.

WhatsApp broadcasts: Direct, personal, conversational. This is your most intimate marketing channel. Keep it under 80 words and make it feel like a message from a friend, not a brand.

Twitter/X: Speed and wit. The best World Cup posts on X are the ones that feel spontaneous — even if they were planned. Short, punchy, shareable.

Facebook: Slightly older demographic, more tolerant of longer copy. Great for explaining offers in full and including a clear CTA.

SMS: The most underrated World Cup channel. Open rates above 95%. Keep it under 160 characters. Business name + offer + link. Done.

LinkedIn: Not the obvious choice, but surprisingly effective for B2B businesses. Frame the World Cup around productivity, team culture, or business parallels.

## When to post

The 30-minute window before kickoff is the highest-engagement period for World Cup-adjacent posts. Fans are hyped, actively checking their phones, and receptive to relevant content. Plan your calendar around fixture times.

## Measuring success

Track engagement rate (not just likes), click-through rate on any offers, and if you're running ads, conversion rate against your baseline. The World Cup marketing window is short — 39 days — so iterate quickly and double down on what works.
    `.trim(),
  },
  "hashtag-strategy": {
    title: "Hashtag Strategy for the World Cup: What Actually Works in 2026",
    date: "May 3, 2026",
    readTime: "5 min read",
    category: "Social Media",
    content: `
Hashtags are a tool, not a strategy. Used well, they extend your reach to people who don't follow you yet. Used badly, they make your posts look spammy and desperate.

Here's what the data shows about World Cup hashtag performance.

## Volume vs. niche: the core tradeoff

High-volume hashtags like #WorldCup2026 and #FIFA2026 have enormous reach potential but also enormous competition. Your post gets buried within seconds.

Niche hashtags — #BrasilNasCopas, #ThreeLions, #USMNT — have smaller audiences but much higher signal-to-noise ratios. Your post has a better chance of being seen by people genuinely interested in that specific content.

## The 3-3-4 formula

For most World Cup posts, use this split:

- 3 broad hashtags: #WorldCup2026 #FIFA2026 #WC2026
- 3 regional/team hashtags: based on your target market
- 4 niche hashtags: specific to your industry or offer

Total: 10 hashtags. Enough for reach, specific enough to cut through.

## Region-specific stacks

- Latin America: #CopaDelMundo2026 #BrasilNasCopas #VamosArgentina #LaSeleccion
- Europe: #ThreeLions #LesBleus #DieNationalmannschaft #EuroFootball
- North America: #USMNT #ElTri #CanadaSoccer #HomeWorldCup
- Asia Pacific: #SamuraiBlue #TaegukWarriors #Socceroos #AsiaInTheWorld

## What to avoid

Hashtag stuffing (30+ tags) tanks your engagement rate on Instagram, which now deprioritizes posts that look spammy. Twitter/X hashtags add character count — use maximum 2.

## Auto-generate your pack

GoalAds generates a 10-tag hashtag pack with every set of creatives, tuned to your niche and region. No research required.
    `.trim(),
  },
  "match-day-campaigns": {
    title: "Match Day Campaigns: The 30-Minute Window That Changes Everything",
    date: "May 20, 2026",
    readTime: "6 min read",
    category: "Campaigns",
    content: `
The data is consistent across multiple World Cup and major sporting events: posts published 25–35 minutes before a major match kicks off get significantly higher engagement than posts published at any other time during match day.

The reason is behavioral. In the 30 minutes before kickoff, fans are:

- Done with work (evening matches) or settled in
- Actively scrolling for pre-match content
- In a heightened emotional state — primed to engage and share
- Still on their phones (during the match, phone usage drops)

## Building your match day calendar

The 2026 World Cup runs June 11 – July 19 with multiple matches daily. GoalAds includes a pre-built match calendar with the top fixtures and optimal post times — so you don't need to do the research.

For most businesses, targeting 5–10 key matches is more effective than trying to post for every game. Focus on:

- Opening match (June 11 — peak global attention)
- Host nation matches (USA, Mexico, Canada — massive domestic audiences)
- Semifinals (higher casual viewer numbers)
- The Final (July 19 — the biggest single audience of the tournament)

## Match day content formula

Pre-match (30 mins before): Write an excitement post that connects your offer to the anticipation. Keep it punchy and time-sensitive.

Half-time: A quick engagement post — poll, deal reminder, or reaction content.

Post-match: Celebration or commiseration content. The more timely and specific to the result, the better.

## Automation vs. manual

For smaller businesses, manual posting works fine — just set a phone reminder 35 minutes before each target match. For agencies managing multiple clients, scheduling tools like Buffer or Hootsuite let you pre-queue posts at specific times.

GoalAds generates the copy. Your scheduling tool handles the timing. Simple stack, real results.
    `.trim(),
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) return {};
  return {
    title: `${post.title} | GoalAds Blog`,
    description: post.content.slice(0, 160),
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  const paragraphs = post.content.split("\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/blog"
          className="text-gray-500 hover:text-white text-sm flex items-center gap-1 mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0a4f2e]/40 text-[#f0b429]">
              {post.category}
            </span>
            <span className="text-gray-600 text-xs">{post.date}</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-gray-600 text-xs">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
        </div>

        <div className="space-y-4">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-bold text-white mt-8 mb-1 pt-2">
                  {para.replace("## ", "")}
                </h2>
              );
            }
            if (para.startsWith("- ")) {
              return (
                <li key={i} className="text-gray-300 text-base leading-relaxed ml-5 list-disc">
                  {para.replace(/^-\s/, "")}
                </li>
              );
            }
            return (
              <p key={i} className="text-gray-300 text-base leading-relaxed">
                {para}
              </p>
            );
          })}
        </div>

        <div className="mt-12 bg-[#0a4f2e]/20 border border-[#0a4f2e]/50 rounded-2xl p-6 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Ready to put this into practice?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Generate World Cup ad copy for your business in 30 seconds.
          </p>
          <Link href="/generate" className="btn-primary inline-flex items-center gap-2">
            ⚽ Generate Free Creatives →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
