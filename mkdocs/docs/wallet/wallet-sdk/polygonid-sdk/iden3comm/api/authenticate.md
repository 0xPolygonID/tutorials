# To Authenticate Identity with Issuer

An Integrator, in order to use the services of an Issuer, needs to authenticate itself with that Issuer. For this to happen, the Integrator needs to call the `authenticate()` method. 

## Authenticate Identity

The `authenticate()` method uses 
`Iden3MessageEntity`, `did`, `profileNonce`, `privateKey`, and an optional `pushToken` as input parameters.

```dart
Future<void> authenticate(
      {required Iden3MessageEntity message,
      required String did,
      int? profileNonce,
      required String privateKey,
      String? pushToken});

```
`Iden3MessageEntity` is the Iden3message retrieved from the `getIden3Message()` method
`did` is the unique ID of the identity.
`profileNonce` is the nonce of the profile of an identity. 
`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`pushToken` lets an Integrator receive the Iden3messages through push notification.

## Steps

1. Retrieve `CircuitDataEntity` from the loadCircuitFiles. `CircuitDataEntity` are the circuits used for generating an authentication proof that we share with the Issuer with JWZ.

2. Retrieve iden3message by scanning the QR code and transform it into a string message with `getiden3message()` method. 

3. Get authToken from authenticate() and authenticate Identity with authToken.


### Wallet-Issuer Interaction using Authentication
 
An Integrator, to interact with an Issuer, needs to authenticate with it first. 
 
1.  On the Polygon ID app (which is based on SDK), an Integrator clicks **Connect**.
 
      <div align="center">
      <img src= "../../../../../../imgs/polygonid-wallet-connect.png" align="center" width="300" border="1"/>
      </div>
      <br>
 
2.  The Issuer displays a QR code. The Integrator, using the app, scans this code.
 
      <div align="center">
      <img src= "../../../../../../imgs/qr-code-scan.png" align="center" width="300"/>
      </div>
      <br>
 
 
3.  With this, the `Authenticate()` function (with the identifier, private key and message as the inputs) is executed. The function authenticates the Identity and sends the authentication information (in the form of a big encoded message based on JWZ) to the Issuer.
 
      <div align="center">
      <img src= "../../../../../../imgs/jwz.png" align="center" width="700"/>
      </div>
      <br>
 
      >**Note**: Read more on JWZ [here](../jwz.md#jwz---json-web-zero-knowledge).

 
4. The Issuer receives the data sent by the Integrator and based on its correctness, authenticates or rejects the identity. The wallet analyzes this response from the Issuer.

