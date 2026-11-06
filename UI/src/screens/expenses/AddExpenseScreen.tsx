import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import AddExpenseSheet from '../../components/expense/AddExpenseSheet';
import { useNavigation } from '@react-navigation/native';

export default function AddExpenseScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation();
  return <View style={{ flex: 1, backgroundColor: t.bg }}><AddExpenseSheet visible onClose={() => nav.goBack()} /></View>;
}
