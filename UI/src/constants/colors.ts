// Palette: Emerald + Teal + Indigo (+ Violet, Coral, Amber)
export const palette = {
  light: { emerald: '#16A34A', teal: '#0D9488', indigo: '#4F46E5', violet: '#8B5CF6', coral: '#F97316', amber: '#EAB308' },
  dark:  { emerald: '#4ADE80', teal: '#2DD4BF', indigo: '#818CF8', violet: '#A78BFA', coral: '#FB923C', amber: '#FACC15' },
};

export const surfaces = {
  light: { bg: '#F8FAFC', card: '#FFFFFF', cardAlt: '#F1F5F9', border: '#E2E8F0', text: '#0F172A', muted: '#64748B', onAccent: '#FFFFFF' },
  dark:  { bg: '#121816', card: '#1A211F', cardAlt: '#222A28', border: '#2B3633', text: '#F1F5F9', muted: '#94A3B8', onAccent: '#052E16' },
};

export const alpha = (hex: string, a: number) =>
  hex + Math.round(a * 255).toString(16).padStart(2, '0');
