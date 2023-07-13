This is an example of using an on-chain issuer. In this application, we communicate with Metamask to retrieve the user's balance and the issuer's claim about the user's balance via the on-chain issuer.

There are three main components in this application:
1. On-chain issuer ([demo](https://github.com/0xPolygonID/onchain-issuer-demo/)|[contract](https://github.com/iden3/contracts))
2. Server for user authorization
3. Front-end component for communication with Metamask

## Requirements:
1. Node js => 18.x
2. Go => 1.20.x
3. npm => 9.x.x
4. docker => 20.x
5. Polygon ID wallet app

## How to run the On-chain Issuer
1. Clone this repository:
    ```bash
    git clone https://github.com/0xPolygonID/onchain-issuer-integration-demo
    ```

    All the variables which need to be altered are in the `run.sh` file:

    ```bash
    ONCHAIN_ISSUER_CONTRACT_ADDRESS=<ONCHAIN_ISSUER_CONTRACT_ADDRESS>
    URL_MUMBAI_NODE=<URL_TO_POLYGON_MUMBAI_NODE>
    URL_POLYGON_NODE=<URL_TO_POLYGON_MAINNET_NODE>
    ONCHAIN_CONTRACT_OWNER=<PRIVATE_KEY_IS_USED_FOR_DEPLOY_ONCHAIN_ISSUER_CONTRACT>
    MUMBAI_CONTRACT_STATE_ADDRESS=0x134B1BE34911E39A8397ec6289782989729807a4
    MAIN_CONTRACT_STATE_ADDRESS=0xdc2A724E6bd60144Cde9DEC0A38a26C619d84B90
    ONCHAIN_ISSUER_CONTRACT_BLOCKCHAIN=<BLOCKCHAIN_OF_ISSUER_CONTRACT>
    ONCHAIN_ISSUER_CONTRACT_NETWORK=<BLOCKCHAIN_OF_WITH_ISSUER_CONTRACT>
    ``` 

2. Deploy on-chain issuer contract. Use the following addresses:
    * For mumbai network: `0x134B1BE34911E39A8397ec6289782989729807a4`
    * For main net network: `0xdc2A724E6bd60144Cde9DEC0A38a26C619d84B90`

    !!!note
        You can find more information on how to deploy a smart contract using Hardhat [in this readme](https://github.com/iden3/contracts#readme).


3. Fill in the configuration files with the actual values.

    - `ONCHAIN_ISSUER_CONTRACT_ADDRESS` should be retrieved from the smart contract deployment.
    - `URL_MUMBAI_NODE` is easily acquired with any Infrasctructure provider, such as Alchemy, Infura etc.
    - `URL_POLYGON_NODE`is easily acquired with any Infrasctructure provider, such as Alchemy, Infura etc.
    - `ONCHAIN_CONTRACT_OWNER` is where a private key should be set to deploy the contract.
    - `MUMBAI_CONTRACT_STATE_ADDRESS` represents the already deployed Mumbai State Contract and shouldn't be changed.
    - `MAIN_CONTRACT_STATE_ADDRESS`represents the already deployed Mainnet State Contract and shouldn't be changed.
    - `ONCHAIN_ISSUER_CONTRACT_BLOCKCHAIN` sets the blockchain where the on-chain issuer contract was deployed as `eth` or `polygon`.
    - `ONCHAIN_ISSUER_CONTRACT_NETWORK` sets the blockchain network where the on-chain issuer contract was deployed, as `main`, `mumbai` or `goerli`.

4. Run the run.sh script:
    ```bash
    ./run.sh
    ```

!!!note
        Don't forget to download and install the Polygon ID wallet app before you go the next steps. 

        - For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
        - For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>

## Issue and fetch credential

1. Open `http://localhost:3000` in your web browser and click on **Sign Up**.

    <div align="center">
        <img width="300" src="../../../imgs/onchain-issuer-1.png"></img>
    </div>

2. Scan the QR code with your Polygon ID wallet app and following the instructions on the application. 

    <div align="center">
        <img width="300" src="../../../imgs/onchain-issuer-2.png"></img>
    </div>

3. You will see your DID and now you can connect to MetaMask. Follow the flow on the MetaMask app.

    <div align="center">
        <img width="600" src="../../../imgs/onchain-issuer-3.png"></img>
    </div>

4. The On-chain issuer application will now display your account. Now share your account balance with the application.

    <div align="center">
        <img width="600" src="../../../imgs/onchain-issuer-4.png"></img>
    </div>

5. The account balance will be shown in gwei together with some other information about the claim.

    <div align="center">
        <img width="700" src="../../../imgs/onchain-issuer-5.png"></img>
    </div>

6. Clicking on **Get Claim** will finally lead to the QR Code used to fetch the credential. Here we are making a request to the on-chain issuer server. This server then saves this claim in a contract address. Scan it with the Polygon ID wallet and the credential should be added to the mobile app. 

    <div align="center">
        <img width="500" src="../../../imgs/onchain-issuer-6.png"></img>
    </div>

Here is the credential on the mobile app:

<div align="center">
    <img width="300" src="../../../imgs/onchain-issuer-7.png"></img>
</div>

## How to verify the balance claim

1. Go to the [Verifier website](https://verifier-v2.polygonid.me/).
2. Choose `custom` from the dropdown menu.

    <div align="center">
        <img width="400" src="../../../imgs/onchain-issuer-8.png"></img>
    </div>

3. Fill up the form.

    * **Circuit Id**: Credential Atomic Query MTP;
    * **URL**: https://gist.githubusercontent.com/ilya-korotya/b06baa37453ed9aedfcb79100b84d51f/raw/balance-v1.jsonld
    * **Type**: BalanceCredential
    * **Field**: balance
    * **Operator**: all the operators work for the claim. [More information here](https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/)
    * **Value**: set the value that you want to verify.

    Here is an example:

    <div align="center">
        <img width="600" src="../../../imgs/onchain-issuer-9.png"></img>
    </div>

4. Press submit.

5. Use the mobile application to scan the QR code and complete the verification process. The verifier will check revocation status and additional information and the proof will be sent to the verifier. The Verifier website will present then the proof information.

    <div align="center">
        <img width="600" src="../../../imgs/onchain-issuer-10.png"></img>
    </div>


