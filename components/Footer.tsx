import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl mb-3">
              <div className="w-8 h-8 bg-[#0a4f2e] rounded-lg flex items-center justify-center">
                <span className="text-lg">⚽</span>
              </div>
              <span className="text-white">Goal</span>
              <span className="text-gold-DEFAULT">Ads</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI-powered World Cup 2026 ad creatives for businesses worldwide.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              {[
                { href: "/generate", label: "Generator" },
                { href: "/templates", label: "Templates" },
                { href: "/#pricing", label: "Pricing" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/affiliates", label: "Affiliate Program" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/blog/world-cup-marketing-guide", label: "WC Marketing Guide" },
                { href: "/blog/hashtag-strategy", label: "Hashtag Strategy" },
                { href: "/blog/match-day-campaigns", label: "Match Day Campaigns" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              {[
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="mailto:shaikhayan141@gmail.com" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  shaikhayan141@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} GoalAds. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            ⚽ Powered by Claude AI · Built for the World Cup 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
