'use client';

import { useState } from 'react';
import { Expense } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ExpenseFormProps {
  expenses: Expense[];
  currency: string;
  onUpdate: (expenses: Expense[]) => void;
}

const PRESET_CATEGORIES = [
  { value: 'Housing', label: 'Housing', icon: '🏠' },
  { value: 'Food', label: 'Food', icon: '🍔' },
  { value: 'Transport', label: 'Transport', icon: '🚗' },
  { value: 'Utilities', label: 'Utilities', icon: '⚡' },
  { value: 'Entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'Health', label: 'Health', icon: '❤️' },
  { value: 'Subscriptions', label: 'Subscriptions', icon: '📱' },
  { value: 'Debt', label: 'Debt', icon: '📄' },
  { value: 'Other', label: 'Other', icon: '📦' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Housing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Food: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Transport: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Utilities: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Health: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Subscriptions: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  Debt: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Other: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

interface ExpenseForm {
  name: string;
  amount: string;
  category: string;
}

const emptyForm: ExpenseForm = { name: '', amount: '', category: 'Other' };

export default function ExpenseForm({ expenses, currency, onUpdate }: ExpenseFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<ExpenseForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<ExpenseForm>>({});

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  const validate = (f: ExpenseForm) => {
    const errs: Partial<ExpenseForm> = {};
    if (!f.name.trim()) errs.name = 'Name required';
    if (!f.amount || Number(f.amount) <= 0) errs.amount = 'Enter a valid amount';
    return errs;
  };

  const handleAdd = () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onUpdate([
      ...expenses,
      {
        id: `exp-${Date.now()}`,
        name: form.name.trim(),
        amount: Number(form.amount),
        category: form.category,
        isCustom: true,
      },
    ]);
    setForm(emptyForm);
    setErrors({});
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(expenses.filter((e) => e.id !== id));
  };

  const handleSaveEdit = (id: string, f: ExpenseForm) => {
    const errs = validate(f);
    if (Object.keys(errs).length > 0) return;
    onUpdate(
      expenses.map((e) =>
        e.id === id
          ? { ...e, name: f.name.trim(), amount: Number(f.amount), category: f.category }
          : e
      )
    );
    setEditingId(null);
  };

  // Group by category
  const grouped = PRESET_CATEGORIES.reduce<Record<string, Expense[]>>((acc, cat) => {
    const items = expenses.filter((e) => e.category === cat.value);
    if (items.length > 0) acc[cat.value] = items;
    return acc;
  }, {});

  // Add any categories not in preset list
  expenses.forEach((e) => {
    if (!grouped[e.category]) grouped[e.category] = [e];
  });

  return (
    <Card
      title="Monthly Expenses"
      headerAction={
        !isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </Button>
        )
      }
    >
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, items]) => {
          const catTotal = items.reduce((s, e) => s + e.amount, 0);
          const catInfo = PRESET_CATEGORIES.find((c) => c.value === category);
          const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{catInfo?.icon || '📦'}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
                    {category}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {formatCurrency(catTotal)}
                </span>
              </div>
              <div className="space-y-1 ml-6">
                {items.map((expense) =>
                  editingId === expense.id ? (
                    <EditRow
                      key={expense.id}
                      expense={expense}
                      onSave={(f) => handleSaveEdit(expense.id, f)}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 group transition-colors"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-200 flex-1 truncate">
                        {expense.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(expense.amount)}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingId(expense.id)}
                            className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(expense.id)}
                            className="p-1 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}

        {isAdding && (
          <div className="border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 bg-indigo-50/50 dark:bg-indigo-900/10">
            <div className="grid grid-cols-1 gap-3 mb-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Expense name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  error={errors.name}
                  autoFocus
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  error={errors.amount}
                  leftIcon={<span className="text-xs font-medium">$</span>}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat.value })}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        form.category === cat.value
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                      }`}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd}>Add Expense</Button>
              <Button size="sm" variant="ghost" onClick={() => { setIsAdding(false); setForm(emptyForm); setErrors({}); }}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {expenses.length === 0 && !isAdding && (
          <div className="text-center py-6 text-gray-400 dark:text-gray-600">
            <p className="text-sm">No expenses yet. Add one to start tracking.</p>
          </div>
        )}
      </div>

      {expenses.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Total Expenses
          </span>
          <span className="text-base font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(total)}
          </span>
        </div>
      )}
    </Card>
  );
}

interface EditRowProps {
  expense: Expense;
  onSave: (form: ExpenseForm) => void;
  onCancel: () => void;
}

function EditRow({ expense, onSave, onCancel }: EditRowProps) {
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(String(expense.amount));
  const [category, setCategory] = useState(expense.category);

  return (
    <div className="border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 bg-indigo-50/50 dark:bg-indigo-900/10">
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          leftIcon={<span className="text-xs font-medium">$</span>}
        />
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {PRESET_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategory(cat.value)}
            className={`px-2 py-0.5 rounded-full text-xs font-medium border transition-colors ${
              category === cat.value
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSave({ name, amount, category })}>Save</Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
