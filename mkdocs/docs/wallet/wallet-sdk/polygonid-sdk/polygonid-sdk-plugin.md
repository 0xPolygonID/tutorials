# Flutter Plugin
 
We use a Flutter plugin that lets you interact with the Polygon ID platform. It is a tool that lets you use everything that Polygon ID provides (identity wallet, credential wallet, proof generation, etc.).
 
## Install Flutter Plugin
 
To use the Polygon ID Flutter SDK plugin, you need to add this plugin as a dependency in your `pubspec.yaml` file:
 
1. Open the `pubspec.yaml` file in your editor.
2. Scroll down to the dependency section and add the following dependency:
 
    ```yaml
    dependencies:
    polygonid_flutter_sdk: ^x.y.z
    ```

    where x stands for the major version, y stands for the minor version, and z stands for the patch version of the Polygon ID Flutter SDK.
 
If you are working on a branch of the [Polygon ID Flutter SDK repository](https://github.com/0xPolygonID/polygonid-flutter-sdk.git), you can add the dependency in the following way:

```yaml
dependencies:
 polygonid_flutter_sdk:
   git:
     url: ssh://git@github.com/0xPolygonID/polygonid-flutter-sdk.git
     ref: branchPathName
```

