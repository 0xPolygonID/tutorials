# To Remove Claims: 'removeClaims'
 
The credentials stored on the SDK storage can be removed locally (they remain on the Issuer unless removed by it) by the Integrator. 

## Remove Credentials

The `removeClaims()` method, which removes credentials from the storage based on a list of `claimIds`:
 
```
Future<void> removeClaims({required List<String> claimIds,
      required String did,
      required String privateKey});
 
```
`claimids` are the ids of the credentials. 

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`did` is the unique id of the identity. 

# To Remove a Credential: 'removeClaim'

A single credential can also be removed from the storage based on its credential id. 

## Remove a Single Credential

The `removeClaim()` method, just like `removeClaims()` method, removes a single credential based on credential's id. 
 
```
Future<void> removeClaim(
      {required String claimId,
      required String did,
      required String privateKey});
 
```
