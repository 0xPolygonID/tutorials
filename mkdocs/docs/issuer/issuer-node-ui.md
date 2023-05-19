# Issuer Node UI
The Issuer Node UI provides only a single identity. However, it also presents a few extra features, such as establishing connections and importing schemas. **The Issuer Node UI provides the full experience of having an Issuer Node with all its capabilities**. It comes in an API format but there is also a possibility to generate a full-fledged user interface. 

<figure markdown>
  ![3002](../../imgs/3002.png){ width="1000" }
  <figcaption>Issuer Node API UI with Managing Schemas, Credentials and other functionalities.</figcaption>
</figure>

<figure markdown>
  ![8008](../../imgs/8088.png){ width="1000" }
  <figcaption>Issuer Node User Interface with a more visual experience.</figcaption>
</figure>

## Issuer Node Components

The [Issuer Node](https://github.com/0xPolygonID/issuer-node) comprises the following components and each one of these components can be either dockerized or each one of these can be launched as separate service. 

- **Issuer Application** to issue Verifiable Credentials and communicate with users' wallets.

- **Vault**: Based on [HashiCorp](https://www.hashicorp.com/), the Vault is used in the Issuer Node for providing key management services. It helps to secure sensitive data, such as the private key of the issuer, thus protecting them in a secure way. The Vault has been provided with a plugin called `vault-plugin-secrets-iden3`; this plugin is used to sign the data with <a href="https://docs.iden3.io/getting-started/babyjubjub/" target="_blank">Baby Jubjub Keys</a> that are stored in the Vault. 
 
- **Redis**: [Redis](https://redis.io/) is used for caching the schemas that we use in the Issuer Node. The schemas are downloaded from IPFS and stored on Redis. This way, every time, the Issuer Node issues a Credential, it doesn't need to fetch the schemas from an external source; it can fetch it directly from Redis. This boosts the performance of the application. 
 
- **DB**: This container is used as the data source for the Issuer Node. In our implementation of the Issuer Node, we have used Postgres as the database. It is where all the data related to issued credentials are stored. 

!!!note
    In a testing environment, you can run the Vault, Redis, and Postgres services inside a docker. But for production, you are advised to secure these services first before using them. 

<figure markdown>
  ![img](../../imgs/ui-infra.png){ width="1000" }
  <figcaption>Issuer Node Core API architecture.</figcaption>
</figure>