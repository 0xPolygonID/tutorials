<!--  # Proof Generation Overview
 
The proof generation starts with the Wallet scanning the QR code on the Verifier website/app. This is worth mentioning that the proof-generation process initiates on the Verifier side first with the Verifier by generating a [Query Request](../../../../verifier/verification-library/request-api-guide.md#query-based-request).
 
## Steps of Proof Generation
 
1. Integrator selects the type of claim (for the credential) for which it seeks verification.
 
2. Verifier website/app displays the QR code depending on the credential type selected by the Integrator.
 
3. Integrator scans the QR code. By scanning, the Wallet parses the query-based authentication request shown by the Verifier. Read more about auth requests [here](../iden3comm/auth-requests.md#type-of-authorization-requests).
 
4. Before the Wallet can generate a proof, it needs to authenticate itself first. Upon successful authentication (a pin or biometrics), the Wallet starts the process of generating either a signature-based proof or a merkle-tree-based proof to be presented to the Verifier. The circuit sends back its response to the Verifier via `callbackUrl`. 
 
6. After the proof is sent to the Verifier that analyzes it for its authenticity and based on its analysis, verifies the proof.
 
7. The Verifier shows both the authorization request and the proof information to the Integrator.
 
8. As the verification is complete, an Integrator can now use the services of the Verifier. For example, if the Verifier is a DAO, the Integrator, upon successful verification, becomes a DAO member and can participate in the voting activities. 
 

 <div align="center">
<img src= "../../../../../imgs/proof-generation.png" alt="Proof Generation" align="center" width="500"/>
</div>

Read more about the circuits used for proof generation [here](https://docs.iden3.io/protocol/main-circuits/)

-->
