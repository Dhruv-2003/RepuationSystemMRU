// ./app/frames/route.tsx
/* eslint-disable react/jsx-key */
import { UserReputation } from "@/utils/rollup";
import { verifyFrameActionMessage } from "@/utils/verify";
import { getUserDataForFid } from "frames.js";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  console.log(ctx.message);

  const req = ctx.request;
  const body = await req.json();
  // console.log(body);
  // const isVerified = verifyFrameActionMessage(body);

  if (ctx.message) {
    // Get the users fid
    const userFid: number = ctx?.message.requesterFid;
    const res = await fetch(`${process.env.ROLLUP_HOST}/score/${userFid}`);

    const json = await res.json();
    const userScoreData: UserReputation | undefined | null = json.userScore;

    console.log(userScoreData);

    if (!userScoreData) {
      // Otherwise
      // request the User data for score calculate
      // don't wait for that

      // Send a refresh Frame first
      // send a POST request for generating the Score
      fetch(`${process.env.HOST}/api/calculateScore/${userFid}`, {
        method: "POST",
        body: JSON.stringify({
          actionMessage: body.trustedData.messageBytes,
        }),
      });

      return {
        image: (
          <div tw=" flex items-stretch  justify-between w-full h-full bg-[#ecf2ff]">
            <div tw="flex flex-col card-score items-center justify-center w-full">
              <h4 tw=" text-2xl font-semibold text-black mb-6">Vericast</h4>
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #4d21c9 0%, rgba(37, 33, 201, 0) 100%, rgba(37, 33, 201, 0) 100%)",
                  border: "2px",
                }}
                tw=" flex items-center flex-col justify-center h-40 w-40 rounded-full text-black shadow-2xl	"
              >
                <img
                  src="https://th.bing.com/th/id/OIG2.Is.h72tGUlpfskKIrRAj?pid=ImgGn"
                  tw="rounded-full"
                />
              </div>
              <p tw=" text-base font-medium text-black mt-6">
                Crunching your score, hit refresh to see it now
              </p>
            </div>
          </div>
        ),
        buttons: [
          <Button
            action="post"
            target={`${process.env.HOST}/api/frames/generateScore`}
          >
            Refresh
          </Button>,
        ],
        // state: { count: (ctx.message?.state?.count ?? 0) + 1 },
      };
    } else {
      // Otherwise return the frame with user's profile
      const userFData = await getUserDataForFid({ fid: userFid });

      return {
        image: (
          <div tw="flex h-full w-full items-center justify-between bg-white">
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #75f 0%, #6943ff 0.01%, #2f2ce9 100%)",
                width: 500,
                height: 600,
              }}
              tw="flex flex-1 flex-col items-center justify-center w-full"
            >
              <h4 style={{ fontWeight: 600 }} tw=" text-2xl text-white mb-6">
                Your Reputation Score
              </h4>
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #4d21c9 0%, rgba(37, 33, 201, 0) 100%, rgba(37, 33, 201, 0) 100%)",
                }}
                tw=" flex items-center flex-col justify-center p-8 h-40 w-40 rounded-full text-white border border-white shadow-2xl	"
              >
                <span style={{ fontWeight: 800 }} tw="text-5xl">
                  {userScoreData.totalScore}
                </span>
                <span tw=" text-xl font-semibold">of 1000</span>
              </div>
              <p style={{ fontWeight: 600 }} tw=" text-base text-white mt-6">
                Your are among top 70% users on Farcaster
              </p>
            </div>
            <div
              style={{
                backgroundImage: "linear-gradient(to top, #ffffff, #ebf4ff)",
                width: 410,
                height: 600,
              }}
              tw="flex flex-1 flex-col m px-8 py-8"
            >
              <div tw="flex items-center justify-between w-full mb-4">
                <h4 style={{ fontWeight: 600 }} tw=" text-2xl text-indigo-500">
                  {userFData?.username}
                </h4>
                <img
                  src={
                    userFData?.profileImage
                      ? userFData.profileImage
                      : "https://pbs.twimg.com/profile_images/1732439974497394688/ezW7LwKq_400x400.jpg"
                  }
                  alt="pfp"
                  tw="rounded-full h-20 w-20 shadow-2xl broder-2"
                />
              </div>
              <div tw=" my-4 flex justify-between">
                <span
                  style={{ fontWeight: 600 }}
                  tw=" text-base text-green-500"
                >
                  User Engagement
                </span>
                <span style={{ fontWeight: 600 }} tw=" text-base text-cyan-500">
                  {userScoreData.engagementScore}
                  <span tw=" text-black"> / 200</span>
                </span>
              </div>
              <div style={{ fontWeight: 600 }} tw=" mb-4 flex justify-between">
                <span tw="text-base text-red-500">Cast Frequency</span>
                <span tw=" text-base text-cyan-500">
                  {userScoreData.castFrequencyScore}
                  <span tw=" text-black"> / 150</span>
                </span>
              </div>
              <div style={{ fontWeight: 600 }} tw=" mb-4 flex justify-between">
                <span tw=" text-base text-violet-500">Longevity</span>
                <span tw=" text-base text-cyan-500">
                  {userScoreData.longevityScore}
                  <span tw=" text-black"> / 100</span>
                </span>
              </div>
              <div style={{ fontWeight: 600 }} tw=" mb-4 flex justify-between">
                <span tw="text-base text-amber-500">Network Size</span>
                <span tw=" text-base text-cyan-500">
                  {userScoreData.followingScore}{" "}
                  <span tw=" text-black"> / 100</span>
                </span>
              </div>
              <div style={{ fontWeight: 600 }} tw=" mb-4 flex justify-between">
                <span tw="text-base text-lime-500">Farcaster Activity</span>
                <span tw=" text-base text-cyan-500">
                  {userScoreData.reactionScore}{" "}
                  <span tw=" text-black"> / 100</span>
                </span>
              </div>
              <div style={{ fontWeight: 600 }} tw=" mb-4 flex justify-between">
                <span tw="text-base text-teal-500">Onchain Activty</span>
                <span tw=" text-base text-cyan-500">
                  {userScoreData.onChainScore}{" "}
                  <span tw=" text-black"> / 200</span>
                </span>
              </div>
            </div>
          </div>
        ),
        buttons: [
          <Button action="link" target={`${process.env.HOST}/score/${userFid}`}>
            Profile
          </Button>,
          <Button action="post">Mint</Button>,
        ],
      };
    }
  } else {
    return {
      image: (
        <div tw=" flex items-stretch  justify-between w-full h-full bg-[#ecf2ff]">
          <div tw="flex flex-col card-score items-center justify-center w-full">
            <h4 tw=" text-2xl font-semibold text-black mb-6">Vericast</h4>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #4d21c9 0%, rgba(37, 33, 201, 0) 100%, rgba(37, 33, 201, 0) 100%)",
                border: "2px",
              }}
              tw=" flex items-center flex-col justify-center h-40 w-40 rounded-full text-black shadow-2xl	"
            >
              <img
                src="https://th.bing.com/th/id/OIG2.Is.h72tGUlpfskKIrRAj?pid=ImgGn"
                tw="rounded-full"
              />
            </div>
            <p tw=" text-base font-medium text-red-500 mt-6">
              Something Went Wrong !! Try Again
            </p>
          </div>
        </div>
      ),
      buttons: [<Button action="post">Try again</Button>],
      // state: { count: (ctx.message?.state?.count ?? 0) + 1 },
    };
  }
});

export const POST = handleRequest;
