import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FormProvider } from '@/context/FormContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multi-Step Form Wizard',
  description: 'A Next.js multi-step form wizard for evaluations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FormProvider>
          <main className="h-screen w-screen">
            {children}
          </main>
        </FormProvider>
      </body>
    </html>
  );
}
