# To Get Iden3 Message: `getIden3Message` 
 
All communication between SDK and Issuer/Verifier is done through an `Iden3MessageEntity`. For example, an Integrator can retrieve this iden3 message from a message string obtained from an Issuer or a Verifier after scanning a QR code. This is done using `getIden3Message()` function.
 
```
Iden3MessageEntity getIden3Message({required String message})
 
   {
       return _iden3messageMapper.mapFrom(message);
 
   }
```
This function returns an `Iden3 Message Entity` with different parsed parameters depending on the type of message.
