import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
  typescript: true,
});

interface CreatePaymentIntentParams {
  amount: number;
  currency: 'jpy'; 
  receiptEmail?: string;
  metadata?: Stripe.MetadataParam;
  customer?: string; 
  userName?: string;
}

export async function createPaymentIntent(params: CreatePaymentIntentParams) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency, 
      payment_method_types: ['card'], 
      receipt_email: params.receiptEmail, 
      metadata: params.metadata, 
      customer: params.customer,
      description: `${params.userName ?? 'Guest'} - KOKOLTH サービス料金`,
      statement_descriptor_suffix: "KOKOLTH",
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    throw error;
  }
}