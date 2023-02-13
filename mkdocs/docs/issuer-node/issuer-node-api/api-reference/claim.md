# Claim

The collection of Claim endpoints are used to provide the following set of functionalities:

- Create a Verifiable Credential (VC)
- Retreive a credential or a set of credentials
- Update Identity State
- Revoke a Verifiable Credential
- Retreive Revocation Status

An id is assigned to a Verifiable Credential when it is created by an Issuer. A user can then reterive a VC via its id. If a credential is no longer valid or lost, it can be revoked (rendered inactive and cannot be used). 

## Create Claim

**Function**: Endpoint to create a Verifiable Credential for a user. 

**How it Works**: The DID (identifier string retreived from calling the `Create Identity` endpoint) is passed as a path variable in the request URL. 

 The following parameters are passed in the body of the request:

- `credentialSchema`: It is a template for a Verifiable Credential that guarantees the structure of a credential. This way, an Issuer, a Holder, and a Verifier can reference the data in a known way. The request uses the https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json schema.
- `type`: the type of the credential schema sent; for this request, an example of the type  of credential can be `KYCAgeCredential` which is a credential issued based on the age of the user. 
- `credentialSubject`: Contains DID (Decentralized Identifier), i.e. `did` , which is assigned to the user, `birthday` (user's birth date), and `documentType`. 
- `expiration`: Date of expiry of the Verifibale Credential. Expiration of the claim request is optional.  

> Note: Depending on the schema a user opts for, the request body may contain some fields of the schema while leaving out the others. For example, in the explanation above, we have considered schema of the type `KYCAgeCredential` and therefore, included the `birthday` and `documentType` fields. 

The Issuer Node responds by sending a response message that contains a string `id` which is the id of the Verifiable Credential created by the Issuer Node. 


[API Reference](https://self-hosted-platform.polygonid.me/#post-/v1/-identifier-/claims)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-f7c15972-bb5c-4614-974a-c18e367839a6)


## Get Claim

**Function**: Endpoint to retreive a Verifiable Credential based on its Claim ID (CID). This way, you can retreive a credential issued by an Issuer based on this credential's id. 

**How it Works**: The DID (the identifier string retreived from calling the `Create Identity` endpoint) and the Claim ID, i.e.`id` (or CID) of the Verifiable Credential (retreived from calling the `Create Claim` endpoint) are passed as path variables in the request URL. 

 The following parameters are passed in the body of the request:

 - `credentialSchema`: It is a template for a Verifiable Credential that guarantees the structure of a credential. This way, an Issuer, a Holder, and a Verifier can reference the data in a known way. The request uses the https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json schema.
- `type`: the type of the credential schema sent; for this request, an example of the type  of credential can be `KYCAgeCredential` which is a credential issued based on the age of the user 
- `credentialSubject`: Contains DID (Decentralised IDentifier), i.e. `did`, which is assigned to the user, `birthday` (user's birth date), and `documentType`. 
- `expiration`: Date of Verifibale Credentail expiry.

The server responds by sending the following data about Verifiable Credential:

- `Context`: URL pointing to the json-ld documents that define how claim-schema-vocab (here we are using schemas of the type SparseMerkleTreeProof and KYCAgeCredential)are defined.

- `credentialSchema`: URL pointing to the credential schema of type json. 

- `credentialStatus`: Shows credentialStatus `id` (which is the Revocation status of the credential (presence or absence of the revocation nonce value; if zero, claim is not revoked), `revocationNonce` (zero or any value), `type`(type of Proof, for example SparseMerkleTreeProof). 

- `credentialSubject`: Contains details of the subject (to whom credential is issued) and includes:
    - `birthday`: subject's date of birth, DID of the Subject
    - `documentType`
    - `id`: DID of the Subject
    - `type`: Type of credential for credentailSubject (for example, KYCAgeCredential)

- `id`: It is the id of the Verifiable Credential.

- `expiration`: Date on which credential shall expire.

- `issuer`: DID of the Issuer.

- `issuanceDate`: Date on which credential was issued by the Issuer.

- `proof`: The proof that the user creates to prove that s/he is the real owner of the Verifiable Credential issued from the Issuer and that the Verifiable Credential that it holds is valid. It includes:


    - `type` of proof (for example, BJJSignature2021 or SparseMerkleTreeProof)
    - `issuerData`: It includes Issuer's `id` (DID of the Issuer) and its `state` (value of its claimstreeroot, i.e. root of the claims (credential) tree)
    -  `authclaim`: Value of authclaim along with its mtp `existence` (proof of its existence/non-existence in the Merkle tree) - `coreclaim`: Value of coreclaim along with `signature` (Issuer's signature which verifies that the credential is issued by a valid Issuer). 


[API Reference](https://self-hosted-platform.polygonid.me/#get-/v1/-identifier-/claims/-id-)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-dbfc361b-fc11-4a2f-ad0f-420c64bbfb58)



## Get Claims

**Function**: Endpoint to retreive all the Verifiable Credentials issued by an Issuer. 

**How it Works**: The DID (the identifier string retreived from calling the `Create Identity` endpoint) is passed as path variables in the request URL. 

You can retrieve a set of credentails based on different filters or criteria. These criteria can be added as the query-string parameters in the request URL. These filters (and their data types) are listed below:

- schemaType String: Type of schema. For example, schema based on Age-based KYC (KYCAgeCredential)

- schemaHash String: Hash of the schema. For example: c9b2370371b7fa8b3dab2a5ba81b6838

- subject String: Identifier of the Subject for which credentials are to be retrieved. For example, did:polygonid:polygon:mumbai:2qE1BZ7gcmEoP2KppvFPCZqyzyb5tK9T6Gec5HFANQ

- revoked Boolean: If the credential is revoked or not. It can be "true" or "false". 

- self Boolean: Retreive credentails of the provided Identifier. It can be "true" or "false". 

- query-field String: Retrieve credentials based on the filters applied on the data of the credential. 

> Note: The "subject" and "self" filters cannot be applied together. 


The Issuer Node responds by sending a response message that contains the Verifiable Credential and all the information related to it. The response consists of information related to **authclaim** (the claim that authorizes the user that request for claim) and **coreclaim** (the actual claim issued by an Issuer to the user. Depending on these two claims, the information related to these two may differ in the response body. Here, we are going an overview of some of these fields:


- `Context`: URL pointing to the json-ld documents that define how credential schema (here we are using BJJAuthCredential) and claim-schema-vocab (here we are using SparseMerkleTreeProof)are defined. 

- `credentialSchema`: URL pointing to the credential schema of type json. It could be a schema for `authclaim` or `coreclaim`.

- `credentialStatus`: Shows credentialStatus `id` (which is the Revocation status of the credential (presence or absence of the revocation nonce value; if zero, claim is not revoked), `revocationNonce` (zero or any value), `type`(type of Proof, for example SparseMerkleTreeProof). 

- `credentialSubject`: contains details of the subject (to whom credential is issued) and includes subject's date of birth, claim id, and documentType, and other details.

    - `type`: Type of credential for credentailSubjec (AuthBJJCredential or KYCAgeCredential)

- `id`: It is the id of the Verifiable Credential.

- `expiration`: Date on which credential shall expire.

- `issuer`: DID of the Issuer.

- `issuanceDate`: Date on which credential was issued by the Issuer.

- `proof`: The proof that the user creates to prove that s/he is the real owner of the Verifiable Credential issued from the Issuer and that the Verifiable Credential that it holds is valid. It includes:

    - `type` of proof (for example, BJJSignature2021 or SparseMerkleTreeProof)
    - `issuerData`: It includes Issuer's `id` (DID of the Issuer) and its `state` (value of its claimstreeroot, i.e. root of the claims (credential) tree)
    -  `authclaim`: Value of authclaim along with its mtp `existence` (proof of its existence/non-existence in the Merkle tree) - `coreclaim`: Value of coreclaim along with `signature` (Issuer's signature which verifies that the credential is issued by a valid Issuer). 


[API Reference](https://self-hosted-platform.polygonid.me/#get-/v1/-identifier-/claims)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-cd69b428-9659-4e82-87c7-c2012f04327b)


## Revoke Claim

**Function**: Endpoint to revoke a Verifiable Credential 

**How it Works**: The DID (The identifier string retreived from calling the `Create Identity` endpoint) and `nonce` (Revocation Nonce) are passed as a path variable in the request URL. 

The server responds by showing the Revocation Status of the credential.

[API Reference](https://self-hosted-platform.polygonid.me/#post-/v1/-identifier-/claims/revoke/-nonce-)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-a038c968-9e13-4e41-8364-a91e747cc871)


## Get Revocation Status

**Function**: Endpoint to retrieve the Revocation Status of the Verifiable Credential.  

**How it Works**: The DID (The identifier string retreived from calling the `Create Identity` endpoint) and `nonce` (Revocation Nonce) are passed as a path variable in the request URL. For the credential to be marked "revoked", we need to publish the state first on-chain, and then wait for 5 confirmation blocks. 


The server responds by sending the following details:

- `issuer`
    - `claimstreeRoot`: Root of the Claims Merkle Tree of the Issuer
    - `state`: The Issuer's Identity State 
- `mtp`
    - `existence`: Existence or Non-existence of the Revocation Nonce on the Revocation Merkle Tree. For retreving the revocation status from this endpoint, we need to first send a transaction and after that the state is published on-chain. Once that is done, the existence of the revocation nonce on Merkle Tree changes to "true". 
    

[API Reference](https://self-hosted-platform.polygonid.me/#get-/v1/-identifier-/claims/revocation/status/-nonce-)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/dark-star-200015/workspace/public/request/23322631-474c51a2-b026-4750-9bc7-488bc52c02ce)

