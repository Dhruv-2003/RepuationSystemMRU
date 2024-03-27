// "use client";

import Heatmap from "@/components/heat-map";
import StatsCard from "@/components/stats-card";
import Image from "next/image";
import { Frame, getFrame, getFrameFlattened } from "frames.js";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
// import { getUserEngagmentData } from "@/utils/getOpenRankData";
import { getUserAllData } from "@/utils/airstack";

// Declare the frame
export async function generateMetadata() {
  return {
    title: "Farcaster Reputation Enginne",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        "/api/frames",
        process.env.NEXT_PUBLIC_HOST
          ? `${process.env.NEXT_PUBLIC_HOST}`
          : "http://localhost:3000"
      )
    ),
  };
}

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-normal mt-16 min-h-screen gap-10 w-[80vw] mx-auto pb-16"></div>
  );
}
