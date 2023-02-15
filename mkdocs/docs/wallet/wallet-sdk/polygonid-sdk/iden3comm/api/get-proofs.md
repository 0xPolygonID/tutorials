# To Get Proofs: `getProofs` 
 
This function uses identity to generate the zero-knowledge proofs requested by the `Iden3Message Entity`.
 
## Get Proof

The `getProofs()` method uses `Iden3MessageEntity`, `did`, `profileNonce`, and `privateKey` as the input parameters and returns a `JWZProofEntity`.

```
Future<List<JWZProofEntity>> getProofs(
      {required Iden3MessageEntity message,
      required String did,
      int? profileNonce,
      required String privateKey}); 
```
   
`Iden3MessageEntity`: Returned from `getIden3Message` method after a user scans the QR code on Issuer/Verifier website. 

`profileNonce` is the nonce of the profile of an identity.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`did` is the unique id of the identity. 

`JWZProofEntity`is the JWZ message that the Integrator sends to the Issuer/Verifier after scanning the QR code.

> Note: The iden3comm's `getProofs` method retrieves the proofs from the proof request of the Verifier. The actual proof is created by the `prove()` method, which you will read about in the ***Proof*** section of the APIs. 
For this to happen, iden3comm makes a call to `prove`().

