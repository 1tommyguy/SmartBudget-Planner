# SmartBudget Planner

A production-quality personal finance web application built with Next.js 14, TypeScript, and Tailwind CSS. Track income, expenses, savings goals, and debts — all stored locally in your browser for complete privacy.

## Features

- **Financial Dashboard** — Real-time summary cards, expense charts, and balance calculations
- **Income Tracking** — Add and manage multiple income sources
- **Expense Management** — Categorize expenses with preset categories and custom entries
- **Savings Goals** — Set targets with deadlines and automatic monthly savings calculations
- **Financial Health Score** — 0-100 score based on savings rate, expense ratio, and emergency fund
- **Emergency Fund Calculator** — 3, 6, and 12-month fund targets with time-to-save estimates
- **Debt Payoff Estimator** — Interactive slider showing interest savings with extra payments
- **50/30/20 Budget Rule** — Compare actual spending vs the proven budgeting framework
- **Personalized Tips** — Dynamic financial advice based on your actual data
- **PDF & CSV Export** — Professional reports with one click
- **Dark Mode** — Full dark/light/system theme support
- **100% Private** — All data stored in browser localStorage, nothing sent to any server

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Recharts](https://recharts.org/) — Interactive charts
- [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) — PDF export
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark mode
- localStorage — Client-side data persistence

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

1. Push this repository to GitHub
2. Import it on [Vercel](https://vercel.com/new)
3. Click **Deploy** — no environment variables required

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with ThemeProvider
│   ├── page.tsx          # Landing page
│   ├── dashboard/        # Main dashboard
│   ├── settings/         # Settings page
│   └── about/            # About page
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── ui/               # Reusable UI components
│   ├── dashboard/        # Dashboard widgets
│   ├── income/           # Income form
│   ├── expenses/         # Expense form
│   └── calculators/      # Budget rule & debt payoff
├── hooks/
│   ├── useLocalStorage.ts
│   └── useFinancialData.ts
├── lib/
│   ├── calculations.ts   # Pure financial calculation functions
│   ├── demo-data.ts      # Realistic demo dataset
│   └── export.ts         # PDF & CSV export utilities
└── types/
    └── index.ts          # TypeScript interfaces
```

## License

MIT License — free to use, modify, and distribute.
