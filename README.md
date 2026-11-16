## Mobile Development Tools and Dependencies

This repository contains a React Native 0.74.5 application (`UI/`) and a FastAPI/MongoDB API (`backend/`). The supported Android build requires Node.js and JDK 17; iOS builds require macOS and Xcode. Detailed mobile setup and the per-user JDK path configuration are in [UI/README.md](UI/README.md).

### 1. React Native Dependencies

Merizo is a React Native group expense app backed by a FastAPI API and MongoDB. The mobile application uses Node.js, npm, React Native, and the libraries declared in `UI/package.json`.

Install JavaScript dependencies:

```bash
cd UI
npm install
```

The exact dependencies and versions are maintained in `UI/package.json` and `UI/package-lock.json`. The current app uses React Native 0.74.5, React 18.2, TypeScript, React Navigation, AsyncStorage, VisionCamera, and Lucide icons. API calls use the built-in Fetch API through a shared client.

### 2. Android Development Dependencies

Android development requires the following tools:

| Component | Requirement |
|---|---|
| Android Studio | Latest compatible version |
| JDK | Java Development Kit 17 (set Gradle JDK in Android Studio or configure `JAVA_HOME`) |
| Android SDK | Platform 34 |
| Android SDK Build Tools | 34.0.0 |
| Android NDK | 26.1.10909125 |
| CMake | 3.22.1 |
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

### Backend API status

Implemented routes include auth/profile, groups (`/api/groups`), expenses (`/api/expenses`), settlements (`/api/settlements`), friends (`/api/friends/list`), and monthly insights (`/api/insights`). See [backend/README.md](backend/README.md) for setup and the known limits: email OTP/password reset, receipt extraction, AI chat, and notifications still need provider integrations.

The backend targets Python 3.10. Create its Conda environment from `backend/environment.yml`, or activate an existing Python 3.10 Conda environment. The Docker image also uses Python 3.10.
