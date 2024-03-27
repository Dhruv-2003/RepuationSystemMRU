import { Reducers, STF } from "@stackr/sdk/machine";
import {
  ReputationSystem,
  ReputationSystemTransport as StateWrapper,
  UserReputation,
} from "./state";

// --------- Utilities ---------
const findIndexOfFid = (state: StateWrapper, fid: number) => {
  return state.userRepuations.findIndex((user) => user.fid === fid);
};

export interface calculateRepScoreInputsType {
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

export interface calculateRepScoreReturnType {
  engagementScore: number;
  castFrequencyScore: number;
  postQualityScore: number;
  reactionScore: number;
  followingScore: number;
  longevityScore: number;
  onChainScore: number;
  totalScore: number;
}

const calculateRepScore = (
  inputs: calculateRepScoreInputsType
): calculateRepScoreReturnType => {
  const engagementPoints = inputs.engagementRankPercentile * 2;
  const reactionLikeScore =
    inputs.reactionLikes > 100
      ? 50
      : Math.round((inputs.reactionLikes * 50) / 100);
  const reactionRecastScore =
    inputs.reactionsRecast > 100
      ? 50
      : Math.round((inputs.reactionsRecast * 50) / 100);
  const longevityScore =
    inputs.userCreationTimePeriod > 200
      ? 100
      : Math.round((inputs.userCreationTimePeriod / 200) * 100);

  const balanceScore =
    inputs.totalOnChainBalance > 1000
      ? 75
      : Math.round((inputs.totalOnChainBalance * 75) / 1000);

  const domainScore = inputs.ownsENSDomain ? 15 : 0;
  const xmtpScore = inputs.isXMTPEnabled ? 10 : 0;
  const onchainScore =
    inputs.totalOnChainTransfer +
    balanceScore +
    inputs.totalPoaps +
    domainScore +
    xmtpScore;

  const totalScore = Math.round(
    engagementPoints +
      inputs.castFrequency +
      inputs.postQuality +
      reactionLikeScore +
      reactionRecastScore +
      inputs.followingRankPercentile +
      longevityScore +
      onchainScore
  );

  return {
    engagementScore: engagementPoints,
    castFrequencyScore: inputs.castFrequency,
    postQualityScore: inputs.postQuality,
    reactionScore: reactionLikeScore + reactionRecastScore,
    followingScore: inputs.followingRankPercentile,
    longevityScore: longevityScore,
    onChainScore: onchainScore,
    totalScore: totalScore,
  };
};

// --------- State Transition Handlers ---------
const createRepScoreHandler: STF<ReputationSystem> = {
  handler: ({ inputs, state, msgSender }) => {
    if (
      inputs.engagementRankPercentile > 100 ||
      inputs.castFrequency > 150 ||
      inputs.postQuality > 50 ||
      inputs.followingRankPercentile > 100
    ) {
      throw new Error("Invalid inputs");
    }

    if (
      state.userRepuations.find(
        (user) => user.address === msgSender || user.fid === inputs.fid
      )
    ) {
      throw new Error("User reputation already exists");
    }

    const repScore = calculateRepScore({
      engagementRankPercentile: inputs.engagementRankPercentile,
      castFrequency: inputs.castFrequency,
      postQuality: inputs.postQuality,
      reactionLikes: inputs.reactionLikes,
      reactionsRecast: inputs.reactionsRecast,
      followingRankPercentile: inputs.followingRankPercentile,
      userCreationTimePeriod: inputs.userCreationTimePeriod,
      totalOnChainTransfer: inputs.totalOnChainTransfer,
      totalOnChainBalance: inputs.totalOnChainBalance,
      totalPoaps: inputs.totalPoaps,
      ownsENSDomain: inputs.ownsENSDomain,
      isXMTPEnabled: inputs.isXMTPEnabled,
    });
    console.log(repScore);

    const userReputation: UserReputation = {
      fid: inputs.fid,
      address: msgSender,
      lastUpdated: inputs.timestamp,
      engagementScore: repScore.engagementScore,
      castFrequencyScore: repScore.castFrequencyScore,
      postQualityScore: repScore.postQualityScore,
      reactionScore: repScore.reactionScore,
      followingScore: repScore.followingScore,
      longevityScore: repScore.longevityScore,
      onChainScore: repScore.onChainScore,
      totalScore: repScore.totalScore,
    };
    // console.log(userReputation);
    state.userRepuations.push(userReputation);
    return state;
  },
};

// --------- State Transition Handlers ---------
const updateRepScoreHandler: STF<ReputationSystem> = {
  handler: ({ inputs, state, msgSender }) => {
    if (
      inputs.engagementRankPercentile > 100 ||
      inputs.castFrequency > 150 ||
      inputs.postQuality > 50 ||
      inputs.followingRankPercentile > 100
    ) {
      throw new Error("Invalid inputs");
    }

    const userRepIndex = findIndexOfFid(state, inputs.fid);
    const userRep = state.userRepuations[userRepIndex];
    if (!userRep) {
      throw new Error("User reputation doesn't exist");
    }

    if (msgSender != userRep.address) {
      throw new Error("Only Owner Can updater reputation score");
    }

    const repScore = calculateRepScore({
      engagementRankPercentile: inputs.engagementRankPercentile,
      castFrequency: inputs.castFrequency,
      postQuality: inputs.postQuality,
      reactionLikes: inputs.reactionLikes,
      reactionsRecast: inputs.reactionsRecast,
      followingRankPercentile: inputs.followingRankPercentile,
      userCreationTimePeriod: inputs.userCreationTimePeriod,
      totalOnChainTransfer: inputs.totalOnChainTransfer,
      totalOnChainBalance: inputs.totalOnChainBalance,
      totalPoaps: inputs.totalPoaps,
      ownsENSDomain: inputs.ownsENSDomain,
      isXMTPEnabled: inputs.isXMTPEnabled,
    });
    console.log(repScore);

    const newUserReputation: UserReputation = {
      fid: inputs.fid,
      address: userRep.address,
      lastUpdated: inputs.timestamp,
      engagementScore: repScore.engagementScore,
      castFrequencyScore: repScore.castFrequencyScore,
      postQualityScore: repScore.postQualityScore,
      reactionScore: repScore.reactionScore,
      followingScore: repScore.followingScore,
      longevityScore: repScore.longevityScore,
      onChainScore: repScore.onChainScore,
      totalScore: repScore.totalScore,
    };

    state.userRepuations[userRepIndex] = newUserReputation;

    // possibly record this change
    return state;
  },
};

export const reducers: Reducers<ReputationSystem> = {
  createRepScore: createRepScoreHandler,
  updateRepScore: updateRepScoreHandler,
};
