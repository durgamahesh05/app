import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { receiptService } from '../../services/receiptService';
import { CURRENCY } from '../../constants/config';

export default function ReceiptDetailsScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { uri } = (useRoute().params ?? {}) as { uri: string };
  const [items, setItems] = useState<{ name: string; price: number }[] | null>(null);
  useEffect(() => { receiptService.upload(uri).then((r: any) => setItems(r.items ?? [])).catch(() => setItems([])); }, [uri]);
  const total = (items ?? []).reduce((s, i) => s + i.price, 0);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Receipt" onBack={() => nav.goBack()} showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Image source={{ uri }} style={{ height: 180, borderRadius: 16, marginBottom: 16 }} resizeMode="cover" />
        {items === null ? <ActivityIndicator color={t.primary} /> : items.map((i, k) => (
          <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: t.border }}>
            <Text style={{ color: t.text }}>{i.name}</Text><Text style={{ color: t.text, fontWeight: '700' }}>{CURRENCY}{i.price}</Text>
          </View>))}
        <Text style={{ color: t.primary, fontSize: 22, fontWeight: '800', marginVertical: 16 }}>Total {CURRENCY}{total}</Text>
        <Button title="Split items" onPress={() => nav.navigate('SplitExpense')} />
      </ScrollView>
    </View>
  );
}
