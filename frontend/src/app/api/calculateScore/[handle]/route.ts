import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { calculateScore } from "@/utils/calculateScore";

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const userReputationScore = await kv.get(params.handle);
    // console.log(userReputationScore);

    // check if the last Time Updated was a long ago , then just refresh the score

    return new Response(JSON.stringify(userReputationScore), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    // invoker User calculateData and then get the score and detailed info to store it on the KV
    console.log(params.handle);
    const userNewScore = await calculateScore(params.handle);

    // console.log(userNewScore);
    await kv.set(params.handle, userNewScore);

    return new Response("User Reputation Score Stored", {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
