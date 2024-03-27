"use client";
import React, { useEffect, useState } from "react";
import { fetchMetadata } from "frames.js/next";
import StatsCard from "@/components/stats-card";
import Heatmap from "@/components/heat-map";
import { UserReputationScoreType } from "@/utils/calculateScore";

export default function Score({ params }: { params: { handle: string } }) {
  const [userData, setUserData] = useState<
    UserReputationScoreType | undefined
  >();

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/calculateScore/${params.handle}`);
      const data = await response.json();

      // console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, [params.handle]);

  return (
    <div className="flex items-center flex-col justify-normal mt-16 min-h-screen gap-10 w-[80vw] mx-auto pb-16">
      <StatsCard userData={userData} />
      <Heatmap fid={userData?.fid} />
    </div>
  );
}
