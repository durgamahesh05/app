import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Check, Sparkles, Users } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

type Props = { kind: 'groups' | 'friends'; onShowSettled?: () => void; onClearFilter?: () => void; settledCount?: number };
export default function EmptyState({ kind, onShowSettled, onClearFilter, settledCount = 1 }: Props) {
  const { theme: t } = useTheme();
  const { t: tr } = useLanguage();
  const noun = kind === 'groups' ? 'group' : 'friend';
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 24, paddingTop: 24 }}>
      <Text style={{ alignSelf: 'flex-start', color: t.text, fontSize: 26, fontWeight: '800', marginBottom: 24 }}>{tr('settledUp')}</Text>
      <View style={{ width: 120, height: 120, borderRadius: 36, backgroundColor: alpha(t.primary, 0.15), alignItems: 'center', justifyContent: 'center' }}>
        {kind === 'groups' ? <Check size={56} color={t.primary} /> : <Users size={56} color={t.primary} />}
        <View style={{ position: 'absolute', top: 6, right: 6 }}><Sparkles size={20} color={t.reminder} /></View>
      </View>
      {kind === 'friends' ? (
        <>
          <Text style={{ color: t.text, fontSize: 18, fontWeight: '600', marginTop: 24 }}>No one to see here.</Text>
          <Pressable onPress={onClearFilter}><Text style={{ color: t.primary, fontWeight: '700', marginTop: 12 }}>Clear filter</Text></Pressable>
        </>
      ) : null}
      <Text style={{ color: t.muted, textAlign: 'center', marginTop: 24, lineHeight: 20 }}>
        Hiding {noun}s that have been settled up over one month.
      </Text>
      <Button variant="outline" title={`Show ${settledCount} settled-up ${noun}`} onPress={onShowSettled} style={{ marginTop: 20, paddingHorizontal: 24 }} />
    </View>
  );
}
