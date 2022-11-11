# To Get Identities: `getIdentities`
 
We can get a list of public information about all the identities stored on the SDK using `getIdentities()` function. This is the entry point for any Integrator.
 
```
Future<List<IdentityEntity>> getIdentities() async
 
{
   return _getIdentitiesUseCase.execute();
 
}
```
The `getIdentities()` function returns a list of `IdentityEntity` stored in the sdk.
 
**Note**: `async` keyword in the code above indicates that the function is asynchronous, i.e.it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually. 
 
The role of `getIdentities()` is to obtain a list of `IdentityEntity` stored on the SDK for an Integrator. The `identifier` String is the unique id of the identity.
 
So, in the nutshell, `getIdentities()` obtains a list of identities stored on the SDK for an Integrator.
