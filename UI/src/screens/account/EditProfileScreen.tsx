import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function EditProfileScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const save = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setSaving(true);
    setError('');
    try {
      await updateProfile(trimmedName);
      nav.goBack();
    } catch {
      setError('Could not save your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Edit profile" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20 }}>
        <Input label="Name" value={name} onChangeText={setName} />
        <Input label="Email" value={user?.email} editable={false} />
        {error ? <Text style={{ color: t.alert, marginBottom: 10 }}>{error}</Text> : null}
        <Button title="Save" onPress={save} loading={saving} disabled={!name.trim()} />
      </View>
    </View>
  );
}
