# Create Identity

Creating an Identity is the first step that an Integrator needs to do if it intends to use the Polygon ID sdk. An identity is created with a unique identifier that is used to:

- Authenticate an Integrator
- Authenticate with the Issuer for issuing claims (credentials) to the Integrator. These claims are then stored on wallet sdk. 

**Note**: Currently, PolygonID SDK supports a single identity system that can handle multiple credentials for an Integrator. In the near future, the sdk will support multiple identities for a single Integrator. 

## Create an Identity

In the SDK, an identity is created using `createIdentity()` function. This is the entry point for any Integrator. 

```
Future<String> createIdentity({String privateKey}) async 

{
    return _createIdentityUseCase.execute(param: privateKey);

}

```
The `createIdentity()` function creates and stores an Identity; the private key is passed as a parameter to the function and an identifier String is returned. 

**Note**: If the Private Key is null, the sdk creates a random one for creation of the identity. Depending on the length reqyuiremnet of the Private Key string, either an Identity is successfully created or an error is displayed in form of exception when the function is exceuted. 

**Note**: `async` keyword in the code above indicates that the function is asyncronous, i.e.it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually.  

The role of `createIdentity()` is to create an `IdentityEntity` for an Integrator by creating a wallet, and then store it on the SDK. The identifier String that this function generates  is used by the Integrator every time it needs to interact with the SDK. The `IdentityEntity` is created from the private key and represents and identity. 

So, in the nutshell, `createIdentity()` creates an identity for an Integrator and returns an identifier that is stored on the wallet sdk. 