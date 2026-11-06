import { StyleSheet } from 'react-native';
import { APP_FONT_FAMILY } from './nativeFonts';
export const g = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
  screenPad: { paddingHorizontal: 20 },
  title: { fontFamily: APP_FONT_FAMILY, fontSize: 28, fontWeight: '800' },
  h2: { fontFamily: APP_FONT_FAMILY, fontSize: 18, fontWeight: '700' },
  body: { fontFamily: APP_FONT_FAMILY, fontSize: 14 },
  small: { fontFamily: APP_FONT_FAMILY, fontSize: 12 },
});
