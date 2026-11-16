import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { CURRENCY } from '../../constants/config';
import { expenseService } from '../../services/expenseService';
import { Expense } from '../../types/expense';
import { groupService } from '../../services/groupService';

export default function SplitExpenseScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { id } = (useRoute().params ?? {}) as { id: string };
  const [expense, setExpense] = useState<Expense | null>(null);
  const [members, setMembers] = useState<{ id: string; name: string }[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    expenseService.list().then(items => {
      const selected = items.find(item => item.id === id);
      setExpense(selected ?? null);
      setParticipants(selected?.splits.map(split => split.userId) ?? []);
      if (!selected) return;
      if (selected.groupId) {
        groupService.members(selected.groupId).then(people => setMembers(people.map(person => ({ id: person.id, name: person.name })))).catch(() => setMembers([]));
      } else {
        setMembers([{ id: selected.paidBy, name: 'You' }]);
      }
    }).catch(() => setExpense(null));
  }, [id]);
  const total = expense?.amount ?? 0;
  const toggleParticipant = (participantId: string) => {
    setParticipants(current => current.includes(participantId)
      ? current.filter(idValue => idValue !== participantId)
      : [...current, participantId]);
  };
  const saveSplit = async () => {
    if (!expense || participants.length === 0) return;
    setSaving(true);
    setError('');
    try {
      await expenseService.updateSplit(expense.id, participants);
      nav.goBack();
    } catch {
      setError('Unable to save this split. Try again.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Split equally" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: t.muted }}>{expense ? expense.description : 'Expense unavailable'} · Total {CURRENCY}{total}</Text>
        {expense && participants.length > 0 ? <Text style={{ color: t.primary, fontSize: 40, fontWeight: '800', marginVertical: 12 }}>{CURRENCY}{(total / participants.length).toFixed(2)} <Text style={{ color: t.muted, fontSize: 16 }}>/ person</Text></Text> : null}
        {members.map(member => {
          const selected = participants.includes(member.id);
          return <Pressable key={member.id} onPress={() => toggleParticipant(member.id)} style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderRadius: 14, marginBottom: 8, backgroundColor: selected ? t.card : t.bg, borderWidth: 1, borderColor: selected ? t.primary : t.border }}>
            <Text style={{ color: t.text }}>{member.name}</Text><Text style={{ color: selected ? t.primary : t.muted }}>{selected ? 'Included' : 'Tap to include'}</Text>
          </Pressable>;
        })}
        {error ? <Text style={{ color: t.alert, marginVertical: 10 }}>{error}</Text> : null}
        <Button title="Confirm split" onPress={saveSplit} loading={saving} disabled={!expense || participants.length === 0} style={{ alignSelf: 'stretch', marginTop: 16 }} />
      </View>
    </View>
  );
}
