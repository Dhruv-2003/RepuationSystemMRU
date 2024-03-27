import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { calculateScore } from "@/utils/calculateScore";

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const userReputationScore = await kv.get(params.handle);
    console.log(userReputationScore);

    return new Response(JSON.stringify(userReputationScore), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
