# Demo Issuer

The [Demo Issuer](https://issuer-demo.polygonid.me/) is a playground that allows you to create credentials without having to set up an Issuer Node and fetch it inside your wallet.

## Prerequisites

Download the Polygon ID Wallet App and create an Identity.

- For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>

## Quick Start

To create a credential, you require a schema that contains semantics of the JSON vocabulary and is used to describe a large number of data sets. The schema contains links to JSON-LD Context and JSON URL. For this tutorial, we will be using a customized Schema named `ProofOfDaoLongevity` that attests to someone's `entryDate` inside a DAO. You can find more info about that schema and how to [create a custom Schema](./schema.md).

To create a credential, the Polygon ID app must be installed on your mobile. 

1. On the [Issuer website](https://issuer-demo.polygonid.me/), click **Sign up**.

    <div align="center">
    <img src= "../../imgs/signup.png" align="center" width="300"/>
    </div>
    <br>

    It shows the QR code on screen:

    <div align="center">
    <img src= "../../imgs/qr-code-display.png" align="center" width="200"/>
    </div>
    <br>

2. Open the Polygon ID app and authenticate with pin/biometrics

    <div align="center">
    <img src= "../../imgs/authenticate.png" align="center" width="200" height="400"/>
    </div>
    <br>

3. On the app, click **Connect**.

    <div align="center">
    <img src= "../../imgs/connect.jpg" align="center" width="200" height="400" border="2"/>
    </div>
    <br>

4. With the app, scan the QR code displayed on the site and click **Connect Wallet**. 

    <div align="center">
    <img src= "../../imgs/connect-wallet.jpg" align="center" width="200" height="400" border="1"/>
    </div>
    <br>

5. Authenticate again with your pin/biometrics. This starts the authentication of the user's wallet. 

    <div align="center">
    <img src= "../../imgs/authenticating.png" align="center" width="200" height="400" border="1"/>
    </div>
    <br>

    After the authentication process is complete, the app shows the message if the identity is successfully authenticated or if it failed to authenticate.  

    <div align="center">
    <img src= "../../imgs/authenticated.png" align="center" width="200" height="400" border="1"/>
    </div>
    <br>

    At this point, the Issuer has received information about your Identifier (DID) and can use it as the subject of the credential that will be issued in the next step.

6. On the website, click **Create Claim**.

    <div align="center">
    <img src= "../../imgs/create-credentials.png" align="center" width="500"  border="1"/>
    </div>
    <br>

    This shows the **Create Claim** window:

    <div align="center">
    <img src= "../../imgs/create-cred-window.png" align="center" width="500"  border="1"/>
    </div>
    <br>

7. Click the ***Schema*** dropdown menu and select the type of schema you want to use for creating credentials. 

    Two schemas types are already available in the drop-down menu: KYCAgeCredential and KYCCountryOfResidenceCredential. 
    If you want to use a custom schema, select ***custom*** from the drop-down menu.
    For this example, we are using the `ProofOfDaoLongevity` schema created in the [Create Custom Schemas](./schema.md) tutorial.
    The menu needs to be populated with the JSON Schema URL and the Type of the schema. Which in this case are: 
    
    - `https://raw.githubusercontent.com/0xPolygonID/tutorial-examples/main/credential-schema/proof-of-dao-longevity.json`
    - `ProofOfDaoLongevity`

    The ***expiration*** date sets the date on which the credential will expire. 
    The ***Data JSON*** contains the actual data that the credential is attesting to. In this case, the credential contains a single field `entryDate` that needs to be populated with the date the user joined the DAO.
    
    Once filled up, click **Submit**.

    <div align="center">
    <img src= "../../imgs/select-schema.png" align="center" width="500"  border="1"/>
    </div>
    <br>

    This creates a new credential. Scan the QR code from the wallet app to fetch the credential in the wallet.

    <div align="center">
    <img src= "../../imgs/credential-created.png" align="center" width="200"  border="1"/>
    </div>
    <br>

8. Once a credential is created, you can view it on the Issuer site. For this, click the icon to open and view the credential. 

    <div align="center">
    <img src= "../../imgs/open-credential-link.png" align="center" width="500" border="1"/>
    </div>
    <br>

This shows all the information related to a credential; this includes:

- @Context (JSON-LD Schema) and CredentialSchema (JSON) URLs
- credentialStatus: URL to fetch the [Revocation](https://docs.iden3.io/getting-started/claim-revocation/) status of the credential from the Issuer along with the revocation nonce. 
- credentialSubject: Information related to the Subject of the Credential. In this example, this includes subject's  `entryDate` and id of the Subject in the `did` format.
- Other information such as expiration date of the credential, issuance date, and ID of the Issuer in the `did` format.
- Proof which includes information such as state of the issuer identity published on-chain, the non-revocation proof for the [authorization claim](https://docs.iden3.io/getting-started/claim/auth-claim/), and the actual credential [signed](https://docs.iden3.io/getting-started/signature-claim/signature/) by the Issuer. 