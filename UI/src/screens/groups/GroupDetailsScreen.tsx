import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import FabGroup from '../../components/common/FabGroup';
import { groupService } from '../../services/groupService';
import { expenseService } from '../../services/expenseService';
import { Group } from '../../types/group';
import { Expense } from '../../types/expense';
import { CURRENCY } from '../../constants/config';

export default function GroupDetailsScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { id } = (useRoute().params ?? {}) as { id: string };
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    Promise.all([groupService.list(), expenseService.list()]).then(([groups, items]) => {
      setGroup(groups.find(item => item.id === id) ?? null);
      setExpenses(items.filter(item => item.groupId === id));
    }).catch(() => { setGroup(null); setExpenses([]); });
  }, [id]);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title={group?.name ?? 'Group'} onBack={() => nav.goBack()} showSearch={false} />
      {group ? <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: t.muted, marginBottom: 20 }}>{group.members.length} members · Invite code: {group.inviteCode}</Text>
        <Text style={{ color: t.text, fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Expenses</Text>
        <FlatList data={expenses} keyExtractor={item => item.id} ListEmptyComponent={<Text style={{ color: t.muted }}>No expenses in this group yet.</Text>}
          renderItem={({ item }) => <Pressable onPress={() => nav.navigate('ExpenseDetails', { id: item.id })} style={{ padding: 14, borderRadius: 14, backgroundColor: t.card, marginBottom: 10 }}>
            <Text style={{ color: t.text, fontWeight: '700' }}>{item.description}</Text>
            <Text style={{ color: t.muted, marginTop: 4 }}>{item.category ?? 'Other'} · {item.splits.length} participants</Text>
            <Text style={{ color: t.primary, fontWeight: '700', marginTop: 4 }}>{CURRENCY}{item.amount.toLocaleString('en-IN')}</Text>
          </Pressable>} />
      </View> : <Text style={{ color: t.muted, padding: 20 }}>Group unavailable</Text>}
      <FabGroup groupId={id} />
    </View>
  );
}
