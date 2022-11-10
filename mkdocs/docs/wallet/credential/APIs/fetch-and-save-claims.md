# To Fetch and Save Claims: `fetchAndSaveClaims`
 
An Integrator can fetch claims stored on an Issuer and then save them in the Wallet.
 
To fetch and save a list of claims from an Issuer, the `fetchAndSaveClaims()` function is called.
 
```
Future<List<ClaimEntity>> fetchAndSaveClaims(
      {required List<CredentialRequestEntity> credentialRequests,
      required String identifier,
      required String privateKey})
    
     {
       return _fetchAndSaveClaimsUseCase.execute(
        param: FetchAndSaveClaimsParam(
            requests: credentialRequests,
            identifier: identifier,
            privateKey: privateKey));
     }
 
```
 
The `fetchAndSaveClaims()` function uses a list of `Credential Request Entities`as the input parameter. A `Credential Request Entity` is a type of iden3comm message. The function returns a list of `Claim Entities`.
 
## Wallet-Issuer Interaction for Fetching Claims
 
 
1. Integrator scans the QR code displayed on the Issuer site to get the iden3 message.
 
2. The Integrator uses the `Credential Request Entities` obtained from the iden3 message to authenticate and fetch the claims from the Issuer.
 
3. The Issuer validates the identity and returns a list of `Claim Entities` back to the Integrator.
 
4. The claims are stored on the SDK associated to the identity.
 
