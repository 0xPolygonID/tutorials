# JS SDK Example

This tutorial shows the steps to run different modules of the Polygon ID JS SDK with exampling code. After the steps for each module, you will find a sample output which is generated when these modules are run.

## Steps to Run Example Code

  We have created a [JS SDK Example repository](https://github.com/0xPolygonID/js-sdk-examples/blob/main/index.ts) that you can download and run. Follow these steps:

  1. Download the latest circuits  from the following curl command:

      ```bash
      curl https://iden3-circuits-bucket.s3.eu-west-1.amazonaws.com/latest.zip --output latest.zip
      ```

      where s3 is a bucket that has been created for storing the circuits' data in one of the Amazon Simple Storage Service (Amazon S3) for specific regions across the globe.

      The `latest.zip` folder is accessed from the s3 bucket and is the output to the local `latest.zip` file.  

      Unzip the `latest.zip` folder downloaded above to the `circuits` folder in the repository:

      ```bash
      unzip latest.zip -d circuits
      ```

  2. To run the scripts, set the values for the following variables:

      ```bash
      export WALLET_KEY="...key in hex format with matic balance"
      export RPC_URL="...url to polygon mumbai network rpc node"
      export RHS_URL="..reverse hash service url"
      export CONTRACT_ADDRESS="..state v2 contract address in the mumbai network"
      export CIRCUITS_PATH="..path to the circuits folder"
      ```

  3. Run the ***npm*** command. For this, Node.js (which contains the npm package) must be installed on your system.

      ```bash
        npm run start
      ```

### Example: Identity Creation

1. Initialize `DataStorage`: To initialize `DataStorage`, we need a new `CredentialStorage`, which could be as simple as a Memory Data Storage (`InMemoryDataSource`). Using Memory Data Storage for new credential storage is not recommended for the production environment. Instead, we could use Browser Data Storage or any other data storage.

    ```typescript
    const dataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
      new InMemoryDataSource<Identity>(),
      new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states: new EthStateStorage(defaultEthConnectionConfig),
    };
    ```

    !!! note
        The `CredentialStorage` accepts the interface of the Data Storage; it does not require Memory or Browser Storage. You can implement your own storage, be it  SQL storage or any other type of storage.

    `IdentityStorage` stores identities and profiles.
    `mt` stores Merkle Trees.
    `states` stores Ethereum states of identities.

- Initialize  `CredentialWallet` and  `IdentityWallet`: To initialize Identity Wallet, we need `dataStorage`, and `kms` (Key Management System).

    ```typescript
    const memoryKeyStore = new InMemoryPrivateKeyStore();
    const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
    const kms = new KMS();
    kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);

    const statusRegistry = new CredentialStatusResolverRegistry();
    statusRegistry.register(
      CredentialStatusType.SparseMerkleTreeProof,
      new IssuerResolver()
    );
    statusRegistry.register(
      CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      new RHSResolver(dataStorage.states)
    );
    const credWallet = new CredentialWallet(dataStorage,statusRegistry);
    const wallet = new IdentityWallet(kms, dataStorage, credWallet);
    ```

    For `kms`, we need to define a `provider` that works with keys. For example, we can provide a Baby Jubjub Provider (`BJJProvider`) or an Ethereum Key Provider, or a Register Key Provider(`registerKeyProvider`), to name a few. For each Provider, we need to pass the storage: `AbstractPrivateKeyStore`. This storage allows you to create customized encrypted storage. For demo purposes, we have used `memoryKeyStore`. So in a nutshell, we create storage(`memoryKeyStore`), pass it to the Provider(`BJJProvider`), and register this Provider in Key Management System(`registerKeyProvider`).

2. After initialization is complete, to create identity, we need to pass some options, which are accepted by the `IdentityCreationOptions` interface. The options are as follows:

```typescript
export interface IdentityCreationOptions {
  method?: DidMethod;
  blockchain?: Blockchain;
  networkId?: NetworkId;
  revocationOpts: {
    id: string;
    type: CredentialStatusType;
    nonce?: number;
  };
  seed?: Uint8Array;
}
```

For example:

```typescript
const seedPhrase: Uint8Array = byteEncoder.encode('seedseedseedseedseedseedseedseed');

const { did, credential } = await wallet.createIdentity({
  method: DidMethod.Iden3,
  blockchain: Blockchain.Polygon,
  networkId: NetworkId.Mumbai,
  seed: seedPhrase,
  revocationOpts: {
    type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    id: 'https://rhs-staging.polygonid.me'
  }
});
    ```
    ```
  - If we do not use `rhsUrl` within createIdentity() method, we get a `credentialStatus` with a URL as `id`, which contains an API to fetch the revocation status. Also, in this case, the `type` of the `credentialStatus` is `SparseMerkleTreeProof`.
```

- If we do not use `rhsUrl` within createIdentity() method, we get a `credentialStatus` with a URL as `id`, which contains an API to fetch the revocation status. Also, in this case, the `type` of the `credentialStatus` is `SparseMerkleTreeProof`.

!!! note
    `revocationOpts` should provide info on how to fetch the status of a credential. If we use `CredentialStatusType.Iden3ReverseSparseMerkleTreeProof` within createIdentity() method, we get a `credentialStatus` with a Reverse Hash Service URL (`rhsUrl`) as `id`, which, upon running on a browser, shows a response that contains information about the identity state. If we use `CredentialStatusType.Iden3SparseMerkleTreeProof` within createIdentity() method, we get a `credentialStatus` with a URL as `id`, which contains an API to fetch the revocation status.

### Example: Issue Credential

1. #### Initialize all storage types

    ```typescript
    const dataStorage = {
      credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
      identity: new IdentityStorage(
        new InMemoryDataSource<Identity>(),
        new InMemoryDataSource<Profile>()
      ),
      mt: new InMemoryMerkleTreeStorage(40),
      states: new EthStateStorage(defaultEthConnectionConfig),
    };
    const memoryKeyStore = new InMemoryPrivateKeyStore();
    const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
    const kms = new KMS();
    kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);
    const credWallet = new CredentialWallet(dataStorage);
    const statusRegistry = new CredentialStatusResolverRegistry();
    statusRegistry.register(
      CredentialStatusType.SparseMerkleTreeProof,
      new IssuerResolver()
    );
    statusRegistry.register(
      CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      new RHSResolver(dataStorage.states)
    );
    const credWallet = new CredentialWallet(dataStorage,statusRegistry);
    const wallet = new IdentityWallet(kms, dataStorage, credWallet);
    ```

2. #### Create Issuer's Identity

    ```typescript
    const seedPhraseIssuer: Uint8Array = byteEncoder.encode('seedseedseedseedseedseedseedseed');
    const { did: issuerDID, credential: issuerAuthCredential } = await wallet.createIdentity({
      method: DidMethod.Iden3,
      blockchain: Blockchain.Polygon,
      networkId: NetworkId.Mumbai,
      seed: seedPhraseIssuer,
      revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        id: 'https://rhs-staging.polygonid.me'
      }
    });
    ```

3. #### Create User's Identity

    ```typescript
    const seedPhraseUser: Uint8Array = byteEncoder.encode('userseedseedseedseedseedseeduser');   
    const { did: userDID, credential: authBJJCredentialUser } = await identityWallet.createIdentity({
      method: DidMethod.Iden3,
      blockchain: Blockchain.Polygon,
      networkId: NetworkId.Mumbai,
      seed: seedPhraseUser,
      revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        id: 'https://rhs-staging.polygonid.me'
      }
    });
    ```

4. #### Create Credential Request (`credentialRequest`) and  Issue Credential (`issueCredential`):

    ```typescript
    const claimReq: CredentialRequest = {
      credentialSchema:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v2.json',
      type: 'KYCAgeCredential',
      credentialSubject: {
        id: userDID.toString(),
        birthday: 19960424,
        documentType: 99
      },
      expiration: 12345678888,
      revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        id: 'https://rhs-staging.polygonid.me'
      }
    };
    const issuerCred = await wallet.issueCredential(issuerDID, claimReq);
    ```

#### Output of Run Command

  ```json
  {
    "id": "urn:ad777d04-15e9-42ad-bc31-f8acd7191439",
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://schema.iden3.io/core/jsonld/iden3proofs.jsonld",
      "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld"
    ],
    "type": [
      "VerifiableCredential",
      "KYCAgeCredential"
    ],
    "expirationDate": "2361-03-21T19:14:48.000Z",
    "issuanceDate": "2023-04-26T18:54:26.210Z",
    "credentialSubject": {
      "id": "did:iden3:polygon:mumbai:wzwAyDLHL6Nhtj3TnFfUnP7osASXb9hS8BTfa2zeo",
      "birthday": 19960424,
      "documentType": 99,
      "type": "KYCAgeCredential"
    },
    "issuer": "did:iden3:polygon:mumbai:wzokvZ6kMoocKJuSbftdZxTD6qvayGpJb3m4FVXth",
    "credentialSchema": {
      "id": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v2.json",
      "type": "JsonSchemaValidator2018"
    },
    "credentialStatus": {
      "id": "https://rhs-staging.polygonid.me",
      "revocationNonce": 4303,
      "type": "Iden3ReverseSparseMerkleTreeProof"
    },
    "proof": [
      {
        "type": "BJJSignature2021",
        "issuerData": {
          "id": "did:iden3:polygon:mumbai:wzokvZ6kMoocKJuSbftdZxTD6qvayGpJb3m4FVXth",
          "state": {
            "rootOfRoots": "0000000000000000000000000000000000000000000000000000000000000000",
            "revocationTreeRoot": "0000000000000000000000000000000000000000000000000000000000000000",
            "claimsTreeRoot": "6091193ec58a6c020183c2d889a92c32410f31812595f228d67a2bf37e04a729",
            "value": "ed17a07e8b78ab979507829fa4d37e663ca5906714d506dec8a174d949c5eb09"
          },
          "authCoreClaim": "cca3371a6cb1b715004407e325bd993c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000bd045c3101b2a0bcd60106ff21a680d86af3dbbdec406764f93ab82849410e1c27eb6114eeff7eb030b34d1db28b46d61cb6d7efbec190a0b1c1664664ced80f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "mtp": {
            "existence": true,
            "siblings": []
          },
          "credentialStatus": {
            "id": "https://rhs-staging.polygonid.me",
            "revocationNonce": 0,
            "type": "Iden3ReverseSparseMerkleTreeProof"
          }
        },
        "coreClaim": "c9b2370371b7fa8b3dab2a5ba81b68380a00000000000000000000000000000001127b7c7c774b5b5f3bc93a653ccdfbb52d748efb2062f00be85c3117910c0068923001000000000000000000000000000000000000000000000000000000006300000000000000000000000000000000000000000000000000000000000000cf10000000000000281cdcdf0200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "signature": "ede3a863f234a29a0e2bb80746c37f4f1cfbe2cb0d1c0668d44b6a69ea7b1b110008effb865ffde590ccaf52a16c7188eaa79a52dcf2ab2baa5145e618526b05"
      }
    ]
  }
  ```

  <br>

### Example: Generate Proof

1. [Initialize all storages](#initialize-all-storage-types) including `dataStorage`, `identityWallet`, `credentialWallet`, `circuitStorage`, and `stateStorage`.

    ```typescript
    const proofService: IProofService = new ProofService(idWallet, credentialWallet, circuitStorage, stateStorage,{ ipfsNodeURL: "https://ipfs.io" });
    ```
  Ipfs node option is mandatory if your are going to support schemas with `ipfs://` prefix

2. [Create Issuer's Identity](#create-issuers-identity)

3. [Create User's Identity](#create-users-identity)

4. Create Credential Request (`credentialRequest`):

    ```typescript
    const claimReq: CredentialRequest = {
      credentialSchema:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v2.json',
      type: 'KYCAgeCredential',
      credentialSubject: {
        id: userDID.toString(),
        birthday: 19960424,
        documentType: 99
      },
      expiration: 1693526400,
      revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        id: rhsUrl
      }
    };
    ```

5. Issue Credential (`issueCredential`):

    ```typescript
    const issuerCred = await idWallet.issueCredential(issuerDID, claimReq);
    ```

6. Save Credential(`saveCredential`):

    ```typescript
    await credWallet.save(issuerCred);
    ```

7. Add Credentials to Merkle Tree (`addCredentialsToMerkleTree`) **AtomicQueryMTPV2 circuit only** :

      ```typescript
      const res = await identityWallet.addCredentialsToMerkleTree(
      [credential],
      issuerDID
      );
      ```

8. Publish state to Reverse Hash Service(`publishStateToRHS`) and then to blockchain **AtomicQueryMTPV2 circuit only**.

    ```typescript
    await identityWallet.publishStateToRHS(issuerDID, rhsUrl);
    ```

    ```typescript
    const ethSigner = new ethers.Wallet(
    walletKey,
    (dataStorage.states as EthStateStorage).provider
    );
    ```

9. Transit State(`transitState`) **AtomicQueryMTPV2 circuit only**:

    ```typescript
    const txId = await proofService.transitState(
    issuerDID,
    res.oldTreeState,
    true,
    dataStorage.states,
    ethSigner
    );
    ```

    The transaction ID(`txId`) is sent to the network.

      ```typescript
      console.log(txId);
      ```

10. Generate Proof for `ZeroKnowledgeProofRequest`. It uses the **AtomicQuerySignV2** as the `CircuitId`.

- Processe Proof Request:

  ```typescript
  const proofReq: ZeroKnowledgeProofRequest = {
    id: 1,
    circuitId: CircuitId.AtomicQueryMTPV2,
    optional: false,
    query: {
      allowedIssuers: ['*'],
      type: claimReq.type,
      context:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
      credentialSubject: {
        documentType: {
          $eq: 99
        }
      }
    }
  };
  ```

- Find Credential by Query:

  ```typescript
  const credsForMyUserDID = await credWallet.filterByCredentialSubject(creds, userDID);
  ```

- Generate Signature Proof

  ```typescript
  const { proof, vp } = await proofService.generateProof(proofReq, userDID, credsForMyUserDID[0]);
  ```

#### Output of Run Command

```json
{
  "id": 1,
  "circuitId": "credentialAtomicQueryMTPV2",
  "proof": {
    "pi_a": [
      "16903932334113972519620805189645165148033763067456532043354702748765998282694",
      "14387051041597563972727770449725265194885403144389811266303574540189693314411",
      "1"
    ],
    "pi_b": [
      [
        "20868744201672807105014844766210388217012962602503565070866599032913314573906",
        "3442846801677856242390734660759775202706413077249960437242009573082897426768"
      ],
      [
        "14789189402469891892456734204272864393275089998933018165654790589080248398029",
        "18266210435012639289361922267811624205740064923904412505788791153792745549864"
      ],
      [
        "1",
        "0"
      ]
    ],
    "pi_c": [
      "10584826769880435007204063174646630112221834067523356507551322322080614020116",
      "15098609038306685045480544545659718185382866226369358624875087099910401452336",
      "1"
    ],
    "protocol": "groth16",
    "curve": "bn128"
  },
  "pub_signals": [
    "1",
    "21568225469889458305914841490175280093555015071329787375641431262509208065",
    "1",
    "19898531390599208021876718705689344940605246460654065917270282371355906561",
    "11294568480342416193654942432097549342373955797199827794411652699521935875647",
    "1",
    "15316103435703269893947162180693935798669021972402205481551466808302934202991",
    "1682538797",
    "74977327600848231385663280181476307657",
    "0",
    "17040667407194471738958340146498954457187839778402591036538781364266841966",
    "2",
    "1",
    "99",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0"
  ]
}
```

### Example: Verify Proof

1. Once the proof is generated, Verifier can verify the proof (Signature or MTP).

- Verify Proof:

  ```typescript
  const sigProofOk = await proofService.verifyProof(
    proof,
    CircuitId.AtomicQuerySigV2 // or CircuitId.AtomicQueryMTPV2
  );
  ```
