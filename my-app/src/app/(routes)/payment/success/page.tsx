'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaymentIntentData {
  id: string;
  amount: number;
  status: string;
  client_secret?: string;
  created: number;
  currency: string;
}

const SuccessPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success'>('loading');
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntentData | null>(null);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        window.location.href = '/payment/fail';
        return;
      }
      
      try {
        const response = await fetch(`/api/payment/status?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.status === 'succeeded') {
          setStatus('success');
          setPaymentIntent(data.paymentIntent);
        } else {
          // Redirect to the fail page
          window.location.href = '/payment/fail';
        }
      } catch (error) {
        console.error('Error fetching payment intent:', error);
        // Redirect to the fail page
        window.location.href = '/payment/fail';
      }
    };
    
    fetchPaymentIntent();
  }, [searchParams]);
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-600">決済情報を確認中...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">お支払いが完了しました</h1>
          <p className="text-gray-600 mb-6">ありがとうございます。お支払いが正常に処理されました。</p>
          
          {paymentIntent && (
            <div className="bg-gray-50 p-4 rounded-lg w-full max-w-md mb-6 text-left">
              <p className="text-sm text-gray-500 mb-2">決済ID</p>
              <p className="font-mono text-xs mb-4">{paymentIntent.id}</p>
              
              <p className="text-sm text-gray-500 mb-2">決済金額</p>
              <p className="font-semibold">
                {new Intl.NumberFormat('ja-JP', {
                  style: 'currency',
                  currency: 'JPY'
                }).format(paymentIntent.amount / 100)}
              </p>
            </div>
          )}
          
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>問題がある場合は、サポートまでお問い合わせください。</p>
        <p className="mt-1">© {new Date().getFullYear()} KOKOLTH</p>
      </div>
    </div>
  );
};

export default SuccessPage;
