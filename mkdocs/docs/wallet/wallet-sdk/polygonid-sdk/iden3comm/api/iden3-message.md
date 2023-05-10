# To Get Iden3 Message: `getIden3Message` 
 
All communication between SDK and Issuer/Verifier is done through an `Iden3MessageEntity`. For example, an Integrator can retrieve this Iden3message from a message string obtained from an Issuer or a Verifier after scanning a QR code. 

## Get Iden3 Message

The `getIden3Message()` method uses a message String as the input parameter and returns an `Iden3MessageEntity`.
 
```dart
Future<Iden3MessageEntity> getIden3Message({required String message});
   
```

The `Iden3MessageEntity` is returned with different parsed parameters depending on the type of message.
