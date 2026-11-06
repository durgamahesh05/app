import { useCallback, useEffect, useState } from 'react';
import { expenseService } from '../services/expenseService';
import { Expense } from '../types/expense';
export function useExpenses() {
  const [items, setItems] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const refresh = useCallback(async () => {
    setLoading(true);
    try { setItems(await expenseService.list()); } catch {} finally { setLoading(false); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { items, loading, refresh };
}
