## Selective Disclosure

 There are two types of proof requests: private proof and selective disclosure. In private proof requests, the credential attribute values are not disclosed, and the response is true/false of the requested value.
 In selective disclosure requests, the verifier asks for one attribute value from the credential to be disclosed.

The selective disclosure has almost the same technical flow as the proof request, the only difference is that the query in the QR code from the proof request of the verifier contains a different format. The SDK just calls the authenticate method from `iden3comm.dart` with the `iden3MessageEntity` as a parameter.

!!! info
    Check a query sample [here](verification-library/zk-query-language.md#selective-disclosure).

