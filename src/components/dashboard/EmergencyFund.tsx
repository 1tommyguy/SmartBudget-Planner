'use client';

import { FinancialSummary } from '@/types';
import Card from '@/components/ui/Card';

interface EmergencyFundProps {
  summary: FinancialSummary;
  currency: string;
  monthlySavings: number;
}

interface FundCardProps {
  months: number;
  amount: number;
  currency: string;
  monthlySavings: number;
  isFunded: boolean;
}

function FundCard({ months, amount, currency, monthlySavings, isFunded }: FundCardProps) {
  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  const monthsToSave = monthlySavings > 0 ? Math.ceil(amount / monthlySavings) : null;

  return (
    <div className={`rounded-xl p-4 border ${
      isFunded
        ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-900/20'
        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/30'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {months}-Month Fund
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isFunded
            ? 'bg-emerald-100 dark:bg-emerald-800/40'
            : 'bg-gray-200 dark:bg-gray-600'
        }`}>
          {isFunded ? (
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>
      </div>

      <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
        isFunded
          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30'
          : 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30'
      }`}>
        {isFunded ? 'Funded' : 'Not Funded'}
      </div>

      {!isFunded && monthsToSave !== null && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          ~{monthsToSave} months to save at current rate
        </p>
      )}
      {!isFunded && monthlySavings <= 0 && (
        <p className="text-xs text-rose-500 dark:text-rose-400 mt-2">
          Increase savings to build this fund
        </p>
      )}
    </div>
  );
}

export default function EmergencyFund({ summary, currency, monthlySavings }: EmergencyFundProps) {
  // Estimate funded status based on whether monthlySavings covers 3/6/12 months
  const estimatedSaved = monthlySavings * 3; // rough estimate using last 3 months of savings

  return (
    <Card title="Emergency Fund Targets">
      <div className="mb-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
        <div className="flex gap-2">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Financial experts recommend saving 3–6 months of expenses as an emergency fund before investing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <FundCard
          months={3}
          amount={summary.emergencyFund3}
          currency={currency}
          monthlySavings={monthlySavings}
          isFunded={estimatedSaved >= summary.emergencyFund3}
        />
        <FundCard
          months={6}
          amount={summary.emergencyFund6}
          currency={currency}
          monthlySavings={monthlySavings}
          isFunded={estimatedSaved >= summary.emergencyFund6}
        />
        <FundCard
          months={12}
          amount={summary.emergencyFund12}
          currency={currency}
          monthlySavings={monthlySavings}
          isFunded={estimatedSaved >= summary.emergencyFund12}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Monthly expenses to cover:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(
              summary.totalExpenses
            )}
            /month
          </span>
        </div>
        {monthlySavings > 0 && (
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-600 dark:text-gray-400">Current monthly savings:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(
                monthlySavings
              )}
              /month
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
