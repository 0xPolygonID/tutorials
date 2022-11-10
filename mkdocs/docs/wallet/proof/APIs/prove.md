# To Prove: `prove`
 
Generating a proof using the requested valid claims from the identity can be done using the `prove()` function. This is the entry point for any Integrator.
 
```
Future<JWZProof> prove(
      {required String challenge,
      required String signatureString,
      required ClaimEntity authClaim,
      required CircuitDataEntity circuitData,
      required List<String> publicKey,
      required ProofQueryParamEntity queryParam}) {
    return _proveUseCase.execute(
        param: GenerateProofParam(challenge, signatureString, authClaim,
            circuitData, publicKey, queryParam));
  }
```
The `prove()` function generates an `JWZProof` that fulfills the proof query parameters with a valid identity and claims. It returns an zk proof as a `JWZProof`.
 
**Note**: `async` keyword in the code above indicates that the function is asynchronous, i.e.it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually. 
 
The role of `prove()` is to generate an `JWZProof` for an Integrator to be shared with the Verifier.
 
So, in the nutshell, `prove()` generates a zk proof and returns the `JWZProof` object to the integrator to be able to verify requester info from the identity with the verifier using zero-knowledge. 