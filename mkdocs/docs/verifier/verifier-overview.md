# Verifier Overview

A Verifier is any Web2 or Web3 platform that wants to authenticate users based on their Polygon ID Credentials. Verifiers can set up queries based on **users’ existing credentials** collected from a broad set of issuers. A Query encapsulates the criteria that a user must match to authenticate, such as “must be a member of XYZ DAO” or “must be over 18 years old”. Authenticate with Polygon ID provides a seamless, customized and privacy-based authentication experience to users.

In its interaction with a user (via its wallet), a verifier must set up a client able to authenticate the user and verify  the proof to provide access to the platform. The verification can be implemented either off-chain or on-chain (coming soon)

The verifier doesn’t need to interact with the credential’s issuer when verifying a proof. As part of the Query, the verifier includes the identifiers of the trusted issuers. This is what we call indirect (or non-interactive) trust. For example, a verifier should add XYZ DAO as the only trusted issuer when verifying that an individual is a member of XYZ DAO. XYZ DAO doesn’t need to accept nor interact with the verifier.

The verification happens in two steps: 

- Verifying that the proof passed by the user matches the query
- Verifying that the credential and the key used to sign the credential haven’t been revoked by looking up the Issuer’s on-chain State 
 
[] Add development models for Verifier
