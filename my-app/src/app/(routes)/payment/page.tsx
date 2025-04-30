import React from 'react';
import Payment from '@/components/organisms/Payment';

export default function PaymentPage() {
  return (
    <main className='min-h-screen pt-[80px]'>
      <Payment clientSecret="YOUR_CLIENT_SECRET" />
    </main>
  );
}
