import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import { CURRENCY } from '../../constants/config';

const CATS = [{ k: 'Food', v: 62 }, { k: 'Travel', v: 25 }, { k: 'Rent', v: 13 }];
export default function InsightsScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const colors = [t.primary, t.share, t.nav];
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Insights" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20 }}>
        <Text style={{ color: t.muted }}>This month</Text>
        <Text style={{ color: t.text, fontSize: 34, fontWeight: '800', marginBottom: 20 }}>{CURRENCY}12,480</Text>
        {CATS.map((c, i) => (
          <View key={c.k} style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}><Text style={{ color: t.text }}>{c.k}</Text><Text style={{ color: t.muted }}>{c.v}%</Text></View>
            <View style={{ height: 10, borderRadius: 5, backgroundColor: t.cardAlt }}><View style={{ width: `${c.v}%`, height: 10, borderRadius: 5, backgroundColor: colors[i] }} /></View>
          </View>))}
      </View>
    </View>
  );
}
