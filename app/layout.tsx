'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/context/FormContext";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function CommentInjector() {
  useEffect(() => {
    const comment = document.createComment(`
      =================================================================
      Built by AIdaptics - We turn Complex ideas into effortless solutions.
      Website: https://aidaptics.com
      Instagram: @aidaptics
      Discord: https://discord.gg/aidaptics
      Twitter: @aidaptics
      =================================================================
    `);
    document.body.insertBefore(comment, document.body.firstChild);
  }, []);
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommentInjector />
        <FormProvider>
          <main className="h-screen w-screen">{children}</main>
        </FormProvider>
      </body>
    </html>
  );
}
