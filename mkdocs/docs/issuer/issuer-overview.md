# Issuer Overview

An Issuer is any subject that issues Verifiable Credentials. You can think of a credentials as a statement: something an Issuer says about another subject. For example, when a university (Issuer) says that a student (subject) has a degree, this is a credentials.

An issuer might be: 

- A DAO that issues “membership claims" to its members.
- A Government that issues ID to its citizens.
- An Face detection ML application that issues "proof of personhood" claims. 
- An employer that endorses its employees.

[Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) are a flexible data format able to express any type of information so that developers can unleash their creativity.

To operate, an Issuer must run an [Issuer Node](./issuer-node/issuer-node-overview.md), which is a self-hosted Node that exposes all the functionalities necessary to run an issuer.

<div align="center">
<img src= "../../imgs/issuer-intro.png" align="center" />
</div>

Using Polygon ID an Issuer can Issuer Credentials to their users (or friends!).

## Quick Start 

You can quickly try out how the Credential Issuance experience look like by following the steps below: 

- Download the [Polygon ID Wallet](../wallet/wallet-overview.md) and create an Identity.
- Fetch a credential in your wallet issued by the [Demo Issuer](https://issuer-demo.polygonid.me/)
