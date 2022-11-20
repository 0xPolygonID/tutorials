# To Create Identity: `createIdentity`
 
Creating an Identity is the first step that an Integrator needs to follow for using Polygon ID SDK. An identity is created with a unique identifier that is used to:
 
- Authenticate an Integrator/User
- Authenticate with the Issuer for issuing claims (credentials) to the Identity. Then these claims are securely stored on the wallet.
 
## Create an Identity
 
In the SDK, an identity is created using `createIdentity()` function. This is the entry point for any Integrator.
 
```
Future<PrivateIdentityEntity> createIdentity({String? secret}) async
 
{
   return _createIdentityUseCase.execute(
        param: CreateIdentityParam(
      secret: secret,
    ));
}
```
The `createIdentity()` function creates and stores an `IdentityEntity` from a secret if it doesn't exist already on the Polygon ID SDK. If the secret is omitted or null, a random one will be used to create a new identity. It returns an identity as a `PrivateIdentityEntity`. It throws `IdentityException` if an error occurs.

**Note**: If the secret is null, the SDK creates a random one for the creation of the identity. Depending on the length requirement of the secret string, either an Identity is successfully created or an error is displayed in form of an exception when the function is executed.

**Note**: Please note that the secret is internally converted to a 32- length bytes array in order to be compatible with the SDK. The following rules will be applied:
 - If the byte array is not of length 32, it will be padded with 0s(zeroes).
 - If the byte array is longer than 32, an exception will be thrown.
 
**Note**: `async` keyword in the code above indicates that the function is asynchronous, i.e.it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually. 
 
The role of `createIdentity()` is to create an `IdentityEntity` for an Integrator and then store it on the SDK. The identifier and private key that this function generates are used by the Integrator every time it needs to interact with the Identity using the SDK. The `PrivateIdentityEntity` is created from the secret and represents an identity.
 
So, in the nutshell, `createIdentity()` creates and stores an identity on the SDK and returns the `PrivateIdentityEntity` object to the integrator to be able to operate with the identity. 


