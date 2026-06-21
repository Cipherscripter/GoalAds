import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardView from "@/components/DashboardView";

export const metadata = {
  title: "Dashboard | GoalAds",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { checkout?: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect_url=/dashboard");
  }

  const user = await currentUser();
  const plan = (user?.publicMetadata?.plan as string) || "free";

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <DashboardView
          plan={plan}
          checkoutSuccess={searchParams.checkout === "success"}
        />
      </main>
      <Footer />
    </div>
  );
}
