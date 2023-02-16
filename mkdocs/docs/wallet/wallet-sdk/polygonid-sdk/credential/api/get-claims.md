 # To Get Credentials: `getClaims` 

After a credential is fetched from an Issuer and stored on the wallet SDK, an Integrator can retrieve this credential from the storage. This is done using `getClaims()` function.
 
## Get Credentials

```
Future<List<ClaimEntity>> getClaims(
      {List<FilterEntity>? filters,
      required String did,
      required String privateKey});
 
```

This function returns a list of `ClaimEntity` based on some pre-defined criteria or filters. The function uses `privateKey` and `did` as input parameters.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`did` is the unique id of the identity. 
 
# Get Credentials by Ids: `getClaimsByIds`
 
The `getClaimsByIds()` function retrieves a list of credentials stored on the SDK using a list of credential ids.

## Get Credentials by Ids
 
```
Future<List<ClaimEntity>> getClaimsByIds(
      {required List<String> claimIds,
      required String did,
      required String privateKey});

```

The method, based on the credential ids, retrieves a list of `ClaimEntity` from the storage. 

> Note: An Issuer assigns ids to the credentials. The wallet, after fetching these credentials, stores them on the SDK. 