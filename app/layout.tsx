"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/context/FormContext";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <FormProvider>
          <main className="h-screen w-screen">{children}</main>
        </FormProvider>
      </body>
    </html>
  );
}
