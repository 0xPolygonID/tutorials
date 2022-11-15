# To Remove Identity: `removeIdentity`
 
In the SDK, an identity is removed using `removeIdentity()` function. This is the entry point for any Integrator.
 
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
 
**Note**: `async` keyword in the code above indicates that the function is asynchronous, i.e.it might need to wait for an external computation to finish before it can show the result. For this reason, the `async` is used with `future` to make sure that the result will be executed eventually. 
 
The role of `removeIdentity()` is to remove an identity previously stored on the SDk for an Integrator.
 
Hence `removeIdentity()` removes an identity for an Integrator. 
