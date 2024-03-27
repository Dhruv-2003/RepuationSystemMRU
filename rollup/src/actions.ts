import { ActionSchema, SolidityType } from "@stackr/sdk";

// createAccountSchema is a schema for creating an account
export const createRepScoreSchema = new ActionSchema("createRepScore", {
  fid: SolidityType.UINT,
  engagementRankPercentile: SolidityType.UINT,
  castFrequency: SolidityType.UINT,
  postQuality: SolidityType.UINT,
  reactionLikes: SolidityType.UINT,
  reactionsRecast: SolidityType.UINT,
  followingRankPercentile: SolidityType.UINT,
  userCreationTimePeriod: SolidityType.UINT,
  totalOnChainTransfer: SolidityType.UINT,
  totalOnChainBalance: SolidityType.UINT,
  totalPoaps: SolidityType.UINT,
  ownsENSDomain: SolidityType.BOOL,
  isXMTPEnabled: SolidityType.BOOL,
  timestamp: SolidityType.UINT,
});

export const updateRepScoreSchema = new ActionSchema("updateRepScore", {
  fid: SolidityType.UINT,
  engagementRankPercentile: SolidityType.UINT,
  castFrequency: SolidityType.UINT,
  postQuality: SolidityType.UINT,
  reactionLikes: SolidityType.UINT,
  reactionsRecast: SolidityType.UINT,
  followingRankPercentile: SolidityType.UINT,
  userCreationTimePeriod: SolidityType.UINT,
  totalOnChainTransfer: SolidityType.UINT,
  totalOnChainBalance: SolidityType.UINT,
  totalPoaps: SolidityType.UINT,
  ownsENSDomain: SolidityType.BOOL,
  isXMTPEnabled: SolidityType.BOOL,
  timestamp: SolidityType.UINT,
});

// transferSchema is a collection of all the transfer actions
// that can be performed on the rollup
export const schemas = {
  createRepScore: createRepScoreSchema,
  updateRepScore: updateRepScoreSchema,
};

// New Actions
// 1. Creating a Reputation Score ✅
// 2. Update a Reputation Score ✅
// 3. Mark the reputation score as events when the score changed from prev to the new one
