'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import CheckoutForm from '@/components/shop/CheckoutForm'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  if (totalItems === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link href="/shop" className="btn-primary">Browse Supplements</Link>
        </div>
      </div>
    )
  }

  const shipping = totalPrice >= 75 ? 0 : 9.99
  const orderTotal = totalPrice + shipping

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold text-slate-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <CheckoutForm orderTotal={orderTotal} />
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.product.name} × {item.quantity}</span>
                  <span className="font-medium text-slate-900">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Subtotal</span><span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-primary-700">{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
