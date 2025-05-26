import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseClient } from '@/lib/supabase/supabaseClient';

// Supabase Admin initialize
const supabase = supabaseClient;

// Stripe Instance initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', 
});

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    
    // Fixed Price ID and Amount
    const fixedPriceId = process.env.STRIPE_FIXED_PRICE_ID;
    const fixedAmount = 2000; // 2000 yen
    
    // Check if the user exists
    if (!userId) {
      return NextResponse.json(
        { error: 'ユーザー情報が必要です' },
        { status: 400 }
      );
    }

    const { data: userData, error: userError } = await supabase
        .from('user')
        .select('id, email, name')
        .eq('id', userId)
        .single();
    
    if (userError || !userData) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: fixedPriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`, 
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      customer_email: userData.email,
      metadata: {
        userId,
      },
    });

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

    // Save Payment Information (Using Fixed Information)
    await supabase.from('payment').insert({
      user_id: userData.id,
      amount: fixedAmount, 
      stripe_session_id: session.id,
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    
    if (error instanceof Stripe.errors.StripeCardError) {
      return NextResponse.json(
        { error: 'カード情報に問題があります', details: error.message },
        { status: 400 }
      );
    
    } else if (error instanceof Stripe.errors.StripeInvalidRequestError) {
      return NextResponse.json(
        { error: '不正なリクエストです', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: '決済処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

// API TEST ENDPOINT
export async function GET() {
  return NextResponse.json(
    { message: 'Stripe test API success' },
    { status: 200 }
  );
  
}