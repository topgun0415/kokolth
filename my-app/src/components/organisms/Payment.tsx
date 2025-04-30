'use client';

import React, { useState } from 'react';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
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
       
        return_url: window.location.origin + '/payment/success',
      },
    });
    if (error) {
      setErrorMessage(error.message || '결제 중 오류가 발생했습니다.');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || isLoading} style={{ marginTop: 16 }}>
        {isLoading ? '결제 처리 중...' : '결제하기'}
      </button>
      {errorMessage && <div style={{ color: 'red', marginTop: 8 }}>{errorMessage}</div>}
    </form>
  );
};

interface PaymentProps {
  clientSecret: string;
}

const Payment: React.FC<PaymentProps> = ({ clientSecret }) => {
  const options = {
    clientSecret,
    // appearance 등 옵션 커스터마이즈 가능
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
