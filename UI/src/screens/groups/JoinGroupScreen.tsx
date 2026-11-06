import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { groupService } from '../../services/groupService';

export default function JoinGroupScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const [code, setCode] = useState(''); const [loading, setLoading] = useState(false);
  const join = async () => { setLoading(true); try { await groupService.join(code); nav.goBack(); } catch {} finally { setLoading(false); } };
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Join group" onBack={() => nav.goBack()} showSearch={false} />
      <View style={{ padding: 20 }}>
        <Input label="Invite code" value={code} onChangeText={setCode} autoCapitalize="characters" />
        <Button title="Join" onPress={join} loading={loading} disabled={!code} />
        <Button title="Scan QR code" variant="ghost" onPress={() => nav.navigate('ScanCode')} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}
