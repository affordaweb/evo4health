'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden">
      <Link href={'/shop/' + product.slug}>
        <div className="relative aspect-square bg-primary-50 overflow-hidden">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl">💊</div>
          )}
          {product.compare_at_price && (
            <div className="absolute top-3 left-3 bg-gold-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </div>
          )}
          {product.stock_quantity === 0 && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-slate-500 font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link href={'/shop/' + product.slug}>
          <h3 className="font-heading font-bold text-slate-900 mb-1 hover:text-primary-700 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-slate-500 text-sm mb-3 line-clamp-2">{product.short_description}</p>
        <div className="flex items-center space-x-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 text-gold-500 fill-gold-500" />
          ))}
          <span className="text-xs text-slate-500 ml-1">(5.0)</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary-700">{formatPrice(product.price)}</span>
            {product.compare_at_price && (
              <span className="ml-2 text-sm text-slate-400 line-through">{formatPrice(product.compare_at_price)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock_quantity === 0}
            className="p-2.5 rounded-full bg-primary-700 text-white hover:bg-primary-800 transition-colors hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
