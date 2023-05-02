# To Add Profile: `addProfile`

This method adds a profile if there isn't already one associated with the identity derived from the private key and stored in the Polygon ID Sdk.

## Add Profile
```dart
  Future<void> addProfile(
      {required String genesisDid,
      required String privateKey,
      required BigInt profileNonce});
```

``genesisDid`` is the unique ID of the identity whose `profileNonce` is 0.

The `privateKey` is the key used to access all the sensitive info from the identity and also to realize operations like generating proofs

The `profileNonce` is the nonce of the profile used from the identity to obtain the DID identifier. The value must be greater than 0 and less than 2^248.

The profile will be added using the current env set with `PolygonIdSdk.setEnv`.