# To Get Proofs: `getProofs` 
 
This function uses identity to generate the zero-knowledge proofs requested by the `Iden3Message Entity`.
 
```
Future<List<JWZProofEntity>> getProofs(
      {required Iden3MessageEntity message,
      required String did,
      required String privateKey,
      int? profileNonce,
      String? challenge}) {

    return _getProofsUseCase.execute(
        param: GetProofsParam(
      message: message,
      identifier: identifier,
      challenge: challenge,
      privateKey: privateKey,
    ));
  }
```
<!-- Does above code need to be replaced with its override : return _getProofsUseCase.execute(
        param: GetProofsParam(
      message: message,
      did: did,
      profileNonce: profileNonce ?? 0,
      privateKey: privateKey,
      challenge: challenge  -->

<!-- What is profileNonce and what does GetProofsParam do? -->    
As seen above, the `getProofs()` function uses the `did` and `privateKey` strings (returned from the `createIdentity()` function), the `Iden3MessageEntity`, and `profileNonce` as the input parameters. The `challenge` is an optional parameter and is used as a message to sign with identity instead of the one provided by the `Iden3MessageEntity`.

