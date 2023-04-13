# Getting Started -  Full Flow Tutorial

This flow details the steps that can be carried out to achieve full integration of the Issuer Node with the Polygon ID APIs.

:::tip Video Tutorial Available

For a more detailed walkthrough check out [<ins>this video tutorial</ins>](https://www.youtube.com/watch?v=KprrgVpIW5A)  from [@CodingWithManny](https://github.com/codingwithmanny). 

The video tutorial walks over the following guide [<ins>issuer node setup guide</ins>](https://github.com/codingwithmanny/0xPolygonID--sh-id-platform/tree/docs/readme-walkthrough) which has additional details on how to setup the issuer node. 

:::

## Steps of Flow

1. Setup the Issuer Node
2. Create an Identity
3. Create Credential 
4. Create a QR Code to Accept Credential

## Setup the Issuer Node

The Issuer Node can be set up in two ways: using [Docker](#start-issuer-node-using-docker-compose) or in the [Standalone Mode](#start-issuer-node-in-the-standalone-mode). If you are using the M1/M2 chip on your Mac, it is advised to run it using the Standalone Mode.

#### Start Issuer Node Using Docker-Compose

1. Clone the Issuer Node repository from [here](https://github.com/0xPolygonID/sh-id-platform)

2. Start Docker Daemon 

3. From inside your repository use the following command to run the Vault, Redis, And Postgres containers. 

    ```
    make up
    ```

    With this, the system runs a `docker-compose` command to start the redis, postgres, and vault containers:

      ```
      docker-compose -p “project name” -f path/docker-compose.yml up -d redis postgres vault

      ```

    where the `path` shows the location of the docker-compose.yml file.

      
    This starts the Postgres, Redis, and Vault containers:
    <br>
      <div align="center">
         <img src= "../../imgs/makeup.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

      To verify that the containers are running, execute this command:

      ```
      docker ps
      ```
      This lets you see all the containers that are currently running along with their statuses and ports.

      <div align="center">
         <img src= "../../imgs/docker-ps.png" align="center" style="border: 1px solid black"/>
         </div>
      <br>

    > Note: Use these docker images only for evaluation purposes. For production, you must secure each of these services first. 

4. <a id="issuer-node-using-docker"></a>Add Ethereum Private Key to the Vault. For this, run the following command to start the vault container in the interactive mode. This command is used to go inside the vault and run `sh` or `bsh` commands inside it. 

      ```
      docker exec -it sh-id-platform-test-vault sh
      ```

      <!-- where `-it` flag stands for the interactive mode that allows you to interact with the shell of the vault container. `vault-docker-name` is the name of your vault container.  -->

      As you run this command, it waits for your input. Here, as an input,  we shall place the `Ethereum Private Key` in the vault:

      ```
      vault write iden3/import/pbkey key_type=ethereum private_key=<privkey>
      ```

      <div align="center">
         <img src= "../../imgs/ethereum-priv-key.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

      With this, the Ethereum Private Key is written into the vault container. 

5. To set up your Issuer Node and make it all up and running, you need to configure it first. This is done using a `config.toml` file. The repository provides you with a `config.toml.sample` file that contains different fields and their sample values. To start configuring these fields, create a `config.toml` file in your repository and paste the contents of the `config.toml.sample` in it. A few fields need to be configured before you can start the Issuer Node.

    - ServerUrl:  If the Issuer Node is to be started locally, enter the localhost URL (for example, http://localhost:3001). If the Issuer Node is to be hosted on Google Cloud or an AWS or some other cloud (instead of being installed locally), enter the URL where the machine is located. **Note:** In order to communicate with the Polygon ID Wallet App, the Issuer Node must be hosted on a public URL. For a local setup, you can use [ngrok](https://ngrok.com/) to expose your local server to the internet.

    - Keystore Token: It is the Initial Root Token of the Vault. Copy the value of this token from the Vault container and paste it here. OR, once you have run the docker containers, the token can be copied from this path in the repository: "infrastructure/local/.vault/data/init.out".  

    - Ethereum URL: enter a valid JSON RPC URL for Polygon Mumbai. 

6. Run the following command to start the Issuer Node:

      ```
      make run
      ```

    This starts the Issuer Node at the port specified in the `config.toml` file. 
      <div align="center">
      <img src= "../../imgs/node-start.png" align="center" style="border: 1px solid black"/>
      </div>
     

#### Start Issuer Node in the Standalone Mode 

In the Standalone Mode, we compile the Issuer Node and create the executables to run it without using docker.

1. Clone the Issuer Node repository from [here](https://github.com/0xPolygonID/sh-id-platform)

2. Run this command:

      ```
      make build
      ```
This command will compile and create binaries for `Platform` (for APIs), `Migrate` (for creating database schemas from scratch), and `Pending_Publisher`(which is a program that runs in the background and gets the failed transactions and retries them).

    <div align="center">
         <img src= "../../imgs/make-build.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

3. Make sure that Vault, Redis, and Postgres are all up and running. You can use the `make up` command to start the containers (but as mentioned previously, use these images only for evaluation purposes):

    ```
    make up
    ```
    <div align="center">
         <img src= "../../imgs/makeup.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

4. Add Ethereum Private Key to the Vault; for this, follow step 4 of the previous section.

5. Configure the `config.toml` file like you did in the previous section at step 5.

6. Configure your database using the following command:

      ```
      make db/migrate
      ```
    <div align="center">
         <img src= "../../imgs/migration-done.png" align="center" style="border: 1px solid black"/>
         </div>
        

    This checks the current structure of the database, and accordingly, either creates or updates the database. 

7. Run this command to start the Issuer Node:

      ```
      ./bin/platform
      ```

    <div align="center">
         <img src= "../../imgs/issuer-node-starts.png" align="center" style="border: 1px solid black"/>
         </div>
        

    This starts the Issuer Node. You can now browse to the port configured for your server (ServerPort)in the `config.toml` file and view the API documentation. For example, this could be http://localhost:3001.

8. Run the following command to start the Pending_Publisher service:

      ```
      ./bin/pending_publisher
      ```

    <div align="center">
         <img src= "../../imgs/publisher-started.png" align="center" style="border: 1px solid black"/>
         </div>

### Authenticate to Send Requests

Before you can start making API calls to the Issuer Node with endpoints, you need to authenticate first with a `username` and a `password`. This is done using the Basic Auth endpoint using Postman or your own API platform. That usernmae and password are the ones that you have configured in the `config.toml` file.

## Create Identity

Next, you need to [create an Identity](./issuer-node-api/identity/apis.md#create-identity) for the issuer/user. For this, make a call to the `Create Identity` endpoint. The
`didMetaData` is passed in the request body. This metadata is required to create Issuer's DID.

```
{
  "didMetadata": {
    "method": "polygonid",
    "blockchain": "polygon",
    "network": "mumbai"
  }
}
```
The Issuer Node responds by sending a response message that contains:
`identifier` (Identifier of the Issuer) and the `identity state` (the state of the identity). This `identifier` would be used to create credentials as we would see in the next step. 

```
{
    "identifier": "did:polygonid:polygon:mumbai:2qNDpfD8A2zjdiDbrzKsKe5XoP583FeBkpPyJnUEVx",
    "state": {
        "claimsTreeRoot": "96041fd8c899994d8b493c9f844f8ff17f1218e5400bfe68cc659b5386a88b07",
        "createdAt": "2023-02-22T14:55:34.89165+05:30",
        "modifiedAt": "2023-02-22T14:55:34.89165+05:30",
        "state": "569bd6c053d6ddf463245127a82570841a76099a4dab3c279c6b461cf0438408",
        "status": "confirmed"
    }
}
```

## Create Credential

Post Identity creation, you can start the process of credential creation. For this, the [`Create Claim`](./issuer-node-api/claim/apis.md#create-claim) endpoint is used. The `identifier` (or `id`) of the issuer you generated in the previous step is passed as path parameter in the request URL. `credentialSchema` (schema on which credential's format would be based) and `credentialSubject` (Subject details such as `id`(user's wallet id ), and other information related to the credential schema (for example, in this case, `birthday` and `documentType`) are passed in the request body. 

```
{
    "credentialSchema":"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
    "type": "KYCAgeCredential",
    "credentialSubject": {
        "id": "{user's wallet did}",
        "birthday": 19960424,
        "documentType": 2
    },
    "expiration": 12345
}
```
The Issuer Node responds by sending a credential id string. When this credential is later issued to the user, it gets stored in the user's wallet along with the credential's id string.

```
{
    "id": "9c08a414-b29c-11ed-9bd2-2e7e0e869740"
}
```

## Create QR Code to Accept a Credential

**Note:** In order to communicate with the Polygon ID Wallet App, the Issuer Node must be hosted on a public URL.

With the [`Get Claim QR Code`](./issuer-node-api/claim/apis.md#get-claim-qr-code) endpoint, you can generate a JSON which is then used to create a QR code. A user can use a third-party application to generate a QR Code from this JSON. 

The identifier `did` of the issuer that we generated with the `Create Identity` endpoint and Credential Id `cid` that we generated in the `Create Claim` endpoint are passed as the path parameters in the request URL. 

The Issuer Node responds by sending a JSON. 

```
{
    "body": {
        "credentials": [
            {
                "description": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld#KYCAgeCredential",
                "id": "75d7ca20-b1ea-11ed-9bd2-2e7e0e869740"
            }
        ],
        "url": "http://localhost:3001/v1/agent"
    },
    "from": "did:polygonid:polygon:mumbai:2qPUbMiYD8qFVjM6KLTY5qSMQpR9x6aSRfNByRkckm",
    "id": "cf858ea9-ab66-4c3c-8c55-e99885b086e0",
    "thid": "cf858ea9-ab66-4c3c-8c55-e99885b086e0",
    "to": "did:polygonid:polygon:mumbai:2qNZRvFrnVfANm9UTJ3Wn3AP4wmy9CUvX1qpYE28up",
    "typ": "application/iden3comm-plain-json",
    "type": "https://iden3-communication.io/credentials/1.0/offer"
}
```

where `credentials` contains the credential id (`cid`) and the related schema link. 

`url` is the address at which the user's wallet makes a call to the endpoint.

`from` is the `did` of the Issuer.

`to` is the `did` of the user's wallet.

`typ` and `type` indicate the way user's wallet interacts with the Node. 

Copy this JSON and paste it on a third-party website that can generate a QR code. 

<div align="center">
    <img src= "../../imgs/qr-code-generated.png" align="center" width="200"  border="1"/>
    </div>
<br>

The user can scan this QR Code using the Polygon ID app and accept the credentials.

<div align="center">
    <img src= "../../imgs/credential-offer.jpg" align="center" width="200"  border="1"/>
    </div>
    

This adds the credential to the user's wallet. 

<div align="center">
    <img src= "../../imgs/adding-credential.jpg" align="center" width="200"  border="1"/>
    </div>
<br>

<div align="center">
    <img src= "../../imgs/cred-added.png" align="center" width="200"  border="1"/>
    </div>

