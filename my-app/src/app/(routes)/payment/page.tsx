import React from 'react';
import Payment from '@/components/organisms/Payment';
import { createPaymentIntent } from '@/lib/stripe';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export default async function PaymentPage() {
  
  // Get the user's session
  const session = await getServerSession(authOptions);
  const loginedUserInfo = session?.user?.email ?? session?.user?.id;
  

  

  


  try {
    const { clientSecret } = await createPaymentIntent({
      amount: 2000,
      receiptEmail: 'topgun920415@gmail.com',
      currency: 'jpy',
      metadata: {
        userId: '123',
        orderReference: 'ORD-12345' 
      },
      userName: 'Philip Lee',
    });
    return (
      <main className='min-h-screen'>
        {clientSecret && <Payment clientSecret={clientSecret} />}
      </main>
    );
  } catch {
    return (
      <main className='min-h-screen pt-[80px]'>
        <div className="p-4 bg-red-50 text-red-700 rounded">
          お支払い準備中にエラーが発生しました。
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          もう一度試してください
        </button>
      </main>
    );
  }
}
