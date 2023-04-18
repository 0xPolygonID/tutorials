<div align="center">
<img src="logo.svg" align="center" width="128px"/>
<br /><br />
</div>

<a href="https://twitter.com/0xpolygonid" target="_blank">![Chat on Twitter][ico-twitter]</a>

[ico-twitter]: https://img.shields.io/twitter/url?color=black&label=0xpolygonid&logoColor=black&style=social&url=https%3A%2F%2Ftwitter.com%2F0xpolygonid


[link-twitter]: https://twitter.com/0xpolygonid

---
# Polygon ID: An Introduction

Polygon ID’s identity infrastructure facilitates trusted and secure relationships between apps and users, following the principles of self-sovereign identity and privacy by default. Polygon ID enables organizations on one side to issue verifiable credentials about users, and organizations on the other side to verify those claims via a suite of tools created for each member of the SSI ecosystem.

## Why Polygon ID?

Polygon ID, with the help of zero-knowledge proofs, lets users prove their identity without the need of exposing their private information. This ensures both the **Freedom of Expression** and **Privacy by Default** (User's identities are secured by zero-knowledge cryptography).

## Core Concepts of Polygon ID: Verifiable Credentials, Identity Holder, Issuer and Verifier (Triangle of Trust)

Every identity is identified by a unique identifier called [DID (Decentralized Identifier)](https://www.w3.org/TR/did-core/). Every identity-based information is represented via a [Verifiable Credentials (VCs)](https://www.w3.org/TR/vc-data-model/).  In the simplest terms, a VC represents any type of information related to an individual/enterprise/object. The VC could be as simple as the age of the entity or the highest degree held by it. It could be a membership certificate issued by a DAO, for instance.

The toolset made available by Polygon ID is fully compliant with the W3C standards. We have a [definition spec. for the Polygon ID DID method](https://github.com/0xPolygonID/did-polygonid).

The architecture of the framework is composed of three modules: Identity Holder, Issuer, and Verifier. These three, together, form what we call the **Triangle of Trust**. Let us see what role each entity plays in Polygon ID. 

1. **Identity Holder**: An entity that holds claims in its [Wallet](./wallet/wallet-overview.md). A VC, as mentioned above, is issued by an Issuer to the Holder. The Identity Holder generates zero-knowledge proofs of the VCs issued and presents these proofs to the Verifier, which verifies that the proof is authentic and matches specific criteria. 

2. [**Issuer**](./issuer/issuer-overview.md): An entity (person, organization, or thing) that issues VCs to the Holders. VCs are cryptographically signed by the Issuer. Every VC comes from an Issuer. 

3. [**Verifier**](./verifier/verifier-overview.md): A Verifier verifies the proof presented by a Holder. It requests the Holder to send a proof based on the VCs they hold in their wallet. While verifying a proof, the Verifier performs a set of checks, for example that the VC was signed by the expected Issuer and that the VC matches the criteria requested by the Verifier. The simplest examples of a Verifier is a Bar that wants to verify if you are over 18. In the real world, the Identity Holder would need to provide an ID and show all their personal information. With Polygon ID, they only need to pass a proof.

A core concept here is the *trust* that must exist between a Verifier and an Issuer: the fact that the information contained inside a VC is cryptographically verifiable doesn't guarantee its truth. The Issuer must be a trusted and reputable party so that Verifier can consume the VCs originated by that Issuer.

---
**The verification of a VC can happen either off-chain or on-chain!**

---
<div align="center">
<img src= "./imgs/triangle-of-trust-simple.png" align="center" width="700"/>
</div>
<br>

## Role of a Wallet

A [Wallet](./wallet/wallet-overview.md) plays a crucial role in the seamless exchange of VCs with the Issuer, on one hand, and proofs with the Verifier, on the other. As stated above, an Identity Holder carries his/her personal data, in the form of VC, within their wallet. At its core, the wallet stores the private key of a user, fetch VCs from the Issuer, and create zero-knowledge proofs to be presented to the Verifier. Being the carrier of the sensitive information, Wallet has been designed to ensure that the identity of its Holder is protected and preserved, and no sensitive data can be revealed to the third party without the consent of the Holder.  

## What Can you Achieve Using Polygon ID?

1. **Privacy using Zero-Knowledge Proofs**: An Identity Holder, using zero-knowledge proofs, can keep his/her/its personal data private. During the process of VC verification, it just needs to show a proof that he is the owner of a VC that matches certain criteria without letting the Verifier know of the actual VC. For example, an Identity Holder can prove to a Verifier authority that s/he is above 18 years of age by presenting the proof that s/he is above 18 without revealing his/her actual age. This ensures minimum data exposure and hence ensures the safety of any sensitive data. 
Another aspect of privacy comes from the fact that the Issuer would not be able to track the usage of VCs by an individual once it has been issued. 

2. **Off-Chain and On-Chain Verification**: Verification of proofs can be done either off-chain or on-chain via Smart Contracts. For example, developers can set up a contract that airdrops tokens only to users that meet certain criteria based on their VCs.

3. **Self-Sovereignty**: Polygon ID renders self-sovereignty in the hands of the user. The user is the only custodian of his/her private keys; user-controlled data can be shared with third parties without taking any permission from the Issuer that has issued the VCs to the user.

4. **Transitive Trust**: A transitive trust between the actors of the triangle means that the trust between two entities in one domain or context can be easily extended to other domains or contexts. For instance, the information generated by an Issuer can be conveniently used by more than one Verifier without asking for permission. Along the similar lines, an Identity Holder can build up his/her trust by collecting multiple credentials from different Issuers in one digital wallet. 

## Polygon ID and Iden3

<a href="https://iden3.io/" target="_blank">Iden3</a> is the open-source protocol at the basis of Polygon ID. The protocol defines on a low-level how the parties listed above communicate and interact with each other. Polygon ID is an abstraction layer to enable developers to build applications leveraging the Iden3 protocol.

## Further Resources On Polygon ID
- [Polygon University - Courses on Polygon ID (free)](https://university.polygon.technology/polygonid/)
- [Identity Layer for Web3 - Paris - July 2022](https://youtu.be/bmRvQNmxFkM)
- [The Future of Identity is Self-Sovereign: Build a dapp with Polygon ID - ETH Global - November 2022](https://youtu.be/utpazrLrSbY)
- [A Deep Dive into Polygon ID - ETH Vietnam - November 2022](https://youtu.be/fQ9DiGUnvwA)

## Further Resources On Verifiable Credentials

- [Verifiable Credentials: The Ultimate Guide](https://www.dock.io/post/verifiable-credentials)
- [Understanding and Using Verifiable Credentials](https://www.youtube.com/watch?v=BxLSSH_EHjo)
- [Polygon ID DID Method Specification](https://github.com/0xPolygonID/did-polygonid)

---

###### <div align="center">
<a href="https://github.com/0xPolygonID" target="_blank">Polygon ID on GitHub</a></div>









