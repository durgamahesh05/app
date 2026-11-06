import React, { createContext, useEffect, useState } from 'react';
import { tokenStorage } from '../storage/tokenStorage';
import { authService } from '../services/authService';
import { User } from '../types/user';

type Ctx = {
  user: User | null; loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
  signOut: () => Promise<void>;
};
export const AuthContext = createContext<Ctx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = await tokenStorage.get();
        if (token) setUser(await authService.me());
      } catch {
        await tokenStorage.clear().catch(() => undefined);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { token, user: u } = await authService.login(email, password);
    await tokenStorage.set(token);
    setUser(u);
  };
  const updateProfile = async (name: string) => {
    const updatedUser = await authService.updateProfile(name);
    setUser(updatedUser);
  };
  const signOut = async () => { await tokenStorage.clear(); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, signIn, updateProfile, signOut }}>{children}</AuthContext.Provider>;
};
