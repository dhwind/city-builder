import React from 'react';
import { Roboto, Silkscreen } from 'next/font/google';
import ReactQueryProvider from '@/providers/react-query';

import '@/styles/globals.css';

import ClientTranslationsProvider from '@/providers/client-translations';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import Header from './header';

const silkscreen = Silkscreen({
  weight: '400',
  variable: '--font-silkscreen',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

const RootLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <ReactQueryProvider>
      <ClientTranslationsProvider>
        <html lang={locale}>
          <body
            className={cn(roboto.variable, silkscreen.variable, 'antialiased')}
          >
            <Header />
            <main className="w-full p-3 flex justify-center items-center md:px-12 md:py-6">
              <div className="w-full max-w-screen-2xl">{children}</div>
            </main>
            <Toaster />
          </body>
        </html>
      </ClientTranslationsProvider>
    </ReactQueryProvider>
  );
};

export default RootLayout;
