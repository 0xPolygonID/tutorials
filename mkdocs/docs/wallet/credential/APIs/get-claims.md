# To Get Claims: `getClaims` 
 
After a claim is fetched from an Issuer and stored on the wallet sdk, an Integrator can retrieve this claim from the storage. This is done using `getClaims()` function.
 
```
Future<List<ClaimEntity>> getClaims({List<FilterEntity>? filters})
 
   {
       return _getClaimsUseCase.execute(param: filters);
 
   }
```
This function returns a list of `Claim Entities` based on some pre-defined criteria or filters.
 
## To Get Claims by Ids: `getClaimsByIds`
 
A list of claims stored on the SDK can be retrieved using claim ids. This is done using  the `getClaimsByIds()` function:
 
```
Future<List<ClaimEntity>> getClaimsByIds({required List<String> ids})
 
   {
       return _getClaimsUseCase.execute(param: [
       FilterEntity(operator: FilterOperator.inList, name: 'id', value: ids)
   ]);
 
   }
```