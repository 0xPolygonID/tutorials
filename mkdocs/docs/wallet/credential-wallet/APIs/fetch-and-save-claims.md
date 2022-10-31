# To Fetch and Save Claims: `fetchAndSaveClaims`
 
An Integrator can fetch claims stored on an Issuer and then save them on the wallet.
 
To fetch and save a list of claims from an Issuer, the `fetchAndSaveClaims()` function is called.
 
```
Future<List<ClaimEntity>> fetchAndSaveClaims(
     {required List<CredentialRequestEntity> credentialRequests})
    
     {
       return _fetchAndSaveClaimsUseCase.execute(param: credentialRequests);
     }
 
```
 
The `fetchAndSaveClaims()` function uses a list of `Credential Request Entities`as the input parameter. A `Credential Request Entity` is composed of the identifier string (generated using `createIdentity()` function), the circuit data and other related data). The function returns a list of `Claim Entities`.
 
## Wallet-Issuer Interaction for Fetching Claims
 
 
1. Integrator scans the QR code displayed on the Issuer site.
 
2. The Integrator requests the `Credential Request Entities` (or claims) that it intends to fetch from the Issuer. The Identifier that forms part of a `Credential Request Entity` is used to authenticate the Integrator.
 
3. The Issuer validates the identity and returns a list of `Claim Entities` back to the Integrator.
 
4. The claims are added to the Polygon ID app and are stored on the SDK.
 
