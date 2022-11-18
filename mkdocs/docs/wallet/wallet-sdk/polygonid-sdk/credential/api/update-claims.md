# To Update Claim: `updateClaim`
 
The claims stored on the SDK can be updated using its claim Id. This is done using the `updateClaim()` function:
 
```
Future<ClaimEntity> updateClaim({
    required String claimId,
    String? issuer,
    required String identifier,
    ClaimState? state,
    String? expiration,
    String? type,
    Map<String, dynamic>? data,
    required String privateKey,
  });
```
This function returns the updated `Claim Entity`.

