# Verifier

A Verifier is any web2 or web3 platform that wants to authenticate users based on their Credentials.

Verifiers can set up queries based on **users’ existing Credentials** collected from a broad set of [Issuers](../issuer/issuer-overview.md). A [Query](./verification-library/zk-query-language.md) encapsulates the criteria that a user must match to authenticate, such as “must be a member of XYZ DAO” or “must be over 18 years old”. Polygon ID provides a seamless, customized and privacy-based authentication experience to users.

The request of the Verifier is designed using our fully expressive [zk Query Language](./verification-library/zk-query-language.md) and encapsulated into a QR code (or via deeplinking) to be shown to the user. The user scans the QR code with its [Wallet](../wallet/wallet-overview.md) to prompt the proof generation. 

The verification process doesn’t involve any interaction between the Verifier and the Issuer of the requested credential. As part of the Query, the Verifier includes the identifiers of the trusted issuers. For example, a Verifier should add XYZ DAO as the only trusted Issuer when verifying that an individual is a member of XYZ DAO. XYZ DAO doesn’t need to accept nor interact with the Verifier.

At the end of the process the verifier gets a cryptographic proof that the user satisfies the query, while the user shares just the minimum possible amount of data required for the interaction.

<div align="center">
<img src= "../../imgs/verifier-intro.png" align="center" />
</div>

## Verifier SDK

The Verifier SDK is a set of tools that allow any application to verify user information based on their credentials. The SDK provides a fully customizable and privacy-based authentication experience to users. 
The process of verifying user information based on their credentials can happen on-chain via a smart contract or off-chain. Both processes involve the same level of user privacy and the same degree of query customization. The proof generated on mobile is the same for both cases; the only difference is in the verification process. The on-chain verification happens programmatically inside a smart contract. The off-chain verification happens inside a script that needs to be setup by the Verifier application (either on a server or on the client side):

- [Verifier SDK - Off-chain Verification](./verification-library/verifier-library-intro.md) provides all the elements to create a customized Query, set up a verifier and generate a QR code (or deeplink) on the client side to request proof from the user.
- [Verifier SDK - On-chain Verification](./on-chain-verification/overview.md) allows Dapps to verify users' credentials inside a Smart Contract using zero knowledge proof cryptography. 

## Quick Start 

You can quickly try out the Verification experience by following the steps below: 

- Download the Polygon ID Wallet App and create an Identity.
> - For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
> - For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>
- Fetch a credential from the [Demo Issuer](https://issuer-demo.polygonid.me/)
- Verify it on the [Demo Verifier](https://verifier-demo.polygonid.me/)


