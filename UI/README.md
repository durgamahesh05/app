# Merizo mobile app

React Native 0.74.5 app for Android and iOS.

## Android Studio setup

1. Install dependencies from this folder with `npm install`.
2. Open the `android/` folder in Android Studio and use JDK 17 for Gradle.
3. Install Android SDK Platform 34, Build Tools 34.0.0, NDK 26.1.10909125, and CMake 3.22.1 in SDK Manager. Gradle can install missing SDK components after accepting their licenses.
4. Sync Gradle, start an emulator or connect a device, then run `npm run android` (or build `:app:assembleDebug` in Android Studio).

VisionCamera QR scanning is enabled in `android/gradle.properties`. Camera and microphone permissions are declared in the Android manifest. Debug builds allow cleartext traffic for the local development API; release builds disallow it.

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
