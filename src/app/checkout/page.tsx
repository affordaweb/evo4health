'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import type { ShippingAddress } from '@/lib/types'
import { ShoppingBag, ArrowLeft, Lock, ChevronRight, Shield } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm'

function PaymentForm({ onBack }: { onBack: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessing(true)
    setError('')

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Lock className="h-4 w-4" />
        {processing ? 'Processing...' : 'Complete Purchase'}
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center justify-center gap-1"
      >
        <ArrowLeft className="h-3 w-3" /> Back to shipping
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart()
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [address, setAddress] = useState<ShippingAddress>({
    full_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'US',
  })

  const shipping = totalPrice >= 75 ? 0 : 9.99
  const total = totalPrice + shipping

  if (totalItems === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <ShoppingBag className="h-20 w-20 text-slate-300 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
          <p className="text-slate-500 mb-8">Add some supplements before checking out.</p>
          <Link href="/shop" className="btn-primary">Browse Supplements</Link>
        </div>
      </div>
    )
  }

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, items, subtotal: totalPrice, shipping, shippingAddress: address }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setClientSecret(data.clientSecret)
      setStep('payment')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to initialize checkout.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header / breadcrumb */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/cart" className="flex items-center gap-2 text-slate-600 hover:text-primary-700 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className={`font-medium ${step === 'shipping' ? 'text-primary-700' : 'text-slate-400'}`}>
              1. Shipping
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className={`font-medium ${step === 'payment' ? 'text-primary-700' : 'text-slate-400'}`}>
              2. Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {step === 'shipping' ? (
                <>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input name="full_name" value={address.full_name} onChange={handleField} required placeholder="Jane Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Address Line 1</label>
                      <input name="address_line1" value={address.address_line1} onChange={handleField} required placeholder="123 Main Street" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Address Line 2 <span className="text-slate-400">(optional)</span>
                      </label>
                      <input name="address_line2" value={address.address_line2} onChange={handleField} placeholder="Apt, suite, unit…" className={inputCls} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                        <input name="city" value={address.city} onChange={handleField} required placeholder="New York" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                        <input name="state" value={address.state} onChange={handleField} required placeholder="NY" maxLength={2} className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                        <input name="zip_code" value={address.zip_code} onChange={handleField} required placeholder="10001" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                        <select name="country" value={address.country} onChange={handleField} className={inputCls}>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                        </select>
                      </div>
                    </div>
                    {error && (
                      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing…' : <><span>Continue to Payment</span><ChevronRight className="h-4 w-4" /></>}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Payment</h2>
                  <p className="text-slate-500 text-sm mb-6 flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-green-600" />
                    Secured by Stripe — your info is encrypted
                  </p>
                  {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                      <PaymentForm onBack={() => setStep('shipping')} />
                    </Elements>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
              <h2 className="font-heading text-lg font-bold text-slate-900 mb-5">Order Summary</h2>
              <div className="space-y-4 mb-5 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 text-xl overflow-hidden">
                      {item.product.images?.[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.name} width={48} height={48} className="rounded-lg object-cover w-full h-full" />
                      ) : '💊'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span><span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(shipping)}</span>
                </div>
                {totalPrice < 75 && (
                  <p className="text-xs text-primary-600 bg-primary-50 rounded-lg px-3 py-2">
                    Add {formatPrice(75 - totalPrice)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t text-base">
                  <span>Total</span>
                  <span className="text-primary-700">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-slate-400 border-t pt-4">
                <Lock className="h-3 w-3" />
                <span>SSL encrypted · Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

