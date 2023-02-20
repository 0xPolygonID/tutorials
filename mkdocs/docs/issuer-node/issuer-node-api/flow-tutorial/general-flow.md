# Issuer Node: General Flow (Work in Progress!!)

Issuer Node Flow includes:

1. Create New Identity
2. Create New Credential
3. Issue Credential to the User


## Start Issuer Node
 
Following is a summary of the steps taken to make the Issuer Node up and running and initite the database. The database we have chosen is Postgres where all the Identity and claim related data is stored. To see the steps in detail, please read......

1. Run docker-compose.yml file in the identity-server repository. This starts all the four containers: (vault, redis, db, and db-explorer. Please note that, in the current version, we have not used db-explorer. 


2. Add Issuer configuration file to the project.

3. Copy the `Initial Root Token` from the vault container and paste it as the value of the `KS Vault Token` field in the Issuer Configutration File. Without this token being saved in the vault first, one cannot access the vault. There is also a mount path specified in the config file; this is called `KS_Vault_Mount_Path` and it gives partial or full access to the vault. In local environment, for example, this path gives full access to the vay=ult. In Production, however, this access may be selective. 

4. Add Postgres as the database in the Identity Server Project by adding a Data Source. 

5. Run Issuer Configuration file to start the Identity Server.

6. Start another instance of the identity server. Add Publisher configuration file to the project.

7. Store Ethereum Private Key (used for deploying smart contract later) in the vault. This Key belongs to an external wallet which is used for sending the transaction for deploying the contract on-chain. The Key is stored in vault so that no one can have the direct access to the key. 

8. Run Publisher configuration file in the project. This starts the Publisher server. 

The following diagram shows the flow to start the Issuer Server:

<div align="center">
   <img src= "../imgs/sequence-diagram-run.png" align="center" width="700" style="border: 1px solid black"/>
   </div>
   <br>



## Create New Identity

1. Create Storage for the three Merkle trees: Claims Tree, Revocation Tree, and Roots Tree in the database. 

2. Generate a random Baby Jubjub Key (BJJ private key) and store it in the vault (we, in the identity server, are using HashiCorp Vault for storage). This is done to prevent the direct access to this private key. 

3. Generate Public Key from the BJJ private key. Using this public key, auth schema (a template that defines the structure of a claim and how the claim data is stored in a Merkle Tree), and Revocation nOnce (a random number which , if has value, indicates that the claim is revoked an hence is invalid), an `auth claim` is created.

4. The auth claim along with public key is added to the Claims Tree Root. 

5. We perform hashing of the the roots of the three Merkle trees: Claims Tree root, Revocation Tree Root, and Roots Tree Root. The result of this root is a current `Identity State` or the `Genesis State`. Retrieve this `Identity State` to create an `Identifier`.


6. Generate proof for this auth claim. For this a Merkle Tree Proof is created and this MT Proof is added to the auth claim.

7. The auth claim  is stored in the `claims` table in database along with other data  such as claim's revocation status, its expiration date, revocation nonce, and others. THe `Identity State` is saved in the `Identity-States` table  along with other data such as the previous Identity State (if any), along with other details. `Identifier` gets stored in the `Identities` table. The three Merkle trees are stored in the `Identities-mts` while the three roots of the these trees are stored in the `mt-roots` table. 


<div align="center">
   <img src= "../imgs/sequence-diagram-identity.png" align="center" width="700" style="border: 1px solid black"/>
   </div>
   <br>

## Create New Claim 
In this part of the flow, the Issuer Server creates a claim requested by the Integrator and sends it to the Integrator who then stores it in the wallet. 

1. Integrator sends the request for connection; it sends a did (decentralized identifier) document to the Issuer Server. 
2. Issuer Server, after verifying the did document, creates a new connection and sends a push notification to the Integrator. 
3. Integrator calls POST KYCAgeCredential API endpoint (for requesting an age-based claim) to the server. In this request, the Integrator sends details like credential schema, schema type, user's identifier, birthday, and otherbdetails to the Issuer Server.
3. Issuer server stores the schema in its redis cache. It uses the CredentailFetchRequestMessage() function to authenticate the claim request. 
4. Using Process() function, the data slots for claim are selected where the actual data (birth date and documnet type) would be stored.

5. Issuer Server creates an age-based claim using the Create Claim() method while using schema, user identifier, birthday, document type, revocation nonce and expiration date as input parameters.
6. Once a claim is created, it is added to the Merkle Tree as its leaf node. 
7. Using GetAuthClaim() and SignClaimEntry() methods, the Issuer signs the claim and creates a signature proof for this claim. 
8. This signature proof and claim's revocation status are added to the claim. 
9. Claim is stored to the database using Save().
10. Integrator sends request to receive claim from the Issuer using GET KYCAgeCredentail API endpoint. 
11. POST Import KYCAgeCredentail API is called to receive this claim in the Integrator's wallet. 


<div align="center">
   <img src= "../imgs/sequence-diagram-credential-issuance.png" align="center" width="700" style="border: 1px solid black"/>
   </div>
   <br>


## Publish Identity State On-Chain

The Publisher, like the Issuer is a part of the Identity Server and reads any change in an identity's state from the database continuously. When it finds a new state, it publishes the same to the blockchain. The information to publish on-chain is decided by the Publisher. 

Publisher checks `claims` table (to verify if the claim is added to the Claims tree or not), `revocation` table (to verify that the claim is not revoked, and `Identity States` table (to know the latest state of Identity)  from the database. Until the Identity State is not `confirmed`, the state is not published on-chain. The Publsher meeds to wait for a certain number of blocks before the transaction is confirmed and state is updated on-chain. Let us see how this is done in detail:

1. For publishing state on-chain, we require nonRevocationProof() for latest IDentity State. For this, GenerateRevocationProof() is called which uses REvocation Nonce and Revocation Root as the input parameters. 

2. This proof data is used as state transtion inputs to the circuits (that create zero-knowledge proof is created.zkservice.Generate() is used to creates this zk Proof. 
3. The zkProof is bundled with the transaction and Publisher signs this transaction with the Ethereum Key, and finally sends it on-chain. The IDentity State is changed  to `transacted` and updated in the `Identity States` table in the database.
4. This transaction is verified on-chain. After a few blocks, the state of transaction changes to `Confirmed` and Identuty State is published on-chain. 


