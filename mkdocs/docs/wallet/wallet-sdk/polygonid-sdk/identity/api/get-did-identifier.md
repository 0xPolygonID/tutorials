# To Get DID Identifier: `getDiDIdentifier`

This function returns an identifier (identity's `publicKey`) from a `privateKey`.
## Retrieve DID Identifier

`getDidIdentifier` returns a `did` Identifier using `privateKey` and `profileNonce`.

```dart
Future<String> getDidIdentifier({
    required String privateKey, 
    required String blockchain, 
    required String network, 
    int? profileNonce
}); 
 
```

`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`blockchain` is the name of the blockchain associated with the identity. In our case, it is **Polygon**. 

`network` is the type of network (Mainnet or Testnet) associated with the identity. 

`profileNonce` is the nonce of the profile of an identity. 


> Note: It is worth noting that `did` is a Decentralized Identifier associated with an identity and enables verifiable identities. A `did` could be a person, thing, organization, or even an abstract entity. The controller of the `did` can prove that it is the real owner of the identity without the need of seeking permissions/approvals from any centralized authority. 

A `did` is expressed in the following format (as per [w3.org](https://www.w3.org/) standards):

**did: did method: did method-specific identifier**