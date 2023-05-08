## Verifiable Presentations leveraging ZK Proofs

The owner of a credential can prove to another party that a credential is true, without revealing any information beyond the validity of the credential itself using zkSNARK cryptography.

The Verifier can request any proof of the information contained in the identity credential (using the zkQuery Request Language) and obtain guaranteed correctness without access to the private credential.

There are two ways those credentials can be issued: using *BJJ key Signature* or *Merkle Tree Proof*.


### SIG Method: Issuance of Credentials with Baby JubJub(BJJ) Key Signatures

The credential is not added to the Issuer’s Merkle tree, instead a **baby jub jub (BJJ)** signature is used which is then verified upon presentation.

After the initial issuer state has been published on-chain; it is free to issue claims off-chain (similar to `did:ethr`).

<div align="center">
    <img src="../../imgs/babyjubjub.png"></img>
</div>

### MTP Method: Issuance of Credentials with Claims Merkle Tree (Merkle Tree Proof)

The validation of the proof is done against the Hash published on-chain. NO personal information is shared with the verifier at any time; hence, privacy is preserved. This method enables smart contracts to issue credentials.

By means of a zk Proof one party (the User or Prover) can prove to another party (the Verifier) that a given information is known, without conveying any additional information that is not essential to an interaction.
The protocol ensures that the zk Proof information can only be verified by the recipient if the actual information being proven does exist, without the need to share concrete information.

<div align="center">
    <img src="../../imgs/mtp.png"></img>
</div>