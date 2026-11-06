export interface ExpenseSplit { userId: string; amount: number }
export interface Expense { id: string; description: string; amount: number; paidBy: string; groupId?: string; splits: ExpenseSplit[]; createdAt: string }
export interface ActivityItem { id: string; kind: 'paid' | 'received' | 'group' | 'member' | 'owed' | 'setting'; text: string; amount?: number; direction?: 'out' | 'in' | 'get'; time: string }
