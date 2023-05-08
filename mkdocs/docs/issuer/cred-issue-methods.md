## Verifiable Presentations leveraging ZK Proofs

The owner of a credential can prove to another party that a credential is true, without revealing any information beyond the validity of the credential itself using zkSNARK cryptography.

The Verifier can request any proof of the information contained in the identity credential (using the zkQuery Request Language) and obtain guaranteed correctness without access to the private credential.

There are two ways those credentials can be issued: using *BJJ key Signature* or *Merkle Tree Proof*.


### SIG Method: Issuance of Credentials with Baby JubJub(BJJ) Key Signatures

The credential is not added to the Issuer’s Merkle tree, instead a **baby jub jub (BJJ)** signature is used which is then verified upon presentation.


<div align="center">
    <img src="../../imgs/babyjubjub.png"></img>
</div>

### MTP Method: Issuance of Credentials with Claims Merkle Tree (Merkle Tree Proof)

The validation of the proof is done against the Hash published on-chain. NO personal information is shared with the verifier at any time; hence, privacy is preserved. A key difference with this method is that gas has to be spent in order to update on-chain information (the hash of the merkle trees), since the [Identity State Transition function](https://docs.iden3.io/protocol/spec/#identity-state-update) has to be executed. Another important difference is that through this method smart contracts can issue credentials.

<div align="center">
    <img src="../../imgs/mtp.png"></img>
</div>
