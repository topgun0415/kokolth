import React from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import GlobalStateManager from '@/providers/GlobalStateManager';

export const metadata = {
  title: 'ココルス',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='jp'>
      <body>
        <GlobalStateManager />
        <Toaster position='top-center' reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
