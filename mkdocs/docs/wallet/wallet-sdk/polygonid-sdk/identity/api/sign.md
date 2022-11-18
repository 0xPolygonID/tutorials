 # To Sign Message: `sign`
 
In the SDK, a message can be signed using `createIdentity()` function. 
 
```
 Future<String> sign(
      {required String privateKey, required String message}) async
 
{
   return _signMessageUseCase.execute(
        param: SignMessageParam(privateKey, message));
 
}
```
The `sign()` function signs a message using identity's private key; the private key and the message are passed as parameters to the function and a signature String is returned.
 
**Note**: `async` keyword in the code above indicates that the function is asynchronous, i.e. it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually. 
 
The role of `sign()` is to sign a message string for an Integrator using identity's private key.
 
The `sign()` signs a message with the identity for an Integrator and returns a signature string. 

 
<div align="center">
<img src= "../../../../../../imgs/identity-wallet.png" align="center" width="500"/>
</div>
<br>



