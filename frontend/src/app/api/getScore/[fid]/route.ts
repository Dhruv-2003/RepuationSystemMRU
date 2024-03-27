import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const res = await fetch(`http://localhost:5000/score/${params.handle}`);

    const json = await res.json();
    console.log(json);
    const userReputationScore = json;
    // have to modify and add extra user info for user farcaster info

    console.log(`Response: ${JSON.stringify(json, null, 2)}`);
    // check if the last Time Updated was a long ago , then just refresh the score

    return new Response(JSON.stringify(userReputationScore), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
