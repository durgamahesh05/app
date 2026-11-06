import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';

export default function ExpenseDetailsScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { id } = (useRoute().params ?? {}) as { id: string };
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Expense" onBack={() => nav.goBack()} showSearch={false} />
      <Text style={{ color: t.muted, padding: 20 }}>Expense #{id}</Text>
    </View>
  );
}
