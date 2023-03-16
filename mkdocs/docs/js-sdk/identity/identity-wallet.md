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

```
 createIdentity(
    hostUrl: string,
    opts?: IdentityCreationOptions
  ): Promise<{ did: DID; credential: W3CCredential }>;
```

where `hostUrl`is a part of the Identifier of Auth BJJ Credential. For example, let us assume that an Issuer Node has issued a credential. Then the `hostUrl` could be of the form:

***Issuer Node Address/Issuer Id/ Credential Id***

where Issuer Id is the identifier of the Issuer and Credential Id is the id of the credential issued by the Issuer Node.


`IdentityCreationOptions` lets you select the following options for creating an Identity:

```
export interface IdentityCreationOptions {
  method: DidMethod;
  blockchain: Blockchain;
  networkId: NetworkId;
  seed?: Uint8Array;
  rhsUrl?: string;
}
```
where `method` is the type of `did` method used to create an identity, `seed` is a random/non-random number used to generate the BJJ key-pair, `rhsUrl` is the URL to reverse the hash so that the revocation status can be fetched from the Auth BJJ Credential. 

> Note: `rhsUrl` is not a mandatory field but we encourage you to use it as it will ease the way you fetch the revocation status of the credential. Also, by providing `rhsUrl` value in the `IdentityCreationOptions`, it is possible to continue working in the browser.  If `rhsUrl` is not provided, we can use `hostUrl` to fetch the revocation status. 

The `createIdentity` method returns a `did` (Decentralised Identifier) in the DID format and a credential based on the w3c standard for a Verifiable Credential.  

> Note: It is worth noting that `did` is a Decentralized Identifier associated with an identity and enables verifiable identities. A `did` could be a person, thing, organization, or even an abstract entity. The controller of the `did` can prove that it is the real owner of the identity without the need of seeking permissions/approvals from any centralized authority. 

A `did` is expressed in the following format (as per [w3.org](https://www.w3.org/) standards):

**did: did method: did method-specific identifier**


> Note: To know more on iden3 core elements (Baby Jub Jub Key, Credentials, and Identifiers, read our tutorials [here](https://docs.iden3.io/getting-started/getting-started/)

## Create Profiles using createProfile()

This method creates profiles based on the genesis identifier. To keep the user's identity hidden from a Verifier, we can generate different profiles from his/her existing identifier. So, a user has the option to select a particular profile for a particular Verifier so that his real identity is not revealed. 

  ```
  createProfile(did: DID, nonce: number, verifier: string): Promise<DID>;
  ```
where `did` is the DID from which a profile is generated.
`nonce` is a unique integer used to generate a profile. 
`verifier` is the verifier identity/alias in the string format. 

This method returns a profile id. 

## Generate Key using generateKey() method

This method creates a new Baby Jubjub or EDCSA type of key. 
   
```
 generateKey(keyType: KmsKeyType): Promise<KmsKeyId>;
```
where `keyType` is the type of key supported by the Key Management System.

This method returns a `Promise<KmsKeyId>` which generates the key of the type mentioned in `keyType` parameter. 

## Issue Credentials using issueCredential() method

This method lets an Issuer issue a credential to a user as requested by the user.
   
  ```
  issueCredential(
    issuerDID: DID,
    req: CredentialRequest,
    hostUrl: string,
    opts?: CredentialIssueOptions
  ): Promise<W3CCredential>;
 ```
where `issuerDID` is the identifier of the Issuer in the `did` format we described earlier. 
`hostUrl` is part of the Credential id (added to it as a prefix).
`CredentialIssueOptions` allows to use or not use `rhsUrl`(Url for getting the Reverse Hash service). 

This method returns a core claim which is then added to the Merkle tree and this claim is then transformed into a Verifiable Credential based on the w3c standards and issued to teh user. The core claim is signed by the Issuer and a BabyJubjub [Signature Proof](https://docs.iden3.io/getting-started/signature-claim/signature/) is also added to the credential.  



 ## Create a Tree Model using getDIDTreeModel() method

This method creates a tree model for a `did`; the model consists of a Claims tree, a Revocation tree, and a Roots of Root tree, and the identity hash of the state created from these trees. 

```
getDIDTreeModel(did: DID): Promise<TreesModel>;
```
where `did` is the DID of the <!--....-->

This method returns a `Promise<TreesModel>` which returns the three Merkle trees from the database storage. 


## Generate Merkle Tree proof using generateCredentialMtp() Method

This method generates Merkle Tree Proof (MTP) for the inclusion or non-inclusion of a credential in the Claims tree by following the path from the leaf to the root in the given Merkle tree storage. To know more about the credential's inclusion in a Merkle tree, read our iden3 core specification tutorials [here](https://docs.iden3.io/protocol/spec/#update-claims). 
   
```
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


## Generate Non-Revocation Merkle Tree Proof using generateNonRevocationMtp() method

This method generates Merkle Tree Proof for the inclusion or non-inclusion of the revocation nonce of a credential in the Revocation Tree. 
  
<!-- and its root or to the current root of the Revocation tree in the given Merkle tree storage.-->
 
```
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
 
 
## Sign Credential Using Sign() Method

This method signs a payload of an arbitrary size with an Auth BJJ Credential, which contains a public key and a reference to the Key Management Store (where we store and fetch a private key for the credential).


  ```
  sign(payload: Uint8Array, credential: W3CCredential): Promise<Signature>;
  ```
where `payload` is any arbitrary string or an unsigned integer array.

`credential` is Auth BJJ Credential in the W3CC format.

This method returns the signature object. <!--with R8 and S parameters.--> 
  
## Sign a Challenge using signChallenge() method

This method signs a big integer with the Auth BJJ Credential, which identifies a key for signing.

```
signChallenge(payload: bigint, credential: W3CCredential): Promise<Signature>;
```
where `payload` is a big number (bigint). A big number is used in cryptography to prevent anyone from figuring them out.  

`credential` is Auth BJJ Credential in the W3CC format.

This method returns the signature object. <!--with R8 and S parameters.-->  

## Revoke Credential using revokeCredential() method

This method generates a Revocation Nonce for a credential that we need to revoke (or render invalid due to its expiry, loss, or any other reason).
```
revokeCredential(issuerDID: DID, credential: W3CCredential): Promise<number>;
```
where <!--issuerDID--> is Issuer's identifier.
`credential` is the W3CC Credential that needs to be revoked. 

This method returns the Revocation Nonce of the credential. 

## Generate Iden3 Sparse Merkle Tree Proof using generateIden3SparseMerkleTreeProof() Method

This method generates the Iden3 SparseMerkleTree (SMTP) proof that an Issuer state of a specific credential is included in the Merkle Tree or not. 

```
generateIden3SparseMerkleTreeProof(
    issuerDID: DID,
    credentials: W3CCredential[],
    txId: string,
    blockNumber?: number,
    blockTimestamp?: number
  ): Promise<W3CCredential[]>;
```
where where <!--issuerDID--> is Issuer's identifier.

`credential` is the list of Verifiable Credentials required to generate the proof. 

`txId` is a hash of the transaction for which state transition is done. 

`blockNumber` is number of the block in which state transition has been done.

`blockTimestamp` is the timestamp of the block at which the state transition has been done.

This method returns a list of credentials along with a Sparse Merkle Tree Proof. 

   

