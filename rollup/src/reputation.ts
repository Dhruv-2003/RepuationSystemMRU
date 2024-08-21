import { MicroRollup } from "@stackr/sdk";
import { stackrConfig } from "../stackr.config.ts";

import { schemas } from "./actions.ts";
import { reputationStateMachine } from "./machines.stackr.ts";

type ReputationMachine = typeof reputationStateMachine;

const mru = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [schemas.createRepScore, schemas.updateRepScore],
  stateMachines: [reputationStateMachine],
  stfSchemaMap: {
    createRepScore: schemas.createRepScore,
    updateRepScore: schemas.updateRepScore,
  },
});

await mru.init();

export { ReputationMachine, mru };
