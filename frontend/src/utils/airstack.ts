import { init, fetchQuery } from "@airstack/node";
import { userFidQuery, userOnchainQuery } from "./airstackQueries";
import dotenv from "dotenv";
import { calculateOnchainScore } from "./calculateScore";
dotenv.config();

init("120c285f6df44601b48fd17a673be1bc", "dev");

export const getUserAllData = async (userHandle: string) => {
  try {
    const { data, error } = await fetchQuery(userFidQuery, {
      handle: userHandle,
    });

    // console.log("data:", data);
    // console.log("error:", error);
    if (error) {
      console.log(error[0].locations);
    }
    if (data) {
      const userData = data.Socials.Social[0];
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserOnchainData = async (userAddress: string) => {
  try {
    const { data, error } = await fetchQuery(userOnchainQuery, {
      address: userAddress,
    });

    // console.log("data:", data);
    // console.log("error:", error);

    if (error) {
      console.log(error[0].locations);
    }
    if (data) {
      const userData = data.Wallet;
      // const onchainPoints = await calculateOnchainScore(userData);
      // console.log(onchainPoints);
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
};
