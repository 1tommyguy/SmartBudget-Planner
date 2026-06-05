'use client';

import { useState } from 'react';
import { Debt } from '@/types';
import Card from '@/components/ui/Card';
import { calculateDebtPayoff } from '@/lib/calculations';

interface DebtPayoffProps {
  debts: Debt[];
  currency: string;
}

export default function DebtPayoff({ debts, currency }: DebtPayoffProps) {
  const [extraPayments, setExtraPayments] = useState<Record<string, number>>({});

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  if (debts.length === 0) {
    return (
      <Card title="Debt Payoff Estimator">
        <div className="text-center py-8 text-gray-400 dark:text-gray-600">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
          <p className="text-sm font-medium">No debts tracked</p>
          <p className="text-xs mt-1">Add debts in the settings to see payoff estimates</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Debt Payoff Estimator">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        See how much faster you can pay off debts by adding extra monthly payments.
      </p>
      <div className="space-y-6">
        {debts.map((debt) => {
          const extra = extraPayments[debt.id] || 0;
          const minResult = calculateDebtPayoff(debt, 0);
          const extraResult = calculateDebtPayoff(debt, extra);
          const savedMonths = minResult.months - extraResult.months;
          const savedInterest = minResult.totalInterest - extraResult.totalInterest;

          return (
            <div
              key={debt.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{debt.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {formatCurrency(debt.balance)} @ {debt.interestRate}% APR
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Min. payment</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(debt.minimumPayment)}/mo
                  </p>
                </div>
              </div>

              {/* Extra payment slider */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Extra Monthly Payment
                  </label>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    +{formatCurrency(extra)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(500, debt.balance * 0.1)}
                  step="25"
                  value={extra}
                  onChange={(e) =>
                    setExtraPayments((prev) => ({ ...prev, [debt.id]: Number(e.target.value) }))
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0</span>
                  <span>${Math.max(500, debt.balance * 0.1).toFixed(0)}</span>
                </div>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">With Min. Payment</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {minResult.months} months
                  </p>
                  <p className="text-xs text-rose-500 mt-0.5">
                    {formatCurrency(minResult.totalInterest)} interest
                  </p>
                </div>
                <div className={`rounded-xl p-3 text-center ${
                  extra > 0
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30'
                    : 'bg-gray-50 dark:bg-gray-700/40'
                }`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">With Extra Payment</p>
                  <p className={`text-base font-bold ${
                    extra > 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-900 dark:text-white'
                  }`}>
                    {extraResult.months} months
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formatCurrency(extraResult.totalInterest)} interest
                  </p>
                </div>
              </div>

              {extra > 0 && (
                <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                      Save {savedMonths} months and {formatCurrency(savedInterest)} in interest!
                      {extraResult.payoffDate && (
                        <> Pay off by {new Date(extraResult.payoffDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}.</>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
