# JS SDK Overview

The Polygon ID JS SDK is a Software Development Kit created in JavaScript. Based on the iden3 core protocol libraries, it is used for interacting with REST APIs and developing browser-based applications. 

With JS SDK, a user can create a browser extension that allows him/her to store the credentials and a key, and then the user can generate proofs of having those credentials. 

The Polygon ID JS SDK provides the developers intending to create a browser extension for the JS-based SDK. Using this SDK, these devs can start creating and issuing verifiable credentials (related to one's identity) based on our iden3 protocol. Individuals and organizations can use this extension for their browser-based applications. 

> Note: With JS SDK, you can build custom applications/modules by applying your changes to our existing codebase. The functionalities that we provide in these tutorials can be extended as per your requirements. For example, JS SDK does not provide a codebase for database storage but you can implement that by extending SDK's functionality. 


## Why JS SDK?

The Polygon ID JS SDK has been developed to provide the following functionalities for a user's browser-based wallet:

- Create and manage Identity wallet
- Issue and manage credentials
- Generate zero-knowledge proofs after credential issuance
- Publish the updated state of the Issuer once a credential is added to the claims Merkle tree. 
- Handle authorization requests

## Components of JS SDK

The following components form the inherent part of the JS SDK:

- Identity Wallet
- Credential Wallet
- Iden3comm (Authentication Handler/Fetch Handler)
- Proof Generation 

    In the upcoming tutorials, we shall read more about the implementation of these components in JS SDK. To know what each of these components stands for, go through the following links: 

    - [Identity Wallet](../wallet/wallet-sdk/polygonid-sdk/identity/overview.md)

    - [Credential Wallet](../wallet/wallet-sdk/polygonid-sdk/credential/overview.md)

    - [Iden3comm](../wallet/wallet-sdk/polygonid-sdk/iden3comm/overview.md)

    - [Proof](../wallet/wallet-sdk/polygonid-sdk/proof/overview.md)


## Prerequisites

- Node.js must be installed on your system. Version 16.14 or above is required for Polygon ID JS SDK.

    > Note: While installing Node.js, make sure that you select all the checkboxes related to the dependencies. 

- A browser where you can install and manage your browser wallet. 


## Dependencies

You can install project dependencies using either of the following way:

 - Using **npm**:

```
npm install @0xpolygonid/js-sdk
```
- Adding import to your **index.html** file: 

    ```
    <script src="./dist/umd/index.js"></script>
    <script>
      const {
          LocalStoragePrivateKeyStore,
          IdentityStorage,
          MerkleTreeLocalStorage,
          CredentialStorage,
          W3CCredential,
          BrowserDataSource,
          BjjProvider,
          KmsKeyType,
          IdentityWallet,
          CredentialWallet,
          KMS
      } = PolygonIdSdk;
    </script>
    ```


## Core Libraries


JS SDK is a fully-functional wrapper on top of our iden3 core libraries. The following set of core iden3 libraries has been used to implement Polygon ID JS SDK:

- <a href="https://github.com/iden3/js-crypto" target="_blank">Iden3 JS Crypto</a>: Implementation of the Elliptic Curve for Baby Jubjub Key, Posedion hash and other cryptographic elements.

- <a href="https://github.com/iden3/js-iden3-core" target="_blank">JS Iden3 Core</a>: JavaScript implementation of the iden3 core functionalities including Identity creation. 

- <a href="https://github.com/iden3/js-jsonld-merklization" target="_blank">JS JSON-LD Merklization</a>: A library that merkelizes JSON-LD documents in JavaScript. Merklization is a process that creates a Merkle tree of a JSON-LD document so that it can be verified for its data integrity and authenticity. It is a library that lets you work with Verifiable Credentials. A JSON-LD is a schema document that represents data fields related to a Verifiable Credential in a pre-determined format. 

- <a href="https://github.com/iden3/js-jwz" target="_blank">JS JWZ</a>: JavaScript implementation of JSON Web Zero Knowledge and lets you create JWZ tokens. 


- <a href="https://github.com/iden3/js-merkletree" target="_blank">JS Merkle Tree</a>: JavaScript implemnetation for creating a Sparse Merkle Tree (SMT). It carries code implementation for browser, local storage, and memory. 

Follow the links mentioned below to know more about W3C stanadards for Verifiable Credentials and DID (Decentralised Identifier):

- <a href="https://www.w3.org/TR/did-core/" target="_blank">DID</a>

- <a href="https://www.w3.org/TR/vc-data-model/" target="_blank">Verifiable Credentials</a>

    

## What Can Be Built Upon JS SDK?

On the Polygon ID JS SDK, you can build the following functionalities:

- An Issuer on a Merkle Tree
- A Verifier that can verify zero-knowledge proofs generated by a user's identity wallet
- An Identity Wallet based on the Iden3 core protocol
- The JS SDK also provides a revocation feature for credentials and proof generation

<br>

> Note: As our JS SDK is still in the public beta stage, you might find a few functionalities missing or not fully updated. 

