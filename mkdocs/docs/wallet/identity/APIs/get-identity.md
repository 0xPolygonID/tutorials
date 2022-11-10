# To Get Identity: `getIdentity`
 
We can get an identity stored in the SDK using `getIdentity()` function. This is the entry point for any Integrator.
 
```
Future<IdentityEntity> getIdentity(
      {required String identifier, String? privateKey}) async
 
{
   return _getIdentityUseCase.execute(
        param:
            GetIdentityParam(identifier: identifier, privateKey: privateKey));
 
}
```
The `getIdentity()` function Gets an `IdentityEntity` from an identifier. It returns an identity as a `PrivateIdentityEntity` or `IdentityEntity` if `privateKey` is ommited or invalid for that identifier.
 
**Note**: `async` keyword in the code above indicates that the function is asynchronous, i.e.it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually. 
 
The role of `getIdentity()` is to obtain an `IdentityEntity` stored on the SDK for an Integrator. The `identifier` String is the unique id of the identity. Identity `privateKey` is the key used to access all the sensitive info from the identity and also to realize operations like generating proofs using the claims associated to the identity.
 
So, in the nutshell, `getIdentity()` obtains an identity stored on the SDK for an Integrator.