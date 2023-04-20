# To Update Credentials: `updateClaim`
 
The credentials stored on the SDK can be updated using the credential's ID.

## Update Credentials

The `updateClaim()` method uses `claimId`, `issuer`, `did`, `state`, `expiration`, `type`, `date`, and `privateKey` as input parameters and updates the credential information. 
 
```dart
Future<ClaimEntity> updateClaim({
    required String claimId,
    String? issuer,
    required String did,
    ClaimState? state,
    String? expiration,
    String? type,
    Map<String, dynamic>? data,
    required String privateKey,
  });
```

where:

`claimId` is the credential's ID.

`issuer` is the `did` of the issuer.

`did` is the unique ID of the identity.

`state` is the credential's current state.

`expiration` is the date and time of the expiration of the credential in string format.

`type` is type of verifiable credential, for example: ***KYCAgeCredential***.

`data` is the information related to a verifiable credential.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity.  


This function returns the updated `ClaimEntity`.

> Note: Only the `ClaimEntity.info` is updated and `data` is subject to validation by the data layer. `ClaimEntity.info` is the information related to a verifiable credential that an Integrator receives from an Issuer. 





