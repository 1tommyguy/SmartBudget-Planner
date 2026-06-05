import Link from 'next/link';

export default function AboutPage() {
  const features = [
    { icon: '📊', title: 'Income Tracking', desc: 'Add multiple income sources and see your total monthly earnings.' },
    { icon: '💸', title: 'Expense Management', desc: 'Categorize and track all your monthly expenses with easy inline editing.' },
    { icon: '🎯', title: 'Savings Goals', desc: 'Set savings targets with deadlines and track your progress automatically.' },
    { icon: '📈', title: 'Financial Health Score', desc: 'Get a 0-100 score based on your savings rate and spending habits.' },
    { icon: '🚨', title: 'Emergency Fund Calculator', desc: 'See how much you need for 3, 6, and 12 months of expenses.' },
    { icon: '💳', title: 'Debt Payoff Estimator', desc: 'Calculate how extra payments can accelerate your debt freedom date.' },
    { icon: '⚖️', title: '50/30/20 Budget Rule', desc: 'Compare your spending against the proven 50/30/20 budgeting framework.' },
    { icon: '📄', title: 'PDF & CSV Export', desc: 'Download professional financial reports in multiple formats.' },
    { icon: '🌙', title: 'Dark Mode', desc: 'Full dark mode support for comfortable use day or night.' },
    { icon: '🔒', title: 'Privacy First', desc: 'All data stored locally in your browser — nothing sent to any server.' },
  ];

  const techStack = [
    { name: 'Next.js 14', desc: 'React framework with App Router', color: 'bg-black text-white' },
    { name: 'TypeScript', desc: 'Type-safe development', color: 'bg-blue-600 text-white' },
    { name: 'Tailwind CSS', desc: 'Utility-first styling', color: 'bg-cyan-500 text-white' },
    { name: 'Recharts', desc: 'Responsive chart library', color: 'bg-green-600 text-white' },
    { name: 'jsPDF', desc: 'PDF generation', color: 'bg-red-600 text-white' },
    { name: 'next-themes', desc: 'Dark mode support', color: 'bg-purple-600 text-white' },
    { name: 'localStorage', desc: 'Client-side data storage', color: 'bg-amber-600 text-white' },
  ];

  const steps = [
    {
      step: '1',
      title: 'Add Your Income',
      desc: 'Enter your monthly salary, freelance income, or any other income sources in the Income section.',
    },
    {
      step: '2',
      title: 'Track Expenses',
      desc: 'Add your monthly expenses by category — rent, food, transport, utilities, and more.',
    },
    {
      step: '3',
      title: 'Set Savings Goals',
      desc: 'Define your savings targets with amounts and deadlines. The app calculates how much to save each month.',
    },
    {
      step: '4',
      title: 'Review Your Dashboard',
      desc: 'See your financial health score, budget breakdown, charts, and personalized tips in one view.',
    },
    {
      step: '5',
      title: 'Export Reports',
      desc: 'Download your financial summary as a PDF or CSV for record-keeping or sharing with an advisor.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center shadow-xl mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About SmartBudget Planner
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A free, open-source personal finance tool that helps you understand your money, set goals, and make smarter financial decisions — without ever sharing your data with anyone.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            Open Dashboard
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mb-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-2xl">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800/40 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
              Your Privacy is Guaranteed
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
              SmartBudget Planner stores all your financial data exclusively in your browser&apos;s localStorage. No data is ever transmitted to any server, no accounts are required, and no analytics track your usage. Your financial information is completely private and under your control.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <span className="text-2xl flex-shrink-0">{feature.icon}</span>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Use</h2>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.step} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {step.step}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Built With</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${tech.color}`}>
                {tech.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* License */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          SmartBudget Planner is open source and free to use. Released under the{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">MIT License</span>.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          &copy; {new Date().getFullYear()} SmartBudget Planner
        </p>
      </div>
    </div>
  );
}
