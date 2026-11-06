import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../types/chat';
import { chatCache } from '../storage/chatCache';
import { chatService } from '../services/chatService';

const WELCOME: ChatMessage = { id: 'w', role: 'ai', text: 'Hi! I can help with balances, expenses, receipts, and fair splits.', createdAt: 0 };

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const pending = useRef(0);
  const sequence = useRef(0);

  useEffect(() => {
    let active = true;
    chatCache.load().then(cached => {
      if (active && cached.length) setMessages(cached);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const send = async (text: string) => {
    const now = Date.now();
    const mine: ChatMessage = {
      id: `${now}-${sequence.current++}`,
      role: 'user',
      text,
      createdAt: now,
    };
    setMessages(current => {
      const next = [...current, mine].slice(-100);
      void chatCache.save(next).catch(() => undefined);
      return next;
    });
    pending.current += 1;
    setTyping(true);

    try {
      const { reply } = await chatService.send(text);
      setMessages(current => {
        const next = [...current, {
          id: `${Date.now()}-${sequence.current++}`,
          role: 'ai' as const,
          text: reply,
          createdAt: Date.now(),
        }].slice(-100);
        void chatCache.save(next).catch(() => undefined);
        return next;
      });
    } catch {
      setMessages(current => {
        const next = [...current, {
          id: `${Date.now()}-${sequence.current++}`,
          role: 'ai' as const,
          text: 'Sorry, I could not reach the server.',
          createdAt: Date.now(),
        }].slice(-100);
        void chatCache.save(next).catch(() => undefined);
        return next;
      });
    } finally {
      pending.current -= 1;
      setTyping(pending.current > 0);
    }
  };
  return { messages, typing, send };
}
