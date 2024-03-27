// ./app/frames/route.tsx
/* eslint-disable react/jsx-key */
import { UserReputationScoreType } from "@/utils/calculateScore";

import { ImageResponse } from "@vercel/og";

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: { handle: string };
  }
) => {
  const userHandle = params.handle;
  console.log(userHandle);

  // get the data for that user from kv
  const response = await fetch(
    `${process.env.HOST}/api/calculateScore/${userHandle}`
  );

  const userData: UserReputationScoreType | undefined = await response.json();
  console.log(userData);
  // render it
  // Might want to check the data and revert saying refresh Again
  if (userData) {
    return new ImageResponse(
      (
        <div tw=" flex h-[476px] w-[910px] items-center justify-between w-full bg-white">
          <div
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #75f 0%, #6943ff 0.01%, #2f2ce9 100%)",
              width: 500,
              height: 476,
            }}
            tw="flex flex-1 flex-col items-center justify-center w-full"
          >
            <h4 tw=" text-2xl font-semibold text-white mb-6">
              Your Reputation Score
            </h4>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #4d21c9 0%, rgba(37, 33, 201, 0) 100%, rgba(37, 33, 201, 0) 100%)",
              }}
              tw=" flex items-center flex-col justify-center p-8 h-40 w-40 rounded-full text-white border border-white shadow-2xl	"
            >
              <span tw="text-5xl font-bold">{userData.totalScore}</span>
              <span tw=" text-xl font-semibold">of 1000</span>
            </div>
            <p tw=" text-base font-medium text-white mt-6">
              Your are among top 70% users on Farcaster
            </p>
          </div>
          <div
            style={{
              backgroundImage: "linear-gradient(to top, #ffffff, #ebf4ff)",
              width: 410,
              height: 476,
            }}
            tw="flex flex-1 flex-col m px-8 py-8"
          >
            <div tw="flex items-center justify-between w-full mb-4">
              <h4 tw=" text-2xl font-semibold text-indigo-500">
                {userData.userhandle}
              </h4>
              <img
                src={
                  "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
                }
                alt="pfp"
                tw="rounded-full h-20 w-20 shadow-2xl broder-2"
              />
            </div>
            <div tw=" my-4 flex justify-between">
              <span tw=" text-base font-medium text-green-500">
                User Engagement
              </span>
              <span tw=" text-base font-semibold text-cyan-500">
                {userData.engagementScore}
                <span tw=" text-black"> / 200</span>
              </span>
            </div>
            <div tw=" mb-4 flex justify-between">
              <span tw="text-base font-medium text-red-500">
                Cast Frequency
              </span>
              <span tw=" text-base font-semibold text-cyan-500">
                {userData.castFrequencyScore}
                <span tw=" text-black"> / 150</span>
              </span>
            </div>
            <div tw=" mb-4 flex justify-between">
              <span tw=" text-base font-medium text-violet-500">Longevity</span>
              <span tw=" text-base font-semibold text-cyan-500">
                {userData.longevityScore}
                <span tw=" text-black"> / 100</span>
              </span>
            </div>
            <div tw=" mb-4 flex justify-between">
              <span tw="text-base font-medium text-amber-500">
                Network Size
              </span>
              <span tw=" text-base font-semibold text-cyan-500">
                {userData.followingScore} <span tw=" text-black"> / 100</span>
              </span>
            </div>
            <div tw=" mb-4 flex justify-between">
              <span tw="text-base font-medium text-lime-500">
                Farcaster Activity
              </span>
              <span tw=" text-base font-semibold text-cyan-500">
                {userData.reactionLikeScore + userData.reactionRecastScore}{" "}
                <span tw=" text-black"> / 100</span>
              </span>
            </div>
            <div tw=" mb-4 flex justify-between">
              <span tw="text-base font-medium text-teal-500">
                Onchain Activty
              </span>
              <span tw=" text-base font-semibold text-cyan-500">
                {userData.onChainScore} <span tw=" text-black"> / 200</span>
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 910,
        height: 476,
      }
    );
  } else {
    return new Response("Not Available", { status: 500 });
  }
};
