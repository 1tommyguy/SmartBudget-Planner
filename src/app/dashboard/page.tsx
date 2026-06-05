'use client';

import { useState } from 'react';
import { useFinancialData } from '@/hooks/useFinancialData';
import SummaryCards from '@/components/dashboard/SummaryCards';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import BudgetBreakdown from '@/components/dashboard/BudgetBreakdown';
import SavingsGoal from '@/components/dashboard/SavingsGoal';
import EmergencyFund from '@/components/dashboard/EmergencyFund';
import HealthScore from '@/components/dashboard/HealthScore';
import FinancialTips from '@/components/dashboard/FinancialTips';
import IncomeForm from '@/components/income/IncomeForm';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import BudgetRule from '@/components/calculators/BudgetRule';
import DebtPayoff from '@/components/calculators/DebtPayoff';
import Button from '@/components/ui/Button';
import { exportToPDF, exportToCSV } from '@/lib/export';

type Tab = 'overview' | 'calculators' | 'goals' | 'tips';

export default function DashboardPage() {
  const {
    userData,
    summary,
    tips,
    updateIncomes,
    updateExpenses,
    updateSavingsGoals,
  } = useFinancialData();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [pdfLoading, setPdfLoading] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: 'calculators',
      label: 'Calculators',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'goals',
      label: 'Goals',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      id: 'tips',
      label: 'Tips',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  const handleExportPDF = async () => {
    setPdfLoading(true);
    try {
      await exportToPDF(userData, summary);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last updated: {new Date(userData.updatedAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportToCSV(userData, summary)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            CSV
          </Button>
          <Button
            variant="secondary"
            size="sm"
            loading={pdfLoading}
            onClick={handleExportPDF}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8">
        <SummaryCards summary={summary} currency={userData.currency} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Income + Expense Forms */}
        <div className="xl:col-span-1 space-y-6">
          <IncomeForm
            incomes={userData.incomes}
            currency={userData.currency}
            onUpdate={updateIncomes}
          />
          <ExpenseForm
            expenses={userData.expenses}
            currency={userData.currency}
            onUpdate={updateExpenses}
          />
        </div>

        {/* Right Column: Tabs */}
        <div className="xl:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-1 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HealthScore summary={summary} />
                <ExpenseChart
                  expenses={userData.expenses}
                  summary={summary}
                  currency={userData.currency}
                />
              </div>
              <BudgetBreakdown
                expenses={userData.expenses}
                totalIncome={summary.totalIncome}
                currency={userData.currency}
              />
              <EmergencyFund
                summary={summary}
                currency={userData.currency}
                monthlySavings={Math.max(0, summary.remainingBalance)}
              />
            </div>
          )}

          {activeTab === 'calculators' && (
            <div className="space-y-6">
              <BudgetRule
                totalIncome={summary.totalIncome}
                expenses={userData.expenses}
                currency={userData.currency}
              />
              <DebtPayoff
                debts={userData.debts}
                currency={userData.currency}
              />
            </div>
          )}

          {activeTab === 'goals' && (
            <SavingsGoal
              goals={userData.savingsGoals}
              totalIncome={summary.totalIncome}
              totalExpenses={summary.totalExpenses}
              currency={userData.currency}
              onUpdate={updateSavingsGoals}
            />
          )}

          {activeTab === 'tips' && (
            <FinancialTips tips={tips} />
          )}
        </div>
      </div>
    </div>
  );
}
