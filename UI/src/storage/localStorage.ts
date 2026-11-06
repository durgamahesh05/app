import AsyncStorage from '@react-native-async-storage/async-storage';

/** Small JSON repository that keeps serialization out of feature code. */
export class AsyncJsonStore {
  async get<T>(key: string): Promise<T | null> {
    const serialized = await AsyncStorage.getItem(key);
    if (serialized === null) return null;

    try {
      return JSON.parse(serialized) as T;
    } catch {
      await AsyncStorage.removeItem(key);
      return null;
    }
  }

  set(key: string, value: unknown): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}

export const localStorage = new AsyncJsonStore();
