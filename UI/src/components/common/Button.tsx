import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type Props = { title: string; onPress?: () => void; variant?: 'primary' | 'outline' | 'ai' | 'ghost'; loading?: boolean; style?: ViewStyle; disabled?: boolean };
export default function Button({ title, onPress, variant = 'primary', loading, style, disabled }: Props) {
  const { theme: t } = useTheme();
  const bg = variant === 'primary' ? t.primary : variant === 'ai' ? t.ai : 'transparent';
  const fg = variant === 'primary' || variant === 'ai' ? t.onAccent : variant === 'outline' ? t.primary : t.nav;
  return (
    <Pressable
      onPress={onPress} disabled={disabled || loading}
      style={[{ height: 50, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: bg,
        borderWidth: variant === 'outline' ? 1.5 : 0, borderColor: t.primary, opacity: disabled ? 0.5 : 1 }, style]}>
      {loading ? <ActivityIndicator color={fg} /> : <Text style={{ color: fg, fontWeight: '700', fontSize: 15 }}>{title}</Text>}
    </Pressable>
  );
}
