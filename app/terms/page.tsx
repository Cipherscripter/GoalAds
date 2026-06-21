import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | GoalAds",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: June 2026</p>

        <div className="prose prose-invert max-w-none space-y-6">
          {[
            {
              title: "1. Acceptance of Terms",
              content: "By accessing or using GoalAds, you agree to be bound by these Terms. If you disagree with any part, you may not access the service.",
            },
            {
              title: "2. Use of Service",
              content: "GoalAds provides AI-generated marketing copy for legitimate business use. You may not use the service to generate spam, misleading content, or content that violates any applicable laws.",
            },
            {
              title: "3. Intellectual Property",
              content: "All content generated through GoalAds is owned by you (the user) once created. We retain no rights to your generated content. Our platform, branding, and AI infrastructure remain our intellectual property.",
            },
            {
              title: "4. Free Tier Limitations",
              content: "Free accounts are limited to 3 total generations. Generated content from free accounts includes a 'Made with GoalAds' watermark. This watermark may not be removed without a paid subscription.",
            },
            {
              title: "5. Payments and Subscriptions",
              content: "Paid subscriptions are billed monthly or annually via Stripe. Subscriptions renew automatically until cancelled. Refunds are not provided for partial subscription periods. Annual plans may be cancelled for a pro-rated refund within 30 days of purchase.",
            },
            {
              title: "6. Claude AI Usage",
              content: "GoalAds uses Anthropic's Claude API to generate content. We do not control Claude's outputs and are not responsible for any inaccuracies. You are responsible for reviewing generated content before use.",
            },
            {
              title: "7. Limitation of Liability",
              content: "GoalAds is provided 'as is' without warranty. We are not liable for any indirect, incidental, or consequential damages arising from use of the service.",
            },
            {
              title: "8. Contact",
              content: "For questions about these terms, contact shaikhayan141@gmail.com.",
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
