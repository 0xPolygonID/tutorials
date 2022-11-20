# Polygon ID SDK Plugin: Example App
 
To use Polygon ID Mobile SDK, we have created a Polygon ID SDK Plugin. This pulgin helps you communicate with our Polygon ID Platform . 

The following steps illustrate how to do initial setup to get things started and then to use this plugin to create identity, authenticate this identity, fetch a claim from issuer, and generating proof to verify (by Verifier) these claim. 


## Initial Setup

1. **Install Flutter**: Install Flutter SDK. To know the steps for that, read the tutorial [here](../../wallet-sdk/flutter-sdk/install-flutter-sdk.md).

2. **Clone Repository**: Clone the [polygonid-sdk-repository](https://github.com/iden3/polygonid-flutter-sdk.git).
 
3. **Set Directory**: On your Terminal, change the directory to `example`, which is a folder in the `polygonid-sdk-repository`.

      ```
      cd example
      ```
  
4. **Set Dependencies**: To use the Polygon ID Flutter SDK plugin, add the following dependencies to your `pubspec.yaml` file:

      **environment**:

            sdk: ">=2.17.0 <3.0.0"
 
      **dependencies**:

            flutter:
                  sdk: flutter

            polygonid_flutter-sdk: ^x.y.z
            
            where "^x.y.z" stands for the version constraints (range of versions that are backward compatible with the x.y.z version. For more details on version constraints, click [here](https://dart.dev/tools/pub/dependencies#version-constraints)
      
      Read more [here](../../wallet-sdk/polygonid-sdk/polygonid-sdk-plugin.md).


5. **Get Dart packages**: While in the `example` directory, run the following command:
 
      ```
      flutter pub get
      ```
      The system runs the command and shows:

      ***Running "flutter pub get" in example...***

      where `pub` command (in Dart) invokes a set of tools for managing Dart packages and `pub get` downloads these pacakges for your Dart project. The `flutter pub get` indicates that the command is run via flutter SDK.

6. Build your first project and run it. 


**Note**:  While running a flutter command, if you encounter a "command not found: flutter" error, make sure that the path set above is correct. If you still encounter the error, install Vim emulation for Visual Studio Code as an extension and follow these steps:

1. Run the following command:
   ```
   vim $HOME/.zshrc
   ```
where we assume that you are working in the  Z shell. If you are using Bash shell, you can run this command:
   ```
   vim $HOME/.bashrc
   ```
**Note**: To know your shell, type:
```
echo $SHELL
```
which, in our case shows:
`/bin/zsh`

2. This opens the `.zshrc` configurtion window (for the Z Shell). Press "I" to initiate the insert mode.
3. Run the following command to set your path variable:
   ```
   export PATH="$PATH:/Flutter-Directory-Path/flutter/bin"
   ```
   where "Flutter-Directory-Path" is the directory where your Flutter is installed.
 
4. Press `Escape` on your keyboard and then enter the following command:
   ```
   :wq!
   ```
   Press `Enter`. This saves the file in vim and exit the editor (`wq` stands for write and quit).
 
5. Run your flutter commands.
 
 
## General Flow

In the upcoming sections, we shall see the general flow of how to use Polygon ID SDK. The steps are summarised as:

A. **Identity**:

1. Initialise Polygon ID SDK.
2. Create Identity for wallet.
3. Get Identifier from the Identity created in step above.
4. Remove Identity (only if required).
5. Get iden3Message from Issuer.
6. Authenticate Identity using Identifier, iden3Message, and Private Key.

B. **Credential**

1. Create CredentialRequestEntity from the Iden3Message received from Issuer.
2. Fetch and Save claims (received from Issuer)on SDK using CredentialRequestEntity, Identifier, and Private Key.
3. Get claims that are saved on wallet SDK. Can also retrieve them with claim ids.
4. Remove claim(s) (only if required).
5. Update claim (only if required).

C. **Proof**

1. Generate zero-knowledge proof using iden3Message, Identifier, and Private Key. 



### Initiate Polygon ID SDK
 
To start using Polygon ID SDK, an integrator needs to initialize it first. This is done inside the dependency injection initializer using `await PolygonIdSDK.init()`. 
```
import 'package:flutter/material.dart';
import 'package:polygonid_flutter_sdk/sdk/polygon_id_sdk.dart';

Future<void> main() async {
  await PolygonIdSdk.init();
  runApp(const App());
}
```

If the SDK has not been initialized, the system throws an exception: `PolygonIsSdkNotInitializedException` indicating that the Polygon ID SDK has not been initialized and must be initialzed first with `await PolygonIdSDK.init()`.
 
2. After the SDK initialization, the Integrator  will need to use the instance of PolygonIdSDK:
 
```
getIt.registerLazySingleton<PolygonIdSdk>(() => PolygonIdSdk.I)
 ```

### Create Identity

1. After SDK initialization, the SDK checks the existence of an Identifier that was previously created with the `createIdentity()` function. This check is done via: `identity.getCurrentIdentifier()`.
If no previously created Identifier is found, the SDK first needs to create an identity first using `identity.createIdentity()` function. Also, if the private key is not passed in the above function, the system randomly generates one.

```
Future<void> createIdentity() async {
  //we get the sdk instance previously initialized
  final sdk = PolygonIdSdk.I;
  PrivateIdentityEntity identity = await sdk.identity.createIdentity(secret: secretKey);
}
```
You can retrieve your private key from the `PrivateIdentityEntity` mnetioned above. Keep this private key safe; it will be used in a few other SDK methods as you will see in the following steps.

### Get Identifier


4. The SDK saves the Identifier in its storage and will use the same to authenticate the identity and fetch the claims from the Issuer.
