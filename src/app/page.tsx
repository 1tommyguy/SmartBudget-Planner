import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Smart Dashboard',
      description: 'Visualize your complete financial picture with interactive charts, health scores, and real-time balance calculations.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Savings Goals',
      description: 'Set and track savings goals with automatic monthly calculations showing exactly how much to save each month.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      ),
      title: 'Debt Payoff Calculator',
      description: 'See exactly when you\'ll be debt-free and how much interest you\'ll save with extra monthly payments.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Health Score',
      description: 'Get a 0-100 financial health score based on your savings rate, expense ratio, and emergency fund status.',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: '100% Private',
      description: 'All data stays in your browser. No accounts, no servers, no tracking. Your finances are yours alone.',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      title: 'Export Reports',
      description: 'Download your financial data as a beautifully formatted PDF or CSV spreadsheet at any time.',
      color: 'from-violet-500 to-purple-600',
    },
  ];

  const steps = [
    {
      step: '1',
      color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800/40',
      emoji: '🌍',
      title: 'Set Your Currency',
      desc: 'Go to Settings (top-right menu) and tap your country\'s currency — USD, NGN, GBP, EUR, and more are supported. This changes all amounts across the whole app.',
      tip: 'Settings → Currency',
      tipColor: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    },
    {
      step: '2',
      color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800/40',
      emoji: '💰',
      title: 'Add Your Income',
      desc: 'Open the Dashboard and go to the Income tab. Pick the income types that apply to you — salary, freelance, rental, and more — then enter the amounts and press Calculate.',
      tip: 'Dashboard → Income tab',
      tipColor: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    },
    {
      step: '3',
      color: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400',
      border: 'border-rose-200 dark:border-rose-800/40',
      emoji: '🧾',
      title: 'Enter Your Expenses',
      desc: 'Switch to the Expenses tab. Answer a few quick questions about housing, food, transport, and other costs one at a time, then press Calculate when done.',
      tip: 'Dashboard → Expenses tab',
      tipColor: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
    },
    {
      step: '4',
      color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-800/40',
      emoji: '🎯',
      title: 'Set Savings Goals (optional)',
      desc: 'Under the Goals tab, add a savings target with a name, amount, and deadline. The app automatically calculates how much you need to set aside each month.',
      tip: 'Dashboard → Goals tab',
      tipColor: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    },
    {
      step: '5',
      color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/40',
      emoji: '📊',
      title: 'Review Your Dashboard',
      desc: 'See your financial health score, budget breakdown, savings rate, and personalized tips — everything updates the moment you hit Calculate.',
      tip: 'Dashboard → Overview',
      tipColor: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTYgMHY2aDZ2LTZoLTZ6TTMwIDI4djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Free forever. No account required.
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Take Control of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                Your Finances
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Track income, manage expenses, set savings goals, and pay off debt faster — all in one beautiful, privacy-first budgeting tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started Free
              </Link>
              <a
                href="#how-to-use"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all border border-white/30 backdrop-blur-sm text-lg"
              >
                How It Works
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Hero mockup */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20 shadow-2xl">
            <div className="bg-gray-900/90 rounded-2xl overflow-hidden">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-gray-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-gray-700/50 rounded-lg h-6 mx-4" />
              </div>
              {/* Fake dashboard content */}
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Income', value: '$5,500', color: 'from-emerald-500/20 to-green-600/20 border-emerald-500/20' },
                  { label: 'Expenses', value: '$2,715', color: 'from-rose-500/20 to-red-600/20 border-rose-500/20' },
                  { label: 'Balance', value: '$2,785', color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/20' },
                  { label: 'Savings Rate', value: '50.6%', color: 'from-purple-500/20 to-violet-600/20 border-purple-500/20' },
                ].map((card) => (
                  <div key={card.label} className={`bg-gradient-to-br ${card.color} border rounded-xl p-3`}>
                    <p className="text-xs text-gray-400">{card.label}</p>
                    <p className="text-lg font-bold text-white mt-1">{card.value}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4 grid grid-cols-3 gap-3">
                <div className="col-span-2 bg-gray-800/60 rounded-xl h-28 flex items-center justify-center">
                  <div className="flex gap-2 items-end">
                    {[60, 85, 45, 70, 90, 55, 75].map((h, i) => (
                      <div key={i} className="w-5 rounded-t-sm bg-gradient-to-t from-indigo-600/60 to-purple-500/60" style={{ height: `${h}px` }} />
                    ))}
                  </div>
                </div>
                <div className="bg-gray-800/60 rounded-xl h-28 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">78</div>
                    <div className="text-xs text-emerald-400">Excellent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use — anchor target */}
      <section id="how-to-use" className="py-20 md:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Quick Start
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Up and running in 5 minutes
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Follow these steps in order and your budget will be ready to go.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className={`flex gap-5 p-5 bg-white dark:bg-gray-800 rounded-2xl border ${s.border} shadow-sm`}
              >
                {/* Step number */}
                <div className={`w-11 h-11 rounded-full ${s.color} flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
                  {s.step}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xl">{s.emoji}</span>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {s.title}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${s.tipColor}`}>
                      {s.tip}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              Open Dashboard
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to manage your money
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed to help you build wealth, eliminate debt, and achieve your financial goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to take control?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            No sign-up. No fees. Your data never leaves your device. Start budgeting in under a minute.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-lg"
          >
            Open Dashboard
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
