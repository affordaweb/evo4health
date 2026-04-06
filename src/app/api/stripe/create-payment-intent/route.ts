import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const { amount, items, subtotal, shipping, shippingAddress, userId } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      // Store order context in metadata so the webhook can create the order record
      metadata: {
        userId: userId ?? '',
        subtotal: String(subtotal ?? 0),
        shipping: String(shipping ?? 0),
        shippingAddress: JSON.stringify(shippingAddress ?? {}),
        items: JSON.stringify(
          (items ?? []).map((i: any) => ({
            id: i.product.id,
            name: i.product.name,
            image: i.product.images?.[0] ?? null,
            price: i.product.price,
            quantity: i.quantity,
          }))
        ),
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create payment intent' }, { status: 500 })
  }
}
