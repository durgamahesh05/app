import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'auth_token';
export const tokenStorage = {
  get: () => AsyncStorage.getItem(KEY),
  set: (t: string) => AsyncStorage.setItem(KEY, t),
  clear: () => AsyncStorage.removeItem(KEY),
};
