import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/supabaseAdmin';

// Supabase Admin initialize
const supabase = supabaseAdmin;

// Stripe Instance initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', 
});

// Webhook secret key
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Signature verification
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Process event based on type
  try {
    switch (event.type) {
      // Payment Intent Succeeded
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      // Payment Intent Failed
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      // Checkout Session Completed
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      // refund
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: '決済処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

// Handle Payment Success Processing
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // SELECT USER ID
    const userId = paymentIntent.metadata?.user_id;
    
    if (!userId) {
      console.error('ユーザーIDが見つかりませんでした');
    }

    const timestamp = new Date().toISOString();
    let receiptUrl:string | null = null;
    if (paymentIntent.latest_charge) {
      const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);
      receiptUrl = charge.receipt_url;
    }

    /* 
    id = transaction id (supabase automatically generated)
    user_id = user id (from metadata)
    external_id = payment intent id (from stripe)
    status = paid
    amount = payment amount
    currency = payment currency (jpy)
    method = payment method (card, paypay, etc)
    receipt_url = payment receipt url (from stripe)
    paid_at = payment date
    due_date = due date (if needed)
    created_at = created date
    updated_at = updated date
    is_deleted = false (default)
    */
   
    // INSERT success payment Info into DB
    const { error } = await supabase
      .from('payment')
      .insert({
        user_id: userId,
        external_id: paymentIntent.id,
        status: 'paid',
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        method: paymentIntent.payment_method_types?.[0] || 'unknown',
        receipt_url: receiptUrl,
        paid_at: timestamp,
        due_date: null,
        created_at: timestamp,
        updated_at: timestamp,
        is_deleted: false
      });

    if (error) {
      throw new Error(`Error inserting payment data: ${error.message}`);
    }
    
    console.log(`Payment ${paymentIntent.id} successfully recorded in Supabase`);
  } catch (error) {
    console.error(`Error handling successful payment: ${error}`);
    throw error;
  }
}

// Handle Payment Intent Failed
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent failed: ${paymentIntent.id}`);
  console.log(`Failure reason: ${paymentIntent.last_payment_error?.message}`);
  
  try {
    // INSERT failed payment Info into DB
    const { error } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        external_id: paymentIntent.id,
        status: 'paid',
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        method: paymentIntent.payment_method_types?.[0] || 'unknown',
        receipt_url: receiptUrl,
        paid_at: timestamp,
        due_date: null,
        created_at: timestamp,
        updated_at: timestamp,
        is_deleted: false



        payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount, 
        currency: paymentIntent.currency,
        status: 'failed',
        customer_id: paymentIntent.customer as string || null,
        customer_email: paymentIntent.receipt_email || null,
        payment_method: paymentIntent.payment_method_types?.[0] || null,
        error_message: paymentIntent.last_payment_error?.message || null,
        created_at: new Date(paymentIntent.created * 1000).toISOString(),
        metadata: paymentIntent.metadata || null
      });

    if (error) {
      throw new Error(`Error inserting failed payment data: ${error.message}`);
    }
    
    console.log(`Failed payment ${paymentIntent.id} recorded in Supabase`);
  } catch (error) {
    console.error(`Error handling failed payment: ${error}`);
    throw error;
  }
}

// 체크아웃 세션 완료 처리
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`Checkout session completed: ${session.id}`);
  
  try {
    // Stripe 결제 의도(Payment Intent) 가져오기
    if (session.payment_intent) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string
      );
      
      // Supabase payments 테이블에 체크아웃 세션 정보 저장
      const { error } = await supabase
        .from('payments')
        .insert({
          payment_intent_id: paymentIntent.id,
          session_id: session.id,
          amount: session.amount_total || paymentIntent.amount,
          currency: session.currency || paymentIntent.currency,
          status: paymentIntent.status,
          customer_id: session.customer as string || null,
          customer_email: session.customer_details?.email || null,
          payment_method: paymentIntent.payment_method_types?.[0] || null,
          created_at: new Date(session.created * 1000).toISOString(),
          metadata: session.metadata || null
        });

      if (error) {
        throw new Error(`Error inserting checkout session data: ${error.message}`);
      }
      
      console.log(`Checkout session ${session.id} recorded in Supabase`);
    }
  } catch (error) {
    console.error(`Error handling checkout session: ${error}`);
    throw error;
  }
}
