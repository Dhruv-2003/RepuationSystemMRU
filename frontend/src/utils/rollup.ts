import { AddressLike, Wallet } from "ethers";
import { CalculateRepScoreInputsType } from "./getDataViaAPIs";

const domain = {
  name: "Stackr MVP v0",
  version: "1",
  chainId: 15,
  verifyingContract: "0x318797a65c1B1Af4d2B74E6Dca6d5f188BBF0F3F",
  salt: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
};

export type UserReputation = {
  fid: number;
  address: AddressLike;
  engagementScore: number;
  castFrequencyScore: number;
  postQualityScore: number;
  reactionScore: number;
  longevityScore: number;
  onChainScore: number;
  followingScore: number;
  totalScore: number;
  lastUpdated: number;
};

export const createRepScoreAction = async (
  userScoreData: CalculateRepScoreInputsType
) => {
  const wallet = Wallet.createRandom();

  const actionName = "createRepScore";
  try {
    const response = await fetch(
      `${process.env.ROLLUP_HOST}/getEIP712Types/${actionName}`
    );

    const eip712Types = (await response.json()).eip712Types;
    console.log(eip712Types);
    const date = new Date();

    const payload = {
      timestamp: Math.round(date.getTime() / 1000),
      ...userScoreData,
    };

    const signature = await wallet.signTypedData(domain, eip712Types, payload);

    const body = JSON.stringify({
      msgSender: wallet.address,
      signature,
      payload,
    });

    const res = await fetch(`${process.env.ROLLUP_HOST}/${actionName}`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    console.log(`Response: ${JSON.stringify(json, null, 2)}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateRepScoreAction = async (
  userScoreData: CalculateRepScoreInputsType
) => {
  // Wallet should be same
  const wallet = Wallet.createRandom();

  const actionName = "updateRepScore";

  const response = await fetch(
    `${process.env.ROLLUP_HOST}/getEIP712Types/${actionName}`
  );
  const eip712Types = (await response.json()).eip712Types;

  const date = new Date();

  const payload = {
    timestamp: Math.round(date.getTime() / 1000),
    ...userScoreData,
  };

  const signature = await wallet.signTypedData(domain, eip712Types, payload);

  const body = JSON.stringify({
    msgSender: wallet.address,
    signature,
    payload,
  });

  const res = await fetch(`${process.env.ROLLUP_HOST}/${actionName}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  console.log(`Response: ${JSON.stringify(json, null, 2)}`);
};
