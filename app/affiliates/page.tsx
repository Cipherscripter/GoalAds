import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, DollarSign, Users, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Affiliate Program | GoalAds — 30% Recurring Commission",
  description: "Earn 30% recurring commission by referring businesses to GoalAds. Join the affiliate program.",
};

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-[#0a4f2e]/20 to-gray-950">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold-DEFAULT/10 border border-gold-DEFAULT/30 rounded-full px-4 py-1.5 text-gold-DEFAULT text-sm font-semibold mb-6">
              💰 Affiliate Program
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Earn 30% recurring commission
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              Refer businesses to GoalAds and earn 30% of every payment — for the lifetime of the customer. No cap. No expiry.
            </p>
            <a
              href="https://tally.so"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Apply to Join →
            </a>
            <p className="text-gray-600 text-sm mt-4">Application takes 2 minutes · Approval within 48 hours</p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 mb-16">
            <div className="card p-6 text-center">
              <DollarSign className="w-8 h-8 text-gold-DEFAULT mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-white mb-1">30%</p>
              <p className="text-gray-400 text-sm">Recurring commission on all plans</p>
            </div>
            <div className="card p-6 text-center">
              <TrendingUp className="w-8 h-8 text-gold-DEFAULT mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-white mb-1">Lifetime</p>
              <p className="text-gray-400 text-sm">You earn for as long as they subscribe</p>
            </div>
            <div className="card p-6 text-center">
              <Users className="w-8 h-8 text-gold-DEFAULT mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-white mb-1">$44/mo</p>
              <p className="text-gray-400 text-sm">Average earnings per Agency referral</p>
            </div>
          </div>

          {/* How it works */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-8">How it works</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Apply", desc: "Fill out our quick application form. We approve affiliates with relevant audiences within 48 hours." },
                { step: "2", title: "Get your link", desc: "You receive a unique referral link and access to our affiliate dashboard with real-time tracking." },
                { step: "3", title: "Share GoalAds", desc: "Share your link with your audience — via content, email, social, or your network. We provide creative assets." },
                { step: "4", title: "Earn commissions", desc: "Earn 30% of every payment from referred customers, paid monthly via Stripe. No threshold to reach." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 card p-5">
                  <div className="w-8 h-8 bg-[#0a4f2e] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings calculator */}
          <div className="max-w-3xl mx-auto card p-6 mb-16">
            <h2 className="text-xl font-bold text-white mb-4">Earnings potential</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-gray-800">
                    <th className="text-left pb-2 pr-4">Referrals / month</th>
                    <th className="text-left pb-2 pr-4">Plan</th>
                    <th className="text-left pb-2 pr-4">Your cut</th>
                    <th className="text-left pb-2">Monthly income</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    { refs: 5, plan: "Pro ($49)", cut: "$14.70", monthly: "$73.50" },
                    { refs: 10, plan: "Pro ($49)", cut: "$14.70", monthly: "$147" },
                    { refs: 5, plan: "Agency ($149)", cut: "$44.70", monthly: "$223.50" },
                    { refs: 10, plan: "Agency ($149)", cut: "$44.70", monthly: "$447" },
                    { refs: 5, plan: "Enterprise ($499)", cut: "$149.70", monthly: "$748.50" },
                  ].map((row, i) => (
                    <tr key={i} className="text-gray-300">
                      <td className="py-2.5 pr-4">{row.refs}</td>
                      <td className="py-2.5 pr-4">{row.plan}</td>
                      <td className="py-2.5 pr-4 text-gold-DEFAULT">{row.cut}</td>
                      <td className="py-2.5 font-bold text-white">{row.monthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-xs mt-3">* Monthly income = commission per referral × number of active subscribers</p>
          </div>

          {/* Requirements */}
          <div className="max-w-3xl mx-auto card p-6 mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Who we work with</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Marketing bloggers and creators",
                "Business coaches and consultants",
                "Social media agencies",
                "Email newsletter writers",
                "YouTube and podcast creators",
                "Web developers with small business clients",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-gold-DEFAULT" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://tally.so"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Apply Now — It&apos;s Free →
            </a>
            <p className="text-gray-600 text-sm mt-3">
              Questions? Email us at{" "}
              <a href="mailto:affiliates@goalads.io" className="text-gold-DEFAULT hover:underline">
                affiliates@goalads.io
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
