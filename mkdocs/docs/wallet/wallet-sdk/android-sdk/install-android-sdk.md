
This native SDK enables Android developers to use the [PolygonID solution](https://polygon.technology/polygon-id).

## How to use the SDK
### Prerequisite
1. Download and unpack [those Maven local repository](https://repo1.maven.org/maven2/io/github/0xpolygonid/polygonid_flutter_wrapper/debug/2.2.5/debug-2.2.5.zip)
2. Add this to your build.gradle or settings.gradle:
```
    String storageUrl = System.env.FLUTTER_STORAGE_BASE_URL ?: "https://storage.googleapis.com"

    repositories {
        google()
        mavenCentral()
        maven {
            url 'm2'
        }
        maven {
            url "$storageUrl/download.flutter.io"
        }
    }
```
`m2` being the path where you unpacked the download of step 1.

3. Add the SDK dependency:
```
implementation 'io.github.0xpolygonid.polygonid_android_sdk:release:1.0.1'
```

### Initialization
The SDK needs to be initialized before being used:
```
            PolygonIdSdk.init(
                context = context,
                env = EnvEntity.newBuilder().setBlockchain("polygon").setNetwork("mumbai")
                    .setWeb3Url("https://polygon-mumbai.infura.io/v3/")
                    .setWeb3RdpUrl("wss://polygon-mumbai.infura.io/v3/").setWeb3ApiKey("theApiKey")
                    .setIdStateContract("0x134B1BE34911E39A8397ec6289782989729807a4")
                    .setPushUrl("https://push-staging.polygonid.com/api/v1").build().check()
            )
```
The `env` param is optional but you need to set it up at some point via setEnv.

Once initialized, you can use the SDK through his singleton `PolygonIdSdk.getInstance()`

!!!info "Under the hood"
    This SDK is calling the [Flutter SDK](https://github.com/0xPolygonID/polygonid-flutter-sdk) through `MethodChannel`, that's why each method has a `Context` param to initialize the get `FlutterEngine`.
    You don't need to install or know anything about Flutter.

