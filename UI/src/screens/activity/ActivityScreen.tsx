import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Users, Wallet, UserPlus } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import Header from '../../components/common/Header';
import FabGroup from '../../components/common/FabGroup';
import { ActivityItem } from '../../types/expense';
import { CURRENCY } from '../../constants/config';

const DEMO: ActivityItem[] = [
  { id: '1', kind: 'setting', text: 'Alex turned "simplify debts" on in the group "Hostel Expenses".', time: 'Today, 9:18 pm' },
  { id: '2', kind: 'paid', text: 'Alex paid Sam in Hostel Expenses.', amount: 2400, direction: 'out', time: 'Today, 5:22 pm' },
  { id: '3', kind: 'received', text: 'You recorded a payment from Rahul in Hostel Expenses.', amount: 1250, direction: 'in', time: 'Yesterday, 7:04 pm' },
  { id: '4', kind: 'member', text: 'You added Ankit to the group Weekend Trip.', time: '1 Sept, 5:20 pm' },
  { id: '5', kind: 'group', text: 'You created the group Weekend Trip.', time: '1 Sept, 5:19 pm' },
  { id: '6', kind: 'owed', text: 'Sam paid Alex for dinner.', amount: 680, direction: 'get', time: '30 Aug, 8:42 pm' },
];

export default function ActivityScreen() {
  const { theme: t } = useTheme();
  const iconFor = (k: ActivityItem['kind']) => (k === 'paid' || k === 'received' || k === 'owed') ? Wallet : k === 'member' ? UserPlus : Users;
  const tone = (k: ActivityItem['kind']) => (k === 'paid' || k === 'received' || k === 'owed') ? t.primary : t.share;
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header />
      <FlatList data={DEMO} keyExtractor={i => i.id} contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
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
