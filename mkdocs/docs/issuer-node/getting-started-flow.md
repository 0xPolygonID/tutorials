# Getting Started -  Full Flow Tutorial

This flow details the steps that can be carried out to achieve full integration of the Issuer Node with the Polygon ID APIs.

## Steps of Flow

1. Setup the Issuer Node
2. Create an Identity
3. Create Credential 
4. Create Credential Using Existing Schemas
5. Create a QR Code to Accept Credential


### Setup the Issuer Node

#### Start Issuer Node Using Docker-Compose

1. Start Docker Daemon and use the following command to run all the Vault, Redis, And Postgres containers.

    ```
    make up
    ```

2. Place Ethereum Private Key in Vault. For that, run the following command to start the vault container in the interactive mode. This command is used to go inside the vault and run `sh` or `bsh` commands inside it. 

      ```
      docker exec -it vault-docker-name sh (or bash)
      ```

      where `-it` flag stands for the interactive mode that allows you to interact with the shell of the vault container. `vault-docker-name` is the name of your vault container. 

      As you run this command, it waits for your input. Here, as an input,  we shall place the `Ethereum Private Key` in the vault:

      ```
      vault write iden3/import/pbkey key_type=ethereum private_key=<privkey>
      ```

3. To set up your Issuer Node and make it all up and running, you need to configure it first. This is done using a `config.toml` file. The repository provides you with a `config.toml.sample` file that contains different fields and their sample values. To start configuring these fields, create a `config.toml` file in your repository and paste the contents of the `config.toml.sample` in it. Now you can set values as required:

    - ServerPort: Enter the port on which Issuer Node would start. (Example: 3001)

    - ServerUrl:  If the Issuer Node is to be started locally, enter the localhost URL (for example, http://localhost:3001). If the Issuer Node is to be hosted on Google Cloud or an AWS or some other cloud (instead of being installed locally), enter the URL where the machine is located.

    - Database Url: The database URL that is provided by Docker. For example,
      Url="postgres://polygonid:polygonid@localhost:5432/platformid?sslmode=disable

    - Keystore Address: It is the address of the vault running locally in the docker.  (for example, http://localhost:8200/)

    - Keystore Token: It is the Initial Root Token of the Vault. Copy the value of this token from the Vault container and paste it here. OR, once you have run the docker containers, the token can be copied from this path in the repository: "infrastructure/local/.vault/data/init.out".  

    - Ethereum URL: For this, you first need to sign up on Alchemy. Then create an app; enter app details including chain as Polygon and Network as Polygon Mumbai. Click **View Key** to know your JSON RPC URL and paste it into the field in the Ethereum URL field. 

        <div align="center">
         <img src= "../../imgs/alchemy.png" align="center" style="border: 1px solid black"/>
         </div>
         <br>

    - Ethereum Contract Address: Paste your Ethereum Contract Address here. 

4. Run the following command to start the Issuer Node:

      ```
      make run
      ```

#### Start Issuer Node in the Standalone Mode 

In the Standalone Mode, we compile the Issuer Node and create the executables to run it without using docker.

1. Configure the `config.toml` file like you did in the previous section.

2. Run this command:

      ```
      make build
      ```
This command will compile and create binaries for `Platform` (for APIs), `Migrate` (for creating database schemas from scratch) and `Pending_Publisher`(to check transactions sent to blockchain)

3. Make sure that Vault, Redis, and Postgres are all running. 

4. Configure your database using the following command:

      ```
      make db/migrate
      ```

5. Run this command to start the Issuer Node:

      ```
      ./bin/platform
      ```

    This starts the Issuer Node. 

6. Run the following command to start the Pending_Publisher service:

      ```
      ./bin/pending_publisher
      ```

### Authenticate to Send Requests

Before you can start making API calls to the Issuer Node with endpoints, you need to authenticate first with a username and a password. This is done using the `Authentication` endpoint using Postman or your own API platform. 

### Create Identity

Next, you need to create an Identity for the issuer/user. For this, make a call to the `Create Identity` endpoint. You need to enter the server URL (where you started the Issuer Node) in the request URL. The
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
"identifier": "string",
"state": {
"stateID": 0,
"identifier": "string",
"state": "string",
"rootOfRoots": "string",
"claimsTreeRoot": "string",
"revocationTreeRoot": "string",
"blockTimestamp": 0,
"blockNumber": 0,
"txID": "string",
"previousState": "string",
"status": "string",
"modifiedAt": "1970-01-01T00:00:00.000Z",
"createdAt": "1970-01-01T00:00:00.000Z"
}}
```

### Create Credential

Post Identity creation, you can start the process of credential creation. For this, the `Create Claim` endpoint is used. The `identifier` (or `id`) of the issuer/user you generated in the previous step is passed in the request URL. `credentialSchema` (schema on which credential's format would be based) and `credentialSubject` (Subject details such as `id`(user's wallet id ), and other information (for example, birthday) are passed in the request body. 

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
"id": "string"
}
```

### Create Credential Using Existing Schemas

In the previous section, you saw how to create a credential by calling the endpoint. There is an alternative way to do this. You can create credentials by using existing credential schemas on a demo Issuer website. 

**Steps to Create Credential**

1. Onthe Issuer website, click **Signup**.

    <div align="center">
    <img src= "../imgs/signup.png" align="center" width="300"/>
    </div>
    <br>

    It shows the QR code on the screen:

    <div align="center">
    <img src= "../imgs/qr-code-display.png" align="center" width="200"/>
    </div>
    <br>

2. Open Polygon ID app and authenticate with pin/biometrics

    <div align="center">
    <img src= "../imgs/authenticate.png" align="center" width="200" height="400"/>
    </div>
    <br>

3. On the app, click **Connect**.

    <div align="center">
    <img src= "../imgs/connect.jpg" align="center" width="200" height="400" border="2"/>
    </div>
    <br>

4. With the app, scan the QR code displayed on the site and click **Connect Wallet**. 

    <div align="center">
    <img src= "../imgs/connect-wallet.jpg" align="center" width="200" height="400" border="1"/>
    </div>
    <br>

5. Authenticate again with your pin/biometrics. This starts the authentication of the user's wallet. 

    <div align="center">
    <img src= "../imgs/authenticating.png" align="center" width="200" height="400" border="1"/>
    </div>
    <br>

    After the authentication process is complete, the app shows the message if the identity is successfully authenticated or if it failed to authenticate.  

    <div align="center">
    <img src= "../imgs/authenticated.png" align="center" width="200" height="400" border="1"/>
    </div>
    <br>

6. On the demo website, click **Create Claim**.

    <div align="center">
    <img src= "../imgs/create-credentials.png" align="center" width="200"  border="1"/>
    </div>
    <br>

    This shows the **Create Claim** window:

    <div align="center">
    <img src= "../imgs/create-cred-window.png" align="center" width="200"  border="1"/>
    </div>
    <br>

7. Click the ***Schema*** dropdown menu and select the type of schema you want to use for creating a credential. 

    Please note that in addition to selecting the schemas displayed on the menu, you can also select **Custom** to use your own schema. But for this flow, we are using a pre-existing KYCAGeCredential type of schema. As you select this schema, the JSON URL and JSON-LD Context URL are auto-populated under the ***URL*** and the ***Type*** fields. The ***Expiration*** (date on which the credential shall expire) and the ***Data JSON*** are also auto-populated. Click **Submit**

    <div align="center">
    <img src= "../imgs/select-schema.png" align="center" width="200"  border="1"/>
    </div>
    <br>

    This creates a new credential.

    <div align="center">
    <img src= "../imgs/credential-created.png" align="center" width="200"  border="1"/>
    </div>
    <br>

8. Once a credential is created, you can view it on the Issuer site. For this, click the icon to open and view the credential. 

    <div align="center">
    <img src= "../imgs/open-credential-link.png" align="center" width="500" border="1"/>
    </div>
    <br>

### Create QR Code to Accept a Credential

With the `Get Claim QR Code` endpoint, you can generate a JSON which is then used to create a QR code. A user can use a third-party application to generate a QR Code from this JSON. 

The identifier `did` of the user that we generated with the `Create Identity` endpoint and Credential Id `cid` that we generated in the `Create Claim` endpoint are passed as the path variable in the request URL. 

The Issuer Node responds by sending a JSON. 

```
{
"id": "string",
"typ": "string",
"type": "string",
"thid": "string",
"body": {
"url": "string",
"credentials": [
{
"id": "string",
"description": "string"
}]},
"from": "string",
"to": "string"
}
```

where `credentials` contains the credential id (`cid`) and the related schema link. 

`url` is the address to which the user's mobile  calls the endpoint. 

`from` is the `did` of the Issuer.

`to` is the `did` of the user's wallet.

`typ` and `type` indicate the way user's wallet interacts with the Node. 

Copy this JSON and paste it on a third-party website that can generate a QR code. 

<div align="center">
    <img src= "../imgs/qr-code-generated.png" align="center" width="200"  border="1"/>
    </div>
    <br>

The user can scan this QR Code using the Polygon ID app and accept the credentials.

<div align="center">
    <img src= "../imgs/credential-offer.jpg" align="center" width="200"  border="1"/>
    </div>
    <br>

This adds the credential to the user's wallet. 

<div align="center">
    <img src= "../imgs/adding-credential.jpg" align="center" width="200"  border="1"/>
    </div>
    <br>
