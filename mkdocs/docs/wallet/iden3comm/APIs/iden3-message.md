# To Get Iden3 Message: `getIden3Message` 
 
All communication between Sdk and Issuer or Verifier is done through an `Iden3MessageEntity`. An Integrator can retrieve this iden3 message from a message string obtained from Issuer or Verifier scanning a QR code, for example. This is done using `getIden3Message()` function.
 
```
Iden3MessageEntity getIden3Message({required String message})
 
   {
       return _iden3messageMapper.mapFrom(message);
 
   }
```
This function returns an `Iden3 Message Entity` with different parsed parameters depending on the type of message.