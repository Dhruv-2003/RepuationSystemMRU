import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { getDataForScore } from "@/utils/getDataViaAPIs";
import { createRepScoreAction, updateRepScoreAction } from "@/utils/rollup";
import { getUserDataForFid } from "frames.js";

export async function POST(
  request: NextRequest,
  { params }: { params: { fid: string } }
) {
  try {
    // invoker User calculateData and then get the score and detailed info to store it on the KV
    console.log(params.fid);
    const userFData = await getUserDataForFid({ fid: Number(params.fid) });
    if (!userFData?.username) {
      console.log("Username unavailable");
      return;
    }

    // check if the user exists , then only allow refresh
    const res = await fetch(`${process.env.ROLLUP_HOST}/score/${params.fid}`);

    const json = await res.json();
    console.log(json);
    const userReputationScore = json.userScore;

    if (!userReputationScore) {
      return new Response("Can't Refresh , User don't exists", { status: 400 });
    }

    if (
      Math.round(new Date().getTime() / 1000) -
        userReputationScore.lastUpdated <
      2629743
    ) {
      console.log("Can't refresh before a month");
      return;
    }

    // process a new request and just passto updateRepScore
    const userScoreData = await getDataForScore(userFData?.username);

    console.log(userScoreData);
    if (userScoreData) {
      await updateRepScoreAction(userScoreData);
    }

    return new Response("User Reputation Score Stored", {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
}
