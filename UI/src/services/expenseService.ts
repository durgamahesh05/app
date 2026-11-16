import { api } from './api';
import { ENDPOINTS as E } from '../constants/endpoints';
import { Expense } from '../types/expense';
export const expenseService = {
  create: (e: { description: string; amount: number; groupId?: string; participants?: string[]; category?: string }) => api<Expense>(E.expenses.create, { body: e }),
  list: () => api<Expense[]>(E.expenses.list),
  remove: (id: string) => api(E.expenses.remove, { method: 'DELETE', body: { id } }),
  updateSplit: (id: string, participants: string[]) => api<Expense>(E.expenses.split, { body: { id, participants } }),
  activity: () => api<import('../types/expense').ActivityItem[]>(E.settlements.history),
  insights: () => api<{ total: number; categories: { name: string; amount: number; percentage: number }[]; period: string; expenseCount: number }>(E.insights.summary),
};
