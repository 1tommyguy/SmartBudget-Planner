import { IncomeSource, Expense, SavingsGoal, Debt, FinancialSummary } from '@/types';

export function calculateTotalIncome(incomes: IncomeSource[]): number {
  return incomes.reduce((sum, income) => sum + income.amount, 0);
}

export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function calculateHealthScore(
  savingsRate: number,
  expenseRatio: number,
  emergencyFundMonths: number
): number {
  // Savings rate component (0-40 points): ideal is 20%+
  let savingsScore = Math.min(40, (savingsRate / 20) * 40);
  if (savingsRate < 0) savingsScore = 0;

  // Expense ratio component (0-30 points): ideal is below 70%
  let expenseScore = 0;
  if (expenseRatio <= 0.7) {
    expenseScore = 30;
  } else if (expenseRatio <= 1.0) {
    expenseScore = Math.max(0, 30 - ((expenseRatio - 0.7) / 0.3) * 30);
  }

  // Emergency fund component (0-30 points): ideal is 6+ months
  let emergencyScore = Math.min(30, (emergencyFundMonths / 6) * 30);

  return Math.round(savingsScore + expenseScore + emergencyScore);
}

export function calculateEmergencyFund(totalExpenses: number, months: number): number {
  return totalExpenses * months;
}

export function calculateSavingsGoalMonthly(
  goal: SavingsGoal,
  totalIncome: number,
  totalExpenses: number
): { monthlyNeeded: number; monthsToGoal: number; canAchieve: boolean } {
  const remaining = goal.targetAmount - goal.currentAmount;
  if (remaining <= 0) {
    return { monthlyNeeded: 0, monthsToGoal: 0, canAchieve: true };
  }

  const targetDate = new Date(goal.targetDate);
  const today = new Date();
  const monthsAvailable = Math.max(
    1,
    (targetDate.getFullYear() - today.getFullYear()) * 12 +
      (targetDate.getMonth() - today.getMonth())
  );

  const monthlyNeeded = remaining / monthsAvailable;
  const availableMonthly = totalIncome - totalExpenses;
  const canAchieve = availableMonthly >= monthlyNeeded;
  const actualMonthly = canAchieve ? monthlyNeeded : availableMonthly;
  const monthsToGoal = actualMonthly > 0 ? Math.ceil(remaining / actualMonthly) : Infinity;

  return { monthlyNeeded, monthsToGoal, canAchieve };
}

export function calculate503020(totalIncome: number): {
  needs: number;
  wants: number;
  savings: number;
} {
  return {
    needs: totalIncome * 0.5,
    wants: totalIncome * 0.3,
    savings: totalIncome * 0.2,
  };
}

export function calculateDebtPayoff(
  debt: Debt,
  extraPayment: number
): { months: number; totalInterest: number; payoffDate: string } {
  const monthlyRate = debt.interestRate / 100 / 12;
  const payment = debt.minimumPayment + extraPayment;

  if (payment <= 0 || debt.balance <= 0) {
    return { months: 0, totalInterest: 0, payoffDate: new Date().toISOString().split('T')[0] };
  }

  if (monthlyRate === 0) {
    const months = Math.ceil(debt.balance / payment);
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);
    return { months, totalInterest: 0, payoffDate: payoffDate.toISOString().split('T')[0] };
  }

  let balance = debt.balance;
  let months = 0;
  let totalInterest = 0;

  while (balance > 0 && months < 600) {
    const interest = balance * monthlyRate;
    totalInterest += interest;
    balance = balance + interest - payment;
    months++;
    if (balance < 0) balance = 0;
  }

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);

  return {
    months,
    totalInterest: Math.round(totalInterest * 100) / 100,
    payoffDate: payoffDate.toISOString().split('T')[0],
  };
}

export function getHealthLabel(score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  if (score >= 75) return 'Excellent';
  if (score >= 50) return 'Good';
  if (score >= 25) return 'Fair';
  return 'Poor';
}

export function getFinancialTips(summary: FinancialSummary): string[] {
  const tips: string[] = [];

  if (summary.savingsRate < 10) {
    tips.push(
      'Your savings rate is below 10%. Try to save at least 20% of your income by reducing discretionary spending.'
    );
  } else if (summary.savingsRate < 20) {
    tips.push(
      `You're saving ${summary.savingsRate.toFixed(1)}% of your income. Aim for 20% to build long-term wealth.`
    );
  } else {
    tips.push(
      `Great job! You're saving ${summary.savingsRate.toFixed(1)}% of your income. Consider investing the surplus.`
    );
  }

  if (summary.expenseRatio > 0.9) {
    tips.push(
      'Your expenses consume over 90% of your income. Review subscriptions and discretionary spending to free up cash.'
    );
  } else if (summary.expenseRatio > 0.7) {
    tips.push(
      'Your expenses are between 70-90% of income. Look for areas to cut back to improve your financial buffer.'
    );
  }

  if (summary.emergencyFund3 > summary.remainingBalance * 3) {
    tips.push(
      `You need ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.emergencyFund3)} for a 3-month emergency fund. Start building this safety net immediately.`
    );
  } else if (summary.emergencyFund6 > summary.remainingBalance * 6) {
    tips.push(
      'Consider building your emergency fund to 6 months of expenses for greater financial security.'
    );
  } else {
    tips.push(
      'Your emergency fund looks healthy! Consider investing additional savings in index funds for long-term growth.'
    );
  }

  if (summary.remainingBalance < 0) {
    tips.push(
      'You are spending more than you earn. This is unsustainable — identify and eliminate non-essential expenses immediately.'
    );
  } else if (summary.remainingBalance > 0) {
    tips.push(
      `You have ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.remainingBalance)} left after expenses. Automate transfers to savings before spending this amount.`
    );
  }

  tips.push(
    'Review your subscriptions monthly. Many people have forgotten subscriptions draining $50–$200/month unnecessarily.'
  );

  if (summary.healthScore < 50) {
    tips.push(
      'Consider the 50/30/20 rule: 50% on needs, 30% on wants, and 20% on savings and debt repayment.'
    );
  } else {
    tips.push(
      'You\'re on the right track! Consider diversifying investments: index funds, retirement accounts (401k/IRA), and bonds.'
    );
  }

  tips.push(
    'Set up automatic payments for bills and savings transfers to avoid late fees and ensure consistent saving habits.'
  );

  return tips.slice(0, 7);
}

export function computeFinancialSummary(
  incomes: IncomeSource[],
  expenses: Expense[]
): FinancialSummary {
  const totalIncome = calculateTotalIncome(incomes);
  const totalExpenses = calculateTotalExpenses(expenses);
  const remainingBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (remainingBalance / totalIncome) * 100 : 0;
  const expenseRatio = totalIncome > 0 ? totalExpenses / totalIncome : 1;

  const emergencyFund3 = calculateEmergencyFund(totalExpenses, 3);
  const emergencyFund6 = calculateEmergencyFund(totalExpenses, 6);
  const emergencyFund12 = calculateEmergencyFund(totalExpenses, 12);

  // Estimate emergency fund months (placeholder — in real app, user would input current savings)
  const emergencyFundMonths = remainingBalance > 0 ? remainingBalance / totalExpenses : 0;

  const healthScore = calculateHealthScore(savingsRate, expenseRatio, emergencyFundMonths);
  const healthLabel = getHealthLabel(healthScore);

  return {
    totalIncome,
    totalExpenses,
    remainingBalance,
    savingsRate,
    expenseRatio,
    healthScore,
    healthLabel,
    emergencyFund3,
    emergencyFund6,
    emergencyFund12,
  };
}
