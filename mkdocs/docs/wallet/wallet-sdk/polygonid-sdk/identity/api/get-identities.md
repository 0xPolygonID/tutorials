 # To Get Identities: `getIdentities`
 
We can get a list of public information about all the identities stored on the SDK using `getIdentities()` function. This is the entry point for any Integrator.
 
```
Future<List<IdentityEntity>> getIdentities() async
 
{
   return _getIdentitiesUseCase.execute();
 
}
```
The `getIdentities()` function returns a list of `IdentityEntity` stored in the sdk.

 
The role of `getIdentities()` is to obtain a list of `IdentityEntity` stored on the SDK for an Integrator. The `identifier` String is the unique id of the identity.
 
This way, `getIdentities()` obtains a list of identities stored on the SDK for an Integrator.


