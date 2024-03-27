"use client";
import React, { useEffect, useState } from "react";
import { fetchMetadata } from "frames.js/next";
import StatsCard from "@/components/stats-card";
import Heatmap from "@/components/heat-map";
import { UserReputation } from "@/utils/rollup";
import { UserDataReturnType } from "frames.js";

export default function Score({ params }: { params: { fid: string } }) {
  const [userData, setUserData] = useState<
    (UserReputation & UserDataReturnType) | undefined
  >();

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/calculateScore/${params.fid}`);
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
  }, [params.fid]);

  return (
    <div className="flex items-center flex-col justify-normal mt-16 min-h-screen gap-10 w-[80vw] mx-auto pb-16">
      <StatsCard userData={userData} />
      <Heatmap fid={userData?.fid} />
    </div>
  );
}
