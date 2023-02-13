# Issuer Node Components
 
The Issuer Node comprises of the following components and each one of these components can be either dockerized or can be launched as separate services. 

- **Issuer Application** to issue the Verifiable Credentails to an entity.

- **Vault**: Based on HashiCorp, the Vault is used in the Issuer Node for providing key management services. It helps to secure sensitive data such as encryption keys, thus protecting them in a secure way. The Vault has been provided with a plugin called `vault-plugin-secrets-iden3`; this plugin is used to sign the data with Baby Jubjub keys that are stored in the Vault. The `KS_Vault_Mount_Path` is an enviornment varaible that we define in the Issuer Node's `config.toml` file and by providing its value... 
 
- **Redis**: Redis is used for caching of the schemas that we use in Issuer Node. The schemas are downloaded from IPFS and are stored on Redis. This way, every time, the Issuer Node issues a claim, it need not fetch the schemas from an external source; it can fetch it directly from Redis. This boosts the performance of the application. 
 
- **DB**: This container is used as the data source for the Issuer Node. In our implementation of the Issuer Node, we have used Postgres as the database. It is where all the data related to issued credentials is stored. 
 

