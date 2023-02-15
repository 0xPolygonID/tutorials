# To Update Identity State: `updateState`

This function updates the state of an identity. The current `state`, `did`, and `privateKey` are passed as the input parameters. 

`did` is the unique id of the identity. 

`privateKey` is the key used to access the sensitive information associated with an identity. This key is also used to generate proofs using the crednetials associated with the identity.

`state` is the ....
<!-- is it the current state of identity? -->

```
Future<void> updateState({ required String state, required String did, required privateKey})
```
<!-- Should this method be used or not; in the repository, it is all commented out -->