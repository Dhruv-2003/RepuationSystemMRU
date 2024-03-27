import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { calculateScore } from "@/utils/calculateScore";
import { getUserCasts } from "@/utils/neynar";

export async function GET(
  request: NextRequest,
  { params }: { params: { fid: number } }
) {
  try {
    const userCasts = await getUserCasts(params.fid);
    // console.log(userReputationScore);

    return new Response(JSON.stringify(userCasts), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
