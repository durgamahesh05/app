import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Users, ChevronDown } from 'lucide-react-native';
import BottomSheet from '../common/BottomSheet';
import Button from '../common/Button';
import Input from '../common/Input';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { expenseService } from '../../services/expenseService';
import { CURRENCY } from '../../constants/config';

export default function AddExpenseSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { theme: t } = useTheme();
  const { t: tr } = useLanguage();
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try { await expenseService.create({ description: desc, amount: Number(amount) }); setDesc(''); setAmount(''); onClose(); }
    catch {} finally { setSaving(false); }
  };

  return (
    <BottomSheet visible={visible} title="Add an expense" onClose={onClose}>
      <Input label="Description" placeholder="What was this for?" value={desc} onChangeText={setDesc} autoFocus />
      <Text style={{ color: t.muted, fontSize: 12, fontWeight: '600', marginBottom: 6 }}>Amount</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: t.cardAlt, borderRadius: 16, paddingHorizontal: 14, borderWidth: 1.5, borderColor: t.border, marginBottom: 14 }}>
        <Text style={{ color: t.text, fontSize: 22, marginRight: 8 }}>{CURRENCY}</Text>
        <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor={t.muted}
          style={{ flex: 1, height: 56, color: t.text, fontSize: 24, fontWeight: '700' }} />
      </View>
      <Pressable style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: t.cardAlt, borderRadius: 16, padding: 14, borderWidth: 1.5, borderColor: t.border, marginBottom: 14 }}>
        <Users size={18} color={t.share} />
        <Text style={{ color: t.text, fontWeight: '700', flex: 1, marginLeft: 10 }}>Split with you and 3 others</Text>
        <ChevronDown size={18} color={t.text} />
      </Pressable>
      <Button title={tr('saveExpense')} onPress={save} loading={saving} disabled={!desc || !Number(amount)} />
    </BottomSheet>
  );
}
