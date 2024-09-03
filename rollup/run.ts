import { Wallet } from "ethers";
import { schemas } from "./src/actions";
import { stackrConfig } from "./stackr.config";

const { domain } = stackrConfig;

type ActionName = keyof typeof schemas;

const walletOne = new Wallet(
  "0x0123456789012345678901234567890123456789012345678901234567890123"
);
const walletTwo = new Wallet(
  "0x0123456789012345678901234567890123456789012345678901234567890124"
);

const getBody = async (actionName: ActionName, wallet: Wallet) => {
  const walletAddress = wallet.address;
  const date = new Date();
  const inputs =
    actionName == "createRepScore"
      ? {
          actionMessage: "0x",
          fid: 4,
          engagementRankPercentile: 99,
          castFrequency: 150,
          postQuality: 40,
          reactionLikes: 95,
          reactionsRecast: 95,
          followingRankPercentile: 100,
          userCreationTimePeriod: 150,
          totalOnChainTransfer: 65,
          totalOnChainBalance: 1500,
          totalPoaps: 15,
          ownsENSDomain: "true",
          isXMTPEnabled: "false",
          timestamp: 1725387310,
        }
      : {
          actionMessage: "0x",
          fid: 3,
          engagementRankPercentile: 99,
          castFrequency: 140,
          postQuality: 40,
          reactionLikes: 80,
          reactionsRecast: 95,
          followingRankPercentile: 100,
          userCreationTimePeriod: 150,
          totalOnChainTransfer: 65,
          totalOnChainBalance: 1500,
          totalPoaps: 15,
          ownsENSDomain: "true",
          isXMTPEnabled: "false",
          timestamp: Math.round(date.getTime() / 1000),
        };

  console.log(inputs);
  console.log(schemas[actionName].EIP712TypedData.types);

  const signature = await wallet.signTypedData(
    {
      chainId: 69420,
      verifyingContract: "0x1443D4D7D20038992d80a8A57a0C721ad6d8cBb8",
      ...domain,
    },
    schemas[actionName].EIP712TypedData.types,
    inputs
  );
  console.log(signature);

  const body = JSON.stringify({
    msgSender: walletAddress,
    signature,
    inputs,
  });

  return body;
};

const run = async (actionName: ActionName, wallet: Wallet) => {
  const start = Date.now();
  const body = await getBody(actionName, wallet);

  const res = await fetch(`http://localhost:5050/${actionName}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const end = Date.now();
  const json = await res.json();

  const elapsedSeconds = (end - start) / 1000;
  const requestsPerSecond = 1 / elapsedSeconds;

  console.info(`Requests per second: ${requestsPerSecond.toFixed(2)}`);
  console.log(`Response: ${JSON.stringify(json, null, 2)}`);
};

const main = async (actionName: string, walletName: string) => {
  if (!Object.keys(schemas).includes(actionName)) {
    throw new Error(
      `Action ${actionName} not found. Available actions: ${Object.keys(
        schemas
      ).join(", ")}`
    );
  }

  const wallet = walletName === "alice" ? walletOne : walletTwo;
  await run(actionName as ActionName, wallet);
};

main(process.argv[2], process.argv[3]);
