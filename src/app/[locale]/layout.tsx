import React from 'react';
import { Roboto } from 'next/font/google';
import { useLocale } from 'next-intl';
import ReactQueryProvider from '@/providers/react-query';

import '@/styles/globals.css';

import Header from './header';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const locale = useLocale();

  return (
    <ReactQueryProvider>
      <html lang={locale}>
        <body className={`${roboto.variable} antialiased`}>
          <Header />
          <main className="w-full p-3 flex justify-center items-center md:px-12 md:py-6">
            <div className="w-full max-w-screen-2xl">{children}</div>
          </main>
        </body>
      </html>
    </ReactQueryProvider>
  );
};

export default RootLayout;
