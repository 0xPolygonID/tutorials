# Polygon ID SDK Plugin
 
The Polygon ID Mobile SDK uses a flutter plugin that lets you interact with the Polygon ID platform. It is a tool that lets you use everything that Polygon  ID provides (identity wallet, credential wallet, proof generation, etc.)
 
## Install Polygon ID Mobile SDK Plugin
 
To install the Polygon ID Flutter SDK plugin, you need to add this plugin as a dependency in your `pubspec.yaml` file:
 
1. Open the `pubspec.yaml` file in your editor.
2. Scroll down to the dependency section and add the following dependency:
 
    ```
    dependencies:
    polygonid_flutter_sdk: ^x.y.z
    ```
    where x stands for the major version, y stands for the minor version, and z stands for the patch version of the Polygon ID Flutter SDK.
 
If you are working on a branch of the [Polygon ID Flutter SDK repository](https://github.com/iden3/polygonid-flutter-sdk.git), you can add dependency in the following way:
```
dependencies:
 polygonid_flutter_sdk:
   git:
     url: ssh://git@github.com/iden3/polygonid-flutter-sdk.git
     ref: branchPathName
```

