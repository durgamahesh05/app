import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { Expense } from '../../types/expense';
import { expenseService } from '../../services/expenseService';
import { CURRENCY } from '../../constants/config';

export default function ExpenseDetailsScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { id } = (useRoute().params ?? {}) as { id: string };
  const [expense, setExpense] = useState<Expense | null>(null);
  useEffect(() => { expenseService.list().then(items => setExpense(items.find(item => item.id === id) ?? null)).catch(() => setExpense(null)); }, [id]);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Expense" onBack={() => nav.goBack()} showSearch={false} />
      {expense ? <View style={{ padding: 20 }}>
        <Text style={{ color: t.text, fontSize: 24, fontWeight: '800' }}>{expense.description}</Text>
        <Text style={{ color: t.primary, fontSize: 30, fontWeight: '800', marginVertical: 12 }}>{CURRENCY}{expense.amount.toLocaleString('en-IN')}</Text>
        <Text style={{ color: t.muted, marginBottom: 20 }}>{expense.splits.length} participant{expense.splits.length === 1 ? '' : 's'}</Text>
        <Button title="Split expense" onPress={() => nav.navigate('SplitExpense', { id: expense.id })} />
      </View> : <Text style={{ color: t.muted, padding: 20 }}>Expense unavailable</Text>}
    </View>
  );
}
