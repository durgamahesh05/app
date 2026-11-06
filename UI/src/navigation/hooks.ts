import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from './types';

export const useRootNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

export const useAuthNavigation = () =>
  useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
