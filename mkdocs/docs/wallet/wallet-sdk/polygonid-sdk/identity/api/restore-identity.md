# To Restore Identity: `restoreIdentity`
 
Restoring an Identity can be done using an identity backup and the secret used to create the identity.
 
## Restore an Identity
 
In the SDK, an identity is restored using `restoreIdentity()` function. It restores the `IdentityEntity` from a `privateKey`and `encryptedIdentityDb` (Encrypted Identity Database) associated with the identity. 
 
```
Future<PrivateIdentityEntity> restoreIdentity(
      {required String privateKey, required String /blockchain, required String network, Map<int, String>? encryptedIdentityDbs});
 
{
   return _restoreIdentityUseCase.execute(
        param: RestoreIdentityParam(
      secret: secret,
      identityBackup: encryptedIdentityDb,
    ));
}
```
It returns an identity as a `PrivateIdentityEntity`.
Throws `IdentityException` if an error occurs.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`blockchain` is the name of the blockchain associated with the identity. In our case, it is **Polygon**. 

`network` is the type of the network (Mainnet or Testnet) associated with the identity. 

The `encryptedIdentityDbs` stores all the sensitive information related to the identity (credentials, state, etc.). This information is stored in the SDK database and is accessible only by an Identity. 


In short, the role of `restoreIdentity()` is to restore an `IdentityEntity` for an Integrator and then store it on the SDK. It returns the `PrivateIdentityEntity` object to the integrator to be able to operate with the identity. 

