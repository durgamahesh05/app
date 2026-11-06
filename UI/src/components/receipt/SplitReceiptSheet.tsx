import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Camera } from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '../common/BottomSheet';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';
import { alpha } from '../../constants/colors';

export default function SplitReceiptSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { theme: t } = useTheme();
  const nav = useNavigation<any>();
  const handle = async (res: any) => {
    const uri = res?.assets?.[0]?.uri;
    if (uri) { onClose(); nav.navigate('ReceiptDetails', { uri }); }
  };
  return (
    <BottomSheet visible={visible} title="Split a receipt" onClose={onClose}>
      <Pressable onPress={async () => handle(await launchCamera({ mediaType: 'photo' }))}
        style={{ borderWidth: 1.5, borderStyle: 'dashed', borderColor: t.share, backgroundColor: alpha(t.share, 0.08), borderRadius: 20, paddingVertical: 36, alignItems: 'center', marginBottom: 14 }}>
        <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: alpha(t.share, 0.2), alignItems: 'center', justifyContent: 'center' }}>
          <Camera size={24} color={t.share} />
        </View>
        <Text style={{ color: t.text, fontWeight: '700', fontSize: 16, marginTop: 14 }}>Photograph your receipt</Text>
        <Text style={{ color: t.muted, fontSize: 12, marginTop: 4 }}>Merizo will identify items and totals</Text>
      </Pressable>
      <Button variant="outline" title="Choose from gallery" onPress={async () => handle(await launchImageLibrary({ mediaType: 'photo' }))}
        style={{ borderColor: t.border }} />
    </BottomSheet>
  );
}
