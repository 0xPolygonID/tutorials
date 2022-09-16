# Overview

The proof-generation by the wallet sdk starts with Wallet SDK scanning the QR code on the Verifier website/app. This is worth mentioning that the proof-generation process  initiates on the Verifier side first with the Verifier requesting the wallet SDK to select the type of credential for which proof verification is required.

## Steps of Proof Generation 

1. Integrator selects the type of claim (for the credential) for which it seeks verification.

2. Verifier website/app displays the QR code depnding on the credential type selected by the Integrator. 

3. Integrator scans the QR code. By scanning, the wallet sdk is parsing an authentication request shown by the Verifier. Read more about auth requests in the [next tutorial](./types-of-auth-requests-and-proofs.md)


4. Before wallet sdk can generate a proof, it needs to authenticate itself first. Upon sucessfful authentication (a pin or biometrics). the sdk starts the process of generating  either a signature based or Merkle Tree proof to be prersented to the Verifier. Read more on the type pf proofs in the [next tutorial](./types-of-auth-requests-and-proofs.md). The proofs are generated using authentication circuits; read more about [authentication circuit](https://github.com/iden3/circuits/blob/master/circuits/auth.circom. The circuits send back its response to the Verifier via `callbackUrl`. (Read more about the `callbackUrl` in the [next tutorial](./types-of-auth-requests-and-proofs.md))

6. After the proof is sent to the Verifier that analyzes it for its authenticity and based on its analysis, verifies the proof. 

7. The Verifier shows both the authorization request and the proof information to the Integrator. 

8. As the verification is compelte, an Integrator can now use the services of the Verifier. For example, if the Verifier is a DAO, the Integrator, upon successful verification, becomes DAO's member and participate in the voting activities.  

**Note**: The demo Verifier that we have used can be found [here]( https://verifier.polygonid.me/)



