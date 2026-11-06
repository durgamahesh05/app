import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildTheme, Theme } from '../styles/theme';

export type ThemePref = 'system' | 'light' | 'dark';
type Ctx = { theme: Theme; pref: ThemePref; ready: boolean; setPref: (p: ThemePref) => void };
const ThemeCtx = createContext<Ctx | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const sys = useColorScheme();
  const [pref, setPrefState] = useState<ThemePref>('system');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem('theme').then(value => {
      if (active && (value === 'system' || value === 'light' || value === 'dark')) {
        setPrefState(value);
      }
    }).catch(() => undefined).finally(() => {
      if (active) setReady(true);
    });
    return () => { active = false; };
  }, []);
  const setPref = (pref: ThemePref) => {
    setPrefState(pref);
    void AsyncStorage.setItem('theme', pref).catch(() => undefined);
  };
  const mode = pref === 'system' ? (sys === 'dark' ? 'dark' : 'light') : pref;
  const theme = useMemo(() => buildTheme(mode), [mode]);
  return <ThemeCtx.Provider value={{ theme, pref, ready, setPref }}>{children}</ThemeCtx.Provider>;
};
export const useTheme = () => {
  const context = useContext(ThemeCtx);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
