import { localStorage } from './localStorage';
import { ChatMessage } from '../types/chat';
const KEY = 'chat_cache';
export const chatCache = {
  load: async () => (await localStorage.get<ChatMessage[]>(KEY)) ?? [],
  save: (msgs: ChatMessage[]) => localStorage.set(KEY, msgs.slice(-100)),
  clear: () => localStorage.remove(KEY),
};
