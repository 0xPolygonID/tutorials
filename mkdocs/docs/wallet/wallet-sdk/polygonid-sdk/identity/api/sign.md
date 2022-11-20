 # To Sign Message: `sign`
 
In the SDK, a message can be signed using `sign()` function. 
 
```
 Future<String> sign(
      {required String privateKey, required String message}) async
 
{
   return _signMessageUseCase.execute(
        param: SignMessageParam(privateKey, message));
 
}
```
The `sign()` function signs a message using identity's private key; the private key and the message are passed as parameters to the function and a signature String is returned.
 

 
The role of `sign()` is to sign a message string for an Integrator using identity's private key.
 
The `sign()` signs a message with the identity for an Integrator and returns a signature string. 

 
<div align="center">
<img src= "../../../../../../imgs/identity-wallet.png" align="center" width="500"/>
</div>
<br>



