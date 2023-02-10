# To Remove Claims: 'removeClaims'
 
The credentials stored on the SDK storage can be removed locally (they remain on the Issuer unless removed by it) by the Integrator. This is done using `removeClaims()` function, which removes credentials from the stoarge based on a list of `claimIds`:
 
```
Future<void> removeClaims({required List<String> claimIds,
      required String did,
      required String privateKey})
 
   {
       return _removeClaimsUseCase.execute(
        param: RemoveClaimsParam(
      claimIds: claimIds,
      identifier: identifier,
      privateKey: privateKey,
    ));
   }
```
<!-- does `identifier` need to be changed to `did` in above? -->
# To Remove a Claim: 'removeClaim'

A single credential can also be removed from the stoarge based on its `claimId` using the `removeClaim()` function:
 
```
Future<void> removeClaim(
      {required String claimId,
      required String did,
      required String privateKey})
 
   {
   return _removeClaimsUseCase.execute(
        param: RemoveClaimsParam(
      claimIds: [claimId],
      identifier: identifier,
      privateKey: privateKey,
    ));
   }
 
```
<!-- does `identifier` need to be changed to `did` in above? -->