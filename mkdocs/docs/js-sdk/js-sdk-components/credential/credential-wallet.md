# Credential Wallet

A Credential Wallet holds the credentials issued by the Issuer. The Credential Wallet is implemented with a Credential Interface that lets you interact with credential storage.

The methods described below let you create and manage a credential wallet:

## Get List of Credentials with list() method

This method retrieves a set of Verifiable Credentials in the W3C format:

```typescript
list(): Promise<W3CCredential[]>;
```

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.list#credentialwalletlist-method" target="_blank">API Reference</a>.

## Save Credentials with save() method

This method saves the W3C Credentials to the database using upsert.

  ```typescript
  save(credential: W3CCredential): Promise<void>;
  ```

  Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.save#credentialwalletsave-method" target="_blank">API Reference</a>.
  
## Save All Credentials with saveAll() method

This method saves a batch of W3C Credentials to the database using upsert.

```typescript
saveAll(credentials: W3CCredential[]): Promise<void>;
```

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.saveall#credentialwalletsaveall-method" target="_blank">API Reference</a>.

## Remove Credential with remove() method

This method removes a W3C credential from data storage.

```typescript
remove(id: string): Promise<void>;
```

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.remove#credentialwalletremove-method" target="_blank">API Reference</a>.

## Find Credentials with Query with findByQuery() method

This method lets you find credentials using Iden3 protocol's query language.
  
```typescript
findByQuery(query: ProofQuery): Promise<W3CCredential[]>;

```

where `ProofQuery` can contain parameters including:
`allowedIssuers` (Issuers that are allowed to issue a credential),

`claimId`(ID of the credential issued), 

`credentialSubjectId`(ID of the subject of the credential to whom a credential is issued), 

`type` (type of credential issued), 

`schema`(json schema used to create a credential), 

`credentialSubject`(subject of the credential to whom a credential is issued). 

This credential is then used to create a proof.

```typescript
export interface ProofQuery {
  allowedIssuers?: string[];
  credentialSubject?: { [key: string]: unknown };
  schema?: string; // string url
  claimId?: string;
  credentialSubjectId?: string;
  context?: string;
  type?: string;
}
```

Read more on Query Langauge [here](https://docs.iden3.io/protocol/querylanguage/).

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.findbyquery#credentialwalletfindbyquery-method" target="_blank">API Reference</a>.

## Retrieve Auth BJJ Credential with getAuthBJJCredential() method

This method allows you to retrieve a credential of Auth BJJ type for a specific user so that it can be used for signing.

```
 getAuthBJJCredential(did: DID): Promise<W3CCredential>;
```

where `did` is the DID of the issuer that has issued the credential

This method returns a Verifiable Credential of the type Auth BJJ.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.getauthbjjcredential#credentialwalletgetauthbjjcredential-method" target="_blank">API Reference</a>.

## Get Revocation Status for a Credential with getRevocationStatusFromCredential() method

This method retrieves or builds
revocation status for a given credential.

```typescript
getRevocationStatusFromCredential(cred: W3CCredential): Promise<RevocationStatus>;
```

where `cred` is the Credential for which revocation status is to be retrieved.

The method returns a revocation status of the credential (a credential is revoked or not). The credential status could be either the **SparseMerkleTreeProof** or **Iden3ReverseSparseMerkleTreeProof** (if Reverse Hash Service is used) type.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.getrevocationstatusfromcredential#credentialwalletgetrevocationstatusfromcredential-method" target="_blank">API Reference</a>.

## Get Revocation Status Depending on Type of Credential Status with getRevocationStatus() method

This method retreives
revocation status for a given credential depending on the type of its credential status.

```typescript
getRevocationStatus(
    credStatus: CredentialStatus | RHSCredentialStatus,
    issuerDID: DID,
    issuerData: IssuerData
  ): Promise<RevocationStatus>;
```

where `credStatus` is the credential status type: with or without Reverse Hash Service.
`issuerDID` is the DID of the Issuer.
`issuerData` is the metadata related to an Issuer. This metadata is contained in either the Signature Proof (BJJ Signature Proof) or Iden3SparseMerkleTreeProof (Merkle Tree Proof).

The method returns the revocation status of the credential (a credential is revoked or not).

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.getrevocationstatus#credentialwalletgetrevocationstatus-method" target="_blank">API Reference</a>.

## Create a Credential using createCredential() method
  
This method creates a Verifiable Credential of W3C format.

```typescript
  createCredential(issuer: DID, request: CredentialRequest, schema: JSONSchema): W3CCredential;
```

where `Issuer` is the DID of the Issuer.
`request` is the specification for the credential creation parameters.
`schema` is the JSON schema used for creating a credential.

The method returns a Verifiable Credential in the W3C format.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.credentialwallet.createcredential#credentialwalletcreatecredential-property" target="_blank">API Reference</a>.
