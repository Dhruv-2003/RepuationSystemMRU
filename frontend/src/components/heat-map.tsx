"use client";

import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { Card } from "./ui/card";
import { getUserCasts } from "@/utils/neynar";

const value = [
  { date: "2024/01/1", count: 0 },
  { date: "2024/01/2", count: 1 },
  { date: "2024/01/3", count: 2 },
  { date: "2024/01/4", count: 3 },
  { date: "2024/01/5", count: 4 },
  { date: "2024/01/6", count: 5 },
  { date: "2024/01/7", count: 6 },
  { date: "2024/01/8", count: 7 },
  { date: "2024/01/9", count: 8 },
  { date: "2024/01/10", count: 9 },
  { date: "2024/01/11", count: 10 },
];

export default function Heatmap({ fid }: { fid: number | undefined }) {
  const [selected, setSelected] = useState("");

  const getUserData = async (fid: number) => {
    try {
      const response = await getUserCasts(fid);
      const data = await response.json();

      console.log(data);
      // setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selected && fid) {
      getUserData(fid);
    }
  }, [fid]);

  return (
    <div className="w-full space-y-4 ">
      <div className=" text-2xl font-semibold">Your Activity</div>
      <Card className=" p-4 pt-5 w-full shadow-xl">
        <HeatMap
          width={"full"}
          mode={"dark"}
          panelColors={{
            1: "#88E0EF",
            2: "#7ed9f0",
            3: "#74d1f0",
            4: "#6acaf1",
            5: "#60c2f1",
            6: "#56baf2",
            7: "#4cb2f2",
            8: "#42abf2",
            9: "#38a3f3",
            10: "#2f9bf3",
          }}
          value={value}
          monthLabels={false}
          weekLabels={false}
          rectSize={16}
          space={4}
          legendCellSize={0}
          startDate={new Date("2024/01/01")}
          rectRender={(props, data) => {
            if (selected !== "") {
              props.opacity = data.date === selected ? 1 : 0.45;
            }
            return (
              <rect
                {...props}
                onClick={() => {
                  setSelected(data.date === selected ? "" : data.date);
                }}
              />
            );
          }}
        />
      </Card>
    </div>
  );
}
