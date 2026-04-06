'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProductGrid from '@/components/shop/ProductGrid'
import type { Product } from '@/lib/types'

const categories = ['All', 'supplements', 'vitamins', 'minerals']

export default function ShopContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient()
        let query = supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
        if (category !== 'All') query = query.eq('category', category)
        const { data } = await query
        setProducts(data || [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  return (
    <section className="py-12 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2 flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={'px-4 py-2 rounded-full text-sm font-medium transition-all ' + (category === cat ? 'bg-primary-700 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300')}>
                {cat === 'All' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <ProductGrid products={products} loading={loading} />
      </div>
    </section>
  )
}
