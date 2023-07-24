# Iden3Comm

Iden3comm is the implementation of the messages that exist in the Iden3protocol. It deals with different protocol message types; a few messages supported by the protocol are related to authentication, credential, proof, and revocation.

## Packers

Iden3comm supports packers that receive some data as payload and create an envelope for different types of messages.

The Iden3 protocol supports packers for messages of 2 media types: plain messages and zero-knowledge proof (ZKP) messages. These packers let you generate a token.

### ZKP Packer

For the messages of the type **ZKP**, the packer receives payload (a serialized message) and ZKP parameters (the sender's DID and profile nonce) as input parameters and generates a JSON Web Zero-knowledge (JWZ) Token.

```typescript
 async pack(payload: Uint8Array, params: ZKPPackerParams): Promise<Uint8Array> {
    const provingMethod = await getProvingMethod(params.provingMethodAlg);
    const { provingKey, wasm, dataPreparer } = this.provingParamsMap.get(
      params.provingMethodAlg.toString()
    );

    const token = new Token(
      provingMethod,
      byteDecoder.decode(payload),
      (hash: Uint8Array, circuitID: CircuitId) => {
        return dataPreparer.prepare(hash, params.senderDID, circuitID);
      }
    );
    token.setHeader(Header.Type, MediaType.ZKPMessage);
    const tokenStr = await token.prove(provingKey, wasm);
    return byteEncoder.encode(tokenStr);
  }
```

## Handler

In Iden3, a handler manages the packers described above. There are two types of handlers that the protocol supports: Authentication and Fetch Handlers.

### Authentication Handler

The following steps show how the Authorization Handler works:

1. Before the token generation, the handler can unpack the authorization message, so the user can choose the DID to log in with. (it can be profile or public DID)

    ```typescript
    parseAuthorizationRequest(request: Uint8Array): Promise<AuthorizationRequestMessage>;
    ```

    Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.authhandler.parseauthorizationrequest#authhandlerparseauthorizationrequest-method" target="_blank">API Reference</a>.

1. Then, it handles authorization request protocol messages and generates a token.

    ```typescript
    handleAuthorizationRequest(
        did: DID,
        request: Uint8Array,
        opts?: AuthHandlerOptions
      ): Promise<{
        token: string;
        authRequest: AuthorizationRequestMessage;
        authResponse: AuthorizationResponseMessage;
      }
    ```

It gets the payload and an identity (that can handle that request) as the input parameters, and returns a token, authorization request, and authorization response.  

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.authhandler.handleauthorizationrequest" target="_blank">API Reference</a>.

!!! note
    When a user logs into a Verifier, it does not have to share its identity. Instead, it can share with it the profile as the user does not receive a credential on his/her identifier but on his/her profile. Sharing one's profile instead of his/her identity prevents the possible identity tracking by a Verifier. 


### Fetch Handler

The Fetch Handler handles the Credential Offer message and returns the fetched credential.

```typescript
handleCredentialOffer(
    offer: Uint8Array,
    opts?: FetchHandlerOptions
  ): Promise<W3CCredential[]>
```

The offer should just be passed to the function. The DID that is supposed to fetch the credential will be determined from the offer message itself. 

`offer` is the offer message that the Fetch handler receives.

The handler returns a Verifiable Credential in the W3C format.

Read more about iden3comm [here](https://github.com/iden3/iden3comm/tree/main/protocol).

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.fetchhandler.handlecredentialoffer#fetchhandlerhandlecredentialoffer-method" target="_blank">API Reference</a>.

if you want to work with JWS instead of JWZ technology during the authorization or credential fetching you need to pass parameters to these functions.

```typescript 
let params = {
  mediaType: MediaType;
  packerOptions?: JWSPackerParams;
}
```
where `mediaType` is the media type of iden3comm protocol and `packerOptions` are JWS required parameters.
