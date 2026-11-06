import React from 'react';
import { View, Text } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import { ChatMessage } from '../../types/chat';

export default function ChatBubble({ msg }: { msg: ChatMessage }) {
  const { theme: t } = useTheme();
  const mine = msg.role === 'user';
  return (
    <View style={{ flexDirection: 'row', justifyContent: mine ? 'flex-end' : 'flex-start', alignItems: 'flex-end', marginBottom: 12 }}>
      {!mine && (
        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: alpha(t.ai, 0.18), alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
          <Sparkles size={14} color={t.ai} />
        </View>
      )}
      <View style={{ maxWidth: '78%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18,
        backgroundColor: mine ? t.primary : t.card, borderWidth: mine ? 0 : 1, borderColor: t.border }}>
        <Text style={{ color: mine ? t.onAccent : t.text, fontSize: 15, lineHeight: 21 }}>{msg.text}</Text>
      </View>
    </View>
  );
}
