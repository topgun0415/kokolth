import React from 'react';
import type { Metadata } from 'next';
import '../(routes)/globals.css';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

export const metadata: Metadata = {
  title: 'kokolth',
  description: 'Created by kokolth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='jp'>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
