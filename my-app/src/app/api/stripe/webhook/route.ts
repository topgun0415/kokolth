import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialize
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Stripe 인스턴스 초기화
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
});

// Webhook secret key
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // 서명 검증
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // 이벤트 타입에 따른 처리
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      // 다른 이벤트 핸들러는 필요한 경우 구현
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(`Error processing webhook: ${error}`);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// 결제 성공 처리
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
  
  try {
    // Supabase payments 테이블에 결제 정보 저장
    const { error } = await supabase
      .from('payments')
      .insert({
        payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'succeeded',
        customer_id: paymentIntent.customer as string || null,
        customer_email: paymentIntent.receipt_email || null,
        payment_method: paymentIntent.payment_method_types?.[0] || null,
        created_at: new Date(paymentIntent.created * 1000).toISOString(),
        metadata: paymentIntent.metadata || null
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

// 결제 실패 처리
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`PaymentIntent failed: ${paymentIntent.id}`);
  console.log(`Failure reason: ${paymentIntent.last_payment_error?.message}`);
  
  try {
    // Supabase payments 테이블에 실패한 결제 정보 저장
    const { error } = await supabase
      .from('payments')
      .insert({
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
