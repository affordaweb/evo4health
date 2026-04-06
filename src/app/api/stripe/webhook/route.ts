import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent
    const metadata = pi.metadata

    try {
      const items = JSON.parse(metadata.items || '[]')
      const subtotal = parseFloat(metadata.subtotal || '0')
      const shipping = parseFloat(metadata.shipping || '0')
      const total = subtotal + shipping
      const shippingAddress = JSON.parse(metadata.shippingAddress || '{}')

      const { data: order } = await supabase.from('orders').insert({
        user_id: metadata.userId || null,
        status: 'processing',
        subtotal,
        shipping,
        total_amount: total,
        shipping_address: shippingAddress,
        stripe_payment_intent_id: pi.id,
      }).select().single()

      if (order && items.length > 0) {
        await supabase.from('order_items').insert(
          items.map((item: any) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
          }))
        )
        for (const item of items) {
          await supabase.rpc('decrement_stock', { p_id: item.id, qty: item.quantity }).catch(() => {})
        }
      }
    } catch (err) {
      console.error('Order creation failed:', err)
    }
  }

  return NextResponse.json({ received: true })
}

