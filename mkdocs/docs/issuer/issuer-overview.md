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

## Quick Start 

You can quickly try out how the Credential Issuance experience looks like by following the steps below: 

- Download the Polygon ID Wallet App and create an Identity.ß
> - For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
> - For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>
- Fetch a credential from the [Demo Issuer](https://issuer-demo.polygonid.me/)
