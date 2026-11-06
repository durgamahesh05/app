import { api } from './api';
import { ENDPOINTS as E } from '../constants/endpoints';
import { User } from '../types/user';
export const authService = {
  login: (email: string, password: string) => api<{ token: string; user: User }>(E.auth.login, { body: { email, password } }),
  updateProfile: (name: string) => api<User>(E.users.update, { body: { name } }),
  register: (name: string, email: string, password: string) => api(E.auth.register, { body: { name, email, password } }),
  verifyOtp: (email: string, otp: string) => api(E.auth.verifyOtp, { body: { email, otp } }),
  forgot: (email: string) => api(E.auth.forgot, { body: { email } }),
  reset: (email: string, otp: string, password: string) => api(E.auth.reset, { body: { email, otp, password } }),
  me: () => api<User>(E.users.profile),
};
