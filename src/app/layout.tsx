import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SmartBudget Planner — Take Control of Your Finances',
  description:
    'A free, privacy-first budget planner. Track income, expenses, savings goals, and debts — all stored locally in your browser. No account needed.',
  keywords: ['budget planner', 'personal finance', 'expense tracker', 'savings goals', 'debt payoff', 'free budget app'],
  openGraph: {
    title: 'SmartBudget Planner — Take Control of Your Finances',
    description:
      'Free personal finance app. Track income & expenses, set savings goals, pay off debt — 100% private, no account needed.',
    url: 'https://1tommyguy.github.io/SmartBudget-Planner/',
    siteName: 'SmartBudget Planner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartBudget Planner — Take Control of Your Finances',
    description:
      'Free personal finance app. Track income & expenses, set savings goals, pay off debt — 100% private, no account needed.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
