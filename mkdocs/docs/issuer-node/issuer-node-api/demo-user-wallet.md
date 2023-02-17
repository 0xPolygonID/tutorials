# Demo: Create Credentials using Polygon ID Wallet App

This demo illustrates the process of creating a credential using Polygon ID app and a demo Issuer website. 

To create a credential, you require a schema that contains semantics of the JSON vocabulary and is used to describe a large number of data sets. The schema contains links to JSON-LD Context and JSON URL. For this tutorial, we shall be using an existing KYC-based Age Credential schema.

To create a credential, the Polygon ID app must be installed on your mobile. 

**Steps to Create Credential**

1. On Issuer website, click **Signup**.

    <div align="center">
    <img src= "../../imgs/signup.png" align="center" width="300"/>
    </div>
    <br>

    It shows the QR code on screen:

    <div align="center">
    <img src= "../../imgs/qr-code-display.png" align="center" width="200"/>
    </div>
    <br>

2. Open Polygon ID app and authenticate with pin/biometrics

    <div align="center">
    <img src= "../../imgs/authenticate.png" align="center" width="200" height="400"/>
    </div>
    <br>

3. On app, click **Connect**.

    <div align="center">
    <img src= "../../imgs/connect.jpg" align="center" width="200" height="400" border="2"/>
    </div>
    <br>

4. With app, scan the QR code displayed on the site and click **Connect Wallet**. 

    <div align="center">
    <img src= "../../imgs/connect-wallet.jpg" align="center" width="200" height="400" border="1"/>
    </div>
    <br>

5. Authenticate again with your pin/biometrics. This starts the authentication of the user's wallet. 

    <div align="center">
    <img src= "../../imgs/authenticating.png" align="center" width="500"  border="1"/>
    </div>
    <br>

    After authentication process is complete, the app shows the message if the identity is successfully authenticated or it failed to authenticate.  

    <div align="center">
    <img src= "../../imgs/authenticated.png" align="center" width="500"  border="1"/>
    </div>
    <br>

6. On website, click **Create Claim**.

    <div align="center">
    <img src= "../../imgs/create-credentials.png" align="center" width="500"  border="1"/>
    </div>
    <br>

    This shows the **Create Claim** window:

    <div align="center">
    <img src= "../../imgs/create-cred-window.png" align="center" width="500" border="1"/>
    </div>
    <br>

7. Click the ***Schema*** dropdown menu and select the type of schema you want to use for creating credential. 

    > Note: Please note that in addition to selecting the schemas displayed on the menu, you can also select **Custom** to use your own schema. For this example, we are using KYCAGeCredential type of schema. As you select this, the JSON URL and JSON-LD Context URL are auto-poulated under the ***URL*** and the ***Type*** fields. The ***Expiration*** (date on which credential shall expire) and the ***Data JSON*** are also auto-populated. Click **Submit**

    <div align="center">
    <img src= "../../imgs/select-schema.png" align="center" width="500" border="1"/>
    </div>
    <br>

    This creates a new credential.

    <div align="center">
    <img src= "../../imgs/credential-created.png" align="center" width="500"  height="200" border="1"/>
    </div>
    <br>

8. Once a credential is created, you can view it on the Issuer site. For this, click the icon to open and view the credential. 

    <div align="center">
    <img src= "../../imgs/open-credential-link.png" align="center" width="500" border="1"/>
    </div>
    <br>

   A Credential looks like this:

    <div align="center">
    <img src= "../../imgs/cred1.png" align="center" width="500" border="1"/>
    </div>
    

   <div align="center">
    <img src= "../../imgs/cred2.png" align="center" width="500" border="1"/>
    </div>
    

    <div align="center">
    <img src= "../../imgs/cred3.png" align="center" width="500" border="1"/>
    </div>
    

    <div align="center">
    <img src= "../../imgs/cred4.png" align="center" width="500" border="1"/>
    </div>
    <br>

    This shows all the information related to a credential; this includes:

- @Context (JSON-LD Schema) and CredentialSchema (JSON) URLs
- credentialStatus: Revocation status of the credential along with the revocation nonce. 
- credentialSubject: Infirmation related to the Subject of the Credential. In this example, this includes subject's birthday, documentType, and id of the Subject in the `did` format.
- Other information such as expiration date, issuance date, and id of the Issuer in the `did` format.
- Proof which includes information such as state of the identity published on-chain, the authorization claim, and the actual credential signed by the Issuer.  