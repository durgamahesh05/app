# Merizo mobile app

React Native 0.74.5 app for Android and iOS.

## Android Studio setup

1. Install Node.js 20 LTS or newer and npm, then run `npm install` from this folder.
2. Use JDK 17 for Gradle. Android Studio's bundled JBR may be a different version; check it under **Settings > Build, Execution, Deployment > Build Tools > Gradle > Gradle JDK** and select an installed JDK 17.
3. In Android Studio **SDK Manager > SDK Platforms**, install Android 14 (API 34). Under **SDK Tools**, install Android SDK Build-Tools 34.0.0, Android SDK Command-line Tools (latest), NDK (Side by side) 26.1.10909125, and CMake 3.22.1.
4. Sync Gradle, start an emulator or connect a device, then run `npm run android` (or build `:app:assembleDebug` in Android Studio).

VisionCamera QR scanning is enabled in `android/gradle.properties`. Camera and microphone permissions are declared in the Android manifest. Debug builds allow cleartext traffic for the local development API; release builds disallow it.

### JDK 17 paths on Windows

The project does not store a machine-specific JDK path. Configure the path on each development machine. For example, if Temurin 17 is installed in the default location, set `JAVA_HOME` to `C:\Program Files\Eclipse Adoptium\jdk-17...` (use the exact installed folder) and add `%JAVA_HOME%\bin` to `Path`. In Android Studio, choose the same JDK folder in **Gradle JDK**. For a Gradle-only override, add `org.gradle.java.home=C:/Program Files/Eclipse Adoptium/jdk-17...` to the user's `%USERPROFILE%\.gradle\gradle.properties`. Keep local paths out of the repository. Do not point Gradle at Android Studio's bundled JBR unless it reports Java 17.

Check `java -version` and run `.\gradlew.bat --version` from `UI/android` before building. Android emulator SDK, JDK, and Node.js setup is separate from iOS: iOS builds require macOS and Xcode.

This repo includes `android/gradlew-jdk17.ps1` for Windows CLI builds. It discovers a JDK 17 install (including Temurin's default folder), sets `JAVA_HOME` for that Gradle process, and passes through Gradle arguments. For example, from `UI/`: `powershell -ExecutionPolicy Bypass -File .\android\gradlew-jdk17.ps1 :app:assembleDebug`. Android Studio uses its own **Gradle JDK** setting, so select JDK 17 there as well.

## iOS setup

On macOS, run `npm install`, then `cd ios && pod install`. Open `ios/Merizo.xcworkspace` in Xcode and build for a simulator or device. Camera, microphone, and photo library descriptions are in `ios/Merizo/Info.plist`.

## API address

Edit `src/constants/config.ts` when changing the backend port or host. Android emulators use `10.0.2.2` to reach the development machine. Physical Android devices can use `localhost` with `adb reverse tcp:8000 tcp:8000`, or the development machine's LAN IP over Wi-Fi. The iOS simulator uses `localhost` directly.

## Fonts and icons

The app uses Android Roboto (`sans-serif`) and iOS's system font (`System`) without bundled font downloads. Font selection is centralized in `src/styles/nativeFonts.ts`. Interface icons use the existing Lucide React Native package. The brand artwork in `src/assets/icons/` is connected to the login screen and native Android/iOS launcher icon resources.

## Structure

- `src/screens` owns screen composition.
- `src/components` contains reusable UI components.
- `src/context` and `src/hooks` encapsulate app state and screen behavior.
- `src/services` contains API facades; `ApiClient` owns shared network behavior.
- `src/storage` provides AsyncStorage adapters for JSON data and tokens.
- `src/types` defines the app's data contracts.

The React Native UI remains function based; reusable behavior is encapsulated in typed services, hooks, and context providers rather than adding class hierarchies to screen components.

## Validation

Run `npm run tsc` and `npm run lint` for the TypeScript and lint checks. Run `npm run android` to install and start the Android app.

## Backend feature status

Implemented API routes include authentication and profiles, group create/list/join/member lookup, expense create/list/delete, settlement create/history, and expense-derived monthly insights. The mobile app's OTP/password reset, receipt extraction, AI responses, and push notifications need external provider or service configuration; their client screens or service facades do not imply that the backend integrations are available.
