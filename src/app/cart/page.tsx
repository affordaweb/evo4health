'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (totalItems === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <ShoppingBag className="h-20 w-20 text-slate-300 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
          <p className="text-slate-500 mb-8">Browse our practitioner-grade supplements to get started.</p>
          <Link href="/shop" className="btn-primary">Browse Supplements</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-4xl font-bold text-slate-900 mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-2xl p-6 shadow-sm flex items-center space-x-4">
                <div className="w-20 h-20 rounded-xl bg-primary-50 overflow-hidden flex-shrink-0">
                  {item.product.images?.[0] ? (
                    <Image src={item.product.images[0]} alt={item.product.name} width={80} height={80} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">💊</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.product.name}</h3>
                  <p className="text-primary-700 font-bold">{formatPrice(item.product.price)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{formatPrice(item.product.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.product.id)} className="text-red-400 hover:text-red-600 mt-1 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{totalPrice >= 75 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(9.99)}</span>
              </div>
              {totalPrice < 75 && (
                <p className="text-sm text-slate-500">Add {formatPrice(75 - totalPrice)} more for free shipping!</p>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg text-slate-900">
                <span>Total</span>
                <span className="text-primary-700">{formatPrice(totalPrice >= 75 ? totalPrice : totalPrice + 9.99)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full flex items-center justify-center space-x-2 text-center">
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/shop" className="mt-4 text-center text-sm text-primary-700 hover:text-primary-900 block">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
