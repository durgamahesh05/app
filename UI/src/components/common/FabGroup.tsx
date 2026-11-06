import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ScanLine, FileText } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import AddExpenseSheet from '../expense/AddExpenseSheet';
import SplitReceiptSheet from '../receipt/SplitReceiptSheet';

export default function FabGroup() {
  const { theme: t } = useTheme();
  const { t: tr } = useLanguage();
  const [sheet, setSheet] = useState<'expense' | 'receipt' | null>(null);
  return (
    <>
      <View style={s.wrap} pointerEvents="box-none">
        <Pressable onPress={() => setSheet('receipt')} style={[s.fab, { backgroundColor: t.card, borderColor: t.border, borderWidth: 1 }]}>
          <ScanLine size={18} color={t.text} /><Text style={[s.txt, { color: t.text }]}>{tr('splitReceipt')}</Text>
        </Pressable>
        <Pressable onPress={() => setSheet('expense')} style={[s.fab, { backgroundColor: t.primary }]}>
          <FileText size={18} color={t.onAccent} /><Text style={[s.txt, { color: t.onAccent }]}>{tr('addExpense')}</Text>
        </Pressable>
      </View>
      <AddExpenseSheet visible={sheet === 'expense'} onClose={() => setSheet(null)} />
      <SplitReceiptSheet visible={sheet === 'receipt'} onClose={() => setSheet(null)} />
    </>
  );
}
const s = StyleSheet.create({
  wrap: { position: 'absolute', right: 16, bottom: 16, alignItems: 'flex-end', gap: 10 },
  fab: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, height: 48, borderRadius: 999, elevation: 4 },
  txt: { fontWeight: '700' },
});
