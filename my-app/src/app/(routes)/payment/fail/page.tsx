'use client';

export const dynamic = 'force-dynamic';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaymentErrorData {
  code?: string;
  message?: string;
  payment_intent?: {
    id: string;
    status: string;
  };
}

const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">情報を読み込んでいます...</p>
      </div>
    </div>
  </div>
);

const FailPageContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PaymentErrorData | null>(null);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchPaymentError = async () => {
      const errorType = searchParams.get('error_type');
      const paymentIntentId = searchParams.get('payment_intent');
      
      if (!errorType && !paymentIntentId) {
        setError({ message: '不明なエラーが発生しました' });
        setLoading(false);
        return;
      }
      
      try {
        if (paymentIntentId) {
          const response = await fetch(`/api/payment/error?payment_intent=${paymentIntentId}`);
          const data = await response.json();
          setError(data.error || { message: '決済が拒否されました' });
        } else {
          const errorMessage = getErrorMessage(errorType || "");
          setError({ 
            code: errorType || undefined,
            message: errorMessage
          });
        }
      } catch (err) {
        console.error('Error fetching payment error details:', err);
        setError({ message: '決済処理中にエラーが発生しました' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentError();
  }, [searchParams]);
  
  const getErrorMessage = (errorType: string | null | undefined): string => {
    switch (errorType) {
      case 'card_declined':
        return 'カードが拒否されました。別の支払い方法をお試しください。';
      case 'expired_card':
        return 'カードの有効期限が切れています。別のカードをお試しください。';
      case 'incorrect_cvc':
        return 'カードのセキュリティコードが正しくありません。';
      case 'processing_error':
        return 'カード処理中にエラーが発生しました。しばらくしてからもう一度お試しください。';
      case 'insufficient_funds':
        return 'カードに十分な残高がありません。';
      case 'authentication_required':
        return 'カード発行銀行による認証が必要です。';
      default:
        return '決済処理中にエラーが発生しました。もう一度お試しいただくか、別の支払い方法をお試しください。';
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">決済が完了できませんでした</h1>
          
          <p className="text-gray-600 mb-6">
            {error?.message || '決済処理中にエラーが発生しました。'}
            <br />
            お客様のアカウントに請求されることはありませんのでご安心ください。
          </p>
          
          {error?.code && (
            <div className="bg-gray-50 p-4 rounded-lg w-full max-w-md mb-6 text-left">
              <p className="text-sm text-gray-500 mb-2">エラーコード</p>
              <p className="font-mono text-xs mb-4">{error.code}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/payment"
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              再度お試しください
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>お支払いに関するご質問は、LINEにてお問い合わせください。</p>
        <p className="mt-1">© {new Date().getFullYear()} KOKOLTH</p>
      </div>
    </div>
  );
};

const FailPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FailPageContent />
    </Suspense>
  );
};

export default FailPage;