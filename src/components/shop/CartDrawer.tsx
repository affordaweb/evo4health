'use client'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <div className={'fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ' + (open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-heading text-xl font-bold text-slate-900">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <ShoppingBag className="h-16 w-16 text-slate-300 mb-4" />
              <h3 className="font-heading text-xl font-semibold text-slate-500 mb-2">Your cart is empty</h3>
              <p className="text-slate-400 text-sm mb-6">Add supplements to get started</p>
              <Link href="/shop" onClick={onClose} className="btn-primary">Browse Supplements</Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex space-x-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-16 h-16 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 text-2xl overflow-hidden">
                      {item.product.images?.[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.name} width={64} height={64} className="object-cover" />
                      ) : '💊'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm truncate">{item.product.name}</h4>
                      <p className="text-primary-700 font-bold text-sm mt-0.5">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="p-1 hover:text-red-500 transition-colors flex-shrink-0">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-bold text-slate-900 text-lg">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  {totalPrice >= 75 ? '✓ Free shipping!' : 'Add ' + formatPrice(75 - totalPrice) + ' more for free shipping'}
                </p>
                <Link href="/checkout" onClick={onClose} className="block w-full text-center btn-gold text-base py-4">
                  Checkout
                </Link>
                <Link href="/cart" onClick={onClose} className="block w-full text-center mt-3 text-primary-700 text-sm hover:text-primary-900 transition-colors">
                  View Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
