# Request API

The first step of interacting with a wallet involves presenting a request. In this tutorial, we will explain the difference between two types of requests: **Basic Auth Request** and **Query-based Request**.

A Basic Auth Request allows to design a minimal DID request to the user. As a response to that, the user will share a proof that he/she is the owner of that DID.

A Query-based Request allows to design a more complex query request to the user. As a response to that, the user will share a proof that he/she owns a credential that satisfies the properties defined inside the query.

## Basic Auth Request

The Basic Auth Request allows verifiers to interact with a wallet and authenticate the user by its DID.  
Basic Auth Request can be implemented by any platform that is interested in providing a seamless web2-like login experience to its users without setting any specific requirements.

#### CreateAuthorizationRequest

=== "GoLang"

    ```go
    var request protocol.AuthorizationRequestMessage
    request = auth.CreateAuthorizationRequest(reason, audience, url)
    ```

=== "Javascript"

    ```bash
    WIP
    ```  

<!-- === "Javascript"

    ```js
    const request : protocol.AuthorizationRequestMessage = auth.createAuthorizationRequest(reason, audience, url)
    ``` -->


> An example of the usage of this api can be found <a href="https://github.com/0xPolygonID/tutorial-examples/blob/main/verifier-integration/go/index.go#L41" target="_blank">here</a>


Generate an Auth Request to the user that includes a *reason* for authenticating. The *audience* represents the DID of the requester, while the *url* is the callback url where the user must send the response for verification

---

#### CreateAuthorizationRequestWithMessage

=== "GoLang"

    ```go
    var request protocol.AuthorizationRequestMessage
    request = auth.CreateAuthorizationRequestWithMessage(reason, messageToSign, audience, url)
    ```

=== "Javascript"

    ```bash
    WIP
    ```  

<!-- === "Javascript"

    ```js
    const request : protocol.AuthorizationRequestMessage = auth.createAuthorizationRequestWithMessage(reason, messageToSign, audience, url)
    ``` -->

The same functionality of CreateAuthorizationRequest but it also includes a *messageToSign*. This message will be shown to the users inside their wallets and will be signed as part of the response.

## Query-based Request 

The Query-based Auth Request allows verifiers to interact with a wallet by setting up specific requirements for authentication. These requirements are the conditions that the user has to satisfy based on the credentials held in his/her wallet.

> The Query has to be attached to the Basic Auth Request output of the previous API. An example of its usage can be found <a href="https://github.com/0xPolygonID/tutorial-examples/blob/main/verifier-integration/go/index.go#L47" target="_blank">here</a>

=== "GoLang"

    ```go
	var mtpProofRequest protocol.ZeroKnowledgeProofRequest
	mtpProofRequest.ID = 1
	mtpProofRequest.CircuitID = string(circuits.AtomicQuerySigV2CircuitID)
	mtpProofRequest.Query = map[string]interface{}{
		"allowedIssuers": []string{"*"},
		"credentialSubject": map[string]interface{}{
			"birthday": map[string]interface{}{
				"$lt": 20000101,
			},
		},
		"context": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
		"type":    "KYCAgeCredential",
	}
	request.Body.Scope = append(request.Body.Scope, mtpProofRequest)
    ```

=== "Javascript"

    ```bash
    WIP
    ```  

<!-- === "Javascript"

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
    ``` -->

Generate a request to prove that the user owns a credential that satisfies certain requirements. 

`ID` represents the request id: ideally, in production, it should be a unique value for each request. `CircuitID` represents the identifier of the circuit that the user must use to generate the requested proof: [here](https://github.com/iden3/go-circuits/blob/39e45740df5eba9c70acfb1d89cc72f3285aadf8/circuits.go#L13) you can find a reference to the available circuits. 

In this case, the user has to provide a proof that he/she owns a credential issued by the `allowedIssuer` of schema `type` **KYCAgeCredential** described in the url provided in `context`. By setting the `allowedIssuer` to `*`, the user can provide a proof of that credential issued by any issuer. Alternatively, if the verifier adds the DID of a specific issuer inside the `allowedIssuer` array, the user must provide a proof of a credential issued by that specific issuer.
This credential contains details in its `credentialSubject` of the birthday of the receiver. In this scenario, the user has to prove that the value contained in the attribute `birthday` is less than `lt` 20000101, namely that the user was born before 01/01/2000.

An additional optional field that can be included in the query is `skipClaimRevocationCheck`. By setting it to `true`, the user doesn't need to provide the proof of the revocation of the credential, which would otherwise be provided by default. 
This is useful for credentials that are still useful even if they have been revoked. For example, a credential that states that a user is an employee of Google, is still useful even if it has been revoked after the user left the company and the credential was revoked.

```go

mtpProofRequest.Query = map[string]interface{}{
...
"skipClaimRevocationCheck": true,
...
}

```

> Check out our [Query Language guide](./zk-query-language.md) to design any type of query request you can think of!

> Check out the [Iden3Comm](../../wallet/wallet-sdk/polygonid-sdk/iden3comm/overview.md) section inside the Wallet SDK to learn more about how these requests are interpreted by the wallet in order to generate a zk proof

