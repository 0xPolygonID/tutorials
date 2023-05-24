## Issuing Credentials via CLI

Once the Issuer Node installation is completed, the following will walk you through issuing credentials via a CLI.

!!! note
    These steps can be done either via the API UI (<http://localhost:3001>) or directly in the UI (<http://localhost:8088>).

### Create Identity

!!! note
    This is an alternative to the following: [Create Issuer ID](../issuer/setup-issuer-ui.md#create-issuer-did).

```bash
# NOTE: dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy is a Basic HTTP Authorization as base64(user-issuer:password-issuer) from our .env-issuer file
curl --location 'http://localhost:3001/v1/identities' \
--header 'Authorization: Basic dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy' \
--header 'Content-Type: application/json' \
--data '{
    "didMetadata":{
        "method": "polygonid",
        "blockchain":"polygon",
        "network": "mumbai"
    }
}';

# Expected Output:
#   {"identifier":"did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE","state":{"claimsTreeRoot":"eb3d346d16f849b3cc2be69bfc58091dfaf6d90574be26bb40222aea67e08505","createdAt":"2023-03-22T22:49:02.782896Z","modifiedAt":"2023-03-22T22:49:02.782896Z","state":"b25cf54e7e648a263658416194c41ef6ae2dec101c50dfb2febc5e96eaa87110","status":"confirmed"}}
```

### (Optional) View Existing DIDs (connections)

A connection is a DID that is linked to the issuer when they authenticate via an issued credential.

!!! note
    You can check all the connections on the [Issue Node UI](issuer-node-guide.md#connections).

#### Using a CLI

This will output all DIDs (i.e. connections) that have been created with the issuer.

```bash
curl --location --request GET 'http://localhost:3001/v1/identities' \
--header 'Authorization: Basic dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy' \
--header 'Content-Type: application/json' \
--data '{
    "did_metadata":{
        "method": "polygonid",
        "blockchain":"polygon",
        "network": "mumbai"
    }
}';

# Expected Output (Results may vary based on number of DIDs created):
#   ["did:polygonid:polygon:mumbai:2qMd3PtcVbzDNQZBiSDctaigbQtYW9KTqrLFoUm4Ur","did:polygonid:polygon:mumbai:2qMeNWv9xSSvWyBpn5tDojzQ8sga4VtrfuAkV65zQa","did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE","did:polygonid:polygon:mumbai:2qLR2qA22RemPeQDsQwdrrMU3SM9CNLnRBhmQtzo5v","did:polygonid:polygon:mumbai:2qHYtws8GQN3RniHLjPf5GuZUZtcD37o1MUgUmw287"]
```

### Creating Credentials

This will go through creating a `KYCAgeCredential` credential based off the following [KYC Age Credential Schema](https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json)

!!! note
    Learn how to create credentials on [the Issuer Node guide](issuer-node-guide.md#schemas).

#### Using a CLI

Before creating a credential, the identifier of the service/person is needed. To retrieve this, the `identifier` can be copied from the Polygon ID app to the clipboard.

!["ID Within Polygon ID App"](../imgs/polygonid-app-id.png)

!!! note
    The issuer node DID can be retrieved by looking at `.env-api` for `ISSUER_API_UI_ISSUER_DID`

```bash
curl --location 'http://localhost:3001/v1/did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE/claims' \
--header 'Authorization: Basic dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy' \
--header 'Content-Type: application/json' \
--data '{
    "credentialSchema":"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
    "type": "KYCAgeCredential",
    "credentialSubject": {
        "id": "did:polygonid:polygon:mumbai:2qEsg1AeTohAq6Euc3hBaDapfLVfQiWS7DUfvutYEq",
        "birthday": 19960424,
        "documentType": 2
    }
}';

# Expected Output:
#   {"id":"b1eab5be-dea3-11ed-8f7d-0242ac1e0005"}
```

### (Optional) Verifying Credentials Creation

!!! note
    You can always check the created credentials on the Issuer Node UI.

#### Using a CLI

Using the previously generated credential ID from [Creating Credentials](#creating-credentials).

```bash
curl --location --request GET 'http://localhost:3001/v1/did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE/claims/b1eab5be-dea3-11ed-8f7d-0242ac1e0005' \
--header 'Authorization: Basic dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy';

# Expected Output:
#   {"@context":["https://www.w3.org/2018/credentials/v1","https://schema.iden3.io/core/jsonld/iden3proofs.jsonld","https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld"],"credentialSchema":{"id":"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json","type":"JsonSchemaValidator2018"},"credentialStatus":{"id":"https://unique-forwaring-or-public-url.ngrok-free.app/v1/did%3Apolygonid%3Apolygon%3Amumbai%3A2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahUQ/claims/revocation/status/2512063162","revocationNonce":2512063162,"type":"SparseMerkleTreeProof"},"credentialSubject":{"birthday":19960424,"documentType":2,"id":"did:polygonid:polygon:mumbai:2qEsg1AeTohAq6Euc3hBaDapfLVfQiWS7DUfvutYEq","type":"KYCAgeCredential"},"id":"http://localhost:3001/v1/did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE/claims/b1eab5be-dea3-11ed-8f7d-0242ac1e0005","issuanceDate":"2023-04-19T11:16:56.433871253Z","issuer":"did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE","proof":[{"type":"BJJSignature2021","issuerData":{"id":"did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE","state":{"claimsTreeRoot":"78b7651adb5d063553f7fdc11d279a3e307880aef6dec2b347abf0df53a11d27","value":"....
```

### Issuing Credential To Polygon ID Wallet User

This will walk you through the steps of issuing a credential to the Polygon ID wallet app.

!!! note 
    To learn how to issue credentials to a Polygon ID Wallet User, please refer to the [Issuer Node Guide](issuer-node-guide.md#schemas).

#### Using a CLI

In order to get the credential on the Polygon ID App, the credential QR Code payload is needed.

```bash
curl --location 'http://localhost:3001/v1/did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE/claims/b1eab5be-dea3-11ed-8f7d-0242ac1e0005/qrcode' \
--header 'Authorization: Basic dXNlci1pc3N1ZXI6cGFzc3dvcmQtaXNzdWVy';

# Expected Output:
#   {"body":{"credentials":[{"description":"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld#KYCAgeCredential","id":"b1eab5be-dea3-11ed-8f7d-0242ac1e0005"}],"url":"http://localhost:3001/v1/agent"},"from":"did:polygonid:polygon:mumbai:2qPdb2hNczpXhkTDXfrNmmt9fGMzfDHewUnqGLahYE","id":"c01b66f1-d10b-4591-9dd6-8a94db1c112a","thid":"c01b66f1-d10b-4591-9dd6-8a94db1c112a","to":"did:polygonid:polygon:mumbai:2qEsg1AeTohAq6Euc3hBaDapfLVfQiWS7DUfvutYEq","typ":"application/iden3comm-plain-json","type":"https://iden3-communication.io/credentials/1.0/offer"}
```

Take this JSON data, copy, and paste into [https://qr.io](https://qr.io).

!["QR.io"](../imgs/qrio.png)

With the Polygon ID app, open it up and scan the QR code.

!["Polygon ID App Adding Credential"](../imgs/polygonid-app-claim.png)

### Verifying Credential

!!! note 
    The goal is to build your own type of credential and ways to verify it, but this is an example of how things could work.

A quick way to validate this KYCAge Claim is to use [https://verifier-demo.polygonid.me/](https://verifier-demo.polygonid.me/).

!["Verifier Selecting KYCAgeCredential"](../imgs/verifier-kycagecredential.png)

!["Verifier Verification Prompt"](../imgs/verifier-verification.png)

!["Polygon ID App Generating Proof"](../imgs/polygonid-app-proof.png)

!["Verifier Proof Verified"](../imgs/verifier-success-verified.png)

---