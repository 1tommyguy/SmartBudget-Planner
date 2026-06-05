'use client';

import { useState } from 'react';
import { SavingsGoal as SavingsGoalType } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import ProgressBar from '@/components/ui/ProgressBar';
import { calculateSavingsGoalMonthly } from '@/lib/calculations';

interface SavingsGoalProps {
  goals: SavingsGoalType[];
  totalIncome: number;
  totalExpenses: number;
  currency: string;
  onUpdate: (goals: SavingsGoalType[]) => void;
}

interface GoalForm {
  name: string;
  targetAmount: string;
  currentAmount: string;
  targetDate: string;
}

const emptyForm: GoalForm = {
  name: '',
  targetAmount: '',
  currentAmount: '0',
  targetDate: '',
};

export default function SavingsGoal({
  goals,
  totalIncome,
  totalExpenses,
  currency,
  onUpdate,
}: SavingsGoalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<GoalForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<GoalForm>>({});

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

  const openAdd = () => {
    setEditingId(null);
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() + 1);
    setForm({ ...emptyForm, targetDate: defaultDate.toISOString().split('T')[0] });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEdit = (goal: SavingsGoalType) => {
    setEditingId(goal.id);
    setForm({
      name: goal.name,
      targetAmount: String(goal.targetAmount),
      currentAmount: String(goal.currentAmount),
      targetDate: goal.targetDate,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = (): boolean => {
    const newErrors: Partial<GoalForm> = {};
    if (!form.name.trim()) newErrors.name = 'Goal name is required';
    if (!form.targetAmount || Number(form.targetAmount) <= 0) newErrors.targetAmount = 'Enter a valid target amount';
    if (Number(form.currentAmount) < 0) newErrors.currentAmount = 'Cannot be negative';
    if (!form.targetDate) newErrors.targetDate = 'Target date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (editingId) {
      onUpdate(
        goals.map((g) =>
          g.id === editingId
            ? {
                ...g,
                name: form.name.trim(),
                targetAmount: Number(form.targetAmount),
                currentAmount: Number(form.currentAmount),
                targetDate: form.targetDate,
              }
            : g
        )
      );
    } else {
      const newGoal: SavingsGoalType = {
        id: `goal-${Date.now()}`,
        name: form.name.trim(),
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount),
        targetDate: form.targetDate,
      };
      onUpdate([...goals, newGoal]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(goals.filter((g) => g.id !== id));
  };

  return (
    <>
      <Card
        title="Savings Goals"
        headerAction={
          <Button size="sm" onClick={openAdd}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Goal
          </Button>
        }
      >
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No savings goals yet</p>
            <Button size="sm" onClick={openAdd}>Add your first goal</Button>
          </div>
        ) : (
          <div className="space-y-5">
            {goals.map((goal) => {
              const progress = goal.targetAmount > 0
                ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)
                : 0;
              const { monthlyNeeded, monthsToGoal, canAchieve } = calculateSavingsGoalMonthly(
                goal,
                totalIncome,
                totalExpenses
              );
              const isComplete = goal.currentAmount >= goal.targetAmount;

              return (
                <div key={goal.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{goal.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(goal)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(goal.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(goal.currentAmount)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        of {formatCurrency(goal.targetAmount)} goal
                      </p>
                    </div>
                    <div className="text-right">
                      {isComplete ? (
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          Goal Reached!
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                          {progress.toFixed(0)}% saved
                        </span>
                      )}
                    </div>
                  </div>

                  <ProgressBar
                    value={progress}
                    color={isComplete ? 'emerald' : 'indigo'}
                    size="md"
                  />

                  {!isComplete && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Needed</p>
                        <p className={`text-sm font-semibold mt-0.5 ${canAchieve ? 'text-gray-900 dark:text-white' : 'text-amber-600 dark:text-amber-400'}`}>
                          {formatCurrency(monthlyNeeded)}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Time to Goal</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
                          {monthsToGoal === Infinity ? 'N/A' : `${monthsToGoal} mo.`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Savings Goal' : 'Add Savings Goal'}
      >
        <div className="space-y-4">
          <Input
            label="Goal Name"
            placeholder="e.g. Emergency Fund, Vacation"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />
          <Input
            label="Target Amount"
            type="number"
            min="1"
            placeholder="10000"
            value={form.targetAmount}
            onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
            error={errors.targetAmount}
            leftIcon={<span className="text-xs font-medium">$</span>}
          />
          <Input
            label="Current Amount Saved"
            type="number"
            min="0"
            placeholder="0"
            value={form.currentAmount}
            onChange={(e) => setForm({ ...form, currentAmount: e.target.value })}
            error={errors.currentAmount}
            leftIcon={<span className="text-xs font-medium">$</span>}
          />
          <Input
            label="Target Date"
            type="date"
            value={form.targetDate}
            onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
            error={errors.targetDate}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              {editingId ? 'Save Changes' : 'Add Goal'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
