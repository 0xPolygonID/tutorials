# Issuer Node Overview

The Issuer Node is a self-hosted Node that any implementer can quickly set up and integrate into their application. Once the setup is completed, the Issuer Node exposes all the functionalities necessary to run an issuer such as:
 
- Create, manage, and revocate an identity on behalf of the Issuer
- Issue Credentials to an identity
- Share Credentials to the user's wallet
- Publish [identity states](https://docs.iden3.io/getting-started/identity/identity-state/) on-chain 
- Manage data communication protocols between wallet agents 

 
The Issuer Node can generate multiple identities for multiple Issuers and manages the states of these identities by updating the state stored on-chain. 
 
The Issuer Node provides API endpoints for the integrator's applications; these include endpoints for the requests to create an identity, issue credentials to the user and revocate credentials.  

## Recommended Installations for Issuer Node
 
Though not mandatory, it is good to have the following software installed on your system:

- **Docker Daemon/Engine**: Docker Daemon or Docker Engine must be installed on your system.
- **Docker Compose**: Docker Compose must be installed on your system. Docker Compose is used to start multiple containers together.


    > Note: You can install Docker Daemon and Docker Compose separately. Alternatively, you can install [Docker Desktop]((https://docs.docker.com/desktop/)) which includes both Daemon and Docker Compose. It is a tool to build and run containers for your applications. Due to its simplistic model, it removes the need to use CLI(Command Line Interface) to do core actions. With Docker Desktop, you can manage your containers from your application itself. 

- **Go**: If you intend to run the Issuer Node on an IDE, install the latest version of Go. If the Go backend is dockerized like other containers, there is no need to install Go locally. 

- **Makefile**: A Makefile automates the software building process and contains rules that determine which parts of the program need to be recompiled. It consists of all the rules for different dependencies. The Makefile can be accessed using the `make` command. 

    > Note: If you intend to run the Issuer Node via an IDE (Integrated Development Environment), you can have any IDE installed on your system. Please note that the Issuer Node is platform-agnostic and can be run via CLI, IDE, and can be deployed on the cloud also. You can run it as a standalone server also. 
 
## Issuer Node Components
 
The Issuer Node comprises the following components and each one of these components can be either dockerized or each one of these can be launched as separate services. 

- **Issuer Application** to issue the Verifiable Credentials to an entity.

- **Vault**: Based on HashiCorp, the Vault is used in the Issuer Node for providing key management services. It helps to secure sensitive data, such as the private key of the issuer, thus protecting them in a secure way. The Vault has been provided with a plugin called `vault-plugin-secrets-iden3`; this plugin is used to sign the data with [Baby Jubjub keys](https://docs.iden3.io/getting-started/babyjubjub/) that are stored in the Vault. The `KS_Vault_Mount_Path` is an environment variable that we define in the Issuer Node's `config.toml` file and by providing its value... 
 
- **Redis**: Redis is used for caching the schemas that we use in the Issuer Node. The schemas are downloaded from IPFS and stored on Redis. This way, every time, the Issuer Node issues a Credential, it doesn't need to fetch the schemas from an external source; it can fetch it directly from Redis. This boosts the performance of the application. 
 
- **DB**: This container is used as the data source for the Issuer Node. In our implementation of the Issuer Node, we have used Postgres as the database. It is where all the data related to issued credentials are stored. 

    > Note: In a testing environment, you can run the Vault, Redis, and Postgres services inside a docker. But for production, you are advised to secure these services first before using them. 

## Core Libraries Used in Issuer Node
 
The Issuer Node is built with:
 
- [go-iden3-core](https://github.com/iden3/go-iden3-core): Go implementation of iden3 core functionality  
- [go-iden3-crypto](https://github.com/iden3/go-iden3-crypto): Go implementation of important cryptographic elements including baby jubjub key, Keccak256, and poseidon 
- [go-merkletree-sql](https://github.com/iden3/go-merkletree-sql): Go implementation of Merkle tree based on the library of circuit templates
