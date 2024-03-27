// ./app/frames/route.tsx
/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  return {
    image: `${process.env.HOST}/introductory.jpg`,
    buttons: [
      <Button
        action="post"
        target={`${process.env.HOST}/api/frames/generateScore`}
      >
        Generate your Score now →
      </Button>,
    ],
    textInput: "Farcaster Handle...",
    accepts: [
      {
        id: "farcaster",
        version: "vNext",
      },
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
