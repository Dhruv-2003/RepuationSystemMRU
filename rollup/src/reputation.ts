import { MicroRollup } from "@stackr/sdk";
import { stackrConfig } from "../stackr.config.ts";

import { schemas } from "./actions.ts";
import { reputationStateMachine } from "./machines.stackr.ts";

type ReputationMachine = typeof reputationStateMachine;

const mru = await MicroRollup({
  config: stackrConfig,
  actions: [...Object.values(schemas)],
  isSandbox: true,
});

mru.stateMachines.add(reputationStateMachine);

await mru.init();

export { ReputationMachine, mru };
