import { UserData } from '@/types';

const oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

export const demoData: UserData = {
  incomes: [
    { id: 'inc-1', name: 'Monthly Salary', amount: 5000 },
    { id: 'inc-2', name: 'Freelance Income', amount: 500 },
  ],
  expenses: [
    { id: 'exp-1', category: 'Housing', name: 'Rent', amount: 1500, isCustom: false },
    { id: 'exp-2', category: 'Food', name: 'Groceries & Dining', amount: 400, isCustom: false },
    { id: 'exp-3', category: 'Transport', name: 'Car & Gas', amount: 200, isCustom: false },
    { id: 'exp-4', category: 'Utilities', name: 'Electric, Water, Internet', amount: 150, isCustom: false },
    { id: 'exp-5', category: 'Entertainment', name: 'Entertainment', amount: 100, isCustom: false },
    { id: 'exp-6', category: 'Subscriptions', name: 'Netflix & Streaming', amount: 15, isCustom: true },
    { id: 'exp-7', category: 'Health', name: 'Gym Membership', amount: 50, isCustom: true },
    { id: 'exp-8', category: 'Debt', name: 'Car Loan Payment', amount: 300, isCustom: false },
  ],
  savingsGoals: [
    {
      id: 'goal-1',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 2500,
      targetDate: oneYearFromNow.toISOString().split('T')[0],
    },
  ],
  debts: [
    {
      id: 'debt-1',
      name: 'Car Loan',
      balance: 8000,
      interestRate: 5.9,
      minimumPayment: 250,
    },
  ],
  currency: 'USD',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
