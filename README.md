## Mobile Development Tools and Dependencies

### 1. React Native Dependencies

The mobile application uses Node.js, npm, React Native, and the libraries declared in `UI/package.json`.

Install JavaScript dependencies:

```bash
cd UI
npm install
```

The project dependencies may include:

- React and React Native
- React Navigation for application navigation
- React Native Screens and Safe Area Context
- React Native Gesture Handler
- Axios or Fetch API for backend communication
- AsyncStorage for local data persistence
- Additional UI and platform-specific libraries used by the application

The actual dependencies and versions are maintained in `UI/package.json` and `UI/package-lock.json`.

### 2. Android Development Dependencies

Android development requires the following tools:

| Component | Requirement |
|---|---|
| Android Studio | Latest compatible version |
| JDK | Java Development Kit 17 |
| Android SDK | Platform 34 |
| Android SDK Build Tools | Version compatible with the project |
| Android SDK Command-line Tools | Installed |
| Android Emulator | Optional, for virtual device testing |
| Gradle | Version specified in Gradle Wrapper |
| Android Gradle Plugin | Version specified in project configuration |
| Kotlin | Version specified in project configuration |

**Gradle configuration**

Gradle is used to build and manage Android application dependencies.

The Gradle Wrapper configuration is maintained in:

```text
UI/android/gradle/wrapper/gradle-wrapper.properties
```

The Android Gradle Plugin and Kotlin versions are configured in the project's Android Gradle build files.

Make sure the installed JDK version is compatible with the Gradle version used by the project.

Verify Java installation:

```bash
java -version
```

Verify Gradle:

```bash
cd UI/android
gradlew.bat --version
```

### 3. iOS Development Dependencies

iOS development requires macOS and the following tools:

| Component | Requirement |
|---|---|
| macOS | Required |
| Xcode | Compatible version |
| Xcode Command Line Tools | Installed |
| JDK | Version required by the React Native toolchain |
| CocoaPods | Required for native iOS dependencies |
| iOS Simulator | Available through Xcode |

**Install iOS dependencies**

From the UI directory:

```bash
cd UI/ios
pod install
```

CocoaPods manages native iOS libraries declared through the project's Podfile and dependencies.

The main iOS dependency configuration is maintained in:

```text
UI/ios/Podfile
```

Open the generated `.xcworkspace` file in Xcode when working with the iOS application.

### 4. Platform Build Commands

**Android**

```bash
cd UI
npm install
npm run android
```

**iOS**

```bash
cd UI
npm install
cd ios
pod install
cd ..
npm run ios
```

Note: iOS builds require macOS with Xcode installed.

### 5. Dependency Management

- JavaScript dependencies are managed through npm.
- Android dependencies are managed through Gradle.
- iOS native dependencies are managed through CocoaPods.
- Android SDK and build tools are managed through Android Studio.
- JDK compatibility depends on the project's Gradle and Android Gradle Plugin versions.

Keep dependency versions consistent with the project configuration files when setting up a development environment.
