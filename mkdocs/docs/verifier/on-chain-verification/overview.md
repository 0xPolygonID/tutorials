# On-chain ZK Verification

The on-chain verification workflow allows Dapps to verify users' claims inside a Smart Contract. Zero-Knowledge Proof cryptography enables this verification to happen in a private manner, namely without revealing any personal information of the user (prover).

This flow is especially needed when further on-chain logic wants to be implemented on successful verification such as:

- Distribute a token-airdrop only to human-verified accounts
- Allow voting only to account members of your DAO 
- Block airdrops to users that belong to a specific country
- Allow trading only to accounts that passed the KYC verification

## Implement ERC20 ZK Airdrop in 20 Minutes 

In this tutorial, we will create an ERC20 zk Airdrop Contract. The chosen verification criteria is to be born before `01/01/2001`. Users that are able to prove that were born before that date will be able to get the airdrop. Otherwise, they will not. 

The proof submitted to the Smart Contract will not reveal any information about the specific date of birth of the user. That is the magic of zero-knowledge! 

The prerequisite is that users have the Polygon ID Wallet app installed and received a claim of type `KYCAgeCredential` attesting their date of birth.

---
**Note:** The full executable code related to this tutorial can be cloned from this <a href="https://github.com/0xPolygonID/tutorial-examples/tree/main/on-chain-verification" target="_blank">repository</a>.

--- 

> 

### Design the ERC20 zk Airdrop Verifier Contract 

Let us jump into the code by writing the `ERC20Verifier` contract. 

The ERC20Verifier is an ERC20 standard contract on steroids. The extra functionality is given by the zero-knowledge proof verification. All the functions dedicated to the zk verification are contained inside the 
<a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol" target="_blank">ZKPVerifier Contract</a> and inherited within the ERC20Verifier. For example, users will submit their proof to claim the airdrop by calling <a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L18" target="_blank">`submitZKPResponse`</a>.

The ERC20Verifier contract must define at least a single `TRANSFER_REQUEST_ID`. This is the Identifier of the request that the contract is posing to the user.

> In this specific case the request is: "to be born before 01/01/2001". Note that this hasn't been added yet to the Smart Contract. It will be added in a few minutes!

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

The ZKPVerifier Contract provides 2 hooks: 

<a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L93" target="_blank">`_beforeProofSubmit`</a> and <a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L102" target="_blank">`afterProofSubmit`</a>. These hooks are called before and after any proof get submitted and can be used to create personalized logic inside your Smart Contract.

In this specific case, it must be checked that the sender of the proof matches the address contained in the proof challenge. This requirement is necessary to prevent proof front-running. This condition is added inside `_beforeProofSubmit`.

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
        // check that the challenge input of the proof is equal to the msg.sender 
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in the proof is not a sender address"
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

Finally, we can add a further element of security inside the Smart Contract: prevent any type of token transfer (even after the airdrop) unless users passed the proof verification. This last condition is added by overriding the ERC20 `_beforeTokenTransfer` function and checking that the receiver address `to` of the transfer is included inside the 
<a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L12" target="_blank">`proofs`</a> mapping. 

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

> The contract ERC20Verifier must be deployed on the Mumbai test network as there is a set of supporting contracts that are already deployed on Mumbai! 

### Set the ZKP Request

As previously mentioned, the actual zkp request "to be born before 01/01/2001" hasn't been added to the Smart Contract yet. To do so it is necessary to call <a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/verifiers/ZKPVerifier.sol#L62" target="_blank">`setZKPRequest`</a> function inherited inside the ERC20Verifier which takes 3 input:

1. `requestId`: the id associated with the request.
2. `validator`: the address of the <a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/validators/CredentialAtomicQuerySigValidator.sol" target="_blank">Validator Smart Contract</a> already deployed on Mumbai. This is the contract that actually executes the verification on the zk proof submitted by the user
3. `query`: the rules that the user must satisfy.

In particular, the query must be designed as follow: 

- `schema` is the hash of the schema that you can retrieve from the issuer dashboard at [Polygon ID Platform](https://platform-test.polygonid.com/). In order to use it inside the query it should be converted from hex to bigint
- `slotIndex` is the index of the attribute you are querying. It can be either 2 or 3. 2 if the corresponding information is stored as `Attribute #1` or 3 if the information is stored as `Attribute #2`
- `operator` is either 1,2,3,4,5:
    "1" - equals
    "2" - less-than
    "3" - greater-than
    "4" - in
    "5" - notin
> To understand more about the operator you can check the [zk query language](../verification-library/zk-query-language.md)
- `value` represents the threshold value you are querying. If the data type during the schema creation was set to `Yes or no`, value true equals to `1` and false equals to `0`
- `circuitId` is the ID of the circuit you are using for verification. For now it will always correspond to `credentialAtomicQuerySig`

> Check out our [Smart Contract section](../../contracts/overview.md#credentialatomicquerysigvalidator) to learn more about the set of verifications executed on the zk proof.

Execute this Hardhat script to set the zk request to the Smart Contract.

```js

async function main() {

    const circuitId = "credentialAtomicQuerySig";
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

    // Grab the schema hash from Polygon ID Platform
    const schemaHash = "<>"

    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))

    const ageQuery = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 2,
    value: 200201011, ...new Array(63).fill(0).map(i => 0)],
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

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function fromLittleEndian(bytes) {
    const n256 = BigInt(256);
    let result = BigInt(0);
    let base = BigInt(1);
    bytes.forEach((byte) => {
      result += base * BigInt(byte);
      base = base * n256;
    });
    return result;
  }
  
```

The contract is now correctly deployed on Mumbai Testnet and the query has been set up, congratulations! Now it is time to launch the airdrop! 

### Add the Proof Request Inside a QR Code 

The last step is to design the proof request to be embedded inside a QR code that will be shown to the users that want to claim their airdrops. In this particular case this is how the request should look like (remember to modify it by adding the address of your ERC20Verifier Contract):

```json
{  
    "id":"c811849d-6bfb-4d85-936e-3d9759c7f105",
    "typ":"application/iden3comm-plain-json",
    "type":"https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    "body":{
        "transaction_data":{
            "contract_address":"<ERC20Verifier contract address>",
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

> The scope section inside the JSON file must match the query previously set when calling the "setZKPRequest" function

Note that the request resembles in most of its parts with the one designed for <a href="https://0xpolygonid.github.io/tutorials/verifier/verification-library/request-api-guide/" target="_blank">off-chain verification</a>. The extra part that has been added here is the `transcation_data` that includes:

- `contract_address`, namely the address of the Verifier contract, in this case, ERC20Verifier
- `method_id`, namely that hash of the ABI of the <a href="https://github.com/0xPolygonID/contracts/blob/main/contracts/interfaces/IZKPVerifier.sol#L5" target="_blank">`submitZKPResponse`</a> function
- `chain_id`, the ID of the chain where the Smart Contract has been deployed
- `network`, the name of the network where the Smart contract has been deployed

> To display the QR code inside your frontend, you can use the `express.static` built-in middleware function together with this <a href="https://github.com/0xPolygonID/tutorial-examples/tree/main/verifier-integration/js/static" target="_blank">Static Folder</a> or use any other online QR code generator.

Scanning the QR with their Polygon ID Wallet, users will be able to generate proofs and send transactions to the Smart Contract in order to claim their airdrops.

## User Demo: Claim the Airdrop!

This video shows how a user can use their PolygonID wallet app to claim a ERC-20 token airdrop. To join the airdrop users are required to have a claim of type `KYCAgeCredential` attesting that their age is over 22yo.

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/NvPfh3nqeEQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div class="video-wrapper">
 
</div>


Or you can direcly test it scanning the QR Code below using your Polygon ID App: 

<div align="center">
<img src= "../../../imgs/qr-code-on-chain-verification.png" align="center" width="400" style="border: 4px solid black"/>
</div>
<br>

### How the proof submission is executed?

The wallet needs to call the `submitZKPResponse()` function before it can submit the proof for the requirements set in the Airdrop Participation process. This function forms part of the ZKPVerifier Interface [`IZKPVerifier`](https://github.com/iden3/contracts/blob/master/contracts/interfaces/IZKPVerifier.sol#L6) and is actually implemented inside the [`ZKPVerifier Contract`](https://github.com/iden3/contracts/blob/master/contracts/ZKPVerifier.sol#L19)

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

## Extend it to Your Own Logic

Now that you have been able to create your first on-chain zk-based application you can extend it to accommodate any type of imaginable logic. The target Smart Contract doesn't have to be an ERC20 but it can be an ERC721, a DeFi pool, a voting Smart Contract or whatever contract you can think of. Equally the query can be extended to any type of existing claim and based on the different operators available inside the <a href="https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/" target="_blank">ZK Query Language</a>.

Another possibility to customize your Smart Contract involves setting different zk requests. First of all, multiple `REQUEST_ID` must be defined inside the main Smart Contract. Therefore, the contract deployer can set a different query for each request ID and create different outcomes inside `_afterProofSubmit` according to the type of proof received. For example, an airdrop contract can verify the role of a user inside a DAO and distribute a different amount of tokens based on the role.


