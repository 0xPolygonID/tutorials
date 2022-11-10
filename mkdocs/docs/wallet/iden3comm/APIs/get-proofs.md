# To Get Proofs: `getProofs` 
 
Generates the zk proofs requested by the `Iden3 message Entity` using the identity.
 
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
As seen above, the `getProofs()` function uses the `identifier` and `private key` strings (returned from the `createIdentity()` function),the `Iden3 Message Entity` as the input parameters and the challenge as optional for using it as message to sign with identity instead of the one provided by the `Iden3 Message Entity`.