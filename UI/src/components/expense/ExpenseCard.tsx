import React from 'react';
import { Text, Pressable } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CURRENCY } from '../../constants/config';
import { Expense } from '../../types/expense';

export default function ExpenseCard({ expense, onPress }: { expense: Expense; onPress?: () => void }) {
  const { theme: t } = useTheme();
  return (
    <Pressable onPress={onPress} style={{ backgroundColor: t.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: t.border, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ color: t.text, fontWeight: '600' }}>{expense.description}</Text>
      <Text style={{ color: t.primary, fontWeight: '700' }}>{CURRENCY}{expense.amount.toFixed(2)}</Text>
    </Pressable>
  );
}
