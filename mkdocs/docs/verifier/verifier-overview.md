# Verifier Overview

A Verifier is any web2 or web3 platform that wants to authenticate users based on their claims. Verifiers can set up queries based on **users’ existing claims** collected from a broad set of [Issuers](../issuer/issuer-overview.md). A [Query](./verification-library/zk-query-language.md) encapsulates the criteria that a user must match to authenticate, such as “must be a member of XYZ DAO” or “must be over 18 years old”. Polygon ID provides a seamless, customized and privacy-based authentication experience to users.

The request of the Verifier is designed using our fully expressive [zk Query Language](./verification-library/zk-query-language.md) and encapsulated into a QR code to be shown to the user. The user scans the QR code with its [Wallet](../wallet/wallet-overview.md) to prompt the zero knowledge proof generation. 

The verification process doesn’t involve any interaction between the Verifier and the Issuer of the requested claim. As part of the Query, the Verifier includes the identifiers of the trusted issuers. For example, a Verifier should add XYZ DAO as the only trusted Issuer when verifying that an individual is a member of XYZ DAO. XYZ DAO doesn’t need to accept nor interact with the Verifier.

At the end of the process the verifier gets a cryptographic proof that the user satisfies the query, while the user shrares just the minimum possible amount of data required for the interaction.

<div align="center">
<img src= "../../imgs/verifier-intro.png" align="center" />
</div>


## On-chain and Off-chain verification

The process of verifying user information based on their claims can happen on-chain via a smart contract or off-chain. Both processes involve the same level of user privacy and the same degree of query customization. The proof generated on mobile is the same for both cases; the only difference is in the verification process. The on-chain verification happens programmatically inside a smart contract. The off-chain verification happens inside a server that needs to be setup by the Verifier application:

- [Off-chain Verification](./verification-library/verifier-library-intro.md) provides all the elements to create a customized Query, set up a verifier server and generate a QR on the client side to request proof from the user.
- [On-chain Verification](./on-chain-verification/overview.md) allows Dapps to verify users' claim inside a Smart Contract using zero knowledge proof cryptography. 
