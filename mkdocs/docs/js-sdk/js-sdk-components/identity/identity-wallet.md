# Identity Wallet

An identity wallet holds the identity of the user and carries the following components:

- Key Management Store (kms): It allows the user to sign data using keys and is the storage that is allocated to these keys.

- Data Storage Interface: It is an interface that allows you to communicate with Credential storage, Identity storage, Merkle tree storage, and State interfaces. This interface lets you create an identity for the user.

- Credential Wallet: It contains business logic on the top of the Credential storage. An Identity Wallet uses a Credential Wallet for mapping the credentials issued to an Identity.

The methods described below let you create and manage an identity wallet.

## Create an Identity using createIdentity()

This method creates an Auth Baby Jub Jub Credential(for signing on behalf of an identity) and an Identifier for an Identity. The Baby Jub Jub Key is the elliptic curve implementaion used in iden3.

To create an Identity, first, the three Merkle trees, i.e. Claims tree, Revocation tree, and Roots of Root tree are created. Auth BJJ key is then added to the Claims tree. The hash of these three trees creates a root that is used to create an Identity State. The first state created is called the Genesis State and it is from this Genesis State that a unique Identifier ( in the DID format) is generated.

The root of the three trees is used to create a Merkle Tree Proof (MTP)  which verifies the existence of a credential on the Merkle tree.

```typescript
createIdentity(opts: IdentityCreationOptions): Promise<{ did: DID; credential: W3CCredential }>;
```

where `hostUrl`is a part of the Identifier of Auth BJJ Credential. For example, let us assume that an Issuer Node has issued a credential. Then the `hostUrl` could be of the form:

***Issuer Node Address/Issuer Id/ Credential Id***

where Issuer Id is the identifier of the Issuer and Credential Id is the id of the credential issued by the Issuer Node.

`IdentityCreationOptions` lets you select the following options for creating an Identity:

```typescript
interface IdentityCreationOptions {
  method?: DidMethod;
  blockchain?: Blockchain;
  networkId?: NetworkId;
  revocationOpts: {
    baseUrl: string;
    type: CredentialStatusType;
    nonce?: number;
  };
  seed?: Uint8Array;
}
```

where `method` is the type of `did` method used to create an identity, `seed` is a random/non-random number used to generate the BJJ key-pair, `revocationOpts` contains set the way how the status of credectial can be fetched.

The `createIdentity` method returns a `did` (Decentralised Identifier) in the DID format and a credential based on the w3c standard for a Verifiable Credential.  

> Note: It is worth noting that `did` is a Decentralized Identifier associated with an identity and enables verifiable identities. A `did` could be a person, thing, organization, or even an abstract entity. The controller of the `did` can prove that it is the real owner of the identity without the need of seeking permissions/approvals from any centralized authority.

A `did` is expressed in the following format (as per [w3.org](https://www.w3.org/) standards):

**did: did method: did method-specific identifier**

> Note: To know more on iden3 core elements (Baby Jub Jub Key, Credentials, and Identifiers, read our tutorials [here](https://docs.iden3.io/getting-started/getting-started/)

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.createidentity#identitywalletcreateidentity-method" target="_blank">API Reference</a>.

## Create Profiles using createProfile()

This method creates profiles based on the genesis identifier. To keep the user's identity hidden from a Verifier, we can generate different profiles from his/her existing identifier. So, a user has the option to select a particular profile for a particular Verifier so that his real identity is not revealed.

  ```typescript
  createProfile(did: DID, nonce: number, verifier: string): Promise<DID>;
  ```

where `did` is the DID from which a profile is generated.
`nonce` is a unique integer used to generate a profile.
`verifier` is the verifier identity/alias in the string format.

This method returns a profile id.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.createprofile#identitywalletcreateprofile-method" target="_blank">API Reference</a>.

## Generate Key using generateKey() method

This method creates a new Baby Jubjub or EDCSA type of key.

```typescript
 generateKey(keyType: KmsKeyType): Promise<KmsKeyId>;
```

where `keyType` is the type of key supported by the Key Management System.

This method returns a `Promise<KmsKeyId>` which generates the key of the type mentioned in `keyType` parameter.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.generatekey#identitywalletgeneratekey-method" target="_blank">API Reference</a>.

## Issue Credentials using issueCredential() method

This method lets an Issuer issue a credential to a user as requested by the user.

  ```typescript
    issueCredential(issuerDID: DID, req: CredentialRequest): Promise<W3CCredential>;
  ```

where `issuerDID` is the identifier of the Issuer in the `did` format we described earlier.
`hostUrl` is part of the Credential id (added to it as a prefix).

This method returns a core claim which is then added to the Merkle tree and this claim is then transformed into a Verifiable Credential based on the w3c standards and issued to teh user. The core claim is signed by the Issuer and a BabyJubjub [Signature Proof](https://docs.iden3.io/getting-started/signature-claim/signature/) is also added to the credential.  

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.issuecredential#identitywalletissuecredential-method" target="_blank">API Reference</a>.

## Create a Tree Model using getDIDTreeModel() method

This method creates a tree model for a `did`; the model consists of a Claims tree, a Revocation tree, and a Roots of Root tree, and the identity hash of the state created from these trees.

```typescript
getDIDTreeModel(did: DID): Promise<TreesModel>;
```

This method returns a `Promise<TreesModel>` which returns the three Merkle trees from the database storage.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.getdidtreemodel#identitywalletgetdidtreemodel-method" target="_blank">API Reference</a>.

## Generate Merkle Tree proof using generateCredentialMtp() Method

This method generates Merkle Tree Proof (MTP) for the inclusion or non-inclusion of a credential in the Claims tree by following the path from the leaf to the root in the given Merkle tree storage. To know more about the credential's inclusion in a Merkle tree, read our iden3 core specification tutorials [here](https://docs.iden3.io/protocol/spec/#update-claims).

```typescript
  generateCredentialMtp(
    did: DID,
    credential: W3CCredential,
    treeState?: TreeState
  ): Promise<MerkleTreeProofWithTreeState>;
```

 where `did` is the DID of the Issuer that issued the credential to the user.

 `credential` is the Verifiable Credential (in the W3CC format) used to generate the MTP.
 `TreeState` is the tree's state used to generate the MTP. If we do not pass the `TreeState` parameter, the method considers the latest state of the Identity for creating MTP.

This method returns `MerkletTreeProof` along with the `TreeState` for which proof is generated.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.generatecredentialmtp#identitywalletgeneratecredentialmtp-method" target="_blank">API Reference</a>.

## Generate Non-Revocation Merkle Tree Proof using generateNonRevocationMtp() method

This method generates Merkle Tree Proof for the inclusion or non-inclusion of the revocation nonce of a credential in the Revocation Tree.
  
```typescript
  generateNonRevocationMtp(
    did: DID,
    credential: W3CCredential,
    treeState?: TreeState
  ): Promise<MerkleTreeProofWithTreeState>;
```

where `did` is the DID of the Issuer that issues the credential.
`credential` is the Verifiable Credential (in the W3CC format) used to generate the Non-Revocation Merkle Tree Proof.
`TreeState` is the tree's state used to generate the Non-Revocation MTP. If we do not pass the `TreeState` parameter, the method considers the latest state of the Identity for creating MTP.

This method returns `MerkletTreeProof` along with the `TreeState` for which proof is generated.

To know more about the Revocation of a credential, read [here](https://docs.iden3.io/getting-started/claim-revocation/).

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.generatenonrevocationmtp#identitywalletgeneratenonrevocationmtp-method" target="_blank">API Reference</a>.

## Sign Credential Using Sign() Method

This method signs a payload of an arbitrary size with an Auth BJJ Credential, which contains a public key and a reference to the Key Management Store (where we store and fetch a private key for the credential).

  ```typescript
  sign(payload: Uint8Array, credential: W3CCredential): Promise<Signature>;
  ```

where `payload` is any arbitrary string or an unsigned integer array.

`credential` is Auth BJJ Credential in the W3CC format.

This method returns the signature object.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.sign#identitywalletsign-method" target="_blank">API Reference</a>.

## Sign a Challenge using signChallenge() method

This method signs a big integer with the Auth BJJ Credential, which identifies a key for signing.

```typescript
signChallenge(payload: bigint, credential: W3CCredential): Promise<Signature>;
```

where `payload` is a big number (bigint). A big number is used in cryptography to prevent anyone from figuring them out.  

`credential` is Auth BJJ Credential in the W3CC format.

This method returns the signature object.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.signchallenge#identitywalletsignchallenge-method" target="_blank">API Reference</a>.

## Revoke Credential using revokeCredential() method

This method generates a Revocation Nonce for a credential that we need to revoke (or render invalid due to its expiry, loss, or any other reason).

```typescript
revokeCredential(issuerDID: DID, credential: W3CCredential): Promise<number>;
```

where `issuerDID` is Issuer's identifier.
`credential` is the W3CC Credential that needs to be revoked.

This method returns the Revocation Nonce of the credential.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.revokecredential#identitywalletrevokecredential-method" target="_blank">API Reference</a>.

## Generate Iden3 Sparse Merkle Tree Proof using generateIden3SparseMerkleTreeProof() Method

This method generates the Iden3 SparseMerkleTree (SMTP) proof that an Issuer state of a specific credential is included in the Merkle Tree or not.

With the IssueCredential() method, a Credential is generated along with the Signature Proof. This credential is then added to the Claims Merkle tree and therefore, the state of the tree gets changed. For this, another proof called SMTP is required. This proof generates the changed state of the tree by taking Issuer DID, transaction data, and the list of credentials that are part of the changed state as the input parameters.  The JS SDK updates the credential with this SMT Proof, which is included in the state, the transaction data, and the Issuer.

```typescript
generateIden3SparseMerkleTreeProof(
    issuerDID: DID,
    credentials: W3CCredential[],
    txId: string,
    blockNumber?: number,
    blockTimestamp?: number
  ): Promise<W3CCredential[]>;
```

where <issuerDID> is Issuer's identifier.

`credential` is the list of Verifiable Credentials required to generate the proof.

`txId` is a hash of the transaction for which state transition is done.

`blockNumber` is the number of the block in which state transition has been done.

`blockTimestamp` is the timestamp of the block at which the state transition has been done.

This method returns a list of credentials along with a Sparse Merkle Tree Proof.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.generateiden3sparsemerkletreeproof#identitywalletgenerateiden3sparsemerkletreeproof-method" target="_blank">API Reference</a>.

## Publish State to Reverse Hash Service with publishStateToRHS() Method

For a self-hosted Issuer with a set of APIs, we can use hostUrl as a way to fetch the revocation status of a credential. But if we are using a browser, we need to fetch the revocation status via rhsURL (Reverse Hash Service URL) by pushing the state update to this URL.

The `publishStateRHS` method publishes the updated state of the tree to the Reverse HAsh Service.

```typescript
publishStateToRHS(issuerDID: DID, rhsURL: string, revokedNonces?: number[]): Promise<void>;
```

where `issuerDID` is the `did` of the Issuer
`rhsURL` is the REverse Hash Service URL.
`revokedNonces` are the nonces of the revoked credentials.

Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.publishstatetorhs#identitywalletpublishstatetorhs-method" target="_blank">API Reference</a>.

## Get Core Claim Representation with getCoreClaimFromCredential() Method

This method extracts the core claim from either the Signature proof or the Merkle Tree Proof. If we have both types of proofs for the credential, this method extracts the core representation from the Merkle Tree Proof.

```typescript
getCoreClaimFromCredential(credential: W3CCredential): Promise<Claim>;
```

where `credential` is the Verifiable Credential in the W3CC format that is usd to extract the core representaion of the claim.

The method returns the core claim representation of the credential.
  
Click here for the <a href="https://0xpolygonid.github.io/js-sdk-tutorials/docs/api/js-sdk.identitywallet.getcoreclaimfromcredential#identitywalletgetcoreclaimfromcredential-method" target="_blank">API Reference</a>.
