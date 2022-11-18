<!--  # To Get Claims: `getClaims` 
 
After a claim is fetched from an Issuer and stored on the wallet sdk, an Integrator can retrieve this claim from the storage. This is done using `getClaims()` function.
 
```
Future<List<ClaimEntity>> getClaims(
      {List<FilterEntity>? filters,
      required String identifier,
      required String privateKey})
 
   {
      return _getClaimsUseCase.execute(
        param: GetClaimsParam(
         filters: filters,
         identifier: identifier,
         privateKey: privateKey,
      ));
   }
```
This function returns a list of `Claim Entities` based on some pre-defined criteria or filters.
 
## To Get Claims by Ids: `getClaimsByIds`
 
A list of claims stored on the SDK can be retrieved using claim ids. This is done using  the `getClaimsByIds()` function:
 
```
Future<List<ClaimEntity>> getClaimsByIds(
      {required List<String> claimIds,
      required String identifier,
      required String privateKey})
   {
       return _getClaimsUseCase.execute(
        param: GetClaimsParam(
      filters: [
        FilterEntity(
            operator: FilterOperator.inList, name: 'id', value: claimIds)
      ],
      identifier: identifier,
      privateKey: privateKey,
    ));
   }
```
-->