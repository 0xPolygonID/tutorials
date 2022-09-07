# Issuer Overview

The issuer is any subject that issues credentials. For example, a DAO that issues “membership credentials” to its members.  

To operate, an issuer must set up a self-hosted server (Polygon ID Identity Server - coming) or directly interact with the Polygon ID Platform. The server stores the issuer’s private key making the identity management simpler.

After setting up a server, an issuer can start issuing credentials by digitally signing those. These credentials are stored inside the server. 
Additionally, the server allows an Issuer to: 

- Issue Merkle Tree-Based Credentials  
- Revoke Credentials
- Rotate Keys 

These three actions require the issuer to interact with the State Smart Contract by executing a State Transition Function.

The credentials must be shared with the subject users. To interact with a user, the issuer must set up a client able to authenticate the user and share the credential with the respective receiver’s wallet. (link to verifier - authentication library)

[] Add Development Models to an Issuer
