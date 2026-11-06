import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bot, ScanLine, Paperclip, Send } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import { useChat } from '../../hooks/useChat';
import ChatBubble from '../../components/chat/ChatBubble';
import MicButton from '../../components/chat/MicButton';
import RecordingBar from '../../components/chat/RecordingBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CHIPS = ['Who do I owe?', 'Who owes me?', 'Add expense', 'Split receipt'];

export default function ChatScreen() {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const { top } = useSafeAreaInsets();
  const { messages, typing, send } = useChat();
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const list = useRef<FlatList>(null);

  const submit = (v = text) => { if (!v.trim()) return; setText(''); send(v.trim()); };
  const toggleMic = () => setRecording(r => !r); // hook your recorder / speech-to-text here

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: t.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ paddingTop: top + 10, paddingHorizontal: 20, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: t.border }}>
        <Text style={{ color: t.text, fontSize: 24, fontWeight: '800' }}>Merizo AI</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: alpha(t.primary, 0.15), paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: t.primary, marginRight: 6 }} />
          <Text style={{ color: t.primary, fontWeight: '700', fontSize: 12 }}>Online</Text>
        </View>
      </View>

      <FlatList ref={list} data={messages} keyExtractor={m => m.id} contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
        ListHeaderComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: alpha(t.ai, 0.08), borderWidth: 1, borderColor: alpha(t.ai, 0.3), borderRadius: 16, padding: 12, marginBottom: 16 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: t.ai, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}><Bot size={20} color={t.mode === 'dark' ? '#1E1033' : '#fff'} /></View>
            <View><Text style={{ color: t.text, fontWeight: '700' }}>Merizo AI</Text><Text style={{ color: t.muted, fontSize: 12 }}>Private assistant for your shared finances</Text></View>
          </View>}
        renderItem={({ item }) => <ChatBubble msg={item} />}
        ListFooterComponent={typing ? <Text style={{ color: t.muted, marginLeft: 36 }}>Merizo is thinking…</Text> : null} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}>
        {CHIPS.map(c => (
          <Pressable key={c} onPress={() => submit(c)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: t.card, borderWidth: 1, borderColor: t.border }}>
            <Text style={{ color: t.text, fontSize: 13, fontWeight: '600' }}>{c}</Text>
          </Pressable>))}
      </ScrollView>

      {recording ? <RecordingBar /> : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingBottom: 10, gap: 8 }}>
        <Pressable onPress={() => nav.navigate('ScanCode')} style={{ padding: 8 }}><ScanLine size={22} color={t.text} /></Pressable>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: t.card, borderRadius: 999, borderWidth: 1, borderColor: t.border, paddingHorizontal: 16 }}>
          <TextInput value={text} onChangeText={setText} placeholder="Ask Merizo anything…" placeholderTextColor={t.muted}
            style={{ flex: 1, height: 46, color: t.text }} onSubmitEditing={() => submit()} />
          {text ? <Pressable onPress={() => submit()}><Send size={20} color={t.primary} /></Pressable>
                : <Pressable onPress={() => launchImageLibrary({ mediaType: 'photo' })}><Paperclip size={20} color={t.muted} /></Pressable>}
        </View>
        <MicButton recording={recording} onPress={toggleMic} />
      </View>
    </KeyboardAvoidingView>
  );
}
