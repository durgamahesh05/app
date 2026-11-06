export const ENDPOINTS = {
  auth: { register: '/api/auth/register', login: '/api/auth/login', verifyOtp: '/api/auth/verify-otp', forgot: '/api/auth/forgot-password', reset: '/api/auth/reset-password' },
  users: { profile: '/api/users/profile', update: '/api/users/update' },
  expenses: { create: '/api/expenses/create', list: '/api/expenses/list', remove: '/api/expenses/delete' },
  groups: { create: '/api/groups/create', join: '/api/groups/join', members: '/api/groups/members', list: '/api/groups/list' },
  settlements: { create: '/api/settlements/create', history: '/api/settlements/history' },
  receipt: { upload: '/api/receipt/upload', extract: '/api/receipt/extract' },
  ai: { chat: '/api/ai/chat', history: '/api/ai/history' },
  insights: { summary: '/api/insights/summary', analytics: '/api/insights/analytics' },
  notifications: { list: '/api/notifications/list' },
};
