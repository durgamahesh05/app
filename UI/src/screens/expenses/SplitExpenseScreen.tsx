import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { CURRENCY } from '../../constants/config';

export default function SplitExpenseScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const total = 2400;
  const [people, setPeople] = useState(4);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Split equally" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: t.muted }}>Total {CURRENCY}{total}</Text>
        <Text style={{ color: t.primary, fontSize: 40, fontWeight: '800', marginVertical: 12 }}>{CURRENCY}{(total / people).toFixed(0)} <Text style={{ color: t.muted, fontSize: 16 }}>/ person</Text></Text>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
          <Pressable onPress={() => setPeople(p => Math.max(2, p - 1))} style={{ padding: 14, borderRadius: 14, backgroundColor: t.card }}><Text style={{ color: t.text, fontSize: 18 }}>−</Text></Pressable>
          <Text style={{ color: t.text, fontSize: 20, fontWeight: '700', alignSelf: 'center' }}>{people} people</Text>
          <Pressable onPress={() => setPeople(p => p + 1)} style={{ padding: 14, borderRadius: 14, backgroundColor: t.card }}><Text style={{ color: t.text, fontSize: 18 }}>+</Text></Pressable>
        </View>
        <Button title="Confirm split" onPress={() => nav.goBack()} style={{ alignSelf: 'stretch' }} />
      </View>
    </View>
  );
}
