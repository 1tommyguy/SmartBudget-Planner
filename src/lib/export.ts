import { UserData, FinancialSummary } from '@/types';

type DocWithAutoTable = {
  lastAutoTable: { finalY: number };
};

export function exportToCSV(userData: UserData, summary: FinancialSummary): void {
  const currencySymbol = getCurrencySymbol(userData.currency);
  const rows: string[][] = [];

  rows.push(['SmartBudget Planner - Financial Report']);
  rows.push(['Generated:', new Date().toLocaleDateString()]);
  rows.push([]);

  rows.push(['FINANCIAL SUMMARY']);
  rows.push(['Metric', 'Amount']);
  rows.push(['Total Monthly Income', `${currencySymbol}${summary.totalIncome.toFixed(2)}`]);
  rows.push(['Total Monthly Expenses', `${currencySymbol}${summary.totalExpenses.toFixed(2)}`]);
  rows.push(['Net Balance', `${currencySymbol}${summary.remainingBalance.toFixed(2)}`]);
  rows.push(['Savings Rate', `${summary.savingsRate.toFixed(1)}%`]);
  rows.push(['Financial Health Score', `${summary.healthScore}/100 (${summary.healthLabel})`]);
  rows.push([]);

  rows.push(['INCOME SOURCES']);
  rows.push(['Name', 'Monthly Amount']);
  userData.incomes.forEach((income) => {
    rows.push([income.name, `${currencySymbol}${income.amount.toFixed(2)}`]);
  });
  rows.push([]);

  rows.push(['EXPENSES']);
  rows.push(['Category', 'Name', 'Monthly Amount', '% of Income']);
  userData.expenses.forEach((expense) => {
    const pct =
      summary.totalIncome > 0 ? ((expense.amount / summary.totalIncome) * 100).toFixed(1) : '0.0';
    rows.push([
      expense.category,
      expense.name,
      `${currencySymbol}${expense.amount.toFixed(2)}`,
      `${pct}%`,
    ]);
  });
  rows.push([]);

  rows.push(['SAVINGS GOALS']);
  rows.push(['Goal', 'Target Amount', 'Current Amount', 'Progress', 'Target Date']);
  userData.savingsGoals.forEach((goal) => {
    const progress =
      goal.targetAmount > 0 ? ((goal.currentAmount / goal.targetAmount) * 100).toFixed(1) : '0.0';
    rows.push([
      goal.name,
      `${currencySymbol}${goal.targetAmount.toFixed(2)}`,
      `${currencySymbol}${goal.currentAmount.toFixed(2)}`,
      `${progress}%`,
      goal.targetDate,
    ]);
  });
  rows.push([]);

  rows.push(['DEBTS']);
  rows.push(['Name', 'Balance', 'Interest Rate', 'Minimum Payment']);
  userData.debts.forEach((debt) => {
    rows.push([
      debt.name,
      `${currencySymbol}${debt.balance.toFixed(2)}`,
      `${debt.interestRate}%`,
      `${currencySymbol}${debt.minimumPayment.toFixed(2)}`,
    ]);
  });

  const csvContent = rows
    .map((row) =>
      row
        .map((cell) => {
          const str = String(cell);
          return str.includes(',') || str.includes('"') || str.includes('\n')
            ? `"${str.replace(/"/g, '""')}"`
            : str;
        })
        .join(',')
    )
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `smartbudget-report-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getLastY(doc: unknown): number {
  return (doc as DocWithAutoTable).lastAutoTable?.finalY ?? 52;
}

export async function exportToPDF(userData: UserData, summary: FinancialSummary): Promise<void> {
  const { default: JsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new JsPDF();
  const currencySymbol = getCurrencySymbol(userData.currency);
  const primaryColor = [79, 70, 229] as [number, number, number];

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 220, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('SmartBudget Planner', 14, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Financial Report — Generated ${new Date().toLocaleDateString()}`, 14, 28);

  doc.setTextColor(0, 0, 0);

  // Summary section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Financial Summary', 14, 48);

  autoTable(doc, {
    startY: 52,
    head: [['Metric', 'Value']],
    body: [
      ['Total Monthly Income', `${currencySymbol}${summary.totalIncome.toFixed(2)}`],
      ['Total Monthly Expenses', `${currencySymbol}${summary.totalExpenses.toFixed(2)}`],
      ['Net Balance', `${currencySymbol}${summary.remainingBalance.toFixed(2)}`],
      ['Savings Rate', `${summary.savingsRate.toFixed(1)}%`],
      ['Health Score', `${summary.healthScore}/100 (${summary.healthLabel})`],
      ['3-Month Emergency Fund Target', `${currencySymbol}${summary.emergencyFund3.toFixed(2)}`],
      ['6-Month Emergency Fund Target', `${currencySymbol}${summary.emergencyFund6.toFixed(2)}`],
    ],
    headStyles: { fillColor: primaryColor },
    alternateRowStyles: { fillColor: [245, 247, 250] as [number, number, number] },
    margin: { left: 14, right: 14 },
  });

  // Income Sources
  const afterSummary = getLastY(doc) + 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Income Sources', 14, afterSummary);

  autoTable(doc, {
    startY: afterSummary + 4,
    head: [['Source', 'Monthly Amount']],
    body: userData.incomes.map((i) => [i.name, `${currencySymbol}${i.amount.toFixed(2)}`]),
    headStyles: { fillColor: [16, 185, 129] as [number, number, number] },
    alternateRowStyles: { fillColor: [245, 253, 248] as [number, number, number] },
    margin: { left: 14, right: 14 },
  });

  // Expenses
  const afterIncome = getLastY(doc) + 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Monthly Expenses', 14, afterIncome);

  autoTable(doc, {
    startY: afterIncome + 4,
    head: [['Category', 'Name', 'Amount', '% of Income']],
    body: userData.expenses.map((e) => [
      e.category,
      e.name,
      `${currencySymbol}${e.amount.toFixed(2)}`,
      summary.totalIncome > 0
        ? `${((e.amount / summary.totalIncome) * 100).toFixed(1)}%`
        : '0%',
    ]),
    headStyles: { fillColor: [239, 68, 68] as [number, number, number] },
    alternateRowStyles: { fillColor: [255, 245, 245] as [number, number, number] },
    margin: { left: 14, right: 14 },
  });

  // New page for goals & debts if needed
  const afterExpenses = getLastY(doc);
  if (afterExpenses > 220) {
    doc.addPage();
  }

  const savingsY = afterExpenses > 220 ? 20 : afterExpenses + 10;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Savings Goals', 14, savingsY);

  autoTable(doc, {
    startY: savingsY + 4,
    head: [['Goal', 'Target', 'Current', 'Progress', 'Target Date']],
    body: userData.savingsGoals.map((g) => [
      g.name,
      `${currencySymbol}${g.targetAmount.toFixed(2)}`,
      `${currencySymbol}${g.currentAmount.toFixed(2)}`,
      g.targetAmount > 0 ? `${((g.currentAmount / g.targetAmount) * 100).toFixed(1)}%` : '0%',
      g.targetDate,
    ]),
    headStyles: { fillColor: [139, 92, 246] as [number, number, number] },
    alternateRowStyles: { fillColor: [248, 245, 255] as [number, number, number] },
    margin: { left: 14, right: 14 },
  });

  if (userData.debts.length > 0) {
    const afterGoals = getLastY(doc) + 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Debts', 14, afterGoals);

    autoTable(doc, {
      startY: afterGoals + 4,
      head: [['Name', 'Balance', 'Interest Rate', 'Min. Payment']],
      body: userData.debts.map((d) => [
        d.name,
        `${currencySymbol}${d.balance.toFixed(2)}`,
        `${d.interestRate}%`,
        `${currencySymbol}${d.minimumPayment.toFixed(2)}`,
      ]),
      headStyles: { fillColor: [245, 158, 11] as [number, number, number] },
      alternateRowStyles: { fillColor: [255, 251, 235] as [number, number, number] },
      margin: { left: 14, right: 14 },
    });
  }

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `SmartBudget Planner — Page ${i} of ${pageCount}`,
      14,
      doc.internal.pageSize.height - 10
    );
    doc.text('All data is stored locally on your device.', 120, doc.internal.pageSize.height - 10);
  }

  doc.save(`smartbudget-report-${new Date().toISOString().split('T')[0]}.pdf`);
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    NGN: '₦',
    CAD: 'CA$',
    AUD: 'A$',
    JPY: '¥',
    INR: '₹',
    BRL: 'R$',
    MXN: 'MX$',
  };
  return symbols[currency] || '$';
}
