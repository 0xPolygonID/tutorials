# Introduction

You should now be able to setup an issuer, issue claims to yourself and/or other identities and publish them.

Now it comes the cool part: **being able to verify Claims with Zero Knowledge**.

> Bob can verify that Alice is over 18 without having to access Alice's date of birth

In this example: 

- Alice holds a **Claim** that certifies her date of birth
- Bob designs a **Query** "You must be over 18"
- Alice generates a **ZK Proof** starting from her Claim and Bob's Query
- Bob verifies Alice's proof and provides access rights

Both `Claim` and `Query` are broad and customizable data primitives allowing to create any type of identity based verification.

The claims associated to an identity are resuable across platforms so any integrator can leverage existing claims and create customized queries. For example exchanges that require KYC claim or DAOs that require proof-of-personhood claim.

This section illustrates a set of simple APIs to integrate Iden3 ZK login inside your application for user authentication, abstracting away all the complexity involved with ZK proofs.

In particular:

- [ZKLogin workflow](./zk-login-workflow.md), to understand the user workflow
- [ZKLogin integration](./zk-login-integration.md), to integrate it in your platform with a few lines of code
- [Demo](./demo.md), to demo it
- [JSON Web ZeroKnowledge - JWZ](./jwz.md), to understand the core primitive of web2 ZK-based communication
- [Query Language](./query-language), to design customized queries

The tutorial is designed to integrate ZKP verification on the web client side. 

The user interacting with the client must have the identity wallet app ([Polygon ID iOS](https://apps.apple.com/ca/app/polygon-id/id1629870183), [Polygon ID Android](https://play.google.com/store/apps/details?id=com.polygonid.wallet) or any compatible wallet) installed: 


## Libraries

The authentication flow can be implemented either in GoLang or Javascript

- [Go Iden3 Authentication Library](https://github.com/iden3/go-iden3-auth)
- [JS Iden3 Authentication Library](https://github.com/iden3/js-iden3-auth)
