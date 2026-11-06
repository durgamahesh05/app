import React from 'react';
import { Modal as RNModal, View, Text, Pressable } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

type Props = { visible: boolean; title: string; message?: string; confirmText?: string; onConfirm: () => void; onCancel: () => void };
export default function Modal({ visible, title, message, confirmText = 'Confirm', onConfirm, onCancel }: Props) {
  const { theme: t } = useTheme();
  return (
    <RNModal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <Pressable onPress={onCancel} style={{ flex: 1, backgroundColor: '#000A', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Pressable style={{ width: '100%', backgroundColor: t.card, borderRadius: 24, padding: 22, borderWidth: 1, borderColor: t.border }}>
          <Text style={{ color: t.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
          {message ? <Text style={{ color: t.muted, marginTop: 8, marginBottom: 18 }}>{message}</Text> : <View style={{ height: 16 }} />}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button title="Cancel" variant="outline" onPress={onCancel} style={{ flex: 1 }} />
            <Button title={confirmText} onPress={onConfirm} style={{ flex: 1 }} />
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
