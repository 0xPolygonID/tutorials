<!--
# PolygonID SDK Plugin: Example App

This example illustrates to an Integrator how to install and use PolygonID SDK Plugin. 

## Install PolygonID Flutter SDK

1. Clone the [polygonid-sdk-repository](https://github.com/iden3/polygonid-flutter-sdk.git).

2. On your Terminal, change the directory to `example`, which is a folder in the polygonid-sdk-repository.
```
cd example
```

3. While in the `example` directory, run the following command:

```
flutter pub get
```
The system runs the command:
 ***Running "flutter pub get" in example...***

4. Build your first project and run it. To know more about how to write your first Flutter app, click [here](https://docs.flutter.dev/get-started/codelab).

## Use PolygonID SDK

To start using SDK:

1. An integrator needs to initialize the PolygonID SDK. This is done inside the dependency injection initializer using `await PolygonIdSDK.init()`. If the SDK has not been initialized, the system throws an exception: `PolygonIsSdkNotInitializedException` indicating that the PolygonID SDK has not been initialized and must be initialzed first with `await PolygonIdSDK.init()`.

2. After the SDK initialization, the Integrator  will need to use the instance of PolygonIdSDK:

    ```
    getIt.registerLazySingleton<PolygonIdSdk>(() => PolygonIdSdk.I)
    ```

3. The SDK then checks the existence of an Identifier that was previously created with the `createIdentity()` function. This check is done via: `identity.getCurrentIdentifier()`. 
If no previously created Identifier is found, the SDK first needs to create an identity first using `identity.createIdentity(privateKey: privateKey)` function. Also, if the private key is not passed in the above function, the system randomly generates one. 

4. The SDK saves the Identifier in its storage and will use the same to authenticate the identity and fetch the claims from the Issuer. 

-->