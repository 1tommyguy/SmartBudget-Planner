'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { UserData, IncomeSource, Expense, SavingsGoal, Debt, FinancialSummary } from '@/types';
import { demoData } from '@/lib/demo-data';
import { computeFinancialSummary, getFinancialTips } from '@/lib/calculations';

const STORAGE_KEY = 'smartbudget-data';

export function useFinancialData() {
  const [userData, setUserData] = useLocalStorage<UserData>(STORAGE_KEY, demoData);

  const summary: FinancialSummary = useMemo(
    () => computeFinancialSummary(userData.incomes, userData.expenses),
    [userData.incomes, userData.expenses]
  );

  const tips = useMemo(() => getFinancialTips(summary), [summary]);

  const updateIncomes = useCallback(
    (incomes: IncomeSource[]) => {
      setUserData((prev) => ({ ...prev, incomes, updatedAt: new Date().toISOString() }));
    },
    [setUserData]
  );

  const updateExpenses = useCallback(
    (expenses: Expense[]) => {
      setUserData((prev) => ({ ...prev, expenses, updatedAt: new Date().toISOString() }));
    },
    [setUserData]
  );

  const updateSavingsGoals = useCallback(
    (savingsGoals: SavingsGoal[]) => {
      setUserData((prev) => ({ ...prev, savingsGoals, updatedAt: new Date().toISOString() }));
    },
    [setUserData]
  );

  const updateDebts = useCallback(
    (debts: Debt[]) => {
      setUserData((prev) => ({ ...prev, debts, updatedAt: new Date().toISOString() }));
    },
    [setUserData]
  );

  const updateCurrency = useCallback(
    (currency: string) => {
      setUserData((prev) => ({ ...prev, currency, updatedAt: new Date().toISOString() }));
    },
    [setUserData]
  );

  const resetToDemo = useCallback(() => {
    setUserData({
      ...demoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, [setUserData]);

  const clearAllData = useCallback(() => {
    setUserData({
      incomes: [],
      expenses: [],
      savingsGoals: [],
      debts: [],
      currency: 'USD',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, [setUserData]);

  return {
    userData,
    summary,
    tips,
    updateIncomes,
    updateExpenses,
    updateSavingsGoals,
    updateDebts,
    updateCurrency,
    resetToDemo,
    clearAllData,
  };
}
