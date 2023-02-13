# Identity

The identity endpoint is used to create and retrieve identities for a user/issuer. Poylgon ID supports creation of identities in form of DIDs (Decentralized Identifiers).

> Note: A DID is a cryptographically verfiable decentralized identifier. How a DID is verified is mentioned its DID method. A DID resolves to a DID document which describes how to interact with the DID subject (The user that holds the identity). The DID document contains public keys that are used to authenticate the DID subject. An example of DID resolution could be a verifier resolving an ISSuer's DID to get the public key, which is required to verify the signature on a Verifiable Credential. 

A DID can be represented as:
```
did: did method: did method-specific identifier. 
```
This is a standard form of expressing a Decentralised Identifier as defined by the [W3C DID Core 1.0 specification](https://www.w3.org/TR/did-core)

A user can have multiple DIDs. 

## Create Identity

**Function**: Endpoint to create an Identifier for a user/issuer. 

**How it Works**: The request to create an identity is sent to the Issuer Node. `didMetaData` is passed in the request body. This metadata is required to create Issuer's DID.

An example of a `didMetaData` passed in the request body of the `Create Identity` endpoint is shown below:

```
{
    "didMetadata":{
        "method": "polygonid",
        "blockchain":"polygon",
        "network": "mumbai"
    }
}
```
A few variations of the metadata can be:

```
method:
    "polygonid"
    "iden3"

blockchain:
    "polygon"
    "eth"

network:
    "main"
    "mumbai"
    "goerli"
    "unknown"
```

The Issuer Node responds by sending a response message that contains:

- `identifier`: Identifier of the Issuer in the standrard DID format. For example:

`did:polygonid:polygon:mumbai:2qNBWSAsyvaGBpqQVHk3E4cgChaN6ogaZnYCQUyoRQ` 

- `identity state`: It is the state of the identity and contains fields  that include `claimsTreeRoot` (Verifiable credentails are added to the Claims Tree and its root is calculated), `state` (state of identity), and `status` (whether the status of the identity state is confirmed or pending. `identity state` also contains the timestamp when the identity was created (`createdAt`) or updated(`modifiedAt`). 

For each call to the `Create Identity`, a random Identifier is created. 

[API Reference](https://self-hosted-platform.polygonid.me/#post-/v1/identities)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-ccf43950-f7a6-4155-a54b-4755d92f0b48)

## Get Identities

**Function**: Endpoint to retrieve all the identities (identifiers) of a user.

**How it Works**: The request to retrieve an identity is sent to the Issuer Node. `didMetaData` is passed in the request body. 

The Issuer Node responds by sending a response message that contains:

- `identifier`: Identifier of the Issuer in the standrard DID format. For example:

`did:polygonid:polygon:mumbai:2qNBWSAsyvaGBpqQVHk3E4cgChaN6ogaZnYCQUyoRQ`

[API Reference](https://self-hosted-platform.polygonid.me/#get-/v1/identities)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-793c9e52-cdfa-423a-8b42-62b6b05d8e8c)


## Publish State On-Chain

**Function**: Endpoint to publish the state of an Identity on-chain. 

**How it Works**: The identifier string in the DID format (retreived from calling the `Create Identity` endpoint) is passed as a path variable in the request URL. 

The Issuer Node responds by sending a response message that indicates about the published state of the Identity. If there is no state to publish, the Node shows the message is: "no states to process". If the state is published, the Node sends the following information:

- `claimsTreeRoot`: The root of the Claims Merkle Tree. For example: d9c1e213584c4e7f444bdc42a5cdbd038556d1455a8344e3a1451c346461a41d

- `revocationTreeRoot`: The root of the Revocation Merkle Tree. For example, 0000000000000000000000000000000000000000000000000000000000000000

- `rootOfRoots`: The root of the Roots Merkle Tree. For example,9b952dab35ed362f62573c7b1bb0ee1e5dcb32109fafacb24c9b335fbddf4f2e

- `state`: The published state of the Identity. It is calculated by taking roots of the Claims Tree, Revocation Tree, and Roots Tree. For example, a state could be: 1d9639360ad6e7fb86b8d2f55abd6201cae521e812496cd6606ce36a5829c316

- `txID`: Transaction ID of the Published state on-chain. For example: 0xaed59e4195e73ee6c4278be1a5e01ecbdf2ff9565511916200dedda9bb20ff38


