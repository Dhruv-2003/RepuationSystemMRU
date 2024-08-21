import { State } from "@stackr/sdk/machine";
import {
  AddressLike,
  BytesLike,
  ZeroHash,
  solidityPackedKeccak256,
} from "ethers";
import { MerkleTree } from "merkletreejs";

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

// export type reputationChangeEvent = {
//   fid: number;
//   address: AddressLike;
//   previousScore: number;
//   newScore: number;
//   timestamp: number;
// };

export type ReputationState = UserReputation[];

// export type ReputationState = {
//   userRepuations: UserReputation[];
//   reputationChangeEvents: reputationChangeEvent[];
// };

// Might Add event log to attest the updation
// TODO: restrict only the owner , add an address for the user maybe

export class ReputationSystemTransport {
  public merkleTree: MerkleTree;
  public userRepuations: UserReputation[];
  // public reputationChangeEvents: reputationChangeEvent[];

  constructor(leaves: UserReputation[]) {
    this.merkleTree = this.createTree(leaves);
    this.userRepuations = leaves;
  }

  createTree(leaves: UserReputation[]) {
    const hashedLeaves = leaves.map((leaf) => {
      return solidityPackedKeccak256(
        [
          "uint256",
          "address",
          "uint256",
          "uint256",
          "uint256",
          "uint256",
          "uint256",
          "uint256",
          "uint256",
          "uint256",
          "uint256",
        ],
        [
          leaf.fid,
          leaf.address,
          leaf.engagementScore,
          leaf.castFrequencyScore,
          leaf.postQualityScore,
          leaf.reactionScore,
          leaf.longevityScore,
          leaf.onChainScore,
          leaf.followingScore,
          leaf.totalScore,
          leaf.lastUpdated,
        ]
      );
    });
    return new MerkleTree(hashedLeaves);
  }
}

export class ReputationSystem extends State<
  ReputationState,
  ReputationSystemTransport
> {
  constructor(state: ReputationState) {
    super(state);
  }

  transformer() {
    return {
      wrap: () => {
        return new ReputationSystemTransport(this.state);
      },
      unwrap: (wrappedState: ReputationSystemTransport): ReputationState => {
        return wrappedState.userRepuations;
      },
    };
  }

  getRootHash(): string {
    if (this.state.length === 0) {
      return ZeroHash;
    }
    return this.transformer().wrap().merkleTree.getHexRoot();
  }
}
