# To Fetch and Save Claims: `fetchAndSaveClaims`
 
An Integrator can fetch credentials stored on an Issuer and then save them in his/her wallet. The`fetchAndSaveClaims()` function is called to fetch and save a list of credentials from an Issuer.
 
## Fetch and Save Credentials
```
Future<List<ClaimEntity>> fetchAndSaveClaims(
      {required OfferIden3MessageEntity message,
      required String did,
      required String privateKey});
    
```


The `fetchAndSaveClaims()` function uses `OfferIden3MessageEntity`, `privateKey`, and `did` as the input parameters. and returns a list of `ClaimEntity`.

`OfferIden3MessageEntity`: OfferIden3MessageEntity is a type of `Iden3MessageEntity`. As you saw in the **Iden3comm** tutorials, we get `Iden3MessageEntity` when we call `getIden3Message()`method. 


 
`privateKey` of the identity is a key that is used to access the sensitive information of the identity. This key is also used for generating proofs by using the credentials associated with the identity. 

`did` is the unique id of the identity. 


## Wallet-Issuer Interaction for Fetching Credentials
 
 
1. Integrator scans the QR code displayed on the Issuer site to get the iden3 message.
 
2. The Integrator uses the `OfferIden3MessageEntity` obtained from the iden3 message to authenticate and fetch the credentials from the Issuer.
 
3. The Issuer validates the identity and returns a list of `ClaimEntities` back to the Integrator.
 
4. The credentials are stored on the SDK associated with the identity.


 <div align="center">
<img src= "../../../../../../imgs/credential-wallet.png" align="center" width="500"/>
</div>
<br>
 
