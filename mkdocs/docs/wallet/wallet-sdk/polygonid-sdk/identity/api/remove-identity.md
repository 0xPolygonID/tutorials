# To Remove Identity: `removeIdentity`
 
In the SDK, an identity is removed using `removeIdentity()` function. 
 
```
Future<void> removeIdentity(
      {required String did, required String privateKey}) 
 
{
   return _removeIdentityUseCase.execute(
        param: RemoveIdentityParam(
            identifier: identifier, privateKey: privateKey));
 
}
```
<!--
Does "identifier" need to be replaced with "did" in the above lines of code? -->

The `removeIdentity()` function removes a previously created and stored Identity from the SDK, The did String and the privateKey are passed as parameters to the function.

`did` is the unique id of the identity. `privateKey` is the key that is used to access the sensitive information related to an identity. This key is also used to generate proofs using the credentials associated with that identity.
 
 
