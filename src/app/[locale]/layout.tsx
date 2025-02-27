import React from 'react';
import pick from 'lodash/pick';
import { Roboto } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import ReactQueryProvider from '@/providers/react-query';

import '@/styles/globals.css';

import Header from './header';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  params: { locale },
}) => {
  const messages = useMessages();

  return (
    <ReactQueryProvider>
      <NextIntlClientProvider
        messages={
          // … and provide the relevant messages
          pick(messages, 'builder')
        }
      >
        <html lang={locale}>
          <body className={`${roboto.variable} antialiased`}>
            <Header />
            <main className="w-full p-3 flex justify-center items-center md:px-12 md:py-6">
              <div className="w-full max-w-screen-2xl">{children}</div>
            </main>
          </body>
        </html>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
};

export default RootLayout;
