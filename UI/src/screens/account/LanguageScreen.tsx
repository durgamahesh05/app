import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import Header from '../../components/common/Header';

export default function LanguageScreen() {
  const { theme: t } = useTheme();
  const { lang, setLang } = useLanguage();
  const nav = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header title="Language" onBack={() => nav.goBack()} showSearch={false} />
      <FlatList data={LANGUAGES} keyExtractor={l => l.code} contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => setLang(item.code)} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: t.border }}>
            <View style={{ flex: 1 }}><Text style={{ color: t.text, fontWeight: '600' }}>{item.native}</Text><Text style={{ color: t.muted, fontSize: 12 }}>{item.label}</Text></View>
            {lang === item.code ? <Check size={20} color={t.primary} /> : null}
          </Pressable>)} />
    </View>
  );
}
