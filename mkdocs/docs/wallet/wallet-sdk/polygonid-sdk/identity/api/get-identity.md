# To Get Identity: `getIdentity`
 
We can get an identity stored on the SDK using `getIdentity()` function. 
 
```
Future<IdentityEntity> getIdentity(
      {required String did, String? privateKey})

{
   return _getIdentityUseCase.execute(
        param:
            GetIdentityParam(identifier: identifier, privateKey: privateKey));
 
}
```
<!--
Does "identifier" need to be replaced with "did" in the above lines of code? -->

The `getIdentity()` function gets an `IdentityEntity` from an identifier. It returns an identity as a `PrivateIdentityEntity` or `IdentityEntity` if `privateKey` is ommited or invalid for that identifier. <!-- is above sentence correct? -->

`did` is the unique id of the identity. `privateKey` is the key that is used to access the sensitive information related to an identity. This key is also used to generate proofs using the credentials associated with that identity. 
 
The role of `getIdentity()` is to obtain an `IdentityEntity` stored on the SDK for an Integrator. The `identifier` string is the unique id of the identity. Identity `privateKey` is the key used to access all the sensitive info from the identity and also to realize operations like generating proofs using the claims associated to the identity.
 
This way, `getIdentity()` obtains an identity stored on the SDK for an Integrator.
