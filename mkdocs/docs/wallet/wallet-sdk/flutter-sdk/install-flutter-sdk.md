# Steps to Install Flutter SDK
 
## Install Flutter SDK
 
Flutter SDK installation is available for different operating systems including Windows, macOS, Linux, and ChromeOS.
 
1. Click [here](https://docs.flutter.dev/get-started/install) to select your operating system.
2. Check for the system requirements specific for each operating system and make sure that you have all the necessary tools already installed on your system. For instance, for macOS, `git` must be pre-installed while for Windows, you need to have `git for Windows` and `Windows Powershell 5.0 or above` installed.
3. Download the installation bundle (install the latest version for stable release ) relevant to your Operating System. In the case of macOS, different bundles are available for Intel and Apple Silicon processors.
**Note** The latest Flutter SDK version is 3.0.5.
4. After extracting the file to your directory, add Flutter to your path using the path variable:
    ` export PATH="$PATH:`pwd`/flutter/bin"`
   where `pwd` is the path to your present working directory.
 
**Note**:  While running a flutter command, if you encounter a "command not found: flutter" error, make sure that the path set above is correct. If you still encounter the error, install Vim emulation for Visual Studio Code as an extension and follow these steps:
 
1. Run the following command:
   ```
   vim $HOME/.zshrc
   ```
2. Press "I" to initiate the insert mode.
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
 
 
## Using Dart with Flutter
 
Flutter apps are created using a programming language called `Dart`. An object-oriented language with similarity to C language, Dart is used for creating mobile and web applications. With Dart, Flutter apps can be developed quickly and deployed to different platforms.
Note: For more information on Dart, click [here](https://dart.dev).
 
## Install Flutter Plugin for Text Editors
 
 
Generally, developers can create a Flutter-based app using a combination of the CLI(Command Line Interface) and a text editor. The easier way is to install a plugin within the editor. The plugins for editors like Visual Studio Code, Android Studio, Emacs, and IntelliJ are available for installation. To install the plugin for both Flutter and Dart on VS Code:
 
1. Open VS Code.
2. Click **View** menu, and then click **Command Palette**.
3. On the palette, enter **Extensions**. The system displays a list of options. Select **Extensions: Install Extensions**.
4. In the **Search Extension in Markdown** box, enter **flutter**. The system displays the Flutter plugin.
Click **install**.This installs Flutter along with the Dart plugin.
 

