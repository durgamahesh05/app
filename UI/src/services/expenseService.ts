import { api } from './api';
import { ENDPOINTS as E } from '../constants/endpoints';
import { Expense } from '../types/expense';
export const expenseService = {
  create: (e: { description: string; amount: number; groupId?: string; participants?: string[] }) => api<Expense>(E.expenses.create, { body: e }),
  list: () => api<Expense[]>(E.expenses.list),
  remove: (id: string) => api(E.expenses.remove, { method: 'DELETE', body: { id } }),
  activity: () => api(E.settlements.history),
};
