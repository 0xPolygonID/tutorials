# Iden3Comm

Iden3comm is the implementation of the messages that exist in the iden3 protocol. It deals with different protocol message types; a few messages supported by the protocol are related to authentication, credential, proof, and revocation. 

## Packers

Iden3comm supports packers that receive some data as payload and create an envelope for different types of messages. 

The iden3 protocol supports packers for messages of 2 media types: plain messages and zero-knowledge proof (zkp) messages. These packers let you generate a token. 

### ZKP Packer

For the messages of the type **ZKP**, the packer receives payload (a serialized message) and zkp parameters (sender's DID and profile nonce) as input parameters and generates a JSON Web Zero Knowledge(JWZ) Token. 

```
 async pack(payload: Uint8Array, params: ZKPPackerParams): Promise<Uint8Array> {
    const provingMethod = await getProvingMethod(params.provingMethodAlg);
    const { provingKey, wasm, dataPreparer } = this.provingParamsMap.get(
      params.provingMethodAlg.toString()
    );

    const token = new Token(
      provingMethod,
      byteDecoder.decode(payload),
      (hash: Uint8Array, circuitID: CircuitId) => {
        return dataPreparer.prepare(hash, params.senderDID, params.profileNonce, circuitID);
      }
    );
    token.setHeader(Header.Type, MediaType.ZKPMessage);
    const tokenStr = await token.prove(provingKey, wasm);
    return byteEncoder.encode(tokenStr);
  }
```

## Handler

In iden3, a handler manages the packers described above. There are two types of handlers that the protocol supports: Authentication and Fetch Handlers.

### Authentication Handler

The following steps show how the Authorization Handler works:

1. It handles authorization request protocol messages and generates a token.

```
handleAuthorizationRequestForGenesisDID(
    did: DID,
    request: Uint8Array
  ): Promise<{
    token: string;
    authRequest: AuthorizationRequestMessage;
    authResponse: AuthorizationResponseMessage;
  }>;
```
It gets the payload and an identity (that can handle that request) as the input parameters, and returns a token, authrozation request, and authorization response.  

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.authhandler.handleauthorizationrequestforgenesisdid#authhandlerhandleauthorizationrequestforgenesisdid-method" target="_blank">API Reference</a>. 


2. After token generation, the handler parses or unpacks the authorization message:

```
parseAuthorizationRequest(request: Uint8Array): Promise<AuthorizationRequestMessage>;
```

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.authhandler.parseauthorizationrequest#authhandlerparseauthorizationrequest-method" target="_blank">API Reference</a>. 

3. The handler then generates a zero-knowledge proof  for the given request:

```
 generateAuthorizationResponse(
    userGenesisDID: DID,
    authProfileNonce: number,
    authRequest: AuthorizationRequestMessage,
    zkpRequestsWithCreds: ZKPRequestWithCredential[]
  ): Promise<{
    token: string;
    authRequest: AuthorizationRequestMessage;
    authResponse: AuthorizationResponseMessage;
  }>;

```
where `userGenesisDIS` is the user's Gensis DID for which s/he holds the key pair.
`authProfileNonce` is the profile nonce used for authorization.
`authRequest`is the authorization request,
`zkpRequestWithCredential` is the zero knowledge proof request along with the credential for which proof is required. 

The handler generates a proof of circuits that the user had requested (authorization request) and calls the package manager to pack the result in the form of JSON Web Zero Knowledge (JWZ) Token. 

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.authhandler.generateauthorizationresponse#authhandlergenerateauthorizationresponse-method" target="_blank">API Reference</a>.

### Fetch Handler

The Fetch Handler handles the Credential Offer message and returns the fetched credential.

```
handleCredentialOffer(
    did: DID,
    offer: Uint8Array,
    profileNonce?: number
  ): Promise<W3CCredential[]>;
```
where `did` is the identifier that handles the Credential Offer.
`CredentialOfferMessage` is the offer message that the Fetch handler receives. 
`profileNonce` is the nonce of the DID to which the credential has been offered.

The handler returns a Verifiable Credential in the W3C format. 

Read more on iden3comm [here](https://github.com/iden3/iden3comm/tree/main/protocol).

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.fetchhandler.handlecredentialoffer#fetchhandlerhandlecredentialoffer-method" target="_blank">API Reference</a>.



  

   
  






