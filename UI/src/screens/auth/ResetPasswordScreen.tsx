import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';

export default function ResetPasswordScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { email, otp } = (useRoute().params ?? {}) as { email: string; otp: string };
  const [pw, setPw] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async () => { setLoading(true); try { await authService.reset(email, otp, pw); nav.navigate('Login'); } catch {} finally { setLoading(false); } };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 24, paddingTop: 80 }}>
      <Text style={{ color: t.text, fontSize: 28, fontWeight: '800', marginBottom: 24 }}>New password</Text>
      <Input label="Password" value={pw} onChangeText={setPw} secureTextEntry />
      <Button title="Reset password" onPress={submit} loading={loading} />
    </ScrollView>
  );
}
