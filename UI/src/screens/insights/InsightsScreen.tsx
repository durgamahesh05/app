import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import { CURRENCY } from '../../constants/config';
import { expenseService } from '../../services/expenseService';

export default function InsightsScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const colors = [t.primary, t.share, t.nav];
  const [report, setReport] = useState<{ total: number; categories: { name: string; amount: number; percentage: number }[]; period: string; expenseCount: number } | null>(null);
  useEffect(() => { expenseService.insights().then(setReport).catch(() => setReport(null)); }, []);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Insights" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20 }}>
        <Text style={{ color: t.muted }}>{report?.period ?? 'This month'}</Text>
        <Text style={{ color: t.text, fontSize: 34, fontWeight: '800', marginBottom: 8 }}>{CURRENCY}{(report?.total ?? 0).toLocaleString('en-IN')}</Text>
        <Text style={{ color: t.muted, marginBottom: 20 }}>{report ? `${report.expenseCount} expenses this month` : 'Unable to load expense insights'}</Text>
        {(report?.categories ?? []).map((c, i) => (
          <View key={c.name} style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}><Text style={{ color: t.text }}>{c.name}</Text><Text style={{ color: t.muted }}>{c.percentage}% · {CURRENCY}{c.amount.toLocaleString('en-IN')}</Text></View>
            <View style={{ height: 10, borderRadius: 5, backgroundColor: t.cardAlt }}><View style={{ width: `${c.percentage}%`, height: 10, borderRadius: 5, backgroundColor: colors[i % colors.length] }} /></View>
          </View>))}
        {report?.categories.length === 0 ? <Text style={{ color: t.muted }}>No expenses recorded this month.</Text> : null}
      </View>
    </View>
  );
}
