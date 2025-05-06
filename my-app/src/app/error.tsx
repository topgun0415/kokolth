'use client';

import React from 'react';
import { Error } from '@/components/organisms/Error';
import Footer from '@/components/organisms/Footer';

export default function ErrorPage() {
  return (
    <>
      <Error status={'500'} />
      <Footer />
    </>
  );
}
