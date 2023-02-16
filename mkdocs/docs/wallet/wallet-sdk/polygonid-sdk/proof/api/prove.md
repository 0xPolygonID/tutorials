# To Prove: `prove`
 
The `prove()` function generates zero-knowledge proof using the valid credentials requested from the Identity.

## Prove

The prove() method passes `did`, `profileNonce`, `claim`, `circuitData`, `request`, and `challenge` as input parameters. and generates a JWZ proof. 

```
Future<JWZProof> prove(
      {required String did,
      int? profileNonce,  
      required ClaimEntity claim,
      required CircuitDataEntity circuitData, required ProofScopeRequest request, String? privateKey, String? challenge});
   
   Future<Stream<DownloadInfo>> get initCircuitsDownloadAndGetInfoStream;

  Future<bool> isAlreadyDownloadedCircuitsFromServer(); 
  }
```

`did` is the unique id of the identity
`profileNonce` is the nonce of the profile of the identity
`claim` is Verifiable Credential 
`circuitData` are the circuits used for generating a proof
`request` is the proof request information that comes from the Verifier.
`challenge` is a message the Verifier requires an Integrator to sign with its identity so that an Integrator can verify its identity

`initCircuitsDownloadAndGetInfoStream()` and `isAlreadyDownloadedCircuitsFromServer()` methods above are used for downloading the circuit files as these circuits are too big to be stored on the SDK. 

The `prove()` function generates a `JWZProof` that fulfills the proof query parameters with valid identity and credentials. This proof is shared by an Integrator with a Verifier. The `prove()` returns a `JWZProof` object so that the Integrator is able to verify the requested information (requested from Identity) with the Verifier. 
