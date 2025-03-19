import React from 'react';
import type { Metadata } from 'next';
import Head from 'next/head'; // Import Head component for managing the head section
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
    <html lang='en'>
      <head>
        <Head>
          <title>{metadata.title}</title>
          <meta name='description' content={metadata.description} />
        </Head>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
