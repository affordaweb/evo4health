'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Star, CheckCircle } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export default function ProductDetailContent({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 font-medium mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Shop</span>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex justify-center">
          <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 shadow-xl">
            {product.images?.[0] ? (
              <Image src={product.images[0]} alt={product.name} width={480} height={480} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-8xl">💊</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          
          <h1 className="font-heading text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
          <div className="flex items-center space-x-1 mb-6">
            {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-gold-400 text-gold-400" />)}
            <span className="text-sm text-slate-500 ml-2">Practitioner Grade</span>
          </div>
          <p className="text-3xl font-bold text-primary-700 mb-6">{formatPrice(product.price)}</p>
          <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-slate-200 rounded-full overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-slate-600 hover:bg-slate-50 font-bold text-lg">-</button>
              <span className="px-4 py-2 font-semibold text-slate-900 min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 font-bold text-lg">+</button>
            </div>
          </div>
          <button onClick={handleAdd} className={'flex items-center justify-center space-x-3 w-full rounded-full py-4 font-bold text-lg transition-all duration-200 ' + (added ? 'bg-green-600 text-white' : 'bg-primary-700 text-white hover:bg-primary-800 hover:shadow-xl hover:scale-[1.02]')}>
            <ShoppingCart className="h-5 w-5" />
            <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
          </button>
          <p className="text-center text-sm text-slate-500 mt-4">Free shipping on orders over $75</p>
        </div>
      </div>
    </div>
  )
}

