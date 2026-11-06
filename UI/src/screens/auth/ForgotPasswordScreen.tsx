import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';

export default function ForgotPasswordScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const [email, setEmail] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async () => { setLoading(true); try { await authService.forgot(email); nav.navigate('VerifyOTP', { email, reset: true }); } catch {} finally { setLoading(false); } };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 24, paddingTop: 80 }}>
      <Text style={{ color: t.text, fontSize: 28, fontWeight: '800' }}>Forgot password</Text>
      <Text style={{ color: t.muted, marginVertical: 12 }}>We'll email you a one-time code.</Text>
      <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Button title="Send code" onPress={submit} loading={loading} />
    </ScrollView>
  );
}
