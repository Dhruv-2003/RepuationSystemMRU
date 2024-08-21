export const userFidQuery = `query($handle: Identity) {
  Socials(
    input: {
      filter: {dappName: {_eq: farcaster}, identity: {_eq: $handle}}, 
    blockchain: ethereum
  }
  ) {
    Social {
      id
      socialCapital {
        socialCapitalScoreRaw
        socialCapitalScore
      }
      chainId
      blockchain
      dappName
      dappSlug
      dappVersion
      userId
      userAddress
      userCreatedAtBlockTimestamp
      userCreatedAtBlockNumber
      userLastUpdatedAtBlockTimestamp
      userLastUpdatedAtBlockNumber
      userHomeURL
      userRecoveryAddress
      userAssociatedAddresses
      profileBio
      profileDisplayName
      profileImage
      profileUrl
      profileName
      profileTokenId
      profileTokenAddress
      profileCreatedAtBlockTimestamp
      profileCreatedAtBlockNumber
      profileLastUpdatedAtBlockTimestamp
      profileLastUpdatedAtBlockNumber
      profileTokenUri
      isDefault
      identity
      followerCount
      fnames
      followingCount
    }
  }
  FarcasterCasts(
    input: {
      filter: {
        castedBy: {_eq: "fc_fname:$handle"}
      },
      blockchain: ALL,
      limit: 100
    }
  ) {
    Cast {
      castedAtTimestamp
      url
      text
      numberOfRecasts
      numberOfLikes
    }
  }
  FarcasterLikes: FarcasterReactions(
    input: {
      filter: {
        criteria: liked,
        reactedBy: {_eq: "fc_fname:$handle"}
      },
      blockchain: ALL,
      limit: 100
    }
  ) {
    Reaction {
      cast {
        castedAtTimestamp
        embeds
        url
        text
        numberOfRecasts
        numberOfLikes
      }
    }
  }
  FarcasterRecast: FarcasterReactions(
    input: {
      filter: {
        criteria: recasted,
        reactedBy: {_eq: "fc_fname:$handle"}
      },
      blockchain: ALL,
      limit: 100
    }
  ) {
    Reaction {
      cast {
        castedAtTimestamp
        embeds
        url
        text
        numberOfRecasts
        numberOfLikes
      }
    }
  }
}`;

export const userOnchainQuery = `query ($address: Identity!) {
  Wallet(input: {identity: $address, blockchain: ethereum}) {
    ethereumBalance: tokenBalances(input: {blockchain: ethereum, limit: 25}) {
      tokenAddress
      tokenId
      tokenType
      formattedAmount
      chainId
    }
    baseBalance: tokenBalances(input: {blockchain: base, limit: 25}) {
      tokenAddress
      tokenId
      tokenType
      formattedAmount
      chainId
    }
    ethereumTransfer: tokenTransfers(
      input: {blockchain: ethereum, limit: 25, filter: {_nor: {from: {_eq: "0x0000000000000000000000000000000000000000"}, to: {_eq: "0x0000000000000000000000000000000000000000"}}}}
    ) {
      tokenAddress
      tokenId
      tokenType
      tokenIds
      type
      formattedAmount
      blockTimestamp
    }
    baseTransfer: tokenTransfers(
      input: {blockchain: base, limit: 25, filter: {_nor: {from: {_eq: "0x0000000000000000000000000000000000000000"}, to: {_eq: "0x0000000000000000000000000000000000000000"}}}}
    ) {
      tokenAddress
      tokenId
      tokenType
      tokenIds
      type
      formattedAmount
      blockTimestamp
    }
    poaps(input: {blockchain: ALL, limit: 25, filter: {}}) {
      tokenId
      eventId
    }
    xmtp {
      isXMTPEnabled
    }
    domains(input: { limit: 1 }) {
      name
      isPrimary
    }
  }
}`;
