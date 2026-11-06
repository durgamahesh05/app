import { Platform } from 'react-native';

export const APP_NAME = 'Merizo';

// Android emulators reach the development machine through 10.0.2.2.
// Physical Android devices can use localhost with `adb reverse tcp:8000 tcp:8000`.
export const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8000',
  ios: 'http://localhost:8000',
  default: 'http://localhost:8000',
}) as string;

export const CURRENCY = '\u20B9';
