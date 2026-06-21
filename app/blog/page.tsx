import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog | GoalAds — World Cup Marketing Tips",
  description: "Expert advice on marketing your business during the FIFA World Cup 2026.",
};

const POSTS = [
  {
    slug: "world-cup-marketing-guide",
    title: "The Ultimate World Cup 2026 Marketing Guide for Small Businesses",
    excerpt:
      "The FIFA World Cup comes around every four years and brings with it a surge in consumer spending, social media engagement, and brand attention unlike almost any other event. Here's how small businesses can make the most of it.",
    date: "April 15, 2026",
    readTime: "8 min read",
    category: "Strategy",
    emoji: "🏆",
  },
  {
    slug: "hashtag-strategy",
    title: "Hashtag Strategy for the World Cup: What Actually Works in 2026",
    excerpt:
      "Not all hashtags are created equal. We analyzed 50,000 World Cup posts to find what drives reach and engagement — and what gets you buried in a sea of generic content.",
    date: "May 3, 2026",
    readTime: "5 min read",
    category: "Social Media",
    emoji: "🏷️",
  },
  {
    slug: "match-day-campaigns",
    title: "Match Day Campaigns: The 30-Minute Window That Changes Everything",
    excerpt:
      "Posting 30 minutes before a World Cup match kicks off is one of the most effective marketing timing strategies we've found. Here's the data behind it and how to build your campaign calendar.",
    date: "May 20, 2026",
    readTime: "6 min read",
    category: "Campaigns",
    emoji: "📅",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">GoalAds Blog</h1>
          <p className="text-gray-400 text-lg">World Cup marketing tips, strategy, and inspiration</p>
        </div>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="card p-6 hover:border-gray-700 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-[#0a4f2e]/30 rounded-xl flex-shrink-0">
                    {post.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge bg-[#0a4f2e]/40 text-gold-DEFAULT text-xs">
                        {post.category}
                      </span>
                      <span className="text-gray-600 text-xs">{post.date}</span>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-600 text-xs">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-gold-DEFAULT transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
