# To Create Identity: `createIdentity`
 
Creating an Identity is the first step that an Integrator needs to follow for using Polygon ID SDK. An identity is created with a unique identifier that is used to:
 
- Authenticate an Integrator/User
- Authenticate with the Issuer for issuing credentials to the Identity. Then these credentials are securely stored on the wallet.
 
## Create an Identity
 
In the SDK, an identity is created using `createIdentity()` function. This is the entry point for any Integrator.
 
```
Future<PrivateIdentityEntity> createIdentity({String? secret, required blockchain, required network}); 
 
{
    return _createIdentityUseCase.execute(
        param: CreateIdentityParam(
      secret: secret,
    ));
}
```
The `createIdentity()` function creates and stores an `IdentityEntity` from a secret if it doesn't exist already on the Polygon ID SDK. If the secret is omitted or null, a random one will be used to create a new identity. It returns an identity as a `PrivateIdentityEntity`. It throws `IdentityException` if an error occurs.

A `secret` is a random 32-bytes length array. An Integrator can create this secret in the way he finds it better suited for his/her application. It could be an encrypted mnemonic seed phrase generated with BIP39 (a way of creating mnemonic codes) or an Ethereum private key. If, however, no secret is passed as the input parameter, a random one can be generated. Identity's private key is derived using this secret; this secret is then hashed using keccak 256 to create identity's private key. This private key is then used to sign the signature of a message.  

**Note**: If the secret is null or is omitted, the SDK creates a random one for the creation of the new identity. Depending on the length requirement of the secret string, either an Identity is successfully created or an error is displayed in form of an exception when the function is executed.

Please note that the secret is internally converted to a 32- length bytes array in order to be compatible with the SDK. The following rules will be applied:
 - If the byte array is not of length 32, it will be padded with 0s(zeroes).
 - If the byte array is longer than 32, an exception will be thrown.
 
`blockchain` is the name of the blockchain associated with the identity. In our case, it is **Polygon**. 

`network` is the type of the network (Mainnet or Testnet) associated with the identity. 
 
The role of `createIdentity()` is to create an `PrivateIdentityEntity` for an Integrator and then store it on the SDK. The identifier and private key that this function generates are used by the Integrator every time it needs to interact with the Identity using the SDK. The `PrivateIdentityEntity` is created from the secret and represents an identity.
 
So, in the nutshell, `createIdentity()` creates and stores an identity on the SDK and returns the `PrivateIdentityEntity` object to the integrator to be able to operate with the identity. 


