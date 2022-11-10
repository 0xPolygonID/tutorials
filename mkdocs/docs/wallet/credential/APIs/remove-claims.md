# To Remove Claims: 'removeClaims'
 
The claims stored on the SDK can be removed locally (they remain on the Issuer unless removed by it) by the Integrator. This is done using `removeClaims()` function, which removes claims from a list of ids:
 
```
Future<void> removeClaims({required List<String> claimIds,
      required String identifier,
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
A single claim can also be removed based on its id using the `removeClaim()` function:
 
```
Future<void> removeClaim(
      {required String claimId,
      required String identifier,
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