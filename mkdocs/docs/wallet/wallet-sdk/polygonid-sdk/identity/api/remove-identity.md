# To Remove Identity: `removeIdentity`
 
In the SDK, an identity is removed using `removeIdentity()` method. 
 
## To Remove an Identity

```
Future<void> removeIdentity(
      {required String genesisDid, required String privateKey}); 
``` 

The `removeIdentity()` function removes a previously created and stored Identity from the SDK, The `genesisDiD` String and the `privateKey` are passed as parameters to the function.

`genesisDiD` is the unique id of the identity for which profile nonce as zero. 

`privateKey` is the key that is used to access sensitive information related to an identity. This key is also used to generate proofs using the credentials associated with that identity.

If an error occurs, the function throws an `IdentityException`. 
 
 
