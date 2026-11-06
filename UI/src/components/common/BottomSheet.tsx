import React from 'react';
import { Modal, Pressable, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

type Props = { visible: boolean; title: string; onClose: () => void; children: React.ReactNode };
export default function BottomSheet({ visible, title, onClose, children }: Props) {
  const { theme: t } = useTheme();
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[s.sheet, { backgroundColor: t.card, borderColor: t.border }]}>
          <View style={[s.handle, { backgroundColor: t.border }]} />
          <View style={s.row}>
            <Text style={{ color: t.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={10}><X size={20} color={t.muted} /></Pressable>
          </View>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#000A' },
  sheet: { padding: 20, paddingBottom: 28, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1 },
  handle: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, marginBottom: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
});
