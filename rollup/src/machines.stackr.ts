import { StateMachine } from "@stackr/sdk/machine";
import genesisState from "../genesis-state.json";
import { transitions } from "./transitions";
import { ReputationSystem } from "./state";

const STATE_MACHINES = {
  Reputation: "reputation-system",
};

const reputationStateMachine = new StateMachine({
  id: STATE_MACHINES.Reputation,
  stateClass: ReputationSystem,
  initialState: genesisState.state,
  on: transitions,
});

export { STATE_MACHINES, reputationStateMachine };
