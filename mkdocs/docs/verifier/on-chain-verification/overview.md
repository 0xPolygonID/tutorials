# On-chain zk verification

The on-chain verification workflow allows Dapps to verify users' claim inside a Smart Contract. Zero Knowledge Proof cryptography enables this verification to happen in a privacy manner, namely without revealing any personal information of the user (prover).

This flow is especially needed when further on-chain logic wants to be implemented on successful verification such as:

- Distribute a token-airdrop only to human-verified accounts
- Allow voting only to accounts member of your DAO 
- Block airdrops to users that belong to a specific country
- Allow trading only to accounts that passed the KYC verification

## Implement ERC20 zk airdrop in 20 minutes 

In this tutorial we are gonna create a ERC20 zk Airdrop Contract. The chosen verification criteria is to be born before the `01/01/2001`. Users that are able to prove that were born before that date will be able to get the airdrop. Otherwise, they will not. 

The proof submitted to the smart contract will not reveal any information about the specific date of birth of the user. That's the zero knowledge magic! 

The prerequisite is that users have the Polygon ID Wallet app installed and received a claim of type `KYCAgeCredential` attesting their date of birth.

> The full executable code related to this tutorial can be cloned from this [repository](https://github.com/0xPolygonID/tutorial-examples/tree/main/on-chain-verification)


### Design the ERC20 zk Airdrop Verifier Contract 

Let's jump into the code by writing the `ERC20Verifier` contract. 

The ERC20Verifier is a ERC20 standard contracts on steroids. The extra functionality is given by the zero knowledge proof verification. All the functions dedicated to the zk verification are contained inside the [ZKPVerifier Contract](https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol) and inherited within the ERC20Verifier. For example users will submit their proof to claim the airdrop by calling [`submitZKPResponse`](https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L18).

The ERC20Verifier contract must define at least a single `TRANSFER_REQUEST_ID`. That is, the identifier of the request that the contract is posing to the user.

> In this specific case the request is: "to be born before the 01/01/2001". Note that this hasn't been added yet to the smart contract. It will be added in a few minutes!

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract ERC20Verifier is ERC20, ZKPVerifier {

    uint64 public constant TRANSFER_REQUEST_ID = 1;
    // define the amount of token to be airdropped per user
    uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID = 5 * 10**uint(decimals());


    constructor(string memory name_, string memory symbol_)
        ERC20(name_, symbol_)
    {}    

}
```

The ZKPVerifier Contract provides 2 hooks: [`_beforeProofSubmit`](https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L93) and [`afterProofSubmit`](https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L102). These hooks are called before and after any proof get submitted and can be used to create personalized logic inside your smart contract.

In this specific case it must be checked that the sender of the proof matches the address contained in the proof challenge. This requirement is necessary to prevent proof front-running. This condition is added inside `_beforeProofSubmit`.

The airdrop logic must be added inside `_afterProofSubmit`. The contract must execute the airdrop once the proof is correctly verified.

```solidity hl_lines="4 5 13 14 15 16 17 28 29 30 31 32"
contract ERC20Verifier is ERC20, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID = 5 * 10**uint(decimals());

    constructor(string memory name_, string memory symbol_)
        ERC20(name_, symbol_)
    {}

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that challenge input of the proof is equal to the msg.sender 
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        uint256 id = inputs[validator.getChallengeInputIndex()];
        // execute the airdrop
        if (idToAddress[id] == address(0)) {
            super._mint(_msgSender(), TOKEN_AMOUNT_FOR_AIRDROP_PER_ID);
            addressToId[_msgSender()] = id;
            idToAddress[id] = _msgSender();
        }
    }
}
```

Finally, we can add a further element of security inside the smart contract: prevent any type of token transfer (even after the airdrop) unless users passed the proof verification. This last condition is added by overriding the ERC20 `_beforeTokenTransfer` function and checking that the receiver address `to` of the transfer is included inside the [`proofs`](https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L12) mapping. 

```solidity hl_lines="29 30 31 32 33"
contract ERC20Verifier is ERC20, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID = 5 * 10**uint(decimals());

    constructor(string memory name_, string memory symbol_)
        ERC20(name_, symbol_)
    {}

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
       ...
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        ...
    }

    function _beforeTokenTransfer(
        address, /* from */
        address to,
        uint256 /* amount */
    ) internal view override {
        require(
            proofs[to][TRANSFER_REQUEST_ID] == true,
            "only identities who provided proof are allowed to receive tokens"
        );
    }
}
```

The contract is now fully written!

### Deploy the Contract  

Execute this Hardhat script to deploy the contract

```js

async function main() {
  const verifierContract ="ERC20Verifier"
  const verifierName = "ERC20zkAirdrop";
  const verifierSymbol = "zkERC20"; 
  const ERC20Verifier = await ethers.getContractFactory(verifierContract);
  const erc20Verifier = await ERC20Verifier.deploy(
    verifierName,
    verifierSymbol
  );

  await erc20Verifier.deployed();
  console.log(verifierName, " deployed to:", erc20Verifier.address);
}
```

> The contract ERC20Verifier must be deployed on Mumbai test network as there's a set of supporting contracts that are already deployed on Mumbai too! 

### Set the zkp request

As previously mentioned, the actual zkp request "to be born before the 01/01/2001" hasn't been added to the smart contract yet. To do so it is necessary to call [`setZKPRequest`](https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L62) function inherited inside the ERC20Verifier. This function takes as input:
- `requestId`, namely the id associated to the request.
- `validator` the address of the [Validator Smart Contract](https://github.com/0xPolygonID/contracts/blob/main/contracts/validators/CredentialAtomicQuerySigValidator.sol). This is the contract that actually executes the verification on the zk proof submitted by the user
- `query`, namely the rules that the user must satisfy

> Check out our [Smart Contract section](../../contracts/overview.md#credentialatomicquerysigvalidator) to learn more about the set of verification executed on the zk proof.

Execute this Hardhat script to set the zk request to the smart contract.

```js
async function main() {

    const circuitId = "credentialAtomicQuerySig";
    // validator is already deployed on Polygon Mumbai testnet
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";
    // To learn more about how to design query check https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/
    // To learn more about how the claim schema work check https://0xpolygonid.github.io/tutorials/getting-started/claim/claim-schema/
    const ageQuery = {
        schema: ethers.BigNumber.from("210459579859058135404770043788028292398"),
        slotIndex: 2,
        operator: 2,
        value: [20020101, ...new Array(63).fill(0).map(i => 0)],
        circuitId,
    };

    // add the address of the contract just deployed. An instance of the contract has already been deployed on Mumbai 0x752A8f2Fd1c5FC5c9241090BD183709D4591D4cb
    ERC20VerifierAddress = "<>"

    let erc20Verifier = await hre.ethers.getContractAt("ERC20Verifier", ERC20VerifierAddress)

    const requestId = await erc20Verifier.TRANSFER_REQUEST_ID();

    try {
        await erc20Verifier.setZKPRequest(
        requestId,
        validatorAddress,
        ageQuery
        );
        console.log("Request set");
    } catch (e) {
        console.log("error: ", e);
    }
}
```

The contract is now correctly deployed on Mumbai Testnet and the query has been set up, congratulations! Now it is time to launch the airdrop! 

### Add the Proof request inside a QR code 

The last step is to design the proof request to be embedded inside a QR code that will be shown to user that want to claim their airdrop. In this particular case this is how the request should look like (remember to modify it by adding the address of your ERC20Verifier Contract):

```json
{  
    "id":"c811849d-6bfb-4d85-936e-3d9759c7f105",
    "typ":"application/iden3comm-plain-json",
    "type":"https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    "body":{
        "transaction_data":{
            "contract_address":"<Address of your ERC20Verifier Contract>",
            "method_id":"b68967e2",
            "chain_id":80001,
            "network":"polygon-mumbai"
            },
        "reason":"airdrop participation",
        "scope":[{
            "id":1,
            "circuit_id":"credentialAtomicQuerySig",
            "rules":{
                "query":{
                    "allowed_issuers":["*"],
                    "req":{
                        "birthday":{
                            "$lt":20020101
                            }
                        },
                    "schema":{
                            "url":"https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld",
                            "type":"KYCAgeCredential"
                            }
                        }
                    }
                }]
            }
}
```

> The scope section inside the json file must match the query previously set when calling the "setZKPRequest" function

Note that the request resembles in most of its part the one designed for [off-chain verification](https://0xpolygonid.github.io/tutorials/verifier/verification-library/request-api-guide/). The extra part that has been added here is the `transcation_data` that includes:

- `contract_address`, namely the address of the verifier contract, in this case ERC20Verifier
- `method_id`, namely that hash of the ABI of the [`submitZKPResponse`](https://github.com/0xPolygonID/contracts/blob/main/contracts/interfaces/IZKPVerifier.sol#L5) function
- `chain_id`, the ID of the chain where the smart contract has been deployed
- `network`, the name of the network where the smart contract has been deployed

> To display the QR code inside your frontend you can use the express.static built-in middleware function together with this [Static Folder](https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration/js/static)

Scanning the QR with their Polygon ID Wallet, users will be able to generate proofs and send transactions to the smart contract in order to claim their airdrop.

### User Demo: On-chain Verification for ERC-20 Token Transfer 

For this demo, we have deployed a [Frontend](https://onchain.polygonid.me/) to interact with the user. Using this verifier site along with the PolygonID wallet app, users can submit a proof and, if this gets verifier, claim a ERC-20 token airdrop.Let us see the process in a step-by-step manner:

1. Open [Verification Website](https://onchain.polygonid.me/). Click **Participate in Airdrop**.

    <div align="center">
    <img src= "../../../imgs/participate-in-airdrop.png" align="center" width="500" style="border: 4px solid black"/>
    </div>
    <br>

 2. The verification site displays two QR codes:

 - For Merkle Tree Proof(MTP) check on the left
 - For Signature Proof check on the right (we will just focus on this!)

    <div align="center">
    <img src= "../../../imgs/qr-code.png" align="center" width="500" style="border: 4px solid black"/>
    </div>
    <br>

3. Open PolygonID Wallet app and authenticate it with your pin/biometrics.

    <div align="center">
    <img src= "../../../imgs/auth-pin.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

4. On the PolygonID Wallet app, click **Connect**. 

    <div align="center">
    <img src= "../../../imgs/polygonid-wallet-connect.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

5. With your mobile app, scan the QR code displayed on the Verifier site (the one on the right!). 

    <div align="center">
    <img src= "../../../imgs/mobile-scan-window.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

    <div align="center">
    <img src= "../../../imgs/qr-code-scan.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

**Data Inside the QR Code**:  As mentioned previously, the scanned QR code carries the following information: 

```json
{
  "id": "c811849d-6bfb-4d85-936e-3d9759c7f105",
  "typ": "application/iden3comm-plain-json",
  "type": "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  "body": {
    "transcation_data": {
      "contract_address": "0xF66Bf7c7EAe2279385671261CAbCcf4d1D736405",
      "method_id": "b68967e2",
      "chain_id": 80001,
      "network": "polygon-mumbai"
    },
    "reason": "airdrop participation",
    "scope": [
      {
        "id": 1,
        "circuit_id": "credentialAtomicQuerySig",
        "rules": {
          "query": {
            "allowed_issuers": [
              "*"
            ],
            "req": {
              "birthday": {
                "$lt": 20020101
              }
            },
            "schema": {
              "url": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld",
              "type": "KYCAgeCredential"
            }
          }
        }
      }
    ]
  }
}

```
<br>

where `transaction_data` consists of `contract_address`, `method_id`, `chain_id`, and `network` fields. For definition of these fields, please refer to [this](#add-the-proof-request-inside-a-qr-code) section of the document. 


6. This displays the Proof Request page. This proof can be for a claim that the age of the token participant is above 22 years (or any other claim). Click **Continue**.

    <div align="center">
    <img src= "../../../imgs/proof-request.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>


7. The Cryptographic Proof page is displayed. As the proof is based on the principles of zero-knowledge, no private data of the user is shared except the proof that wallet generates. Click **Generate Proof**. 

    <div align="center">
    <img src= "../../../imgs/cryptographic-proof.png" align="center" width="250" style="border: 2px solid black"/>
    </div>
    <br>

8. User is prompted to authorize using pin/biometrics. 

    <div align="center">
    <img src= "../../../imgs/auth-pin.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

9. Upon successful authorization, a WalletConnect page is displayed that lets the user select the wallet to be connected to the app. 

    <div align="center">
    <img src= "../../../imgs/wallet-connect.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

10. Click **Connect** to allow the app to connect to the MetaMask wallet account. This will be the account that is gonna interact with the ERC20Verifier Smart Contract

    <div align="center">
    <img src= "../../../imgs/connect-metamask-to-site.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>


11. The wallet initiates the proof generation process. 

    <div align="center">
    <img src= "../../../imgs/generating-proof.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

12. For submitting the proof to the smart contract, a transaction must be sent from the Metamask account connected to the Polygon ID app earlier. Click **Confirm**.

    <div align="center">
    <img src= "../../../imgs/gas-fee.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

13. The transfer is now complete and the token participant receives a pre-determined number of ERC-20 tokens in his/her wallet.

    <div align="center">
    <img src= "../../../imgs/erc-tokens.png" align="center" width="250" style="border: 4px solid black"/>
    </div>
    <br>

#### Proof Submission 

The wallet needs to call the `submitZKPResponse()` function before it can submit the proof for the requirements set in the Airdrop Participation process. This function forms part of the ZKPVerifier Interface `IZKPVerifier`.

```solidity

import "./ICircuitValidator.sol";

interface IZKPVerifier {
    function submitZKPResponse(
        uint64 requestId,
        uint256[] memory inputs,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c
    ) external returns (bool);
}

```

### Extend to your own logic

Now that you have been able to create your first on-chain zk based application you can extend it to accomodate any type of imaginable logic. The target smart contract doesn't have to be an ERC20 but it can a ERC721, a DeFi pool, a voting smart contract or whatever contract you can think of. Equally the query can extended to any type of existing claim and based on the different operators available inside the [ZK Query Language](https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/). 

Another possibility to customize your Smart Contract involves setting different zk requests. First of all there need to be defined multiple `REQUEST_ID` inside the main smart contract. Therefore the contract deployer can set different query for each request ID and create different outcomes inside `_afterProofSubmit` according to the type of proof received. For example an airdrop contract can verify the role of a user inside a DAO and distribute a different amount of tokens based on the role.

### Resources

- [Polygon ID - Contracts](https://github.com/0xPolygonID/contracts)
