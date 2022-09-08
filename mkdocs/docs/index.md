<div align="center">
<img src="logo.svg" align="center" width="128px"/>
<br /><br />
</div>

[![Chat on Twitter][ico-twitter]][link-twitter]

[ico-twitter]: https://img.shields.io/twitter/url?color=black&label=0xpolygonid&logoColor=black&style=social&url=https%3A%2F%2Ftwitter.com%2F0xpolygonid

[link-twitter]: https://twitter.com/0xpolygonid

---
# Polygon ID: An Introduction

Based on the principles of Self-Sovereign Identity (SSI) and cryptography, Polygon ID is a decentralised and permissionless identity management system for web 2 and web 3 applications. The SSI framework lets the identity holders own and control their identities, unlike the other frameworks where IDs are issued and controlled by a single person or a central authority. 

## Why Polygon ID?

Polygon ID (or PID), with the help of zero-knowledge proofs, lets users prove their identity without the need of exposing their private information. This ensures both the **Freedom of Expression** to anyone (who intends to use the Polygon ID) and **Privacy by Default** (User's identities are secured by the zero-knowledge technology). In addition to privacy, PID helps in raising levels of scalability, on one hand, and optimizing cost, on the other. As the size of proofs used in PID is small, the cost of proof generation is less. 



## Entities of Polygon ID: Identity Holder, Issuer and Verifier (Triangle of Trust)

Before we know about entities of Polygon ID, it is important to understand what a Credential is. In the simplest terms, a Credential represents any type of information related to an individual/enterprise/object. The credential could be as simple as the age of the entity or the highest degree held by it. It could be  a membership certificate issued by a DAO. A Credential consists of one or more claims that an entity presents about itself or about another entity. When a Credential can be verified (to be authentic or not), it is termed `Verifiable Credential` or `VC`. To know more about Verifiable Credentials, read [here](...)

The Polygon ID is composed of three main entities: Identity Holder, Issuer, and Verifier. These three, together, form what we call a `triangle of trust`. Let us see what  role each entity plays in PID. 

1. **Identity Holder**: An entity that holds the Verifiable Credentials in its wallet. A VC, as mentioned above, is issued by an Issuer to the Holder. The Identity holder creates the zero-knowledge proofs of the claims issued and presents these proofs to the Verifier (which verifies the correctness and authenticity of the claim). An identity Holder can create proofs for more than one VC. A Holder is also called Prover as it needs to prove to the Verifier that the credential it holds is authentic. 

2. **Issuer**: An entity (person, organization, or thing) that issues the Verifiable Credentials to the Holders. The VCs are cryptographically signed by the Issuer. Every Verifiable Credential comes from an Issuer. 

3. **Verifier**: A Verifier verifies the claims presented by a Holder. It requests the Holder to send proof of the claim issued from an Issuer and on receiving the zero-knowledge proofs from the Holder, verifies it. The verification process includes checking the veracity of the signature of the Issuer. The simplest real-world examples of a Verifies can be a recruiter that verifies your educational background or a voting platform that verifies your age. 

<div align="center">
<img src= "./imgs/triangle-of-trust-polygonID.png" align="center" width="500"/>
</div>



<br>

## What can you achieve using Polygon ID?

1. **Privacy using Zero-Knowledge Proofs**: An Identity Holder, using zero-knowldege proofs, can keep its personal data private. During the process of claim verification, it just needs to show that he is the owner of that claim without letting the Verifier know of the actual claim. For example, an Identity Holder can prove to a Verifier authority that s/he is above 18 years of age by presenting the proof that s/he is above 18 without revealing his/her actual age. This ensures minimum data exposure and hence ensures the safety of any sensitive data. 
Another aspect of privacy comes from the fact that the Issuer would not be able to track an individual's credential once it has been issued. 

2. **On-Chain Verification**: Verification of proofs is done via Smart Contracts (software that runs on blockchain after certain conditions are met). 

3. **Universal Identity**: Polygon ID provides a scalable model for open and permissionless identities in addition to providing low-cost claims. 

4. **Self-Sovereignty**: Polygon ID renders self-sovereignty in the hands of the user. The user is the only custodian of his/her private keys; user-controlled data can be controlled with third parties without taking any permission from the Issuer that has issued the credential to the user. This is possible due to the use of underlying cryptography protocol for verifying data. 

5. **Transitive Trust**: A transitive trust between the players of an SSI system (Holder, Issuer, and Verifier) means that the trust between two entities in one domain or context can be easily extended to other domains or contexts. For instance, the information generated by an Issuer can be conveniently used by more than one Verifier. Along the similar lines, an Identity Hodler can built up his/her trust by collecting multiple credentials from different Issuers in one digital wallet. In terms of Polygon ID, this clearly means that data shared will no longer be a thing for competitive moat to be used by centralized authorities.

<br>

## <div align="center"><b>[START HERE](getting-started/getting-started.md)</b></div>

---

###### <div align="center">[Polygon ID on GitHub](https://github.com/0xPolygonID)</div>






