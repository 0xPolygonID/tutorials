# To Prove: `prove`
 
The `prove()` function generates zero-knowledge proof using the valid claims requested from the Identity.


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
The `prove()` function generates a `JWZProof` that fulfills the proof query parameters with a valid identity and claims. This proof is shared by an Integrator with a Verifier. The `prove()` returns a `JWZProof` object so that the Integrator is able to verify the requested information (requested from Identity) with the Verifier. 
