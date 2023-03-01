# Issuer Overview

An Issuer is any subject that issues Verifiable Credentials. You can think of a credentials as a statement: something an Issuer says about another subject. For example, when a university (Issuer) says that a student (subject) has a degree, this is a credential.

An issuer might be: 

- A DAO that issues “membership claims" to its members.
- A Government that issues ID to its citizens.
- A Face detection ML application that issues "proof of personhood" claims. 
- An employer that endorses its employees.

[Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) are a flexible data format able to express any type of information so that developers can unleash their creativity.

To operate, an Issuer must run an [Issuer Node](../issuer-node/issuer-node-overview.md), which is a self-hosted Node that exposes all the functionalities necessary to run an issuer.

<div align="center">
<img src= "../../imgs/issuer-intro.png" align="center" />
</div>

Using Polygon ID an Issuer can issue Credentials to their users (or friends!).

Alternatively, you can quickly try out the Credential Issuance experience using the [Demo Issuer](./demo-issuer.md).
