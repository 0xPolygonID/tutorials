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

 
## Core Libraries Used in Issuer Node
 
The Issuer Node is built with:
 
- [go-iden3-core](https://github.com/iden3/go-iden3-core): Go implementation of iden3 core functionality  
- [go-iden3-crypto](https://github.com/iden3/go-iden3-crypto): Go implementation of important cryptographic elements including baby jubjub key, Keccak256, and poseidon 
- [go-merkletree-sql](https://github.com/iden3/go-merkletree-sql): Go implementation of Merkle tree based on the library of circuit tenplates , called `circomlib`.