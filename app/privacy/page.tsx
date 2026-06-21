import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | GoalAds",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: June 2026</p>

        <div className="space-y-6">
          {[
            {
              title: "What we collect",
              content: "We collect your email address and name via Clerk authentication. We log generation activity (business name, platforms used, tone, region) in Supabase to power your dashboard analytics. We do not store the full content of generated ads.",
            },
            {
              title: "How we use it",
              content: "Your data is used to: (1) authenticate your account, (2) enforce plan limits, (3) power your usage dashboard, (4) manage your billing via Stripe.",
            },
            {
              title: "Third parties",
              content: "We use Clerk (authentication), Stripe (payments), Supabase (database), and Anthropic (AI generation). Each service has its own privacy policy. We do not sell your data to any third party.",
            },
            {
              title: "Data retention",
              content: "Generation logs are retained for 12 months. Account data is retained until you delete your account. Stripe retains billing data per their own policies.",
            },
            {
              title: "Your rights",
              content: "You may request deletion of your data at any time by emailing hello@goalads.io. EU/UK users have additional rights under GDPR/UK GDPR, including access, rectification, and portability.",
            },
            {
              title: "Cookies",
              content: "We use minimal cookies for authentication session management. We do not use advertising or tracking cookies.",
            },
            {
              title: "Contact",
              content: "Privacy questions: shaikhayan141@gmail.com",
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-white mb-2">{section.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
