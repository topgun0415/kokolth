import React from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import GlobalStateManager from '@/providers/GlobalStateManager';

export const metadata = {
  title: '高齢出産・妊活の悩みをメールで解決｜ココルス (Kokolth)',
  description:
    'ココルスは高齢出産・妊活・妊娠中・高齢育児・夫婦関係の不安に…',
  keywords: ['高齢出産','高齢ママ','40代妊娠','不安','経験','高齢育児','夫婦関係','子育て','相談','カウンセリング','食事'],
  openGraph: {
    type: 'website',
    url: 'https://kokolth.com',
    siteName: 'Kokolth',
    images: [
      {
        url: 'https://kokolth.com/images/heroImage.jpeg',
        width: 1200,
        height: 630,
        alt: 'Kokolth メールカウンセリング OG Image',
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
    <html lang='ja'>
      <body>
        <GlobalStateManager />
        <Toaster position='top-center' reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
