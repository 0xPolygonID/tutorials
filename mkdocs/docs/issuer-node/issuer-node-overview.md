# Issuer Node Overview

Based on the specifications laid down in the iden3 protocol, the Issuer Node is an application that provides following services to its clients:
 
- Create, manage, and revocate an identity
- Issue claims to an identity
- Transfer claims of an identity to a user's wallet
- Publish identity states on-chain 
- Manage data communication protocols between wallet agents
- Generate zero-knowledege proofs for an identity using circuits
 

The Issuer Node can generate multiple identities for multiple users and the updated states of these identities are published on-chain. 
 
The Issuer Node provides API endpoints for user's applications; these include endpoints for the requests to create identity for a user, issue credentials to the user and revocate invalid or expired credentials.  

The Issuer Node is composed of an Issuer application, which is used to issue Verifiable Credentials to users. 

## Issuer Node Prerequisites
 
Before building and running Issuer Node, you need to have the following installed on your system:

- **Docker Daemon/Engine**: Docker Daemon or Docker Engine must  be installed on your system.
- **Docker Compose**: Docker Compose must be installed on your system. Docker Compose is used to start the multiple containers together.

> Note: You can install Docker Daemon and Docker Compose separately. Alternatively, you can install [Docker Desktop]((https://docs.docker.com/desktop/)) which includes both Daemon and Docker Compose. It is a tool to built and run containers for your applications. Due to its simplistic model, it removes the need to use CLI(Command Line Interface) to do core actions. With Docker Desktop, you can manage your containers from your application itself. 

- **Go**: If you intend to run the Issuer Node on an IDE, install the latest version of Go. If the Go backend is dockerized like other containers, there is no need to install Go locally.  

> Note: If you intend to run the Issuer Node via an IDE (Integrated Development Enviorment), you must have an IDE installed on your system. Please note that the Issuer Node is platform-agnostic and can be run via CLI, IDE, and even be deployed on cloud. For these tutorials, we shall explain how to run the Issuer Node on [GoLand IDE](https://www.jetbrains.com/go/). 
 
## Issuer Node Components
 
The Issuer Node comprises of the following components and each one of these components can be either dockerized or can be launched as separate services. 

- **Issuer Application** to issue the Verifiable Credentails to an entity.

- **Vault**: Based on HashiCorp, the Vault is used in the Issuer Node for providing key management services. It helps to secure sensitive data such as encryption keys, thus protecting them in a secure way. The Vault has been provided with a plugin called `vault-plugin-secrets-iden3`; this plugin is used to sign the data with Baby Jubjub keys that are stored in the Vault. The `KS_Vault_Mount_Path` is an enviornment varaible that we define in the Issuer Node's `config.toml` file and by providing its value... 
 
- **Redis**: Redis is used for caching of the schemas that we use in Issuer Node. The schemas are downloaded from IPFS and are stored on Redis. This way, every time, the Issuer Node issues a claim, it need not fetch the schemas from an external source; it can fetch it directly from Redis. This boosts the performance of the application. 
 
- **DB**: This container is used as the data source for the Issuer Node. In our implementation of the Issuer Node, we have used Postgres as the database. It is where all the data related to issued credentials is stored. 

## Core Libraries Used in Issuer Node
 
The Issuer Node is built with:
 
- [go-iden3-core](https://github.com/iden3/go-iden3-core): Go implementation of iden3 core functionality  
- [go-iden3-crypto](https://github.com/iden3/go-iden3-crypto): Go implementation of important cryptographic elements including baby jubjub key, Keccak256, and poseidon 
- [go-merkletree-sql](https://github.com/iden3/go-merkletree-sql): Go implementation of Merkle tree based on the library of circuit tenplates , called `circomlib`.