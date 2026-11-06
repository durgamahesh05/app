import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Search, UserPlus, ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

type Props = { title?: string; onBack?: () => void; showSearch?: boolean; showAddFriend?: boolean; onSearch?: () => void; onAddFriend?: () => void; right?: React.ReactNode };
export default function Header({ title, onBack, showSearch = true, showAddFriend, onSearch, onAddFriend, right }: Props) {
  const { theme: t } = useTheme();
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top + 8, paddingBottom: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: t.border, backgroundColor: t.bg }}>
      {onBack ? <Pressable onPress={onBack} style={{ marginRight: 12 }}><ArrowLeft size={22} color={t.text} /></Pressable> : null}
      {title ? <Text style={{ color: t.text, fontSize: 18, fontWeight: '700', flex: 1 }}>{title}</Text> : <View style={{ flex: 1 }} />}
      {right}
      {showSearch ? <Pressable onPress={onSearch} style={{ padding: 6 }}><Search size={22} color={t.text} /></Pressable> : null}
      {showAddFriend ? <Pressable onPress={onAddFriend} style={{ padding: 6, marginLeft: 8 }}><UserPlus size={22} color={t.text} /></Pressable> : null}
    </View>
  );
}
