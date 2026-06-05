'use client';

import { Expense } from '@/types';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';

interface BudgetBreakdownProps {
  expenses: Expense[];
  totalIncome: number;
  currency: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Housing: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Food: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  Transport: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1M13 16H3m10 0l2 1m-2-1V7a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
    </svg>
  ),
  Utilities: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Entertainment: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Health: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Subscriptions: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Debt: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  ),
};

const CATEGORY_COLORS: Record<string, string> = {
  Housing: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  Food: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  Transport: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  Utilities: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  Entertainment: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  Health: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  Subscriptions: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  Debt: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
};

const BAR_COLORS: Record<string, 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue' | 'purple'> = {
  Housing: 'blue',
  Food: 'emerald',
  Transport: 'amber',
  Utilities: 'amber',
  Entertainment: 'purple',
  Health: 'rose',
  Subscriptions: 'indigo',
  Debt: 'rose',
};

export default function BudgetBreakdown({ expenses, totalIncome, currency }: BudgetBreakdownProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Card title="Expense Breakdown">
      {expenses.length === 0 ? (
        <div className="text-center py-8 text-gray-400 dark:text-gray-600">
          <p className="text-sm">No expenses added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => {
            const pctOfIncome = totalIncome > 0 ? (expense.amount / totalIncome) * 100 : 0;
            const pctOfExpenses = totalExpenses > 0 ? (expense.amount / totalExpenses) * 100 : 0;
            const iconClass = CATEGORY_COLORS[expense.category] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
            const barColor = BAR_COLORS[expense.category] || 'indigo';
            const icon = CATEGORY_ICONS[expense.category];

            return (
              <div key={expense.id} className="group">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconClass}`}>
                    {icon || (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {expense.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{expense.category}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(expense.amount)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {pctOfIncome.toFixed(1)}% of income
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ProgressBar value={pctOfExpenses} color={barColor} size="sm" className="ml-11" />
              </div>
            );
          })}

          {/* Total row */}
          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Expenses</span>
            <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
