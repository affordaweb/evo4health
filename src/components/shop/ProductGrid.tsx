'use client'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/types'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

const PLACEHOLDER_PRODUCTS: Product[] = [
  { id: '1', name: 'Omega-3 Complete', slug: 'omega-3-complete', description: 'Premium ultra-pure fish oil providing EPA and DHA.', short_description: 'Premium fish oil for heart and brain health', price: 45.99, compare_at_price: 59.99, images: [], category: 'supplements', stock_quantity: 50, is_active: true, created_at: '', updated_at: '' },
  { id: '2', name: 'Vitamin D3 + K2', slug: 'vitamin-d3-k2', description: 'Synergistic combination of Vitamin D3 and K2.', short_description: 'Bone and immune support duo', price: 34.99, compare_at_price: 44.99, images: [], category: 'supplements', stock_quantity: 45, is_active: true, created_at: '', updated_at: '' },
  { id: '3', name: 'Probiotic Elite 30B', slug: 'probiotic-elite', description: 'Advanced 30 billion CFU probiotic formula.', short_description: '30 billion CFU gut health formula', price: 52.99, compare_at_price: 64.99, images: [], category: 'supplements', stock_quantity: 35, is_active: true, created_at: '', updated_at: '' },
  { id: '4', name: 'Magnesium Glycinate', slug: 'magnesium-glycinate', description: 'Highly bioavailable magnesium glycinate.', short_description: 'Sleep, muscle, and stress support', price: 39.99, compare_at_price: 49.99, images: [], category: 'supplements', stock_quantity: 60, is_active: true, created_at: '', updated_at: '' },
  { id: '5', name: 'B-Complex Plus', slug: 'b-complex-plus', description: 'Complete methylated B-vitamin complex.', short_description: 'Energy and nervous system support', price: 29.99, compare_at_price: 39.99, images: [], category: 'supplements', stock_quantity: 40, is_active: true, created_at: '', updated_at: '' },
  { id: '6', name: 'Adrenal Support Formula', slug: 'adrenal-support', description: 'Adaptogenic blend for stress resilience.', short_description: 'Adaptogen blend for stress resilience', price: 48.99, compare_at_price: 62.99, images: [], category: 'supplements', stock_quantity: 30, is_active: true, created_at: '', updated_at: '' },
]

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-slate-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-6 bg-slate-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const displayProducts = products.length > 0 ? products : PLACEHOLDER_PRODUCTS

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
