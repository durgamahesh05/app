import { palette, surfaces } from '../constants/colors';

export const buildTheme = (mode: 'light' | 'dark') => {
  const p = palette[mode];
  const s = surfaces[mode];
  return {
    mode,
    ...s,
    primary: p.emerald,    // primary actions, payments
    share: p.teal,         // sharing, groups
    nav: p.indigo,         // navigation, links, active tab
    ai: p.violet,          // AI features, highlights
    alert: p.coral,        // pending expenses, alerts, recording
    reminder: p.amber,     // reminders, notifications
    radius: { sm: 10, md: 16, lg: 24, pill: 999 },
  };
};
export type Theme = ReturnType<typeof buildTheme>;
