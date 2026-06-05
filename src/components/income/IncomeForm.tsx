'use client';

import { useState } from 'react';
import { IncomeSource } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface IncomeFormProps {
  incomes: IncomeSource[];
  currency: string;
  onUpdate: (incomes: IncomeSource[]) => void;
}

export default function IncomeForm({ incomes, currency, onUpdate }: IncomeFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

  const total = incomes.reduce((sum, i) => sum + i.amount, 0);

  const validate = (name: string, amount: string) => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Name required';
    if (!amount || Number(amount) <= 0) errs.amount = 'Enter a valid amount';
    return errs;
  };

  const handleAdd = () => {
    const errs = validate(newName, newAmount);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onUpdate([
      ...incomes,
      { id: `inc-${Date.now()}`, name: newName.trim(), amount: Number(newAmount) },
    ]);
    setNewName('');
    setNewAmount('');
    setErrors({});
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(incomes.filter((i) => i.id !== id));
  };

  const handleEdit = (income: IncomeSource) => {
    setEditingId(income.id);
  };

  const handleSaveEdit = (id: string, name: string, amount: string) => {
    const errs = validate(name, amount);
    if (Object.keys(errs).length > 0) return;
    onUpdate(
      incomes.map((i) =>
        i.id === id ? { ...i, name: name.trim(), amount: Number(amount) } : i
      )
    );
    setEditingId(null);
  };

  return (
    <Card
      title="Income Sources"
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
      <div className="space-y-2">
        {incomes.map((income) => (
          <IncomeRow
            key={income.id}
            income={income}
            isEditing={editingId === income.id}
            currency={currency}
            onEdit={() => handleEdit(income)}
            onDelete={() => handleDelete(income.id)}
            onSave={(name, amount) => handleSaveEdit(income.id, name, amount)}
            onCancel={() => setEditingId(null)}
          />
        ))}

        {isAdding && (
          <div className="border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 bg-indigo-50/50 dark:bg-indigo-900/10">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input
                placeholder="Source name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                error={errors.name}
                autoFocus
              />
              <Input
                type="number"
                placeholder="Amount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                error={errors.amount}
                leftIcon={<span className="text-xs font-medium">$</span>}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd}>Add Income</Button>
              <Button size="sm" variant="ghost" onClick={() => { setIsAdding(false); setErrors({}); }}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {incomes.length === 0 && !isAdding && (
          <div className="text-center py-6 text-gray-400 dark:text-gray-600">
            <p className="text-sm">No income sources. Add one to get started.</p>
          </div>
        )}
      </div>

      {incomes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Total Monthly Income
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(total)}
          </span>
        </div>
      )}
    </Card>
  );
}

interface IncomeRowProps {
  income: IncomeSource;
  isEditing: boolean;
  currency: string;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (name: string, amount: string) => void;
  onCancel: () => void;
}

function IncomeRow({ income, isEditing, currency, onEdit, onDelete, onSave, onCancel }: IncomeRowProps) {
  const [name, setName] = useState(income.name);
  const [amount, setAmount] = useState(String(income.amount));

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  if (isEditing) {
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
            onKeyDown={(e) => e.key === 'Enter' && onSave(name, amount)}
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onSave(name, amount)}>Save</Button>
          <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/40 group transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{income.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatCurrency(income.amount)}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
