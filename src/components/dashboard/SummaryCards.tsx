'use client';

import { FinancialSummary } from '@/types';

interface SummaryCardsProps {
  summary: FinancialSummary;
  currency: string;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
  iconBg: string;
  trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, subtitle, icon, gradient, textColor, iconBg, trend }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${gradient} shadow-lg`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor} opacity-80`}>{title}</p>
          <p className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</p>
          <p className={`text-xs mt-1.5 ${textColor} opacity-70`}>{subtitle}</p>
        </div>
        <div className={`${iconBg} rounded-xl p-2.5`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${textColor} opacity-80`}>
          {trend === 'up' && (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          <span>This month</span>
        </div>
      )}
      {/* Decorative circle */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${iconBg} opacity-20`} />
    </div>
  );
}

export default function SummaryCards({ summary, currency }: SummaryCardsProps) {
  const isPositiveBalance = summary.remainingBalance >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Monthly Income"
        value={formatCurrency(summary.totalIncome, currency)}
        subtitle="Total earnings this month"
        trend="up"
        gradient="bg-gradient-to-br from-emerald-500 to-green-600"
        textColor="text-white"
        iconBg="bg-white/20"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      <StatCard
        title="Monthly Expenses"
        value={formatCurrency(summary.totalExpenses, currency)}
        subtitle={`${(summary.expenseRatio * 100).toFixed(1)}% of income`}
        trend="down"
        gradient="bg-gradient-to-br from-rose-500 to-red-600"
        textColor="text-white"
        iconBg="bg-white/20"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        }
      />

      <StatCard
        title="Net Balance"
        value={formatCurrency(summary.remainingBalance, currency)}
        subtitle={isPositiveBalance ? 'Available to save/invest' : 'Overspending detected'}
        gradient={isPositiveBalance
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
          : 'bg-gradient-to-br from-orange-500 to-amber-600'
        }
        textColor="text-white"
        iconBg="bg-white/20"
        icon={
          isPositiveBalance ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        }
      />

      <StatCard
        title="Savings Rate"
        value={`${Math.max(0, summary.savingsRate).toFixed(1)}%`}
        subtitle={summary.savingsRate >= 20 ? 'Excellent! Above 20% target' : 'Target: 20% or more'}
        gradient="bg-gradient-to-br from-purple-500 to-violet-600"
        textColor="text-white"
        iconBg="bg-white/20"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
    </div>
  );
}
