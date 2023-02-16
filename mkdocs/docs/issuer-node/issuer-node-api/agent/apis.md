# Agent

The agent endpoint acts as a port to  communicate messages between the mobile app and the server. The user, using agent endpoint, can access functionality through his/her mobile app. 

The core feature of  message-based communication initiation in messaging specification is the process of looking up the two main properties of each identity: 

1. An endpoint (web, email, etc) where messages can be delivered to a specific identity. 

2. The public key that a specific identity agent is using for communication with another identity.

The JWZ is generated within the user's identity wallet in response to the authentication requested by an Issuer. 


## Agent Endpoint

**Function**: Endpoint to send a JWZ token from user's mobile app. 

**How it Works**: The user's app sends a JWZ token in the request body. 

The Issuer Node responds by sending a response message that contains details related Verifiable Credential and Issuer. It also includes metadata such as:

`from`: from which user DID the message is sent
`to`: to which Issuer DID the message is sent
`id`: A random uuid generated for a transaction
`threadID`: Part of the JWZ token
`typ`: The way of communication between protocol and mobile 
`type`: The way of communication between protocol and mobile 

A typical response looks like this:

``` json
{
    "body": {
        "credential": {
            "id": "https://ce98-2a0c-5a84-3403-bb00-e0d9-c19e-2ab1-2a2b.eu.ngrok.io/issuer/v1/did:polygonid:polygon:mumbai:2qDTZaJRKmLk9AiGkqwJePy2SWm1PtffGRF5CjTeZA/claims/ec81d686-a6e4-11ed-a1f4-debe37e1cbd5",
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/iden3credential-v2.json-ld",
                "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld"
            ],
            "type": [
                "VerifiableCredential",
                "KYCAgeCredential"
            ],
            "expirationDate": "2030-01-01T01:00:00+01:00",
            "issuanceDate": "2023-02-07T13:42:46.904238+01:00",
            "credentialSubject": {
                "birthday": 19960424,
                "documentType": 782222,
                "id": "did:polygonid:polygon:mumbai:2qG9d1nUyeTVU63vU1gH3jcD6Y8z4ANPSdFdQHPY4t",
                "type": "KYCAgeCredential"
            },
            "credentialStatus": {
                "id": "https://ce98-2a0c-5a84-3403-bb00-e0d9-c19e-2ab1-2a2b.eu.ngrok.io/issuer/v1/did%3Apolygonid%3Apolygon%3Amumbai%3A2qDTZaJRKmLk9AiGkqwJePy2SWm1PtffGRF5CjTeZA/claims/revocation/status/4144415042",
                "revocationNonce": 4144415042,
                "type": "SparseMerkleTreeProof"
            },
            "issuer": "did:polygonid:polygon:mumbai:2qDTZaJRKmLk9AiGkqwJePy2SWm1PtffGRF5CjTeZA",
            "credentialSchema": {
                "id": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
                "type": "JsonSchemaValidator2018"
            },
            "proof": [
                {
                    "type": "BJJSignature2021",
                    "issuerData": {
                        "id": "did:polygonid:polygon:mumbai:2qDTZaJRKmLk9AiGkqwJePy2SWm1PtffGRF5CjTeZA",
                        "state": {
                            "claimsTreeRoot": "c244e9c4a42a1fb6aace041c08ecdc9532170194dd03ae99ffd5a035a4423f04",
                            "value": "f92376a5ec15d599f877504d55a3c703d8e40aebb9e9e60802fc217a86693a02"
                        },
                        "authCoreClaim": "cca3371a6cb1b715004407e325bd993c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f8f439351d6704039b792e9ee4c6dc0a82f514ecb6e49f00350c4d1d4bbce2fe11274a4e0b1f374124cf775503a100922c59c8778c778b8b80614dfd52fad060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                        "mtp": {
                            "existence": true,
                            "siblings": []
                        },
                        "credentialStatus": {
                            "id": "https://ce98-2a0c-5a84-3403-bb00-e0d9-c19e-2ab1-2a2b.eu.ngrok.io/issuer/v1/did%3Apolygonid%3Apolygon%3Amumbai%3A2qDTZaJRKmLk9AiGkqwJePy2SWm1PtffGRF5CjTeZA/claims/revocation/status/0",
                            "revocationNonce": 0,
                            "type": "SparseMerkleTreeProof"
                        }
                    },
                    "coreClaim": "c9b2370371b7fa8b3dab2a5ba81b68382a0000000000000000000000000000000212511ab3cc09f0f233e2868d41ae6f7bb2ac9d2dd791d75a99072f128c0d00de72a95dd264a4de5df8ce745c1d393c1480248d27e12f6f0f1ea6b5f12a722e000000000000000000000000000000000000000000000000000000000000000042c106f70000000080d8db700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                    "signature": "78aa6364e769c74557f63ffa6830271b213854ce1f75ad633822fb461fb8e2891ac19621958d27e2ea7997d9f9bcf8e713e97dc98cd3b4faaa71df5b55088303"
                }
            ]
        }
    },
    "from": "did:polygonid:polygon:mumbai:2qDTZaJRKmLk9AiGkqwJePy2SWm1PtffGRF5CjTeZA",
    "id": "558984b4-b074-42a7-b60f-c2b5290d1a32",
    "threadID": "4ccb5b86-bf30-47a4-b7e1-e0e2e4edec8b",
    "to": "did:polygonid:polygon:mumbai:2qG9d1nUyeTVU63vU1gH3jcD6Y8z4ANPSdFdQHPY4t",
    "typ": "application/iden3comm-plain-json",
    "type": "https://iden3-communication.io/credentials/1.0/issuance-response"
}

```


[API Reference](https://self-hosted-platform.polygonid.me/#post-/v1/agent)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-2a66c833-a76e-4486-8ef6-b78a09ff65d2)
