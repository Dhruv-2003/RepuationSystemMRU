import { AddressLike, Wallet } from "ethers";
import { CalculateRepScoreInputsType } from "./getDataViaAPIs";
import { stackrConfig } from "../../../rollup/stackr.config";
import { schemas } from "../../../rollup/src/actions";

const { domain } = stackrConfig;
type ActionName = keyof typeof schemas;

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

  const actionName: ActionName = "createRepScore";

  const date = new Date();

  const payload = {
    timestamp: Math.round(date.getTime() / 1000),
    ...userScoreData,
  };

  const signature = await wallet.signTypedData(
    domain,
    schemas[actionName].EIP712TypedData.types,
    payload
  );

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

export const updateRepScoreAction = async (
  userScoreData: CalculateRepScoreInputsType
) => {
  // Wallet should be same
  const wallet = Wallet.createRandom();

  const actionName: ActionName = "updateRepScore";

  const date = new Date();

  const payload = {
    timestamp: Math.round(date.getTime() / 1000),
    ...userScoreData,
  };

  const signature = await wallet.signTypedData(
    domain,
    schemas[actionName].EIP712TypedData.types,
    payload
  );

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
