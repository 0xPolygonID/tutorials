# Overview

State Transition means moving from one identity state to another. An [Identity State Transition](https://docs.iden3.io/protocol/spec/#identity-state-transition-function) happens when an identity adds a new claim, updates a claim or revokes a claim.

The State Transtion is executed inside a circuit. The `stateTransition` [circuit](../../circuits/main-circuits.md) encodes a set of rules that must be respected to complete the state transition such as:

- The prover is the owner of the identity (checked using a digital signature by the private key corresponding the `authClaim`)
- The `authClaim` hasn't been revoked.
 
The identity state gets updated by calling the `transitState` [function](https://github.com/iden3/contracts/blob/master/contracts/State.sol#L87.). To call this function, it is necessary to pass in the proof generated previously.

On verification, the `identities` mapping gets updated associating the `ID` with a new `IdS`.

This tutorial is split in 3 parts:

1. [Modify Identity State](./new-identity-state.md)
2. [Generate State Transition Proof](./state-transition-proof.md)
3. [Verify the proof on-chain](./on-chain-state-transition.md)



