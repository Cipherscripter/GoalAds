import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultsView from "@/components/ResultsView";

export const metadata = {
  title: "Your Ad Creatives | GoalAds",
  description: "Your World Cup 2026 ad creatives are ready.",
};

export default async function ResultsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/generate");
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <ResultsView />
      </main>
      <Footer />
    </div>
  );
}
