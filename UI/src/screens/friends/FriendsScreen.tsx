import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import EmptyState from '../../components/common/EmptyState';
import FabGroup from '../../components/common/FabGroup';
import { Friend } from '../../types/group';
import { CURRENCY } from '../../constants/config';

export default function FriendsScreen() {
  const { theme: t } = useTheme();
  const [friends] = useState<Friend[]>([]);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header showAddFriend />
      {friends.length === 0 ? <EmptyState kind="friends" /> : (
        <FlatList data={friends} keyExtractor={f => f.id} contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: t.card, borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: t.border }}>
              <Text style={{ color: t.text, fontWeight: '600' }}>{item.name}</Text>
              <Text style={{ color: item.balance >= 0 ? t.primary : t.alert, fontWeight: '700' }}>{CURRENCY}{Math.abs(item.balance)}</Text>
            </View>)} />
      )}
      <FabGroup />
    </View>
  );
}
