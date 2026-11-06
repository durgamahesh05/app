import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import MicWave from './MicWave';

export default function MicButton({ recording, onPress }: { recording: boolean; onPress: () => void }) {
  const { theme: t } = useTheme();
  const ring = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!recording) { ring.setValue(0); return; }
    const loop = Animated.loop(Animated.timing(ring, { toValue: 1, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [recording, ring]);

  const bg = recording ? t.alert : t.ai;
  return (
    <Pressable onPress={onPress} style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
      {recording && (
        <Animated.View pointerEvents="none" style={{
          position: 'absolute', width: 48, height: 48, borderRadius: 24, backgroundColor: bg,
          opacity: ring.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] }),
          transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] }) }],
        }} />
      )}
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
        {recording ? <MicWave active color={t.onAccent === '#FFFFFF' ? '#FFFFFF' : '#2A1305'} height={20} /> : <Mic size={22} color={t.onAccent === '#FFFFFF' ? '#FFFFFF' : '#1E1033'} />}
      </View>
    </Pressable>
  );
}
