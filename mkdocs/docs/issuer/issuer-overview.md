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

Using Polygon ID an Issuer can issue Credentials to their users.

## Issuer Node Types
There are basically two ways the Issuer Node can be implemented:

- Issuer Node Core API
- Issuer Node UI

<figure markdown>
  ![infra](../../imgs/whole-infra.png){ width="1000" }
  <figcaption>Issuer Node Core API represented by API, in green. Issuer Node UI represented by API UI, in blue.</figcaption>
</figure>

### Issuer Node Core API
The [Issuer Node Core API](issuer-core.md) is ideal for users who need multiple identities and for **integrator profiles, who want to create solutions based on Polygon ID functionalities and might be interested in having access to low level information** such as Merkle Trees. 

<figure markdown>
  ![3001](../../imgs/3001.png){ width="1000" }
  <figcaption>Issuer Node Core API with Identity, Claim and Agent endpoints.</figcaption>
</figure>


### Issuer Node UI
The [Issuer Node UI](issuer-node-ui.md) provides only a single identity. However, it also presents a few extra features, such as establishing connections and importing schemas. **The Issuer Node UI provides the full experience of having an Issuer Node with all its capabilities**. It comes in an API format but there is also a possibility to generate a full-fledged user interface. 

<figure markdown>
  ![8008](../../imgs/8088.png){ width="1000" }
  <figcaption>Issuer Node User Interface with a more visual experience.</figcaption>
</figure>

<figure markdown>
  ![3002](../../imgs/3002.png){ width="1000" }
  <figcaption>Issuer Node API UI with Managing Schemas, Credentials and other functionalities.</figcaption>
</figure>
