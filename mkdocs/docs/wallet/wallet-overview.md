# Wallet Overview

A digital wallet is a software that can hold and manage users' `Claims`. Based on the principles of Self-Sovereign Identity (SSI) and cryptography, a wallet helps its Holder share data with others without expositing any other sensitive private information stored on it. Only the wallet holder has the right to decide which information to share with other entities and what needs to remain private. 

The Polygon ID Wallet is a `Privacy by Default` wallet that helps protect a user's identity (and other metadata) by using zero-knowledge protocols. The wallet interacts with an Issuer to fetch claims and with Verifier for sharing zkProofs based on these claims.

The Polygon ID app will be a reference implementation that other web3 wallets will be able to use as a starting point for integrating the Wallet SDK into their apps so that they can become compatible with the Polygon ID ecosystem.

<div align="center">
<img src="../../imgs/polygon-id-reference-app.png" alt="Polygon ID app as a reference implementation" width="500" align="center" />
</div>

## Features of the Polygon ID Wallet

The Polygon ID Wallet supports the following features:

- Privacy by design and Self-sovereignty: The user is in full control of his/her identity data and exchanges Claims with other identities without the need for an intermediary or centralized authority. 
- Open and Permissionless. 
- Fetching, storing, and managing claims.
- Generating cost-optimized zero-knowledge proofs for claim verification.
- Communication with Issuer and Verifier.
- Identity recovery using seed phrase.

<br>

> Download links for the PolygonID Wallet App:

> - For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
> - For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>

<br>

## How is Polygon ID Wallet Different from Other Wallets?

You, at some point in time, must have used cryptographic wallets such as Metamask, Trust Wallet, Coinbase Wallet, Ledger, and so many more. How is Polygon ID Wallet different from all these hot and cold storage wallets? Let us see:

- The wallets like Metamask and Trust Wallet are used for sending and receiving crypto transactions on-chain. Polygon ID Wallet, on the other hand, is used for creating and storing unique identities for the wallet so that these identities can be used to authenticate with the Issuer and the Verifier. This Identity wallet helps an Integrator fetch and save claims from Issuers and also present proof of these claims to the Verifiers. 

- While the commonly-used crypto wallets let you interact with Ethereum and other blockchain networks using RPCs (Remote Procedure Calls), this is not the case with Polygon ID Wallet - it functions solely to store claims linked to an identity and lets these claims get verified by creating zero-knowledge proofs. 

- General wallets store cryptographic keys while the Polygon ID Wallet stores users' identities.





