import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { QrCode, Sparkles, Bell, Palette, Languages, HelpCircle, LifeBuoy, Star, LogOut, ChevronRight, Camera, BarChart3 } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { alpha } from '../../constants/colors';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

export default function AccountScreen() {
  const { theme: t, pref } = useTheme();
  const { t: tr, lang } = useLanguage();
  const { user, signOut } = useAuth();
  const nav = useNavigation<any>();
  const initials = (user?.name ?? 'AM').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();
  const langName = LANGUAGES.find(l => l.code === lang)?.label ?? 'English';

  const Row = ({ icon: Icon, title, sub, onPress, color }: any) => (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
      <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.cardAlt, alignItems: 'center', justifyContent: 'center', marginRight: 14 }}><Icon size={20} color={color ?? t.text} /></View>
      <View style={{ flex: 1 }}><Text style={{ color: color ?? t.text, fontWeight: '600', fontSize: 15 }}>{title}</Text>{sub ? <Text style={{ color: t.muted, fontSize: 12 }}>{sub}</Text> : null}</View>
      {color ? null : <ChevronRight size={18} color={t.muted} />}
    </Pressable>
  );
  const Label = ({ children }: { children: string }) => <Text style={{ color: t.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginTop: 18, marginBottom: 4 }}>{children}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={{ color: t.text, fontSize: 30, fontWeight: '800', marginBottom: 18 }}>{tr('account')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View>
            <View style={{ width: 76, height: 76, borderRadius: 38, backgroundColor: alpha(t.primary, 0.18), borderWidth: 1.5, borderColor: alpha(t.primary, 0.5), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: t.primary, fontSize: 24, fontWeight: '800' }}>{initials}</Text>
            </View>
            <View style={{ position: 'absolute', right: -2, bottom: -2, backgroundColor: t.card, borderRadius: 14, padding: 5, borderWidth: 1, borderColor: t.border }}><Camera size={14} color={t.text} /></View>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{ color: t.text, fontSize: 18, fontWeight: '700' }}>{user?.name ?? 'Alex Morgan'}</Text>
            <Text style={{ color: t.muted }}>{user?.email ?? 'alex.morgan@example.com'}</Text>
          </View>
          <Pressable onPress={() => nav.navigate('EditProfile')}><Text style={{ color: t.nav, fontWeight: '700' }}>Edit</Text></Pressable>
        </View>

        <View style={{ backgroundColor: alpha(t.ai, 0.14), borderWidth: 1, borderColor: alpha(t.ai, 0.4), borderRadius: 22, padding: 18 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: alpha(t.ai, 0.25), alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Sparkles size={20} color={t.ai} /></View>
          <Text style={{ color: t.text, fontSize: 20, fontWeight: '800' }}>Do more with Merizo Pro.</Text>
          <Text style={{ color: t.muted, marginVertical: 8 }}>Unlimited scans, smart insights, zero ads.</Text>
          <Button variant="ai" title="Explore Merizo Pro" />
        </View>

        <Row icon={QrCode} title="Scan code" onPress={() => nav.navigate('ScanCode')} />
        <Row icon={Sparkles} title="Merizo Pro" sub="Premium tools for every split" />
        <Row icon={BarChart3} title="Insights" sub="Spending breakdown" onPress={() => nav.navigate('Insights')} />

        <Label>PREFERENCES</Label>
        <Row icon={Bell} title="Device and push notification settings" onPress={() => nav.navigate('Settings')} />
        <Row icon={Palette} title={tr('appearance')} sub={pref === 'system' ? 'System default' : pref === 'dark' ? 'Dark' : 'Light'} onPress={() => nav.navigate('Settings')} />
        <Row icon={Languages} title={tr('language')} sub={`${langName} · ${langName}`} onPress={() => nav.navigate('Language')} />

        <Label>HELP & SUPPORT</Label>
        <Row icon={HelpCircle} title="Help Center" />
        <Row icon={LifeBuoy} title="Contact Merizo Support" />
        <Row icon={Star} title="Rate Merizo" />

        <View style={{ height: 1, backgroundColor: t.border, marginVertical: 14 }} />
        <Row icon={LogOut} title={tr('logOut')} color={t.primary} onPress={signOut} />
        <Text style={{ color: t.nav, textAlign: 'center', fontWeight: '600', marginTop: 20 }}>Privacy Policy</Text>
        <Text style={{ color: t.muted, textAlign: 'center', fontSize: 12, marginTop: 10 }}>© 2026 Merizo</Text>
      </ScrollView>
    </View>
  );
}
