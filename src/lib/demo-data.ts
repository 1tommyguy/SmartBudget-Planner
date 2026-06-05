import { UserData } from '@/types';

export const demoData: UserData = {
  incomes: [],
  expenses: [],
  savingsGoals: [],
  debts: [],
  currency: 'USD',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
