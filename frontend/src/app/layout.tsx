import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";

const font = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farcaster Reputation Engine",
  description:
    "Farcaster Reputation Engine (FRE) is a reputation system built for the Farcaster platform, designed to track, analyze, and reward user engagement and authenticity. FRE uses the several data and analytics provider like Open Rank APIs by karma labs , Neynar and Airstack to gather data and rank users accordingly , making the Social media more fun , engaging and trustworthy for everyone in the Farcaster ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
