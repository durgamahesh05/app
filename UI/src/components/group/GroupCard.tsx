import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Users } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import { Group } from '../../types/group';

export default function GroupCard({ group, onPress }: { group: Group; onPress: () => void }) {
  const { theme: t } = useTheme();
  return (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: t.card, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: t.border, marginBottom: 10 }}>
      <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: alpha(t.share, 0.18), alignItems: 'center', justifyContent: 'center' }}><Users size={20} color={t.share} /></View>
      <View style={{ marginLeft: 12 }}>
        <Text style={{ color: t.text, fontWeight: '700' }}>{group.name}</Text>
        <Text style={{ color: t.muted, fontSize: 12 }}>{group.members.length} members</Text>
      </View>
    </Pressable>
  );
}
