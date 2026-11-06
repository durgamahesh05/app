import React, { useState } from 'react';
import { Text, Pressable, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { appIcon } from '../../assets';
import { APP_FONT_FAMILY } from '../../styles/nativeFonts';

export default function LoginScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState(''); const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false); const [err, setErr] = useState('');
  const submit = async () => { setLoading(true); setErr(''); try { await signIn(email, pw); } catch (e: any) { setErr('Invalid email or password'); } finally { setLoading(false); } };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 24, paddingTop: 90 }} keyboardShouldPersistTaps="handled">
      <Image source={appIcon} accessibilityLabel="Merizo" style={{ width: 56, height: 56, marginBottom: 12 }} resizeMode="contain" />
      <Text style={{ color: t.primary, fontFamily: APP_FONT_FAMILY, fontSize: 34, fontWeight: '800' }}>Merizo</Text>
      <Text style={{ color: t.muted, marginTop: 6, marginBottom: 36 }}>Split smart. Settle simply.</Text>
      <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Input label="Password" value={pw} onChangeText={setPw} secureTextEntry />
      {err ? <Text style={{ color: t.alert, marginBottom: 10 }}>{err}</Text> : null}
      <Pressable onPress={() => nav.navigate('ForgotPassword')}><Text style={{ color: t.nav, fontWeight: '600', marginBottom: 20 }}>Forgot password?</Text></Pressable>
      <Button title="Log in" onPress={submit} loading={loading} />
      <Pressable onPress={() => nav.navigate('Register')} style={{ marginTop: 22, alignItems: 'center' }}>
        <Text style={{ color: t.muted }}>New here? <Text style={{ color: t.nav, fontWeight: '700' }}>Create account</Text></Text>
      </Pressable>
    </ScrollView>
  );
}
