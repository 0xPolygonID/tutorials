 
# Polygon ID SDK and Wallet App

Like any other SDK, the Polygon ID SDK is a set of tools that consists of core components including libraries, code-samples, APIs, and documentation that have been used to create the Polygon ID Wallet App. An Integrator can use this PolygonID SDK to either create their own apps (that provide similar functionality as that of Polygon ID Wallet App) or integrate the functionalities seamlessly with their existing apps. 

It is important to understand that the SDK and Wallet App are two different things. While, as you read above, Polygon ID SDK is the software development kit that acts as a core funtionality, Wallet App is an application that has been built over this SDK. This Identity Wallet helps Integrators create identities for their wallets and authenticate these identities while interacting with Issuers and Verifiers. 

So, in the nutshell, an Integrator can use Polygon ID SDK to built an Identity Wallet of his/her own and can also customise any pre-existing identity wallets using the features provided by the SDK.  
 
## How is Polygon ID Wallet different from other Wallets?

You, at some point in time, must have used other cryptographic wallets such as Metamask, Trust Wallet, Coinbase Wallet, Ledger, and many more. How is Polygon ID Wallet different from all these hot and cold storage wallets? Let us see:

- The wallets like Metamask are used for sending and receiving crypto transactions on-chain. Polygon ID Wallet, on the other hand, is used for creating amd storing unique identities for the wallet so that these identities can be used to authenticate with the Issuer and the Verifier. This Identity wallet helps an Integrator fetch and save claims from Issuers and also present proof of these claims to the Verifiers. 

- While the commonly used crypto wallets let you to interact with Ethereum and other blockchain  networks using RPCs (Remote Procedure Calls), this is not the case with Polygon ID Wallet, which functions solely to store claims linked to an identity and let these claims verified by creating zero-knowledge proofs. 

- General wallets store cryptographic keys, the Polygon ID Wallet does not do so. 