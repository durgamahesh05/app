import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';

export default function VerifyOTPScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { email, reset } = (useRoute().params ?? {}) as { email: string; reset?: boolean };
  const [otp, setOtp] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async () => {
    setLoading(true);
    try { await authService.verifyOtp(email, otp); reset ? nav.navigate('ResetPassword', { email, otp }) : nav.navigate('Login'); }
    catch {} finally { setLoading(false); }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 24, paddingTop: 80 }}>
      <Text style={{ color: t.text, fontSize: 28, fontWeight: '800' }}>Verify OTP</Text>
      <Text style={{ color: t.muted, marginVertical: 12 }}>Enter the 6-digit code sent to {email}</Text>
      <Input value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={6} style={{ letterSpacing: 8, fontSize: 22, textAlign: 'center' }} />
      <Button title="Verify" onPress={submit} loading={loading} />
    </ScrollView>
  );
}
