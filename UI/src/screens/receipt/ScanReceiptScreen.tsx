import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import SplitReceiptSheet from '../../components/receipt/SplitReceiptSheet';

export default function ScanReceiptScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation();
  return <View style={{ flex: 1, backgroundColor: t.bg }}><SplitReceiptSheet visible onClose={() => nav.goBack()} /></View>;
}
