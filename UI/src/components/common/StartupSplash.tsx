import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import BootSplash from 'react-native-bootsplash';
import { useTheme } from '../../context/ThemeContext';
import { brandMark } from '../../assets';
import { buildTheme } from '../../styles/theme';

type Props = { onFinished: () => void };

export default function StartupSplash({ onFinished }: Props) {
  const { theme } = useTheme();
  const systemMode = useColorScheme() === 'dark' ? 'dark' : 'light';
  const nativeBackground = buildTheme(systemMode).bg;
  const backgroundProgress = useSharedValue(0);
  const logoScale = useSharedValue(0.7);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineOffset = useSharedValue(14);
  const dotsOpacity = useSharedValue(0);
  const exitOpacity = useSharedValue(1);

  useEffect(() => {
    void BootSplash.hide({ fade: false }).catch(() => undefined);

    backgroundProgress.value = withTiming(1, { duration: 400 });
    logoScale.value = withDelay(400, withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) }));
    logoOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    titleOpacity.value = withDelay(900, withTiming(1, { duration: 400 }));
    taglineOpacity.value = withDelay(1300, withTiming(1, { duration: 400 }));
    taglineOffset.value = withDelay(1300, withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) }));
    dotsOpacity.value = withDelay(1600, withTiming(1, { duration: 100 }));
    exitOpacity.value = withDelay(
      1700,
      withTiming(0, { duration: 500 }, finished => {
        if (finished) runOnJS(onFinished)();
      }),
    );
  }, [backgroundProgress, dotsOpacity, exitOpacity, logoOpacity, logoScale, onFinished, taglineOffset, taglineOpacity, titleOpacity]);

  const backdropStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(backgroundProgress.value, [0, 1], [nativeBackground, theme.bg]),
  }));
  const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value, transform: [{ scale: logoScale.value }] }));
  const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value }));
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineOffset.value }],
  }));
  const dotsStyle = useAnimatedStyle(() => ({ opacity: dotsOpacity.value }));
  const exitStyle = useAnimatedStyle(() => ({ opacity: exitOpacity.value }));

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.root, exitStyle]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.bg }, backdropStyle]} />
      <View style={styles.content}>
        <Animated.View style={[styles.logoBox, { backgroundColor: theme.primary }, logoStyle]}>
          <Image source={brandMark} style={styles.logo} resizeMode="contain" accessibilityLabel="Merizo logo" />
        </Animated.View>
        <Animated.Text style={[styles.title, { color: theme.text }, titleStyle]}>Merizo</Animated.Text>
        <Animated.Text style={[styles.tagline, { color: theme.muted }, taglineStyle]}>
          Split smarter. Live better.
        </Animated.Text>
        <Animated.View style={[styles.dots, dotsStyle]}>
          <View style={[styles.dot, { backgroundColor: theme.share }]} />
          <View style={[styles.dot, { backgroundColor: theme.share }]} />
          <View style={[styles.dot, { backgroundColor: theme.share }]} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { zIndex: 10, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center' },
  logoBox: {
    width: 76,
    height: 76,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logo: { width: 58, height: 58 },
  title: { fontSize: 21, lineHeight: 28, fontWeight: '700' },
  tagline: { fontSize: 12, lineHeight: 18, marginTop: 10 },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 9 },
  dot: { width: 5, height: 5, borderRadius: 3 },
});
