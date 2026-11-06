import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing, StyleSheet } from 'react-native';
import { X, ImagePlus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../../context/ThemeContext';
import { groupService } from '../../services/groupService';

const BOX = 260;
export default function ScanCodeScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const line = useRef(new Animated.Value(0)).current;
  const done = useRef(false);

  useEffect(() => { if (!hasPermission) requestPermission(); }, [hasPermission, requestPermission]);
  useEffect(() => {
    const l = Animated.loop(Animated.sequence([
      Animated.timing(line, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      Animated.timing(line, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    ]));
    l.start(); return () => l.stop();
  }, [line]);

  const scanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const v = codes[0]?.value;
      if (v && !done.current) { done.current = true; groupService.join(v).catch(() => {}).finally(() => nav.goBack()); }
    },
  });

  const corner = (pos: object) => <View style={[{ position: 'absolute', width: 40, height: 40, borderColor: t.share, borderWidth: 4 }, pos]} />;
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {device && hasPermission ? <Camera style={StyleSheet.absoluteFill} device={device} isActive codeScanner={scanner} /> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 44 }}>
        <Pressable onPress={() => nav.goBack()}><X size={26} color="#fff" /></Pressable>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18, flex: 1, textAlign: 'center', marginRight: 26 }}>Scan code</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: BOX, height: BOX }}>
          {corner({ top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 22 })}
          {corner({ top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 22 })}
          {corner({ bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 22 })}
          {corner({ bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 22 })}
          <Animated.View style={{ position: 'absolute', left: 8, right: 8, height: 3, borderRadius: 2, backgroundColor: t.share, transform: [{ translateY: line.interpolate({ inputRange: [0, 1], outputRange: [10, BOX - 14] }) }] }} />
        </View>
        <Text style={{ color: '#E5E7EB', marginTop: 24, textAlign: 'center', paddingHorizontal: 40 }}>Place the QR code inside the frame to scan automatically.</Text>
      </View>
      <Pressable onPress={() => launchImageLibrary({ mediaType: 'photo' })} style={{ alignSelf: 'center', marginBottom: 40, width: 56, height: 56, borderRadius: 28, backgroundColor: '#ffffff25', alignItems: 'center', justifyContent: 'center' }}>
        <ImagePlus size={24} color="#fff" />
      </Pressable>
    </View>
  );
}
