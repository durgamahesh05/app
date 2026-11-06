import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type Props = TextInputProps & { label?: string; left?: React.ReactNode };
export default function Input({ label, left, style, ...rest }: Props) {
  const { theme: t } = useTheme();
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ marginBottom: 14 }}>
      {label ? <Text style={{ color: t.muted, fontSize: 12, fontWeight: '600', marginBottom: 6 }}>{label}</Text> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: t.cardAlt, borderRadius: 16, paddingHorizontal: 14,
        borderWidth: 1.5, borderColor: focus ? t.primary : t.border }}>
        {left}
        <TextInput
          placeholderTextColor={t.muted} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={[{ flex: 1, height: 52, color: t.text, fontSize: 16 }, style]} {...rest} />
      </View>
    </View>
  );
}
