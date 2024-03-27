import { StateMachine } from "@stackr/sdk/machine";
import genesisState from "../genesis-state.json";
import { reducers } from "./reducers";
import { ReputationSystem } from "./state";

const STATE_MACHINES = {
  Reputation: "reputation-system",
};

const reputationStateMachine = new StateMachine({
  id: STATE_MACHINES.Reputation,
  state: new ReputationSystem(genesisState.state),
  on: reducers,
});

export { STATE_MACHINES, reputationStateMachine };
