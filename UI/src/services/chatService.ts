import { api } from './api';
import { ENDPOINTS as E } from '../constants/endpoints';
export const chatService = {
  send: (message: string) => api<{ reply: string }>(E.ai.chat, { body: { message } }),
  history: () => api(E.ai.history),
};
