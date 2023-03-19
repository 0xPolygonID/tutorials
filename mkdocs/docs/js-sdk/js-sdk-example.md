# JS SDK Example

This tutorial shows the steps to run different modules of the Polygon ID JS SDK with example code. After the steps for each module, you will find a sample output which is generated when these modules are run.   

## Steps to Run Example Code

  We have created a [JS SDK Example repository](https://github.com/iden3/polygonid-js-sdk-examples/blob/main/index.ts) that you can download and run. Follow these steps:

  1. Download the latest circuits  from the following curl command:

      ```
      curl https://iden3-circuits-bucket.s3.eu-west-1.amazonaws.com/latest.zip --output latest.zip
      ```
      where s3 is a bucket that has been created for storing the circuits' data in one of the Amazon Simple Storage Service (Amazon S3) for specific regions across the globe. 

      The `latest.zip` folder is accessed from the s3 bucket and is output to the local `latest.zip` file.  

      Unzip the `latest.zip` folder downloaded above to the `circuits` folder in the repository:

      ```
      unzip latest.zip -d circuits
      ```
    
  2.  To run the scripts, set the values for the following variables:

      ```
      export WALLET_KEY="...key in hex format with matic balance"
      export RPC_URL="...url to polygon mumbai network rpc node"
      export RHS_URL="..reverse hash service url"
      export CONTRACT_ADDRESS="..state v2 contract address in the mumbai network"
      export CIRCUITS_PATH="..path to the circuits folder"
      ```

  3. Run the ***npm*** command. For this, Node.js (which contains the npm package) must be installed on your system. 

      ```
      npm run start
      ```


### Example: Identity Creation 

1. The first step towards identity creation is to initialize `DataStorage`, `CredentialWallet`, and `IdentityWallet`.

    ```
    async function identityCreation() {
    console.log("=============== key creation ===============");

    const dataStorage = initDataStorage();
    const credentialWallet = await initCredentialWallet(dataStorage);
    const identityWallet = await initIdentityWallet(
    dataStorage,
    credentialWallet
    );
    ```

  - Initialize `DataStorage`: To initialize `DataStorage`, we need a new `CredentialStorage`, which could be as simple as a Memory Data Storage (`InMemoryDataSource`). Using Memory Data Storage for new credential storage is not recommended for the production environment. Instead, we could use Browser Data Storage or any other data storage. 


    ```
    var dataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
      new InMemoryDataSource<Identity>(),
      new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),

    states: new EthStateStorage(defaultEthConnectionConfig),
    };
    ```

    > Note: The `CredentialStorage` accepts the interface of the Data Storage; it does not require Memory or Browser Storage. You can implement your own storage, be it  SQL storage or any other type of storage. 

    `IdentityStorage` stores identities and profiles. 
    `mt` stores Merkle Trees. 
    `states` stores Ethereum states of identities. 

- Initialize `IdentityWallet`: To initialize Identity Wallet, we need `dataStorage`, `CredentialWallet`, and `kms` (Key Management System).

    ```
    async function initIdentityWallet(
    dataStorage: IDataStorage,
    credentialWallet: ICredentialWallet
    ): Promise<IIdentityWallet> {
    const memoryKeyStore = new InMemoryPrivateKeyStore();
    const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
    const kms = new KMS();
    kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);

    return new IdentityWallet(kms, dataStorage, credentialWallet);
    }
    ```
    For `kms`, we need to define a `provider` that works with keys. For example, we can provide a Baby Jubjub Provider (`BJJProvider`) or an Ethereum Key Provider, or a Register Key Provider(`registerKeyProvider`), to name a few. For each Provider, we need to pass the storage: `AbstractPrivateKeyStore`. This storage allows you to create customized encrypted storage. For demo purposes, we have used `memoryKeyStore`. So in the nutshell, we create storage(`memoryKeyStore`), pass it to the Provider(`BJJProvider`), and register this Provider in Key Management System(`registerKeyProvider`).

2. After initialization is complete, we need to pass a `hostUrl`, which is a part of the Auth BJJ Credential Identifier. In the following example, the `hostUrl` is **http://wallet.com/**. We also need to define the parameters including `method`,   `blockchain`, `networkId`, and/or `rhsUrl`. 

    ```
    const { did, credential } = await identityWallet.createIdentity(
    "http://wallet.com/", 
    {
      method: core.DidMethod.Iden3,
      blockchain: core.Blockchain.Polygon,
      networkId: core.NetworkId.Mumbai,
      rhsUrl,
    }
    );
    ```
    > Note: We may or may not provide the `rhsUrl`. Depending upon which option we choose, when we run our example code, the outputs will differ as we would see in the following section. 

 #### Output of Run Command
 
 <!-- Paste the output here -->

  As you can see in the output above, `createIdentity()` generates an Identifier, a Verifiable Credential, and credential status.

  - If we use `rhsUrl` within createIdentity() method, we get a `credentialStatus` with a Reverse Hash Service URL (`rhsUrl`) as `id`, which, upon running on a browser, shows a response that contains information about the identity state. Also, in this case, the `type` of the `credentialStatus` is `iden3ReverseSparseMerkleTreeProof`.


    ```
    "credentialStatus": {
    "id": "https://rhs-staging.polygonid.me", 
    "revocationNonce": 0,
    "type": "iden3ReverseSparseMerkleTreeProof"
    }
    ```
  - If we do not use `rhsUrl` within createIdentity() method, we get a `credentialStatus` with a URL as `id`, which contains an API to fetch the revocation status. Also, in this case, the `type` of the `credentialStatus` is `SparseMerkleTreeProof`.

    ```
    "credentialStatus": {
    "id": "http://wallet.com/revocation/0",
    "revocationNonce": 0,
    "type": "SparseMerkleTreeProof"
    }
    ```

  ### Example: Issue Credential 

  1. Initialize all storage types.
  
      ```
      async function issueCredential() {
      console.log("=============== issue credential ===============");

      const dataStorage = initDataStorage();
      const credentialWallet = await initCredentialWallet(dataStorage);
      const identityWallet = await initIdentityWallet(
      dataStorage,
      credentialWallet
      );
      ```
  2. Create User's Identity (`userDID`):

      ```
      const { did: userDID, credential: authBJJCredentialUser } =
      await identityWallet.createIdentity(
      "http://wallet.com/", 
      {
        method: core.DidMethod.Iden3,
        blockchain: core.Blockchain.Polygon,
        networkId: core.NetworkId.Mumbai,
        rhsUrl,
      }
      );
      ```
      where **http://wallet.com/** is the hostUrl and is a part of the Auth BJJ Credential. It is used to fetch the revocation status of the Auth BJJ Credential. 
   

  3. Create Issuer's Identity (`issuerDID`):

      ```
      const { did: issuerDID, credential: issuerAuthBJJCredential } =
      await identityWallet.createIdentity(
      "http://wallet.com/", 
      {
        method: core.DidMethod.Iden3,
        blockchain: core.Blockchain.Polygon,
        networkId: core.NetworkId.Mumbai,
        rhsUrl, 
      }
      );
      ```

  4. Create Credential Request (`credentialRequest`):

      ```
      const credentialRequest: CredentialRequest = {
      credentialSchema:
      "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
      type: "KYCAgeCredential",
      credentialSubject: {
      id: userDID.toString(),
      birthday: 19960424,
      documentType: 99,
      },
      expiration: 12345678888,
      };
      ```
  5. Issue Credential (`issueCredential`):

      ```
      const credential = await identityWallet.issueCredential(
      issuerDID,
      credentialRequest,
      "http://wallet.com/",
      {
      withRHS: rhsUrl, 
      }
      );

      ```

      > As we mentioned in the case of creating identity, if we use `withRHS` to issue a credential, we get a `credentialStatus` with a Reverse Hash Service URL (`rhsUrl`) as `id`. If we do not pass, we receive a URL that contains APIs to fetch the revocation status of the credential. 

  #### Output of Run Command 
 
 <!-- Paste the output here -->
  <br>

   ### Example: Generate Proof

  1. Initialize all storages including
`dataStorage`, `identityWallet`, `credentialWallet`, `circuitStorage`, and `proofService`. 

  2. Create User's Identity (`userDID`)

      ```
      const { did: userDID, credential: authBJJCredentialUser } =
      await identityWallet.createIdentity(
      "http://wallet.com/", 
      {
        method: core.DidMethod.Iden3,
        blockchain: core.Blockchain.Polygon,
        networkId: core.NetworkId.Mumbai,
        rhsUrl,
      }
      );
        ```
      where **http://wallet.com/** is the `hostUrl` and is a part of the Auth BJJ Credential. It is used to fetch the revocation status of the Auth BJJ Credential. 

  3. Create Issuer's Identity (`issuerDID`):

      ```
      const { did: issuerDID, credential: issuerAuthBJJCredential } =
      await identityWallet.createIdentity(
      "http://wallet.com/", 
      {
      method: core.DidMethod.Iden3,
      blockchain: core.Blockchain.Polygon,
      networkId: core.NetworkId.Mumbai,
      rhsUrl,
      }
      );
      ```
4.  Create Credential Request (`credentialRequest`):

    ```
    const credentialRequest: CredentialRequest = {
    credentialSchema:
      "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
    type: "KYCAgeCredential",
    credentialSubject: {
      id: userDID.toString(),
      birthday: 19960424,
      documentType: 99,
    },
    expiration: 12345678888,
    };
    ```

5. Issue Credential (`issueCredential`):

    ```
    const credential = await identityWallet.issueCredential(
    issuerDID,
    credentialRequest,
    "http://wallet.com/", 
    {
      withRHS: rhsUrl, 
    }
    );

    ```

6. Save Credential(` saveCredential`):

    ```
    dataStorage.credential.saveCredential(credential);
    ```
7.   Add Credentials to Merkle Tree (`addCredentialsToMerkleTree`):

      ```
      const res = await identityWallet.addCredentialsToMerkleTree(
      [credential],
      issuerDID
      );
      ```   
8. Publish state to Reverse Hash Service(`publishStateToRHS`) and then to blockchain.

    ```
    await identityWallet.publishStateToRHS(issuerDID, rhsUrl);
    ```

    ```
    const ethSigner = new ethers.Wallet(
    walletKey,
    (dataStorage.states as EthStateStorage).provider
    );
    ```
9. Transit State(`transitState`)

    ```
    const txId = await proofService.transitState(
    issuerDID,
    res.oldTreeState,
    true,
    dataStorage.states,
    ethSigner
    );
    ```
    The transaction ID(`txId`) is sent to the network. 

      ```
      console.log(txId);
      ```

10. Generate Signature Proof for `ZeroKnowledgeProofRequest`. It uses the **AtomicQuerySignV2** as the `CircuitId`.

- Processes Proof Request:
  ```
  const proofReqSig: ZeroKnowledgeProofRequest = {
    id: 1,
    circuitId: CircuitId.AtomicQuerySigV2,
    optional: false,
    query: {
      allowedIssuers: ["*"],
      type: credentialRequest.type,
      context:
        "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
      credentialSubject: {
        documentType: {
          $eq: 99,
        },
      },
    },
  };
  ```
- Find Credential by Query:

  ```
  let credsToChooseForZKPReq = await credentialWallet.findByQuery(
    proofReqSig.query
  );
  ```

- Generate Signature Proof 

  ```
    const { proof } = await proofService.generateProof(
    proofReqSig,
    userDID,
    credsToChooseForZKPReq[0]
  );
  ```
11. Generate Merkle Tree Proof(`generateIden3SparseMerkleTreeProof`). It uses the **AtomicMTPV2** as the `CircuitId`.

- Processes Proof Request:

  ```
  const proofReqMtp: ZeroKnowledgeProofRequest = {
    id: 1,
    circuitId: CircuitId.AtomicQueryMTPV2,
    optional: false,
    query: {
      allowedIssuers: ["*"],
      type: credentialRequest.type,
      context:
        "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
      credentialSubject: {
        birthday: {
          $lt: 20020101,
        },
      },
    },
  };
  ```

- Find Credential by Query:

  ```
  credsToChooseForZKPReq = await credentialWallet.findByQuery(
    proofReqSig.query
  );
  ```

- Generate Merkle Tree Proof. 

  ```
  const { proof: proofMTP } = await proofService.generateProof(
    proofReqMtp,
    userDID,
    credsToChooseForZKPReq[0]
  );
  ```
 #### Output of Run Command 
 
 <!-- Paste the output here -->
<br>

### Example: Verify Proof 
1. Once the proof is generated, Verifier can verify the proof (Signature or MTP).

- Verify Signature Proof:

  ```
  const sigProofOk = await proofService.verifyProof(
    proof,
    CircuitId.AtomicQuerySigV2
  );
  ```
- Verify Merkle Tree Proof:
  ```
  console.log(JSON.stringify(proofMTP));
  const mtpProofOk = await proofService.verifyProof(
    proof,
    CircuitId.AtomicQueryMTPV2
  );
  ```
#### Output of Run Command 
 
 <!-- Paste the output here -->
    
    
  

   
   
   
   
   
   
   
   
   

   





