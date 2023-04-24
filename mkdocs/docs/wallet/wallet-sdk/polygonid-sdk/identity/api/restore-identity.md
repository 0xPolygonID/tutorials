# To Restore Identity: `restoreIdentity`
 
Restoring an Identity can be done using an identity backup and the secret used to create the identity.
 
## Restore an Identity
 
In the SDK, an identity is restored using `restoreIdentity()` function. It restores the `IdentityEntity` from a `privateKey`and `encryptedIdentityDb` (Encrypted Identity Database) associated with the identity. 
 
```dart
Future<PrivateIdentityEntity> restoreIdentity(
      {required String privateKey, required String blockchain, required String network, Map<int, String>? encryptedIdentityDbs});
 
{
   return _restoreIdentityUseCase.execute(
        param: RestoreIdentityParam(
      secret: secret,
      identityBackup: encryptedIdentityDb,
    ));
}
```
It returns an identity as a `PrivateIdentityEntity`and throws `IdentityException` if an error occurs.

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`blockchain` is the name of the blockchain associated with the identity. In our case, it is **Polygon**. 

`network` is the type of network (Mainnet or Testnet) associated with the identity. 

The `encryptedIdentityDbs` stores all the sensitive information related to the identity. It is a database where all the information associated with an identity is stored and secured by the identity (credentials, state, etc.). This information is stored in the SDK database and is accessible only by an Identity. The `encryptedIdentityDbs` is passed as a map of `key:value` pair where `key` is `profileNonce` and `value` is its corresponding `encryptedIdentityDb` value.


In short, the role of `restoreIdentity()` is to restore an `IdentityEntity` for an Integrator and then store it on the SDK. It returns the `PrivateIdentityEntity` object to the integrator to be able to operate with the identity. 

> Note: `profileNonce` functionality would be a part of the next release of the Wallet SDK.