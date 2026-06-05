'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useFinancialData } from '@/hooks/useFinancialData';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { exportToPDF, exportToCSV } from '@/lib/export';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { userData, summary, updateCurrency, clearAllData } = useFinancialData();
  const [showClearModal, setShowClearModal] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [savedCurrency, setSavedCurrency] = useState(false);

  const handleCurrencyChange = (code: string) => {
    updateCurrency(code);
    setSavedCurrency(true);
    setTimeout(() => setSavedCurrency(false), 2000);
  };

  const handleExportPDF = async () => {
    setPdfLoading(true);
    try {
      await exportToPDF(userData, summary);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your preferences and data
        </p>
      </div>

      <div className="space-y-6">
        {/* Currency */}
        <Card title="Currency">
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select the currency for displaying monetary values throughout the app.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency.code)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    userData.currency === currency.code
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/40'
                  }`}
                >
                  <span className="font-bold text-base">{currency.symbol}</span>
                  <div className="text-left">
                    <div className="text-xs font-semibold">{currency.code}</div>
                    <div className="text-xs opacity-70">{currency.name.split(' ')[0]}</div>
                  </div>
                  {userData.currency === currency.code && (
                    <svg className="w-4 h-4 ml-auto text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            {savedCurrency && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Currency updated!
              </p>
            )}
          </div>
        </Card>

        {/* Appearance */}
        <Card title="Appearance">
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Choose your preferred color scheme.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light', icon: '☀️' },
                { value: 'dark', label: 'Dark', icon: '🌙' },
                { value: 'system', label: 'System', icon: '💻' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    theme === option.value
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/40'
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Export Data */}
        <Card title="Export Data">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Download your financial data and reports in multiple formats.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => exportToCSV(userData, summary)}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export as CSV
            </Button>
            <Button
              variant="secondary"
              loading={pdfLoading}
              onClick={handleExportPDF}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Export as PDF
            </Button>
          </div>
        </Card>

        {/* Data Management */}
        <Card title="Data Management">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/30 rounded-xl">
              <div>
                <h4 className="text-sm font-semibold text-rose-800 dark:text-rose-300">
                  Clear All Data
                </h4>
                <p className="text-xs text-rose-700 dark:text-rose-400 mt-1">
                  Permanently delete all your financial data from this browser. This cannot be undone.
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowClearModal(true)}
                className="flex-shrink-0"
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card title="About">
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span>Version</span>
              <span className="font-medium text-gray-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Storage</span>
              <span className="font-medium text-gray-900 dark:text-white">Browser LocalStorage</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Privacy</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                100% Local
              </span>
            </div>
            <p className="pt-2 text-xs">
              Your financial data never leaves your device. No accounts, no server-side storage, no tracking.
            </p>
          </div>
        </Card>
      </div>

      {/* Clear All Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear All Data?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This will permanently delete all your income, expenses, savings goals, and debts from this browser. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowClearModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                clearAllData();
                setShowClearModal(false);
              }}
              className="flex-1"
            >
              Yes, Clear All
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
