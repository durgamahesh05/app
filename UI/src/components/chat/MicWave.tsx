import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

// Claude-style voice waveform: rounded bars that breathe up and down in a staggered, organic rhythm.
const BARS = 5;
const BASE = [0.45, 0.8, 1, 0.8, 0.45];

export default function MicWave({ active, color, height = 22, barWidth = 3 }: { active: boolean; color: string; height?: number; barWidth?: number }) {
  const vals = useRef(Array.from({ length: BARS }, () => new Animated.Value(0.25))).current;

  useEffect(() => {
    if (!active) { vals.forEach(v => v.setValue(0.25)); return; }
    const loops = vals.map((v, i) => {
      const d = 320 + i * 60;
      return Animated.sequence([
        Animated.delay(i * 90),
        Animated.loop(Animated.sequence([
          Animated.timing(v, { toValue: BASE[i], duration: d, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0.2, duration: d * 1.1, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        ])),
      ]);
    });
    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
  }, [active, vals]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height, gap: barWidth + 1 }}>
      {vals.map((v, i) => (
        <Animated.View key={i} style={{ width: barWidth, height, borderRadius: barWidth, backgroundColor: color, transform: [{ scaleY: v }] }} />
      ))}
    </View>
  );
}
