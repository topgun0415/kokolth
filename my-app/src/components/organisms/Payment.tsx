'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js'; 
import StripeFooter from '@/components/atoms/StripeFooter';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Stripe CheckoutForm Component 
const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
        receipt_email: email
      },
    });

    if (error) {
      setErrorMessage(error.message || '支払い中にエラーが発生しました');
    }
    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion"
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email-link-auth" className="block text-xs font-medium text-gray-700 mb-1" />    
        <LinkAuthenticationElement id="email-link-auth" className="text-sm" onChange={(e) => setEmail(e.value.email)} />
      </div>
      <div>
        <label htmlFor="payment-element" className="block text-xs font-medium text-gray-700 mb-1" />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            支払い中...
          </div>
        ) : '支払う'}
      </button>
      {errorMessage && (
        <div className="p-3 mt-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

// Payment Component (main)
interface PaymentProps {
  clientSecret: string;
  productName?: string;
  productPriceDisplay?: string;
}

const Payment: React.FC<PaymentProps> = ({
  clientSecret,
  productName = "カウンセリングサービス 1往復",
  productPriceDisplay = "2,000円",
}) => {
  const options: StripeElementsOptions = {
    clientSecret,
    locale: 'ja',
    appearance: {
      theme: 'stripe',
      labels: 'above',
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '4px',
      },
      rules: {
        '.Label': {
          fontSize: '0.75rem', // 12px
          fontWeight: '500',
          color: '#525f7f',
          marginBottom: '0.25rem'
        }
      }
    },
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-white font-['Ideal_Sans',_system-ui,_sans-serif]">
      {/* LEFT (ORDER SUMMARY) */}
      <div className="w-full sm:w-2/5 bg-gray-100 p-6 sm:p-10 lg:p-12 order-first sm:order-first">
        <div className="max-w-xs mx-auto sm:mx-0">
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="flex items-baseline text-gray-700 hover:text-gray-900">
              <svg className="mr-1 h-3 w-3" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.381 1.381A.875.875 0 1 1 7.62 2.62L3.112 7.125H15a.875.875 0 1 1 0 1.75H3.112l4.507 4.506A.875.875 0 1 1 6.38 14.62l-6-6a.872.872 0 0 1 0-1.238l6-6Z" />
              </svg>
              <span className="text-sm font-medium">KOKOLTHに戻る</span>
            </Link>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-600 mb-1">{productName}</h2>
            <p className="text-4xl font-semibold text-gray-900">{productPriceDisplay}</p>
          </div>
        </div>
      </div>

      {/* RIGHT (PAYMENT FORM) */}
      <div className="w-full sm:w-3/5 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="text-center text-gray-500 p-4">
              支払い情報を読み込めません(Client secretがありません)
            </div>
          )}
          <StripeFooter />
        </div>
      </div>
    </div>
  );
};

export default Payment;