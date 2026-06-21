import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://goalads.io"),
  title: "GoalAds — World Cup 2026 Ad Creative Generator",
  description:
    "AI-generated ad copy for Instagram, WhatsApp, X, Facebook, and SMS — tuned to your brand in 30 seconds.",
  openGraph: {
    title: "GoalAds — World Cup 2026 Ad Creative Generator",
    description: "Generate ready-to-use World Cup themed marketing content in 30 seconds.",
    siteName: "GoalAds",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
