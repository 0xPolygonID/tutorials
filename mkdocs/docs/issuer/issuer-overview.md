# Issuer Overview

An Issuer is any subject that issues Verifiable Credentials. You can think of a credentials as a statement: something an Issuer says about another subject. For example, when a university (Issuer) says that a student (subject) has a degree, this is a credential.

An issuer might be: 

- A DAO that issues “membership claims" to its members.
- A Government that issues ID to its citizens.
- A Face detection ML application that issues "proof of personhood" claims. 
- An employer that endorses its employees.

[Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) are a flexible data format able to express any type of information so that developers can unleash their creativity.

# Operating an issuer

There are some different ways one can perform issuer-related actions, that is, manage and issue credentials, establish connections with holders etc. These are the currently available options:   

- Running an [Issuer Node](../issuer/issuer-core.md) directly in your infrastructure.

- Utilizing the issuer node available in the[ Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/polygon-public/polygon-id-issuer-node?pli=1) (soon available also on the AWS Marketplace). 

- Adapting the [JS SDK](https://0xpolygonid.github.io/tutorials/js-sdk/js-sdk-overview/) to your application that issues credentials.

- Using [SaaS vendors](https://ecosystem.polygon.technology/PolygonID/) that leverage Polygon ID solutions.

- Making use of Polygon ID smart contracts for [on-chain issuance](./on-chain-issuer/on-chain-overview.md).

## Issuer Nodes

To operate, an Issuer must run an [Issuer Node](../issuer-node/issuer-node/issuer-node-overview.md), which is a self-hosted Node that exposes all the functionalities necessary to run an issuer.

<div align="center">
<img src= "../../imgs/issuer-intro.png" align="center" />
</div>

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
