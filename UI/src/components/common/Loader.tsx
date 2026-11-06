import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
export default function Loader() {
  const { theme: t } = useTheme();
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: t.bg }}><ActivityIndicator size="large" color={t.primary} /></View>;
}
