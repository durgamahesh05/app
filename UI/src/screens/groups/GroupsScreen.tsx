import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Filter } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import EmptyState from '../../components/common/EmptyState';
import FabGroup from '../../components/common/FabGroup';
import GroupCard from '../../components/group/GroupCard';
import { groupService } from '../../services/groupService';
import { Group } from '../../types/group';

export default function GroupsScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [showSettled, setShowSettled] = useState(false);
  useFocusEffect(useCallback(() => { groupService.list().then(setGroups).catch(() => {}); }, []));
  const visible = groups.filter(g => showSettled || !g.settled);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header showAddFriend onAddFriend={() => nav.navigate('JoinGroup')} />
      {visible.length === 0 ? (
        <EmptyState kind="groups" settledCount={groups.filter(g => g.settled).length || 1} onShowSettled={() => setShowSettled(true)} />
      ) : (
        <FlatList data={visible} keyExtractor={g => g.id} contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
          ListHeaderComponent={<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: t.text, fontSize: 26, fontWeight: '800' }}>Groups</Text>
            <Pressable onPress={() => nav.navigate('CreateGroup')}><Filter size={22} color={t.text} /></Pressable></View>}
          renderItem={({ item }) => <GroupCard group={item} onPress={() => nav.navigate('GroupDetails', { id: item.id })} />} />
      )}
      <FabGroup />
    </View>
  );
}
