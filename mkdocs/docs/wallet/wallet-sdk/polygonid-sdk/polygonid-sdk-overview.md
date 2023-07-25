 
# Polygon ID SDK Overview

Like any other SDK, the Polygon ID SDK is a Flutter-based set of tools that consists of core components including libraries, code samples, APIs, and documentation that have been used to create the Polygon ID Wallet App. An Integrator can use this PolygonID SDK to either create their own apps (that provide similar functionality as that of the Polygon ID Wallet App) or integrate the functionalities seamlessly with their existing apps. 

## Polygon ID Wallet SDK and Polygon ID Wallet App

In the wallet tutorials, you would be reading terms like **Polygon ID SDK** (also **Wallet SDK**) and **Polygon ID Wallet APP** repeatedly. Do not let the terminology confuse you here!! The Polygon ID Wallet SDK and the Polygon ID Wallet App are different concepts: the prior is the technology and the later one is one of its possible implementation. 

While, as you read above, the Polygon ID SDK is the software development kit that acts as a core functionality, the Wallet App is an application that has been built over this SDK. This Identity Wallet helps Integrators create identities for their wallets and authenticate these identities while interacting with Issuers and Verifiers. 

Here, we can conclude that an Integrator can use the Polygon ID Wallet SDK to build an Identity Wallet of his/her own or can also customize any pre-existing identity wallets using the features provided by the SDK.  

In the sections to come, you will read more about the Polygon ID Wallet SDK plugin and also an example app that will guide you to the initial setup required for using this plugin. In the later part of this example app, you will get to know the overall flow of the functionality that this plugin provides.  

>Note: Please note that the iOS Simulator for testing the Polygon ID Wallet SDK application is still under maintenance and would be available to use soon. 

### Why Polygon ID Wallet SDK?

Integrating your app with the Polygon ID Wallet SDK can provide you with the major features of an SSI system. As it is built leveraging a zero-knowledge identity protocol, it can let you create an identity application that is not only robust but also maintains high standards of privacy for your users, thus letting them protect their sensitive data from the third-party while revealing only the required information. The Polygon ID Wallet SDK lets you:

- Create an Identity for a wallet
- Remove and restore identities from a wallet.
- Authenticate your wallet with an Issuer/Verifier.
- Receive credentials from an Issuer and store them on the wallet.
- Update credentials and remove them from the wallet when required.
- Generate zero-knowledge proof that can be sent to a Verifier for verification. 

## Flutter SDK
 
[Flutter SDK](https://docs.flutter.dev/) is a set of tools that are built in Dart programming language and let the developers create and test apps. It is an open-source, platform-agnostic framework that helps in building mobile apps. The Flutter SDK provides a developer with CLI(Command Line Interface) tools and APIs that help built cross-platform apps. 

The Flutter plug-in package helps in implementing code for a specific platform: Android/iOS/web. To know more about different types of packages and the plugins provided by Flutter, click [here](https://docs.flutter.dev/development/packages-and-plugins/developing-packages).


 

 

