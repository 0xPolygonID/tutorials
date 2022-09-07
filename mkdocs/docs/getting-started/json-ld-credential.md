# JSON-LD Credentials

- [] What is the difference between JSON-LD Credential and Claim 
- [] Why we need that? 
- [] Describe a JSON-LD Credential
- [] Library to parse one from the other

A credential can represent any type of information related to an individual, such as a diploma issued by a university, a passport issued by a government, or a membership certificate issued by a DAO. 
These credentials become useful when interacting with third parties. A recruiter that verifies your educational background, a custom that verifies your citizenship, and a voting platform that verifies your affiliation with a DAO. These subjects are called verifiers. 

A verifier must be able to determine: 

Who issued the credential (issuer)
If the subject presenting the credential is actually the subject the credential was issued to
The content of the credential hasn’t been tampered with after its issuance
The credential hasn’t expired or been revoked 

In JSON-LD Credentials, these properties are enforced via cryptography: any subject can digitally verify that a credential matches certain criteria in a matter of milliseconds.

Here’s an example of JSON-LD Credential:

```
{
   "id": "f17d9373-7251-448e-bf67-b4d55166f486",
   "@context": [
       "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/iden3credential.json-ld",
       "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld"
   ],
   "@type": [
       "Iden3Credential"
   ],
   "expiration": "2361-03-21T20:14:48+01:00",
   "updatable": false,
   "version": 0,
   "rev_nonce": 46033392,
   "credentialSubject": {
       "birthday": 19960424,
       "documentType": 1,
       "id": "113TCVw5KMeMp99Qdvub9Mssfz7krL9jWNvbdB7Fd2",
       "type": "KYCAgeCredential"
   },
   "credentialStatus": {
       "id": "https://032e-88-147-70-175.eu.ngrok.io/api/v1/claims/revocation/status/46033392",
       "type": "SparseMerkleTreeProof"
   },
   "subject_position": "index",
   "credentialSchema": {
       "@id": "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld",
       "type": "KYCAgeCredential"
   },
   "proof": [
       {
           "@type": "BJJSignature2021",
           "issuer_data": {
               "id": "113TCVw5KMeMp99Qdvub9Mssfz7krL9jWNvbdB7Fd2",
               "state": {
                   "claims_tree_root": "ea5774fac8d72478d4db8a57a46193597bb61475fc9e72bdc74a0ce35aa85518",
                   "value": "5ccc30d5d0360170a29188d5a907381098801a1ab09003493d9833fa4d95271f"
               },
               "auth_claim": [
                   "304427537360709784173770334266246861770",
                   "0",
                   "6610201945487752676983171932113332232608162355365546060896064454271869708127",
                   "11380100573862532536254569563965305187461805636461289256869908267462627351172",
                   "0",
                   "0",
                   "0",
                   "0"
               ],
               "mtp": {
                   "existence": true,
                   "siblings": []
               },
               "revocation_status": "https://032e-88-147-70-175.eu.ngrok.io/api/v1/claims/revocation/status/46033392"
           },
           "signature": "bedb18647d2a928877523afefff81295cab05d629d187df986064bd46d7e5499dfccc40c8725ea8804510b2627c536ce92a7a4a59b291e7808d68e4a07c23302"
       }
   ]
}
```
 
 
The credential follows the JSON-LD format. The main field of the document worth noting, for now, are: 

- Id; it represents the identifier of the credential itself 
- credentialSubject; the core content of the credential. In this case, the credential attests that an individual identified by id 113TCVw5KMeMp99Qdvub9Mssfz7krL9jWNvbdB7Fd2 was born birthday 19960424
- credentialSchema; identifies the data structure that the credential must follow. To achieve credential portability is important to consistently use the same schema to represent the same type of information
- proof; contains a cryptographic proof that the credentials was issued by a specific issuer