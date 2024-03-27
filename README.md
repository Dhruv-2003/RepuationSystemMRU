# VeriCast: Empowering Trust and Engagement on Farcaster through a Reputation Engine

## Overview

VeriCast is a reputation system developed for the Farcaster platform to address the prevalent issues of fake accounts, spam/bots, and lack of transparency. By introducing a transparent and verifiable reputation system, VeriCast aims to enhance user experience and foster trust within the Farcaster ecosystem.

![WhatsApp Mar ](https://github.com/kushagrasarathe/frameworks/assets/76868364/713dd6bb-fa26-43ec-ba54-0ee17146c551)


## Problem

Social media platforms often suffer from various challenges such as fake accounts, spam, and lack of transparency, resulting in diminished user experience. VeriCast addresses these issues by introducing a reputation system that tracks, analyzes, and rewards user engagement and authenticity.

## Solution

VeriCast utilizes data and analytics from multiple providers such as Open Rank APIs by Karma Labs, Neynar, and Airstack to gather data and rank users accordingly. By tracking user activities, analyzing engagement levels, and rewarding genuine interactions, VeriCast makes social media more enjoyable, engaging, and trustworthy for everyone in the Farcaster community.

## How it Works

VeriCast employs different APIs and services to fetch user data and calculate reputation scores. It utilizes:

- **OpenRank API by Karma Labs**: Fetches users' global ranking for engagements and followings, contributing to the User Network points and engagement points.
- **Neynar**: Retrieves users' casts and reactions, calculating their engagement with other posts and casting frequency score.
- **Airstack**: Utilizes Onchain graph to calculate users' onchain activity score and fetches Farcaster data such as profile creation date to determine the age and longevity of the profile.
- **Frames.js**: Dynamically generates Farcaster frames related to the project, including the reputation score frame based on various data points fetched from APIs.

### Reputation Score Calculation Schema

1. Post Frequency (150 points)
2. Activity - Engagement with Others' Posts (100 points)
3. Engagement on User's Posts (200 points)
4. Network Size (100 points)
5. Longevity (100 points)
6. Frame/On-Chain Interaction (200 points)
7. Post Quality (50 points)
8. Quests (100 points)

## Future Enhancements

- Integration of quest frames to allow users to earn additional points by completing streaks and participating in quests.
- Implementation of the reputation algorithm within Micro Rollup to ensure trustlessness and verifiability.

## Demo 
You can see the live demo of [Vericast here](https://debugger.framesjs.org/?url=https://farcaster-reputation-engine.vercel.app/frames/dwr.eth)

## Presentation

For a detailed overview of VeriCast, please refer to the [presentation](https://www.canva.com/design/DAGAaEMbAoU/gBbXimPUuScoQ1Nxxzr9AQ/edit?utm_content=DAGAaEMbAoU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

## Contributors

- [Dhruv Agarwal](https://bento.me/0xdhruv)
- [Kushagra Sarathe](https://bento.me/kushagrasarathe)
