'use client';

import { FinancialSummary } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface HealthScoreProps {
  summary: FinancialSummary;
}

function getScoreColor(score: number): string {
  if (score >= 75) return '#10B981'; // emerald
  if (score >= 50) return '#F59E0B'; // amber
  if (score >= 25) return '#F97316'; // orange
  return '#EF4444'; // red
}

function getScoreBadgeColor(score: number): 'green' | 'yellow' | 'red' | 'blue' {
  if (score >= 75) return 'green';
  if (score >= 50) return 'yellow';
  return 'red';
}

interface ScoreArcProps {
  score: number;
}

function ScoreArc({ score }: ScoreArcProps) {
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc spans 270 degrees (from 135deg to 405deg / -225deg)
  const arcLength = circumference * 0.75;
  const offset = arcLength - (score / 100) * arcLength;
  const color = getScoreColor(score);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-[135deg]">
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeLinecap="round"
        className="text-gray-200 dark:text-gray-700"
      />
      {/* Filled arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 1s ease-out',
          filter: `drop-shadow(0 0 8px ${color}80)`,
        }}
      />
    </svg>
  );
}

export default function HealthScore({ summary }: HealthScoreProps) {
  const scoreColor = getScoreColor(summary.healthScore);
  const badgeColor = getScoreBadgeColor(summary.healthScore);

  const factors = [
    {
      label: 'Savings Rate',
      value: `${Math.max(0, summary.savingsRate).toFixed(1)}%`,
      target: '20%+',
      met: summary.savingsRate >= 20,
    },
    {
      label: 'Expense Ratio',
      value: `${(summary.expenseRatio * 100).toFixed(1)}%`,
      target: 'Under 80%',
      met: summary.expenseRatio < 0.8,
    },
    {
      label: 'Net Balance',
      value: summary.remainingBalance >= 0 ? 'Positive' : 'Negative',
      target: 'Positive',
      met: summary.remainingBalance >= 0,
    },
  ];

  return (
    <Card title="Financial Health Score">
      <div className="flex flex-col items-center">
        {/* Circular gauge */}
        <div className="relative" style={{ width: 180, height: 180 }}>
          <ScoreArc score={summary.healthScore} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-4xl font-bold tabular-nums"
              style={{ color: scoreColor }}
            >
              {summary.healthScore}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">out of 100</span>
          </div>
        </div>

        <div className="mt-1 mb-5">
          <Badge color={badgeColor} className="text-sm px-3 py-1">
            {summary.healthLabel}
          </Badge>
        </div>

        {/* Score breakdown */}
        <div className="w-full space-y-3">
          {factors.map((factor) => (
            <div key={factor.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${factor.met ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-300">{factor.label}</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {factor.value}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  (target: {factor.target})
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            Score is based on savings rate (40pts), expense management (30pts), and emergency fund readiness (30pts).
          </p>
        </div>
      </div>
    </Card>
  );
}
