// import { getUserEngagmentData } from "@/utils/getOpenRankData";
import { getUserOnchainData } from "@/utils/airstack";
import { calculateScore } from "@/utils/calculateScore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // await getUserEngagmentData();
    const userHandle = "dwr.eth";
    const userFid = 3;
    // const userAddress = "0xB72a04B01BB80DfD6a42ea8E0907B892286113F2";

    await calculateScore(userHandle);

    return new Response("ReuestCall Successful", {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}
