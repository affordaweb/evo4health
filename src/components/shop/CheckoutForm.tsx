'use client'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export default function CheckoutForm() {
  return (
    <div className="text-center py-12">
      <Clock className="h-12 w-12 text-primary-700 mx-auto mb-4" />
      <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Online Orders Coming Soon</h3>
      <p className="text-slate-500 mb-6">Please contact us to place an order.</p>
      <Link href="/contact" className="btn-primary">Contact Us</Link>
    </div>
  )
}


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

function CheckoutFormInner() {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [address, setAddress] = useState<ShippingAddress>({
    full_name: '', address_line1: '', address_line2: '', city: '', state: '', zip_code: '', country: 'US',
  })

  const shippingCost = totalPrice >= 75 ? 0 : 9.99
  const total = totalPrice + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ price: i.product.price, quantity: i.quantity })),
          shipping_address: address,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Payment failed')

      const card = elements.getElement(CardElement)
      if (!card) throw new Error('Card element not found')

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: { card, billing_details: { name: address.full_name } },
      })

      if (result.error) throw new Error(result.error.message || 'Payment failed')

      clearCart()
      router.push('/account')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">Shipping Address</h3>
        <div className="space-y-4">
          <Input label="Full Name" required value={address.full_name} onChange={e => setAddress(a => ({ ...a, full_name: e.target.value }))} />
          <Input label="Address Line 1" required value={address.address_line1} onChange={e => setAddress(a => ({ ...a, address_line1: e.target.value }))} />
          <Input label="Address Line 2 (Optional)" value={address.address_line2 || ''} onChange={e => setAddress(a => ({ ...a, address_line2: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" required value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} />
            <Input label="State" required value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="ZIP Code" required value={address.zip_code} onChange={e => setAddress(a => ({ ...a, zip_code: e.target.value }))} />
            <Input label="Country" required value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">Payment</h3>
        <div className="p-4 border border-slate-300 rounded-lg">
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#1e293b' } } }} />
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
        <div className="flex justify-between text-sm"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
        <div className="flex justify-between font-bold text-base pt-2 border-t"><span>Total</span><span>{formatPrice(total)}</span></div>
      </div>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <button type="submit" disabled={loading || !stripe} className="w-full btn-gold text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed">
        {loading ? 'Processing...' : 'Place Order — ' + formatPrice(total)}
      </button>
    </form>
  )
}

export default function CheckoutForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner />
    </Elements>
  )
}
