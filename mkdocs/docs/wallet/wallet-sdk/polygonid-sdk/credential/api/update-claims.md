# To Update Claim: `updateClaim`
 
The credentials stored on the SDK can be updated using its `claimId`. This is done using the `updateClaim()` function:
 
```
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
<!-- does `identifier` need to be changed to `did` in above? -->
This function returns the updated `Claim Entity`.

> Note: Only the [ClaimEntity.info] is updated and [data] is subject to validation by the data layer. 

<!-- what are [ClaimEntity.info] and [data] in the above description? -->



