# To Remove Identity: `removeIdentity`
 
In the SDK, an identity is removed using `removeIdentity()` function. 
 
```
Future<void> removeIdentity(
      {required String identifier, required String privateKey}) async
 
{
   return _removeIdentityUseCase.execute(
        param: RemoveIdentityParam(
            identifier: identifier, privateKey: privateKey));
 
}
```
The `removeIdentity()` function removes a previously-created and stored Identity from the SDK, The identifier String and the private key are passed as parameters to the function.
 
The role of `removeIdentity()` is to remove an identity previously stored on the SDk for an Integrator.
 
Hence `removeIdentity()` removes an identity for an Integrator. 
