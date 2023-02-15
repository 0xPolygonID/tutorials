# To Get Identity: `getIdentity`
 
We can get an identity stored on the SDK using `getIdentity()` function. 

## Get an Identity
 
```
Future<IdentityEntity> getIdentity(
      {required String genesisDid, String? privateKey});

```

The `getIdentity()` function gets an `IdentityEntity` from an identifier. It returns an identity as a `PrivateIdentityEntity` or `IdentityEntity` (in case if `privateKey` is omitted or invalid for that identifier). <!-- is above sentence correct? -->

`did` is the unique id of the identity and `genesisDid` is the `did` of the first profile of the identity, it is the unique id of the identity for which profile nonce is 0.

> Note: It is worth noting that `did` is a Decentralized Identifier associated with an identity and enables verifiable identities. A `did` could be a person, thing, organization, or even an abstract entity. The controller of the `did` can prove that it is the real owner of the identity without the need of seeking permissions/approvals from any centralized authority. 

A `did` is expresssed in the following format (as per [w3.org](https://www.w3.org/) standards):

**did: did method: did method-specific identifier**

`privateKey` is the key that is used to access the sensitive information related to an identity. This key is also used to generate proofs using the credentials associated with that identity. 
 




