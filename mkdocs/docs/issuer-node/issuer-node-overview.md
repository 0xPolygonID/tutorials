# Issuer Node Overview

The [Issuer Node](https://github.com/0xPolygonID/issuer-node) is a self-hosted Node that any implementer can quickly set up and integrate into their application. Once the setup is completed, the Issuer Node exposes all the functionalities necessary to run an issuer such as:
 
- Create, manage, and revoke an identity
- Issue credentials to an identity
- Share credentials with the user's wallet using QR Code
- Publish <a href="https://docs.iden3.io/getting-started/identity/identity-state/" target="_blank">Identity States</a> on-chain 
- Revoke credentials 

The Issuer Node can generate multiple identities for multiple Issuers and manages the states of these identities by updating the state stored on-chain.
 
The Issuer Node provides API endpoints for the integrator's applications.

<!-- ## Recommended Installations for Issuer Node
 
Though not mandatory, it is good to have the following software installed on your system:

- **Docker Daemon/Engine**: Docker Daemon or Docker Engine must be installed on your system.
- **Docker Compose**: Docker Compose must be installed on your system. Docker Compose is used to start multiple containers together.

    > Note: You can install Docker Daemon and Docker Compose separately. Alternatively, you can install <a href="https://docs.docker.com/desktop/" target="_blank">Docker Desktop</a> which includes both Daemon and Docker Compose. It is a tool to build and run containers for your applications. Due to its simplistic model, it removes the need to use CLI(Command Line Interface) to do core actions. With Docker Desktop, you can manage your containers from your application itself. 

- **Go**: If you intend to run the Issuer Node on an IDE, install the latest version of Go. If the Go backend is dockerized like other containers, there is no need to install Go locally. 

- **Makefile**: A Makefile automates the software building process and contains rules that determine which parts of the program need to be recompiled. It consists of all the rules for different dependencies. The Makefile can be accessed using the `make` command. 

    > Note: If you intend to run the Issuer Node via an IDE (Integrated Development Environment), you can have any IDE installed on your system. Please note that the Issuer Node is platform-agnostic and can be run via CLI, IDE, and can be deployed on the cloud also. You can run it as a standalone server also.  -->
 
## Issuer Node Components
      
<div align="center">
<img src= "../../imgs/issuer-node-components.png" align="center" style="border: 1px solid black"/>
</div>
<br />
The [Issuer Node](https://github.com/0xPolygonID/issuer-node) comprises the following components and each one of these components can be either dockerized or each one of these can be launched as separate service. 

- **Issuer Application** to issue Verifiable Credentials and communicate with users' wallets.

- **Vault**: Based on [HashiCorp](https://www.hashicorp.com/), the Vault is used in the Issuer Node for providing key management services. It helps to secure sensitive data, such as the private key of the issuer, thus protecting them in a secure way. The Vault has been provided with a plugin called `vault-plugin-secrets-iden3`; this plugin is used to sign the data with <a href="https://docs.iden3.io/getting-started/babyjubjub/" target="_blank">Baby Jubjub Keys</a> that are stored in the Vault. 
 
- **Redis**: [Redis](https://redis.io/) is used for caching the schemas that we use in the Issuer Node. The schemas are downloaded from IPFS and stored on Redis. This way, every time, the Issuer Node issues a Credential, it doesn't need to fetch the schemas from an external source; it can fetch it directly from Redis. This boosts the performance of the application. 
 
- **DB**: This container is used as the data source for the Issuer Node. In our implementation of the Issuer Node, we have used Postgres as the database. It is where all the data related to issued credentials are stored. 

    > Note: In a testing environment, you can run the Vault, Redis, and Postgres services inside a docker. But for production, you are advised to secure these services first before using them. 

## Core Library

- [Issuer Node](https://github.com/0xPolygonID/issuer-node)
 
## Support Libraries
 
- <a href="https://github.com/iden3/go-iden3-core" target="_blank">go Iden3 Core</a>: Go implementation of Iden3 core functionality  
- <a href="https://github.com/iden3/go-iden3-crypto" target="_blank">go Iden3 Crypto</a>: Go implementation of important cryptographic elements including baby jubjub key, Keccak256, and poseidon 
- <a href="https://github.com/iden3/go-merkletree-sql" target="_blank">go Merkle Tree SQL</a>: Go implementation of Merkle tree based on the library of circuit templates
