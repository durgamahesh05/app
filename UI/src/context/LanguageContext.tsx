import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../locales/en.json'; import hi from '../locales/hi.json'; import te from '../locales/te.json';
import kn from '../locales/kn.json'; import ta from '../locales/ta.json'; import ml from '../locales/ml.json';
import mr from '../locales/mr.json'; import bn from '../locales/bn.json'; import gu from '../locales/gu.json';

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' }, { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' }, { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' }, { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' }, { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
 ] as const;
type LanguageCode = (typeof LANGUAGES)[number]['code'];
const dict: Record<LanguageCode, Record<string, string>> = { en, hi, te, kn, ta, ml, mr, bn, gu };

type Ctx = { lang: LanguageCode; setLang: (code: LanguageCode) => void; t: (key: string) => string };
const LangCtx = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<LanguageCode>('en');
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem('lang').then(value => {
      if (active && value && value in dict) setLangState(value as LanguageCode);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  const setLang = (code: LanguageCode) => {
    setLangState(code);
    void AsyncStorage.setItem('lang', code).catch(() => undefined);
  };
  const t = (key: string) => dict[lang][key] ?? dict.en[key] ?? key;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
};
export const useLanguage = () => {
  const context = useContext(LangCtx);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
