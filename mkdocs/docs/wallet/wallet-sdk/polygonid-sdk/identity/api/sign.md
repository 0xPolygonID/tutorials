# To Sign Message: `sign`


In the SDK, a message can be signed using `sign()` function. 
 
```
 Future<String> sign(
      {required String privateKey, required String message})
 
{
   return _signMessageUseCase.execute(
        param: SignMessageParam(privateKey, message));
 
}
```
<!-- Are above lines of code correct? -->



The `sign()` function signs a message using identity's private key; the `privateKey` and the `message` are passed as the input parameters to the function and a signature string is returned. Thus the role of `sign()` is to sign a message string for an Integrator using identity's `privateKey`.
 


<div align="center">
<img src= "../../../../../../imgs/identity-wallet.png" align="center" width="500"/>
</div>
<br>

<!-- Is the following explanation correct? -->

**Note**: When an Integrator scans a QR code, an iden3 message is created. This message has a `challenge` field from which the String `message` (used as input parameter) is generated. The `message` is then used to sign with the identity to generate a signature string.


**Note**: The Baby Jubjub private key is used to sign the message mentioned above. Read more about Baby Jubjub Elliptic Curve [here](https://eips.ethereum.org/EIPS/eip-2494).

