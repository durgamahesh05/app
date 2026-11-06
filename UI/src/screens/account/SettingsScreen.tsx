import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, ThemePref } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import Header from '../../components/common/Header';

export default function SettingsScreen() {
  const { theme: t, pref, setPref } = useTheme();
  const nav = useNavigation<any>();
  const [push, setPush] = React.useState(true);
  const opts: { k: ThemePref; label: string }[] = [{ k: 'system', label: 'System default' }, { k: 'light', label: 'Light' }, { k: 'dark', label: 'Dark' }];
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Settings" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20 }}>
        <Text style={{ color: t.muted, fontWeight: '700', fontSize: 12, marginBottom: 10 }}>APPEARANCE</Text>
        {opts.map(o => (
          <Pressable key={o.k} onPress={() => setPref(o.k)} style={{ padding: 14, borderRadius: 14, marginBottom: 8, borderWidth: 1.5, borderColor: pref === o.k ? t.primary : t.border, backgroundColor: pref === o.k ? alpha(t.primary, 0.1) : t.card }}>
            <Text style={{ color: t.text, fontWeight: '600' }}>{o.label}</Text>
          </Pressable>))}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <Text style={{ color: t.text, fontWeight: '600' }}>Push notifications</Text>
          <Switch value={push} onValueChange={setPush} trackColor={{ true: alpha(t.reminder, 0.6), false: t.border }} thumbColor={push ? t.reminder : t.muted} />
        </View>
      </View>
    </View>
  );
}
