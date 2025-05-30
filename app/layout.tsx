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
    <html lang="en" className="bg-black">      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="text/javascript">{`
          (function() {
            try {
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                if (y && y.parentNode) {
                  y.parentNode.insertBefore(t,y);
                } else {
                  l.head.appendChild(t);
                }
                
                // Mobile-specific configuration
                if (c.clarity) {
                  c.clarity('set', 'trackTouch', true);
                  c.clarity('set', 'trackScroll', true);
                }
              })(window, document, "clarity", "script", "rqueo5xfod");
            } catch (e) {
              console.warn('Microsoft Clarity blocked or failed to load:', e);
            }
          })();
        `}</script>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            background-color: black;
          }
          
          html, body {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
        `}</style>
      </head>      <body className={`${inter.className} bg-black overflow-x-hidden`}>
        <CommentInjector />
        <FormProvider>
         
          <main className="min-h-screen w-full relative z-10 overflow-x-hidden bg-black">
            {children}
          </main>
        </FormProvider>
      </body>
    </html>
  );
}
