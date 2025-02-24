import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
});

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature') as string;
  const bodyText = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(bodyText, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { error } = await supabase
      .from('users')
      .update({ subscription_status: 'active' })
      .eq('stripe_customer_id', session.customer);
    if (error) {
      console.error('Supabase update error:', error);
    }
  }

  return NextResponse.json({ received: true });
}
