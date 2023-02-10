# To Authenticate Identity with Issuer

An Integrator, in order to use the services of an Issuer, needs to authenticate itself with that Issuer. For this to happen, the Integrator needs to call the `authenticate()` function. 


```
Future<void> authenticate(
      {required Iden3MessageEntity message,
      required String did,
      int? profileNonce,
      required String privateKey,
      String? pushToken}) {
    return _authenticateUseCase.execute(
        param: AuthenticateParam(
      message: message,
      identifier: identifier,
      privateKey: privateKey,
      pushToken: pushToken,
    ));
  }

```
 <!-- Does bove code need to be replaced with the override: 
 return _authenticateUseCase.execute(
        param: AuthenticateParam(
      message: message,
      did: did,
      profileNonce: profileNonce ?? 0,
      privateKey: privateKey,
      pushToken: pushToken,
    ) 
Also, what is AuthenticateParam?   
    -->

As seen above, the `authenticate()` function uses the `sid` string, the `privateKey` string (returned from the `createIdentity()` function), and the `Iden3MessageEntity`, `profileNonce` as the input parameters. The `pushToken` is an optional parameter; it lets an Integrator receive the iden3 messages through push notification.
<!--
  /// get iden3message from qr code and transform it as string "message" #3 through getIden3Message(message)
  /// get CircuitDataEntity #1 by loadCircuitFiles #2
  /// get authToken #4
  /// auth with token #5 TODO rewrite as soon as development is completed

In above commments from the repository, 
a. What is CircuitDataEntity and what are loadCircuitFiles?
b. Does iden3message create authtoken?
c. Please explain how to authenticate with token.
d. Do steps need to be written in the order numbering that you mentioned in the comments above?
 --> 


### Wallet-Issuer Interaction using Authentication
 
An Integrator, to interact with an Issuer, needs to authenticate with it first. 
 
1.  On the Polygon ID app (which is based on SDK), an Integrator clicks **Connect**.
 
      <div align="center">
      <img src= "../../../../../../imgs/polygonid-wallet-connect.png" align="center" width="150" border="1"/>
      </div>
      <br>
 
2.  The Issuer displays a QR code. The Integrator, using the app, scans this code.
 
      <div align="center">
      <img src= "../../../../../../imgs/qr-code-scan.png" align="center" width="150"/>
      </div>
      <br>
 
 
3.  With this, the `Authenticate()` function (with the identifier, private key and message as the inputs) is executed. The function authenticates the Identity and sends the authentication information (in the form of a big encoded message based on JWZ) to the Issuer.
 
      <div align="center">
      <img src= "../../../../../../imgs/jwz.png" align="center" width="250"/>
      </div>
      <br>
 
      **Note**: Read more on JWZ [here](../jwz.md#jwz---json-web-zero-knowledge).

 
4. The Issuer receives the data sent by the Integrator and based on its correctness, authenticates or rejects the identity. The wallet analyzes this response from the Issuer.

