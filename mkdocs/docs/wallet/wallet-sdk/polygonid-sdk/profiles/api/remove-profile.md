# To Remove Profile: `removeProfile`

This removes a profile from the identity derived from the private key and stored in the Polygon ID SDK.

## Remove Profile
```dart
  Future<void> removeProfile(
      {required String genesisDid,
      required String privateKey,
      required BigInt profileNonce});
```

`genesisDid` is the unique ID of the identity whose `profileNonce` is 0.

`privateKey` is the key used to access all the sensitive info from the identity and also to realize operations like generating proofs.

The `profileNonce` is the nonce of the profile used from the identity to obtain the DID identifier. The value must be greater than 0 and less than 2^248.

The profile will be removed using the current env set with `PolygonIdSdk.setEnv`.