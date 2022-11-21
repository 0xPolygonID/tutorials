# To Get Proofs: `getProofs` 
 
This function uses identity to generate the zero-knowledge proofs requested by the `Iden3 message Entity`.
 
```
Future<List<ProofEntity>> getProofs(
      {required Iden3MessageEntity message,
      required String identifier,
      required String privateKey,
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
As seen above, the `getProofs()` function uses the `identifier` and `private key` strings (returned from the `createIdentity()` function), the `Iden3 Message Entity` as the input parameters. The `challenge` is an optional parameter and is used as a message to sign with identity instead of the one provided by the `Iden3 Message Entity`.

