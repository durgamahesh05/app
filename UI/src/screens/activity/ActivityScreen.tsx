import React, { useCallback, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Users, Wallet, UserPlus } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import Header from '../../components/common/Header';
import FabGroup from '../../components/common/FabGroup';
import { ActivityItem } from '../../types/expense';
import { CURRENCY } from '../../constants/config';
import { expenseService } from '../../services/expenseService';

export default function ActivityScreen() {
  const { theme: t } = useTheme();
  const [items, setItems] = useState<ActivityItem[]>([]);
  useFocusEffect(useCallback(() => { expenseService.activity().then(setItems).catch(() => setItems([])); }, []));
  const iconFor = (k: ActivityItem['kind']) => (k === 'paid' || k === 'received' || k === 'owed') ? Wallet : k === 'member' ? UserPlus : Users;
  const tone = (k: ActivityItem['kind']) => (k === 'paid' || k === 'received' || k === 'owed') ? t.primary : t.share;
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header />
      <FlatList data={items} keyExtractor={i => i.id} contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
        ListHeaderComponent={<Text style={{ color: t.text, fontSize: 30, fontWeight: '800', marginBottom: 18 }}>Activity</Text>}
        renderItem={({ item }) => {
          const Icon = iconFor(item.kind);
          const c = tone(item.kind);
          const amtColor = item.direction === 'in' ? t.alert : t.primary; // received uses coral as in design
          const amtLabel = item.direction === 'out' ? 'You paid' : item.direction === 'in' ? 'You received' : 'You get back';
          return (
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: alpha(c, 0.16), alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Icon size={20} color={c} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: t.text, fontSize: 14, lineHeight: 20 }}>{item.text}</Text>
                {item.amount ? <Text style={{ color: amtColor, fontWeight: '700', marginTop: 2 }}>{amtLabel} {CURRENCY}{item.amount.toLocaleString('en-IN')}.00</Text> : null}
                <Text style={{ color: t.muted, fontSize: 12, marginTop: 2 }}>{item.time}</Text>
              </View>
            </View>
          );
        }} />
      <FabGroup />
    </View>
  );
}
