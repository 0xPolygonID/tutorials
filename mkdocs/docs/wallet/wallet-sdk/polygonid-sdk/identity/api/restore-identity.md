# To Restore Identity: `restoreIdentity`
 
Restoring an Identity can be done using an identity backup and the secret used to create the identity.
 
## Restore an Identity
 
In the SDK, an identity is restored using `restoreIdentity()` function. This is the entry point for any Integrator.
 
```
Future<PrivateIdentityEntity> restoreIdentity(
      {required String secret, required String encryptedIdentityDb}) async
 
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

**Note**: Depending on the length requirement of the secret string, either an Identity is successfully restored or an error is displayed in form of an exception when the function is executed.

**Note**: Be aware the secret is internally converted to a 32 length bytes array
in order to be compatible with the SDK. The following rules will be applied:
 - If the byte array is not 32 length, it will be padded with 0s.
 - If the byte array is longer than 32, an exception will be thrown.
 
**Note**: `async` keyword in the code above indicates that the function is asynchronous, i.e.it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually. 
 
The role of `restoreIdentity()` is to restore an `IdentityEntity` for an Integrator and then storing it on the SDK. The identifier and private key that this function generates are used by the Integrator every time it needs to interact with the Identity using the SDK. The `PrivateIdentityEntity` is restored from the secret and represents an identity.
 
Hence `restoreIdentity()` restores and stores an identity on the SDK and returns the `PrivateIdentityEntity` object to the integrator to be able to operate with the identity. 