 # To Get Identities: `getIdentities`
 
We can get a list of public information about all the identities stored on the SDK using `getIdentities()` function. 
 
```
Future<List<IdentityEntity>> getIdentities()
 
{
   return _getIdentitiesUseCase.execute();
 
}
```
The `getIdentities()` function returns a list of `IdentityEntity` stored in the sdk.

 
The role of `getIdentities()` is to return a list of `IdentityEntity` associated with the identities stored on the SDK. If an error occurs while retrieving the list of `IdentityEntity`, it throws `IdentityException`.
 



