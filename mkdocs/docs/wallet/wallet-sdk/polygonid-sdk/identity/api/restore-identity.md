# To Restore Identity: `restoreIdentity`
 
Restoring an Identity can be done using an identity backup and the secret used to create the identity.
 
## Restore an Identity
 
In the SDK, an identity is restored using `restoreIdentity()` function. It restores the `IdentityEntity` from a secret and an encrypted backup database associated with the identity. 
 
```
Future<PrivateIdentityEntity> restoreIdentity(
      {required String secret, required String encryptedIdentityDb})
 
{
   return _restoreIdentityUseCase.execute(
        param: RestoreIdentityParam(
      secret: secret,
      identityBackup: encryptedIdentityDb,
    ));
}
```
The `restoreIdentity()` function restores and stores an `IdentityEntity` from a secret if replacing already existing one in the Polygon ID SDK. It returns an identity as a `PrivateIdentityEntity`.
Throws `IdentityException` if an error occurs.
The `encryptedIdentityDb` stores all the sensitive information related to the identity (credentials, state, etc.). This information is stored in the SDK database and is accessible only by an Identity. 

**Note**: Depending on the length requirement of the secret string, either an Identity is successfully restored or an error is displayed in form of an exception when the function is executed.

**Note**: Be aware the secret is internally converted to a 32 length bytes array
in order to be compatible with the SDK. The following rules will be applied:
 - If the byte array is not 32 length, it will be padded with 0s.
 - If the byte array is longer than 32, an exception will be thrown.
 
 
The role of `restoreIdentity()` is to restore an `IdentityEntity` for an Integrator and then storing it on the SDK. Hence `restoreIdentity()` restores and stores an identity on the SDK and returns the `PrivateIdentityEntity` object to the integrator to be able to operate with the identity. 

