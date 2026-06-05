'use client';

import { useState } from 'react';
import { IncomeSource } from '@/types';
import Card from '@/components/ui/Card';

interface IncomeFormProps {
  incomes: IncomeSource[];
  currency: string;
  onUpdate: (incomes: IncomeSource[]) => void;
}

interface IncomeType {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  activeBorder: string;
  activeBg: string;
}

const INCOME_TYPES: IncomeType[] = [
  {
    id: 'salary',
    label: 'Monthly Salary',
    desc: 'Regular employment pay',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/40',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    activeBorder: 'border-indigo-400 dark:border-indigo-500',
    activeBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'business',
    label: 'Business Income',
    desc: 'Self-employed / business revenue',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    activeBorder: 'border-emerald-400 dark:border-emerald-500',
    activeBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'freelance',
    label: 'Freelance / Contract',
    desc: 'Project or contract work',
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
    activeBorder: 'border-violet-400 dark:border-violet-500',
    activeBg: 'bg-violet-50 dark:bg-violet-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'rental',
    label: 'Rental Income',
    desc: 'Property rent received',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    activeBorder: 'border-blue-400 dark:border-blue-500',
    activeBg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'investments',
    label: 'Investments',
    desc: 'Dividends, stocks & funds',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    activeBorder: 'border-amber-400 dark:border-amber-500',
    activeBg: 'bg-amber-50 dark:bg-amber-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'side-hustle',
    label: 'Side Hustle',
    desc: 'Extra income activities',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    iconColor: 'text-orange-600 dark:text-orange-400',
    activeBorder: 'border-orange-400 dark:border-orange-500',
    activeBg: 'bg-orange-50 dark:bg-orange-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'pension',
    label: 'Pension / Retirement',
    desc: 'Retirement fund payments',
    iconBg: 'bg-teal-100 dark:bg-teal-900/40',
    iconColor: 'text-teal-600 dark:text-teal-400',
    activeBorder: 'border-teal-400 dark:border-teal-500',
    activeBg: 'bg-teal-50 dark:bg-teal-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'benefits',
    label: 'Gov. Benefits',
    desc: 'Social security, welfare',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/40',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    activeBorder: 'border-cyan-400 dark:border-cyan-500',
    activeBg: 'bg-cyan-50 dark:bg-cyan-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: 'child-support',
    label: 'Child Support',
    desc: 'Alimony or child support',
    iconBg: 'bg-pink-100 dark:bg-pink-900/40',
    iconColor: 'text-pink-600 dark:text-pink-400',
    activeBorder: 'border-pink-400 dark:border-pink-500',
    activeBg: 'bg-pink-50 dark:bg-pink-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'scholarship',
    label: 'Scholarship / Grant',
    desc: 'Educational grants & bursaries',
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
    activeBorder: 'border-rose-400 dark:border-rose-500',
    activeBg: 'bg-rose-50 dark:bg-rose-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 'gifts',
    label: 'Gift / Inheritance',
    desc: 'Regular or one-time gifts',
    iconBg: 'bg-lime-100 dark:bg-lime-900/40',
    iconColor: 'text-lime-600 dark:text-lime-400',
    activeBorder: 'border-lime-400 dark:border-lime-500',
    activeBg: 'bg-lime-50 dark:bg-lime-900/20',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Other Income',
    desc: 'Any additional source',
    iconBg: 'bg-gray-100 dark:bg-gray-700/60',
    iconColor: 'text-gray-600 dark:text-gray-400',
    activeBorder: 'border-gray-400 dark:border-gray-500',
    activeBg: 'bg-gray-50 dark:bg-gray-800/40',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
];

export default function IncomeForm({ incomes, currency, onUpdate }: IncomeFormProps) {
  // Track draft amounts as strings per type id before they're committed
  const [draftAmounts, setDraftAmounts] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    incomes.forEach((inc) => {
      map[inc.id] = String(inc.amount);
    });
    return map;
  });

  const currencySymbol = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 })
    .format(0)
    .replace(/\d/g, '')
    .replace(/\s/g, '')
    .trim()
    .charAt(0) || '$';

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

  const isSelected = (typeId: string) => incomes.some((i) => i.id === typeId);

  const getAmount = (typeId: string) =>
    draftAmounts[typeId] ?? String(incomes.find((i) => i.id === typeId)?.amount ?? '');

  const toggleType = (type: IncomeType) => {
    if (isSelected(type.id)) {
      // Deselect: remove from incomes
      onUpdate(incomes.filter((i) => i.id !== type.id));
      setDraftAmounts((prev) => {
        const next = { ...prev };
        delete next[type.id];
        return next;
      });
    } else {
      // Select: add with 0 amount (user will fill in)
      onUpdate([...incomes, { id: type.id, name: type.label, amount: 0 }]);
      setDraftAmounts((prev) => ({ ...prev, [type.id]: '' }));
    }
  };

  const handleAmountChange = (typeId: string, typeName: string, value: string) => {
    setDraftAmounts((prev) => ({ ...prev, [typeId]: value }));
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      onUpdate(
        incomes.map((i) => (i.id === typeId ? { ...i, amount: num } : i))
      );
    }
  };

  const selectedTypes = INCOME_TYPES.filter((t) => isSelected(t.id));
  const total = incomes.reduce((sum, i) => sum + i.amount, 0);

  return (
    <Card>
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Income Sources</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Select all income types that apply to you, then enter the monthly amount.
        </p>
      </div>

      {/* Income Type Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
        {INCOME_TYPES.map((type) => {
          const selected = isSelected(type.id);
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type)}
              className={`relative text-left rounded-xl border-2 p-3 transition-all duration-150 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                selected
                  ? `${type.activeBorder} ${type.activeBg}`
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/30'
              }`}
            >
              {/* Checkmark */}
              {selected && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              {/* Icon */}
              <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-2 ${type.iconBg} ${type.iconColor}`}>
                {type.icon}
              </span>
              {/* Text */}
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 leading-tight">{type.label}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-tight">{type.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Selected sources — amount inputs */}
      {selectedTypes.length > 0 && (
        <div className="space-y-2.5 mb-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Monthly Amounts
          </p>
          {selectedTypes.map((type) => (
            <div
              key={type.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            >
              <span className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg ${type.iconBg} ${type.iconColor}`}>
                {type.icon}
              </span>
              <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200 min-w-0 truncate">
                {type.label}
              </span>
              <div className="relative flex-shrink-0 w-32">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 pointer-events-none select-none">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={getAmount(type.id)}
                  onChange={(e) => handleAmountChange(type.id, type.label, e.target.value)}
                  className="w-full pl-6 pr-3 py-2 text-sm font-semibold text-right text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {selectedTypes.length === 0 && (
        <div className="text-center py-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 mb-4">
          <svg className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-400 dark:text-gray-500">Select income types above to get started</p>
        </div>
      )}

      {/* Total */}
      {total > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Monthly Income</span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(total)}</span>
        </div>
      )}
    </Card>
  );
}
