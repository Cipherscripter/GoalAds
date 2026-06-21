import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeneratorForm from "@/components/GeneratorForm";

export const metadata = {
  title: "Generate Ad Copy | GoalAds",
  description: "Generate World Cup 2026 ad creatives for your business in 30 seconds.",
};

export default async function GeneratePage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/generate");
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#f0b429]/10 border border-[#f0b429]/30 rounded-full px-4 py-1.5 text-[#f0b429] text-sm font-semibold mb-4">
            ⚽ World Cup 2026 · AI Generator
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Generate your ad creatives
          </h1>
          <p className="text-gray-400 text-base">
            Fill in your brand info below. We&apos;ll generate platform-ready copy in seconds.
          </p>
        </div>
        <GeneratorForm />
      </main>
      <Footer />
    </div>
  );
}
