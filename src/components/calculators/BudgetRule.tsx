'use client';

import { Expense } from '@/types';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import { calculate503020 } from '@/lib/calculations';

interface BudgetRuleProps {
  totalIncome: number;
  expenses: Expense[];
  currency: string;
}

const NEEDS_CATEGORIES = ['Housing', 'Food', 'Transport', 'Utilities', 'Health', 'Debt'];
const WANTS_CATEGORIES = ['Entertainment', 'Subscriptions', 'Other'];

export default function BudgetRule({ totalIncome, expenses, currency }: BudgetRuleProps) {
  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  const { needs: recNeeds, wants: recWants, savings: recSavings } = calculate503020(totalIncome);

  const actualNeeds = expenses
    .filter((e) => NEEDS_CATEGORIES.includes(e.category))
    .reduce((sum, e) => sum + e.amount, 0);

  const actualWants = expenses
    .filter((e) => WANTS_CATEGORIES.includes(e.category))
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const actualSavings = Math.max(0, totalIncome - totalExpenses);

  const sections = [
    {
      label: '50% Needs',
      description: 'Rent, food, transport, utilities, loans',
      recommended: recNeeds,
      actual: actualNeeds,
      color: 'blue' as const,
      progressColor: 'blue' as const,
      badgeColor: actualNeeds <= recNeeds ? 'green' as const : 'red' as const,
    },
    {
      label: '30% Wants',
      description: 'Entertainment, subscriptions, dining out',
      recommended: recWants,
      actual: actualWants,
      color: 'purple' as const,
      progressColor: 'purple' as const,
      badgeColor: actualWants <= recWants ? 'green' as const : 'red' as const,
    },
    {
      label: '20% Savings',
      description: 'Emergency fund, investments, debt payoff',
      recommended: recSavings,
      actual: actualSavings,
      color: 'emerald' as const,
      progressColor: 'emerald' as const,
      badgeColor: actualSavings >= recSavings ? 'green' as const : 'yellow' as const,
    },
  ];

  return (
    <Card title="50/30/20 Budget Rule">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Allocate 50% of income to needs, 30% to wants, and 20% to savings and investments.
      </p>

      {totalIncome === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">Add income to see the budget breakdown.</p>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => {
            const pct = totalIncome > 0 ? (section.actual / totalIncome) * 100 : 0;
            const recPct = totalIncome > 0 ? (section.recommended / totalIncome) * 100 : 0;
            const isOver = section.label !== '20% Savings'
              ? section.actual > section.recommended
              : section.actual < section.recommended;
            const diff = Math.abs(section.actual - section.recommended);

            return (
              <div key={section.label}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {section.label}
                      </h4>
                      <Badge color={section.badgeColor}>
                        {section.label !== '20% Savings'
                          ? section.actual <= section.recommended ? 'On Track' : 'Over Budget'
                          : section.actual >= section.recommended ? 'On Track' : 'Under Target'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(section.actual)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      of {formatCurrency(section.recommended)}
                    </p>
                  </div>
                </div>

                {/* Dual progress bars */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-14">Actual</span>
                    <div className="flex-1">
                      <ProgressBar
                        value={Math.min(pct, 100)}
                        color={section.progressColor}
                        size="md"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-10 text-right">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-14">Target</span>
                    <div className="flex-1">
                      <ProgressBar
                        value={recPct}
                        size="sm"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-10 text-right">
                      {recPct.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {isOver && diff > 0 && (
                  <p className={`text-xs mt-1.5 font-medium ${
                    section.label !== '20% Savings'
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {section.label !== '20% Savings'
                      ? `${formatCurrency(diff)} over budget`
                      : `${formatCurrency(diff)} below savings target`}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
