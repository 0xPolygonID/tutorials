# Polygon ID SDK Plugin: Example App
 
To use Polygon ID Mobile SDK, we have created a Polygon ID SDK Plugin. This plugin helps you communicate with our Polygon ID Platform. 

The following steps illustrate how to do initial setup to get things started and then use this plugin to create an identity, authenticate this identity, fetch a credential from an Issuer using identity, and generate a proof to verify (by Verifier) this credential. 


## Initial Setup

1. **Install Flutter**: Install Flutter SDK. To know the steps in detail, read the tutorial [here](../../wallet-sdk/flutter-sdk/install-flutter-sdk.md).

2. **Clone Repository**: Clone the [polygonid-sdk-repository](https://github.com/0xPolygonID/polygonid-flutter-sdk.git).
 
3. **Set Directory**: On your Terminal, change the directory to `example`, which is a folder in the `polygonid-sdk-repository`.

      ```bash
      cd example
      ```
  
4. **Set Dependencies**: To use the Polygon ID Flutter SDK plugin, add the following dependencies to your `pubspec.yaml` file:

    **environment**:

    ```yaml
      sdk: ">=2.17.0 <3.0.0"
    ``` 

    **dependencies**:

    ```yaml
      flutter:
            sdk: flutter

      polygonid_flutter-sdk: ^x.y.z
      
    ```

    where "^x.y.z" stands for the version constraints (range of versions that are backward compatwith the x.y
    version. For more details on version constraints, click [here](https://darttools/p
    dependencies#version-constraints)

    Read more [here](../../wallet-sdk/polygonid-sdk/polygonid-sdk-plugin.md).

5. **Get Dart packages**: While in the `example` directory, run the following command:
 
      ```bash
      flutter pub get
      ```
      The system runs the command and shows:

      ***Running "flutter pub get" in example...***

      where `pub` command (in Dart) invokes a set of tools for managing Dart packages and `pub get` downloads these packages for your Dart project. The `flutter pub get` indicates that the command is run via flutter SDK.

6. **Build your first project and run it**. For more details, click [here](../../wallet-sdk/flutter-sdk/build-app-with-flutter-sdk.md).


While running a Flutter command, if you encounter a ***command not found: flutter*** error, make sure that the path set above is correct. If you still encounter the error, install Vim emulation for Visual Studio Code as an extension and follow these steps:

1. Run the following command:

   ```bash
   vim $HOME/.zshrc
   ```

  where we assume that you are working in the Z shell. 
  
  If you are using the Bash shell, you can run this command:

   ```bash
   vim $HOME/.bashrc
   ```

  To know your shell, type:
    ```bash
    echo $SHELL
    ```
  which, in our case shows:
`/bin/zsh`

2. This opens the `.zshrc` configuration window (for the Z Shell). Press "I" to initiate the insert mode.
3. Run the following command to set your path variable:

   ```bash
   export PATH="$PATH:/Flutter-Directory-Path/flutter/bin"
   ```
   where "Flutter-Directory-Path" is the directory where your Flutter is installed.
 
4. Press `Escape` on your keyboard and then enter the following command:

   ```bash
   :wq!
   ```
   Press `Enter`. This saves the file in Vim and exits the editor (`wq` stands for write and quit).
 
5. Run your flutter commands.
 
 
## General Flow

### Overview

In the upcoming sections, we shall see the general flow of how to use the Polygon ID SDK plugin. The steps are summarised as:

A. **Identity**

1. Initialise Polygon ID SDK.
2. Create an Identity for the wallet.
3. Get (Retrieve) Identifier from the Identity created in the previous step.
4. Remove Identity (only if required).
5. Get iden3Message from Issuer.
6. Authenticate Identity using Identifier, iden3Message, and Private Key.

B. **Credential**

1. Create CredentialRequestEntity from the Iden3Message received from an Issuer.
2. Fetch and Save credentials (received from Issuer) on SDK using CredentialRequestEntity, Identifier, and Private Key.
3. Get credentials that are saved on wallet SDK. One can also retrieve them with credential IDs.
4. Remove credential (only if required).
5. Update credential (only if required).

C. **Proof**

1. Generate zero-knowledge proof using iden3Message, Identifier, and Private Key. 

### Steps in Detail

#### **A. Identity**

This part of the flow consists of initialising Polygon ID SDK, creating an identifier for an identity and retrieving it, and using the identifier to authenticate the Identity.

##### ***1. Initiate Polygon ID SDK***
 
To start using Polygon ID SDK, an integrator needs to initialize it first. This is done inside the dependency injection initializer using `await PolygonIdSDK.init()`. 

```dart
import 'package:flutter/material.dart';
import 'package:polygonid_flutter_sdk/sdk/polygon_id_sdk.dart';

Future<void> main() async {
  await PolygonIdSdk.init();
  runApp(const App());
}
```

If the SDK has not been initialized, the system throws an exception: `PolygonIsSdkNotInitializedException` indicating that the Polygon ID SDK has not been initialized and must be initialized first with `await PolygonIdSDK.init()`.
 
After the SDK initialization, the Integrator  will need to use the instance of PolygonIdSDK:
 
```dart
getIt.registerLazySingleton<PolygonIdSdk>(() => PolygonIdSdk.I)
```

##### ***2. Create Identity***

After SDK initialization, the SDK checks the existence of an Identifier that was previously created with the `createIdentity()` function. 
If no previously created Identifier is found, the SDK first needs to create an identity first using `identity.createIdentity()` function. 

```dart
Future<void> createIdentity() async {
  // we get the sdk instance previously initialized
  final sdk = PolygonIdSdk.I;
  PrivateIdentityEntity identity = await sdk.identity.createIdentity(secret: secretKey);
}
```

You can retrieve your `private key` from the `PrivateIdentityEntity` specified in the code above. Keep this private key safe; it will be used in a few other SDK methods as you will see in the following steps.

>**Note**: It is not mandatory to pass the `secret` as the input parameter in the function. If you do not pass it, a random `secret` is generated by the system. 

##### ***3. Get Identifier***

This retrieves the `identifier` by passing the `private key` as the input parameter to the `getIdentifier()` function; please note that the `private key` is generated from `PrivateIdentityEntity` that we generated via `createIdentity()` function in the previous section. 

```dart
Future<void> getIdentifier() async {
  String privateKey = privateIdentityEntity.privateKey;
  String identifier = await sdk.identity.getIdentifier(privateKey: privateKey);
}
```

##### ***4. Remove Identity***

To remove an existing Identity (use this only when required), you need to call the `identity.removeIdentity()` with `identifier` and the `privateKey` as the input parameters. 

```dart
Future<void> removeIdentity({
  required String privateKey,
  required String identifier,
}) async {
  await sdk.identity.removeIdentity(
    privateKey: privateKey,
    identifier: identifier,
  );
```

##### ***5. Authenticate Identity***

The authentication includes two steps:

- Generate an iden3message from the QR code
- Authenticate Identity using iden3message

    **a. Generate Iden3Message**

    An Integrator uses `iden3Message` to communicate with an Issuer/Verifier. This 'iden3message' is created from the QR code scanned by the Integrator on his/her wallet. The `getIden3Message()` uses a message (created after scanning the QR code) as the input parameter and generates `iden3Message`.

    ```
    Iden3MessageEntity getIden3MessageFromString(String message){
      return sdk.iden3comm.getIden3Message(message: message);
    }
    ```

    **b. Authenticate Identity using Iden3Message**

    We use `authenticate()` to authenticate an identity by using `privateKey`, `identifier`, and `iden3Message` as the input parameters. 

    ```
    Future<void> authenticate({
      required Iden3MessageEntity iden3message,
      required String identifier,
      required String privateKey,
    }) async {
      await sdk.iden3comm.authenticate(
        iden3message: iden3message,
        identifier: identifier,
        privateKey: privateKey,
      );
    }
    ```

####**B. Credential**

This part of the flow consists of retrieving credentials from an Issuer and saving them in the wallet. One or more credentials can be retrieved and one or more credentials can be removed from the wallet. 

##### ***1. Fetch and Save Credentials***

This functionality consists of retrieving credentials from an Issuer (by fetching them) and then saving them on the wallet.

This involves:

- Generating `CredentialRequestEntity` using `identifier`, `callbackUrl`, and the fields `thid` and `from` from `iden3Message`. `thid`is the ID of the message and `from` stands for the identifier from which the Verifier requests proof.
- Fetching and saving credentials using `CredentialRequestEntity`, `identifier`, and `privateKey`.

```dart
Future<void> fetchAndSaveClaims({
  required Iden3MessageEntity iden3message,
  required String identifier,
  required String privateKey,
}) async {
  Map<String, dynamic>? messageBody = iden3message.body;

  // url for the callback
  final String callbackUrl = messageBody['url'];
  // credentials
  List<dynamic> credentials = messageBody['credentials'];
  List<CredentialRequestEntity> credentialRequestEntityList =
      credentials.map((credential) {
    String credentialId = credential['id'];
    return CredentialRequestEntity(
      identifier,
      callbackUrl,
      credentialId,
      iden3message.thid,
      iden3message.from,
    );
  }).toList();
  
  await sdk.iden3comm.fetchAndSaveClaims(
    credentialRequests: credentialRequestEntityList,
    identifier: identifier,
    privateKey: privateKey,
  );
}
```


##### ***2. Get Credentials***

Once credentials have been saved on the wallet SDK, these can be retrieved by the Integrator using `credential.getClaims()` with `identifier`, and `privateKey` used as the mandatory input parameters and `filters` as an optional one. `Filters` let an Integrate get credentials based on some pre-determined criteria. 

```dart
Future<void> getAllClaims({
  List<FilterEntity>? filters,
  required String identifier,
  required String privateKey,
}) async {
  List<ClaimEntity> claimList = await sdk.claim.getAllClaims(
    filters: filters,
    identifier: identifier,
    privateKey: privateKey,
  );
}
```


##### ***3. Get Credentials by Ids***

This functionality lets an Integrator get credentials from an Issuer based on their IDs. The `claimId`, `identifier`, and `privateKey`are passed as input parameters to the `credential. getClaimsByIds()` function and a list of credentials in the form of `ClaimEntity` are retrieved. The ID of each credential is stored on the SDK from where they can be retrieved.

```dart
Future<void> getClaimsByIds({
  required List<String> claimIds,
  required String identifier,
  required String privateKey,
}) async {
  List<ClaimEntity> claimList = await sdk.credential.getClaimsByIds(
    claimIds: claimIds,
    identifier: identifier,
    privateKey: privateKey,
  );
}
```


##### ***4. Remove a Credential***

A credential can be removed from the wallet using `credential.removeClaim()` by passing `claimId` (the ID of the credential to be removed), the `identifier` and the `privateKey` as the input parameters. 

```dart
Future<void> removeClaim({
  required String claimId,
  required String identifier,
  required String privateKey,
}) async {
  await sdk.credential.removeClaim(
    claimId: claimId,
    identifier: identifier,
    privateKey: privateKey,
  );
}
```

##### ***5. Remove  Multiple Credentials***

This is similar to removing a single credential described above. In this case, you need to pass a list of `claimids` to be removed, the `identifier`, and the `privateKey` as the input parameters to `credential.removeClaims()`.

```dart
Future<void> removeClaims({
  required List<String> claimIds,
  required String identifier,
  required String privateKey,
}) async {
  await sdk.credential.removeClaims(
    claimIds: claimIds,
    identifier: identifier,
    privateKey: privateKey,
  );
}
```

##### ***6. Update Credential***

To update a credential, the `credential.updateClaim()` function is used with the following fields passed as input parameters:
- `claimId`
- `identifier`
- `privateKey`
-  other information such as identity `state`, `issuer`, credential's `expiration` date, `type` of credential, etc. 

>**Note**: Updating a credential means only the `info` field related to it can be changed. 

```dart
Future<void> updateClaim({
  required String claimId,
  required String identifier,
  required String privateKey,
  String? issuer,
  ClaimState? state,
  String? expiration,
  String? type,
  Map<String, dynamic>? data,
}) async {
  PolygonIdSdk sdk = PolygonIdSdk.I;
  await sdk.credential.updateClaim(
    id: claimId,
    identifier: identifier,
    privateKey: privateKey,
    issuer: issuer,
    state: state,
    expiration: expiration,
    type: type,
    data: data,
  );
}
```

