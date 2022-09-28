# Verifier Overview

A Verifier is any Web2 or Web3 platform that wants to authenticate users based on their [claims](../getting-started/claim/generic-claim.md). Verifiers can set up queries based on **users’ existing claims** collected from a broad set of [Issuers](../issuer/issuer-overview.md). A [Query](./verification-library/zk-query-language.md) encapsulates the criteria that a user must match to authenticate, such as “must be a member of XYZ DAO” or “must be over 18 years old”. Authenticate with Polygon ID provides a seamless, customized and privacy-based authentication experience to users.

The verifier doesn’t need to interact with the claim issuer when verifying users' claims. As part of the Query, the verifier includes the identifiers of the trusted issuers. For example, a verifier should add XYZ DAO as the only trusted issuer when verifying that an individual is a member of XYZ DAO. XYZ DAO doesn’t need to accept nor interact with the verifier.

The request of the Verifier is encapsulated into a QR code and shown to the user. The user scans the QR code with its wallet to prompt the proof generation. The verification of the proof can be implemented either off-chain or on-chain.

The [off-chain Verification Library](./verification-library/verifier-library-intro.md) provides all the elements to create a customized Query, set up a verifier server and generate a QR on the client side to interact with the wallet.

The [on-chain Verification Flow](./verification-library/on-chain-verification/overview.md) allows Dapps to verify users' claim inside a Smart Contract using zero knowledge proof cryptography. 
