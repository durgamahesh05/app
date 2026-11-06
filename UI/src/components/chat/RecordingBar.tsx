import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import MicWave from './MicWave';

export default function RecordingBar() {
  const { theme: t } = useTheme();
  const [sec, setSec] = useState(0);
  useEffect(() => { const i = setInterval(() => setSec(s => s + 1), 1000); return () => clearInterval(i); }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: alpha(t.alert, 0.14), borderRadius: 16, paddingHorizontal: 14, height: 44, marginHorizontal: 12, marginBottom: 8 }}>
      <MicWave active color={t.alert} height={18} />
      <Text style={{ color: t.alert, fontWeight: '600', marginLeft: 12, flex: 1 }}>Listening… tap mic to stop</Text>
      <Text style={{ color: t.alert, fontVariant: ['tabular-nums'], fontWeight: '700' }}>{mm}:{ss}</Text>
    </View>
  );
}
