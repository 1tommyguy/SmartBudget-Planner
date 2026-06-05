'use client';

import { useState, useEffect, useRef } from 'react';
import { Expense } from '@/types';
import Card from '@/components/ui/Card';

interface ExpenseFormProps {
  expenses: Expense[];
  currency: string;
  onUpdate: (expenses: Expense[]) => void;
}

const QUESTIONS = [
  {
    id: 'housing', cat: 'Housing', name: 'Housing',
    q: 'How much do you pay for housing each month?',
    hint: 'Rent, mortgage, or accommodation costs',
    emoji: '🏠',
    color: 'blue',
  },
  {
    id: 'food', cat: 'Food', name: 'Food & Groceries',
    q: 'How much do you spend on food and groceries?',
    hint: 'Groceries, dining out, meal delivery',
    emoji: '🍽️',
    color: 'emerald',
  },
  {
    id: 'transport', cat: 'Transport', name: 'Transport',
    q: 'What are your monthly transport costs?',
    hint: 'Car payment, fuel, bus, taxi, ride-hailing',
    emoji: '🚗',
    color: 'amber',
  },
  {
    id: 'utilities', cat: 'Utilities', name: 'Utilities',
    q: 'How much are your monthly utility bills?',
    hint: 'Electricity, water, internet, gas',
    emoji: '⚡',
    color: 'yellow',
  },
  {
    id: 'entertainment', cat: 'Entertainment', name: 'Entertainment',
    q: 'What do you spend on entertainment monthly?',
    hint: 'Outings, movies, hobbies, social activities',
    emoji: '🎬',
    color: 'purple',
  },
  {
    id: 'health', cat: 'Health', name: 'Health & Wellness',
    q: 'Any monthly health or wellness expenses?',
    hint: 'Gym, medical, pharmacy, insurance',
    emoji: '❤️',
    color: 'rose',
  },
  {
    id: 'subscriptions', cat: 'Subscriptions', name: 'Subscriptions',
    q: 'Do you pay for any subscription services?',
    hint: 'Streaming, apps, software, magazines',
    emoji: '📱',
    color: 'indigo',
  },
  {
    id: 'debt', cat: 'Debt', name: 'Debt Repayments',
    q: 'Do you have any debt repayments each month?',
    hint: 'Loans, credit cards, buy-now-pay-later',
    emoji: '💳',
    color: 'orange',
  },
  {
    id: 'other', cat: 'Other', name: 'Other Expenses',
    q: 'Any other regular monthly expenses?',
    hint: 'Childcare, pet care, savings transfers, misc.',
    emoji: '📦',
    color: 'gray',
  },
] as const;

type WizardMode = 'questions' | 'ready' | 'done';

const COLOR_MAP: Record<string, { bg: string; text: string; ring: string; btn: string }> = {
  blue:    { bg: 'bg-blue-50 dark:bg-blue-900/20',    text: 'text-blue-600 dark:text-blue-400',    ring: 'ring-blue-400',    btn: 'bg-blue-600 hover:bg-blue-700' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/20',  text: 'text-amber-600 dark:text-amber-400',  ring: 'ring-amber-400',   btn: 'bg-amber-500 hover:bg-amber-600' },
  yellow:  { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400', ring: 'ring-yellow-400', btn: 'bg-yellow-500 hover:bg-yellow-600' },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', ring: 'ring-purple-400', btn: 'bg-purple-600 hover:bg-purple-700' },
  rose:    { bg: 'bg-rose-50 dark:bg-rose-900/20',    text: 'text-rose-600 dark:text-rose-400',    ring: 'ring-rose-400',    btn: 'bg-rose-600 hover:bg-rose-700' },
  indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', ring: 'ring-indigo-400', btn: 'bg-indigo-600 hover:bg-indigo-700' },
  orange:  { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', ring: 'ring-orange-400', btn: 'bg-orange-600 hover:bg-orange-700' },
  gray:    { bg: 'bg-gray-50 dark:bg-gray-800/40',    text: 'text-gray-600 dark:text-gray-400',    ring: 'ring-gray-400',    btn: 'bg-gray-600 hover:bg-gray-700' },
};

export default function ExpenseForm({ expenses, currency, onUpdate }: ExpenseFormProps) {
  const [mode, setMode] = useState<WizardMode>(expenses.length > 0 ? 'done' : 'questions');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(true);
  const [justCalculated, setJustCalculated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'questions') {
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [step, mode]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  const currencySymbol = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 })
    .format(0).replace(/[\d\s.,]/g, '').charAt(0) || '$';

  const animateTransition = (fn: () => void) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 200);
  };

  const handleNext = () => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: input };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      animateTransition(() => { setStep(step + 1); setInput(''); });
    } else {
      animateTransition(() => setMode('ready'));
    }
  };

  const handleSkip = () => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: '0' };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      animateTransition(() => { setStep(step + 1); setInput(''); });
    } else {
      animateTransition(() => setMode('ready'));
    }
  };

  const handleCalculate = () => {
    const newExpenses: Expense[] = [];
    QUESTIONS.forEach((q) => {
      const amount = parseFloat(answers[q.id] || '0');
      if (amount > 0) {
        newExpenses.push({ id: q.id, name: q.name, category: q.cat, amount, isCustom: false });
      }
    });
    onUpdate(newExpenses);
    setJustCalculated(true);
    setTimeout(() => setJustCalculated(false), 2500);
    animateTransition(() => setMode('done'));
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setInput('');
    animateTransition(() => setMode('questions'));
  };

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const readyTotal = QUESTIONS.reduce((s, q) => s + (parseFloat(answers[q.id] || '0') || 0), 0);

  // ── WIZARD: questions ──────────────────────────────────────
  if (mode === 'questions') {
    const q = QUESTIONS[step];
    const c = COLOR_MAP[q.color];
    const progress = ((step) / QUESTIONS.length) * 100;

    return (
      <Card>
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Monthly Expenses</h3>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {step + 1} / {QUESTIONS.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card — animates in/out */}
        <div
          className={`transition-all duration-[200ms] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className={`rounded-2xl p-5 mb-5 ${c.bg}`}>
            {/* Emoji */}
            <div className="text-3xl mb-3">{q.emoji}</div>
            {/* Question */}
            <p className={`text-base font-semibold mb-1 ${c.text}`}>{q.q}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{q.hint}</p>
          </div>

          {/* Amount input */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400 pointer-events-none select-none">
              {currencySymbol}
            </span>
            <input
              ref={inputRef}
              type="number"
              min="0"
              placeholder="0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              className={`w-full pl-9 pr-4 py-3.5 text-xl font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 rounded-xl transition-colors focus:outline-none ${
                input ? `border-indigo-400 ring-2 ring-indigo-100 dark:ring-indigo-900/30` : 'border-gray-200 dark:border-gray-700 focus:border-indigo-400'
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-[0.98] shadow-sm ${c.btn}`}
            >
              {step < QUESTIONS.length - 1 ? (
                <>
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Done
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
            <button
              onClick={handleSkip}
              className="px-4 py-3 rounded-xl text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Previous answers preview */}
          {step > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Answered so far</p>
              <div className="flex flex-wrap gap-2">
                {QUESTIONS.slice(0, step).map((prev) => {
                  const amt = parseFloat(answers[prev.id] || '0');
                  return (
                    <span key={prev.id} className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                      {prev.emoji} {amt > 0 ? formatCurrency(amt) : 'Skipped'}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // ── READY: all answered, show Calculate button ─────────────
  if (mode === 'ready') {
    const answeredItems = QUESTIONS.filter((q) => parseFloat(answers[q.id] || '0') > 0);

    return (
      <Card>
        <div
          className={`transition-all duration-[200ms] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Header */}
          <div className="mb-5 text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">All questions answered!</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Review your expenses, then press Calculate to update your budget.
            </p>
          </div>

          {/* Summary */}
          <div className="space-y-1.5 mb-5">
            {answeredItems.length === 0 ? (
              <p className="text-sm text-center text-gray-400 py-4">No expenses entered — all were skipped.</p>
            ) : (
              answeredItems.map((q) => {
                const amt = parseFloat(answers[q.id] || '0');
                return (
                  <div key={q.id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <span>{q.emoji}</span>
                      {q.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(amt)}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Total */}
          {readyTotal > 0 && (
            <div className="flex items-center justify-between px-3 py-3 bg-rose-50 dark:bg-rose-900/20 rounded-xl mb-5">
              <span className="text-sm font-semibold text-rose-700 dark:text-rose-300">Total Monthly Expenses</span>
              <span className="text-base font-bold text-rose-600 dark:text-rose-400">{formatCurrency(readyTotal)}</span>
            </div>
          )}

          {/* Calculate button */}
          <button
            onClick={handleCalculate}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm transition-all shadow-md shadow-indigo-200 dark:shadow-indigo-900/30"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculate Budget
          </button>

          {/* Edit answers */}
          <button
            onClick={() => animateTransition(() => { setStep(0); setInput(''); setMode('questions'); })}
            className="w-full mt-2 py-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ← Edit answers
          </button>
        </div>
      </Card>
    );
  }

  // ── DONE: show expense list ────────────────────────────────
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Monthly Expenses</h3>
          {justCalculated && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Budget updated!
            </p>
          )}
        </div>
        <button
          onClick={handleRestart}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          Edit Expenses
        </button>
      </div>

      <div className="space-y-1.5">
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-600">
            <p className="text-sm">No expenses recorded.</p>
            <button onClick={handleRestart} className="mt-2 text-xs text-indigo-500 hover:underline">
              Start setup →
            </button>
          </div>
        ) : (
          expenses.map((expense) => {
            const q = QUESTIONS.find((qu) => qu.id === expense.id);
            return (
              <div
                key={expense.id}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
              >
                <span className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-200">
                  <span className="text-base">{q?.emoji ?? '📦'}</span>
                  {expense.name}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(expense.amount)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {total > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Expenses</span>
          <span className="text-base font-bold text-rose-600 dark:text-rose-400">{formatCurrency(total)}</span>
        </div>
      )}
    </Card>
  );
}
