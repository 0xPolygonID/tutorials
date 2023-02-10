 # To Get Claims: `getClaims` 

After a credential is fetched from an Issuer and stored on the wallet SDK, an Integrator can retrieve this credential from the storage. This is done using `getClaims()` function.
 
```
Future<List<ClaimEntity>> getClaims(
      {List<FilterEntity>? filters,
      required String did,
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
<!-- does `identifier` need to be changed to `did` in above? -->


This function returns a list of `Claim Entity` based on some pre-defined criteria or filters.
 
## To Get Claims by Ids: `getClaimsByIds`
 
The `getClaimsByIds()` function retreives a list of credentials stored on the SDK  using credential ids.
 
```
Future<List<ClaimEntity>> getClaimsByIds(
      {required List<String> claimIds,
      required String did,
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
<!-- does `identifier` need to be changed to `did` in above? -->

The function, based on the ids, retrieves a list of `ClaimEntity` from the storage. 

> Note: An Issuer assigns `claimIds` to the credentials. The wallet, after fetching these credentials, stores them on the SDK. 