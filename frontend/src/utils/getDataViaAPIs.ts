import { getUserDataForFid } from "frames.js";
import { getUserAllData, getUserOnchainData } from "./airstack";
import {
  getUserGlobalEngagmentRanking,
  getUserGlobalFollowingRanking,
} from "./getOpenRankData";
// import {
//   getUserCasts,
//   getUserLikes,
//   getUserReactions,
//   getUserRecasts,
// } from "./neynar";

export interface UserReputationScoreType {
  fid: number;
  fname: string;
  userhandle: string;
  profile: string;
  engagementScore: number;
  castFrequencyScore: number;
  postQualityScore: number;
  reactionLikeScore: number;
  reactionRecastScore: number;
  followingScore: number;
  longevityScore: number;
  onChainScore: number;
  totalScore: number;
}

export interface CalculateRepScoreInputsType {
  actionMessage: string;
  fid: number;
  engagementRankPercentile: number;
  castFrequency: number;
  postQuality: number;
  reactionLikes: number;
  reactionsRecast: number;
  followingRankPercentile: number;
  userCreationTimePeriod: number;
  totalOnChainTransfer: number;
  totalOnChainBalance: number;
  totalPoaps: number;
  ownsENSDomain: boolean;
  isXMTPEnabled: boolean;
}

export const getDataForScore = async (
  userHandle: string,
  actionMessage: string
): Promise<CalculateRepScoreInputsType | undefined> => {
  try {
    // 1. get Engagment ranking from openranks ( out of 200 )
    const engagementRank = await getUserGlobalEngagmentRanking(userHandle);
    const fid = engagementRank.fid;

    // // fetch user data from Airstack
    const userData = await getUserAllData(userHandle);
    // console.log(userData);

    // get Casts by the user
    // const casts = await getUserAuthoredCasts(fid);
    const casts2 = userData.FarcasterCasts.Cast;
    // 2.calculate the post freq score ( out of 150 )
    const castFrequency = await calculatePostFreq(casts2);

    // 3.calculate the post quality score ( out of 50 )
    const postQuality = 40;

    // fetch user reactions
    // 4. get the no of likes (out of 50)
    const reactionsLike = userData.FarcasterLikes.Reaction;
    const filteredReactionsLike = await calculateReactionFreq(reactionsLike);
    // 4. get the no of recasts  (out of 50)
    const reactionsRecast = userData.FarcasterRecast.Reaction;
    const filteredReactionsRecast = await calculateReactionFreq(
      reactionsRecast
    );

    // 5. Take the no of followers to calculate the  following score (out of 100)
    const followingRank = await getUserGlobalFollowingRanking(userHandle);

    const userSocialData = userData.Socials.Social[0];

    // // 6. Get the account creation time for user to calculate the longevity score (out of 100)
    const userCreatedTime = new Date(
      userSocialData.userCreatedAtBlockTimestamp
    );
    const userCreationTimePeriod = await calculateLongevityScore(
      userCreatedTime
    );

    // fetch users onchain activity data from airstack
    // 7. get the onchain activity like tokens transfer , nft minting , etc.
    const userOnchainData = await getUserOnchainData(
      userSocialData.userAssociatedAddresses[1]
        ? userSocialData.userAssociatedAddresses[1]
        : userSocialData.userAddress
    );
    const onChainScoreData = await calculateOnchainScore(userOnchainData);

    return {
      actionMessage: actionMessage,
      fid: fid,
      engagementRankPercentile: engagementRank.percentile,
      castFrequency: castFrequency,
      postQuality: postQuality,
      reactionLikes: filteredReactionsLike,
      reactionsRecast: filteredReactionsRecast,
      followingRankPercentile: followingRank.percentile,
      userCreationTimePeriod: userCreationTimePeriod,
      totalOnChainTransfer: onChainScoreData.totalTransfers,
      totalOnChainBalance: onChainScoreData.totalBalance,
      totalPoaps: onChainScoreData.totalPoaps,
      ownsENSDomain: onChainScoreData.ownsENSDomain,
      isXMTPEnabled: onChainScoreData.isXMTPEnabled,
    };
  } catch (error) {
    console.log(error);
  }
};

const calculatePostFreq = async (casts: any[]) => {
  const currentDate = new Date();

  //   const authoredCasts = casts.filter((cast: any) => {
  //     return !cast.parentHash;
  //   });
  const authoredCasts = casts;

  // might want to filter that they were the posts created by the user , only the post authored directly by the user , so there should be no parentAuthor & no parentHash

  const timeFilteredCasts = authoredCasts.filter((cast: any) => {
    // console.log(cast.timestamp);
    const postDate = new Date(cast.castedAtTimestamp);
    const diffInDays = Math.floor(
      (currentDate.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffInDays <= 100;
  });

  return timeFilteredCasts.length < 150 ? timeFilteredCasts.length : 50;
};

const calculateReactionFreq = async (reactions: any[]) => {
  const currentDate = new Date();

  // const timeFilteredReactions = reactions.filter((cast: any) => {
  //   const postDate = new Date(cast.reaction_timestamp);
  //   const diffInDays = Math.floor(
  //     (currentDate.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
  //   );
  //   return diffInDays <= 100;
  // });

  return reactions.length < 50 ? reactions.length : 50;
};

const calculateLongevityScore = async (accountCreationDate: Date) => {
  const currentDate = new Date();

  const diffInDays = Math.floor(
    (currentDate.getTime() - accountCreationDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return diffInDays;
};

export const calculateOnchainScore = async (userOnchainData: any) => {
  console.log(userOnchainData);
  // count the no of total Token transfers on chain and then grade it out of , if more than 50 then 50 points , otherwise , whatever is lesser
  // out of 75
  const totalTransfers =
    userOnchainData.ethereumTransfer.length +
    25 +
    userOnchainData.baseTransfer.length;

  let totalBalance: number = 0;

  await userOnchainData.ethereumBalance.forEach((balance: any) => {
    totalBalance += balance.formattedAmount;
  });

  // await userOnchainData.polygonBalance.forEach((balance: any) => {
  //   totalBalance += balance.formattedAmount;
  // });

  await userOnchainData.baseBalance.forEach((balance: any) => {
    totalBalance += balance.formattedAmount;
  });

  let totalPoaps = userOnchainData.poaps.length;

  return {
    totalTransfers,
    totalBalance: Math.round(totalBalance),
    totalPoaps,
    ownsENSDomain: userOnchainData.domains.length ? true : false,
    isXMTPEnabled: userOnchainData.xmtp.isXMTPEnabled ? true : false,
  };
};
