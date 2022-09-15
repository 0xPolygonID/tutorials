# Authentication Request

The first step of interacting with a wallet involves presenting an authentication request. We distinguish between **Basic Auth** and **Query-based Auth**.

A Basic Auth requires user to prove that they are owner of an identity. No further requirement are set. 

A Query-based Auth requires user to prove that:

- They are owner of an identity 
- They own claim(s) that satisfy a certain property

	=== "GoLang"

        ```go
        go get github.com/iden3/go-iden3-auth
        ```

	=== "Javascript"

        ```js
        npm i @iden3/js-iden3-auth --save
        ```

## Basic Auth

The Basic Auth Request allows to interact with a wallet and authenticate it by its identifier. It can be useful for an issuer that needs to share a claim with a user's wallet must authenticate him/her before. Polygon ID Basic Auth can also be implemented by any platform that is interested in providing a seamless web2-like login experience to its users without setting specific requirements.

#### CreateAuthorizationRequest

=== "GoLang"

    ```go
    var request protocol.AuthorizationRequestMessage
    request = auth.CreateAuthorizationRequest(reason,  audience, url)
    ```

=== "Javascript"

    ```js
    const request : protocol.AuthorizationRequestMessage = auth.createAuthorizationRequest(reason, audience, url)
    ```


Generate an Auth Request to the user that includes a *reason* for authenticating. The *audience* represents the identifier of the requester, while the *url* is the callback url where the user must send the response for verification

#### CreateAuthorizationRequestWithMessage

=== "GoLang"

    ```go
    var request protocol.AuthorizationRequestMessage
    request = auth.CreateAuthorizationRequestWithMessage(reason, messageToSign, audience, url)
    ```

=== "Javascript"

    ```js
    const request : protocol.AuthorizationRequestMessage = auth.createAuthorizationRequestWithMessage(reason, messageToSign, audience, url)
    ```

Same functioning to CreateAuthorizationRequest but including a *messageToSign*. This message will be shown to the user inside their wallet and signed as part of the response.

## Query-based Auth 

The Query-based Auth Request allows to interact with a wallet by setting up specific requirements for authentication. These requirements are condition that the user has to satisfy based on the claims held in his/her wallet.

> The Query has to be attached to the Basic Auth Request output of the previous API.

=== "GoLang"

    ```go
    var mtpProofRequest protocol.ZeroKnowledgeProofRequest
    mtpProofRequest.ID = 1 
    mtpProofRequest.CircuitID = string(circuits.AtomicQuerySigCircuitID)
    mtpProofRequest.Rules = map[string]interface{}{
        "query": pubsignals.Query{
            AllowedIssuers: []string{"11AbuG9EKnWVXK1tooT2NyStQod2EnLhfccSajkwJA"},
            Req: map[string]interface{}{
                "countryCode": map[string]interface{}{
                    "$nin": []int{840, 120, 340, 509},
                },
            },
            Schema: protocol.Schema{
                URL:  "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld",
                Type: "KYCCountryOfResidenceCredential",
            },
        },
    }
    request.Body.Scope = append(request.Body.Scope, mtpProofRequest)       
    ```

=== "Javascript"

    ```js
    const proofRequest: protocol.ZKPRequest = {
    id: 1,
    circuit_id: 'credentialAtomicQuerySig',
    rules: {
        query: {
        allowedIssuers: ['11AbuG9EKnWVXK1tooT2NyStQod2EnLhfccSajkwJA'],
        schema: {
            type: 'KYCCountryOfResidenceCredential',
            url: 'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld',
        },
        req: {
            countryCode: {
            $nin: [840, 120, 340, 509],
            },
        },
        },
    },
    };
    request.body.scope = [...scope, proofRequest];
    ```


Generate a request to proof that satisfies certain requirements. `id` represents the request id: ideally, in production, it should be a unique value for each request. `circuit_id` represents the identifier of the circuit used by the user to generate the requested proof: it can be either `credentialAtomicQuerySig` or `credentialAtomicQueryMTP`. In this case the user has to provide a proof that he/she own a claim issued by the `allowedIssuer` of schema `type` **KYCCountryOfResidenceCredential** described in `url`. This claim contains a detail of the country of residence of the receiver. In this scenario, the user has to prove that the value contained in the attribute `countryCode` is not in `nin` 840, 120, 340, 509.

Check out our [Query Language guide](./zk-query-language.md) to design any type of query request you can think of!

