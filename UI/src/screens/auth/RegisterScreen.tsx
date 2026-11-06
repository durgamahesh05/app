import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';

export default function RegisterScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async () => { setLoading(true); try { await authService.register(name, email, pw); nav.navigate('Login'); } catch {} finally { setLoading(false); } };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 24, paddingTop: 80 }} keyboardShouldPersistTaps="handled">
      <Text style={{ color: t.text, fontSize: 28, fontWeight: '800', marginBottom: 28 }}>Create account</Text>
      <Input label="Full name" value={name} onChangeText={setName} />
      <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Input label="Password" value={pw} onChangeText={setPw} secureTextEntry />
      <Button title="Continue" onPress={submit} loading={loading} style={{ marginTop: 8 }} />
    </ScrollView>
  );
}
