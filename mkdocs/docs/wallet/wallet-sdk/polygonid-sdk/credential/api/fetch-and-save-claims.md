# To Fetch and Save Claims: `fetchAndSaveClaims`
 
An Integrator can fetch credentials stored on an Issuer and then save them in the Wallet. The`fetchAndSaveClaims()` function is called to fetch and save a list of credentials from an Issuer.
 
```
Future<List<ClaimEntity>> fetchAndSaveClaims(
      {required OfferIden3MessageEntity message,
      required String did,
      required String privateKey})
    
     {
       return _fetchAndSaveClaimsUseCase.execute(
        param: FetchAndSaveClaimsParam(
            requests: credentialRequests,
            identifier: identifier,
            privateKey: privateKey));
     }
 
```
 <!-- Does 'identifier' in above code need to be changed to 'did' ?
Does 'credentialRequests` in above code need to be removed?
  -->

<!-- Does following description need to change as there is no Credential Request Entities in the method?-->

<!-- what does OfferIden3MessageEntity do? -->

The `fetchAndSaveClaims()` function uses a list of `Credential Request Entities`as the input parameter. A `Credential Request Entity` is generated when an Integrator scans the QR code to get claims from an Issuer. The function returns a list of `Claim Entities`.
 
## Wallet-Issuer Interaction for Fetching Claims
 
 
1. Integrator scans the QR code displayed on the Issuer site to get the iden3 message.
 
2. The Integrator uses the `Credential Request Entities` obtained from the iden3 message to authenticate and fetch the claims from the Issuer.
 
3. The Issuer validates the identity and returns a list of `Claim Entities` back to the Integrator.
 
4. The claims are stored on the SDK associated to the identity.


 <div align="center">
<img src= "../../../../../../imgs/credential-wallet.png" align="center" width="500"/>
</div>
<br>
 
