# To Get DID Identifier: `getDiDIdentifier`

This function returns an identifier (identity's `publicKey`) from a `privateKey`.

## Retrieve DID Identifier

`getDidIdentifier` returns a `did` Identifier using `privateKey` and `profileNonce`.

```
Future<String> getDidIdentifier({required String privateKey, required String blockchain, required String network, int? profileNonce}); 
 
```
`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`blockchain` is the name of the blockchain associated with the identity. In our case, it is **Polygon**. 

`network` is the type of the network (Mainnet or Testnet) associated with the identity. 

`profileNonce` is the nonce of the profile of an identity. 
