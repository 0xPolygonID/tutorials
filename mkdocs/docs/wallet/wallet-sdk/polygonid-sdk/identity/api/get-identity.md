# To Get Identity: `getIdentity`
 
We can get an identity stored on the SDK using `getIdentity()` function. 
 
```
Future<IdentityEntity> getIdentity(
      {required String identifier, String? privateKey}) async
 
{
   return _getIdentityUseCase.execute(
        param:
            GetIdentityParam(identifier: identifier, privateKey: privateKey));
 
}
```
The `getIdentity()` function gets an `IdentityEntity` from an identifier. If the private key is null or invalid, the function returns It returns an identity as a `PrivateIdentityEntity` or `IdentityEntity` if `privateKey` is ommited or invalid for that identifier.
 
 
The role of `getIdentity()` is to obtain an `IdentityEntity` stored on the SDK for an Integrator. The `identifier` string is the unique id of the identity. Identity `privateKey` is the key used to access all the sensitive info from the identity and also to realize operations like generating proofs using the claims associated to the identity.
 
This way, `getIdentity()` obtains an identity stored on the SDK for an Integrator.
