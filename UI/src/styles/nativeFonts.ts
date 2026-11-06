import { Platform } from 'react-native';

// Use each platform's built-in UI font so text stays native and multilingual
// fallback works without bundling or downloading font files.
export const APP_FONT_FAMILY = Platform.select({
  android: 'sans-serif',
  ios: 'System',
}) as string;
