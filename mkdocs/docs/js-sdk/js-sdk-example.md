# JS SDK EXample

This tutorial shows an example of how to run JS SDK for its different functionalities. 


## Example: Identity Creation 

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

    ## Run Example Code

    We have created a [JS SDK Example repository](https://github.com/iden3/polygonid-js-sdk-examples/blob/main/index.ts) that you can download and run. Follow these steps  before you run this code:

    1. Download the latest circuits  from the following curl command:

    ```
    curl https://iden3-circuits-bucket.s3.eu-west-1.amazonaws.com/latest.zip --output latest.zip
    ```
    where s3 is a bucket that has been created for storing the circuits data in one of the Amazon Simple Storage Service (Amazon S3) for specific regions across the globe. 

    The `latest.zip` folder is accessed from the s3 bucket and is output to the local `latest.zip` file.  

    Unzip the `latest.zip` folder downloaded above to the `circuits` folder in the repository:

    ```
    unzip latest.zip -d circuits
    ```
    
    2.  To run the scripts, set the values for the following variables:

    export WALLET_KEY="...key in hex format with matic balance"
    export RPC_URL="...url to polygon mumbai network rpc node"
    export RHS_URL="..reverse hash service url"
    export CONTRACT_ADDRESS="..state v2 contract address in the mumbai network"
    export CIRCUITS_PATH="..path to the circuits folder"

    3. Run NPM. For this NPM must be installed on your system. 

    ```
    npm run start
    ```

   **Example Output**

  <!-- Paste the output here -->

    - If you do not pass `rhsUrl` while running the Identity Creation Module,

<!-- Paste the output here -->

    - If you pass `rhsUrl` while running the Identity Creation Module, 

<!-- Paste the output here -->


