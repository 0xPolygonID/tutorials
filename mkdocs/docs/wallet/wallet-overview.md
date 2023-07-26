# Wallet Overview

A digital wallet is a software that can hold and manage users' `Credentials`. Based on the principles of Self-Sovereign Identity (SSI) and cryptography, a wallet helps its Holder share data with others without exposing any other sensitive private information stored on it. Only the wallet holder has the right to decide which information to share with other entities and what needs to remain private. 

Polygon ID offers some interesting ways to get started with leveraging a credential-focused wallet: **the Wallet SDK** and **the Polygon ID Wallet app**.

## Wallet SDK

The Wallet SDK is a Flutter-based SDK that can be used by developers to build applications or integrate the wallet functionalities seamlessly with their existing apps. [Get started with the Wallet SDK here](wallet-sdk/polygonid-sdk/polygonid-sdk-overview.md).

These are the modules (SDKs) we provide:

- [polygonid-flutter-sdk](https://github.com/0xPolygonID/polygonid-flutter-sdk) \[Dart plugin\]
- polygonid-ios-wrapper-sdk \[Swift lib (Framework)\] (_work in progress_)
- (polygonid-android-wrapper-sdk)[https://github.com/0xPolygonID/polygonid-android-sdk] \[Kotlin lib (.aar)\]
- Polygonid-react-native-wrapper-sdk \[RN lib\] (_work in progress_)

Depending on which type of developer (integrator) you are, you can use different modules (SDK):

- Flutter developers should use "polygonid-flutter-sdk"
- IOS developers should use "polygonid-ios-wrapper-sdk"
- Android developers should use "polygonid-android-wrapper-sdk"
- React native developers can use several modules (SDKs): 
    - "polygonid-ios-wrapper-sdk" AND "polygonid-android-wrapper-sdk" (together for supporting both platforms)
    
    OR 
    
    - "Polygonid-react-native-wrapper-sdk" (_work in progress_)

!!!info
    If you are interested in building web-based applications with Polygon ID, please visit the [JS SDK documentation](../js-sdk/js-sdk-overview.md). 

## Polygon ID Wallet app

The Polygon ID Wallet app is a reference implementation built using our Wallet SDK. It has a simple user interface and seamless UX to facilitate its main uses: managing credentials and generating proofs for verifiers. [Learn more about the wallet here](wallet-sdk/polygonid-app.md). 

The app is available for Android and IOS: 

- For Android: <a href="https://play.google.com/store/apps/details?id=com.polygonid.wallet" target="_blank">Polygon ID on Google Play</a>
- For iOS: <a href="https://apps.apple.com/us/app/polygon-id/id1629870183" target="_blank">Polygon ID on the App Store</a>

<div align="center">
<img src="../../imgs/wallet/wallet-main-page.jpeg" alt="Polygon ID app as a reference implementation" width="250" align="center" />
</div>
<br>

