import React from 'react';
import type { Metadata } from 'next';
import '../(routes)/globals.css';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

export const metadata: Metadata = {
  title: 'ココロス',
  description:
    '高齢出産、妊活中、妊娠中、高齢育児、夫婦関係についてのメールカウンセリング',
  openGraph: {
    images: [
      {
        url: '/images/heroImage.jpeg',
        width: 1200,
        height: 630,
      },
    ],
  },
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
