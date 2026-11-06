import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { groupService } from '../../services/groupService';

export default function CreateGroupScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const [name, setName] = useState(''); const [loading, setLoading] = useState(false);
  const create = async () => { setLoading(true); try { await groupService.create(name); nav.goBack(); } catch {} finally { setLoading(false); } };
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Create group" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20 }}>
        <Input label="Group name" value={name} onChangeText={setName} placeholder="Weekend Trip" />
        <Button title="Create" onPress={create} loading={loading} disabled={!name} />
      </View>
    </View>
  );
}
