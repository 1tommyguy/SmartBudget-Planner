export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
}

export interface Expense {
  id: string;
  category: string;
  name: string;
  amount: number;
  isCustom?: boolean;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface UserData {
  incomes: IncomeSource[];
  expenses: Expense[];
  savingsGoals: SavingsGoal[];
  debts: Debt[];
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  remainingBalance: number;
  savingsRate: number;
  expenseRatio: number;
  healthScore: number;
  healthLabel: string;
  emergencyFund3: number;
  emergencyFund6: number;
  emergencyFund12: number;
}
