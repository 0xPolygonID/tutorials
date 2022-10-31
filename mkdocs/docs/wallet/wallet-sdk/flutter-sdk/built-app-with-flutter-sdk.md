# Build an App using Flutter: First Few Steps

Once your Flutter and Dart plugins are installed, you can start creating your first Flutter app.
 
 
1. On the Terminal or Powershell, change your directory to where you want to install your app:
   ```
   cd new-app-directory
   ```
2. Create your first app; let's call it "firstapp".
   ```
   flutter create firstapp
   flutter run
   ```
With these commands, the Flutter SDK creates a new project from scratch.
 
3. Flutter creates your app.
 
4. Change your directory to your app:
 
   ```
   cd firstapp
   ```
 
**Note**: In your directory, inside your app, there is a `lib` folder, which contains a `main.dart` file. When you click `main.dart`, it opens in your editor. This file contains the Dart code and for your own app, you will need to replace the content of this .dart file with your own code.
 
## Pubspec.yaml File
 
In your app folder, click the `pubspec.yaml` to open it in your editor. The `pubspec.yaml` file contains the following information about your app:
 
- Name of your app
- Description
- Version and build number of your app
- Environment
- Dependencies
 
### Add Dependencies of your app to Pubspec.yaml
 
Dependencies are any additional packages that your app requires to run smoothly. These dependencies can be automatically updated to the latest version by running the following command:
 
```
flutter pub upgrade --major-versions
```
To update the dependencies manually, change the dependency version number to the latest one.