 # To Get Identities: `getIdentities`
 
We can get a list of public information about all the identities stored on the SDK using `getIdentities()` function. 

## Get a List of Identities
 
```
Future<List<IdentityEntity>> getIdentities();
 
{
   return _getIdentitiesUseCase.execute();
 
}
```
This method returns a list of `IdentityEntity` associated with the identities stored on the SDK. If an error occurs while retrieving the list of `IdentityEntity`, it throws `IdentityException`.
 



