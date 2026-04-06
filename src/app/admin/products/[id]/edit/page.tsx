'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  params: { id: string }
}

export default function EditProductPage({ params }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', slug: '', description: '', price: '', stock_quantity: '', category: 'supplements', image_url: '', badge: '', is_active: true,
  })

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('products').select('*').eq('id', params.id).single()
      if (data) {
        setForm({
          name: data.name || '',
          slug: data.slug || '',
          description: data.description || '',
          price: String(data.price || ''),
          stock_quantity: String(data.stock_quantity || ''),
          category: data.category || 'supplements',
          image_url: data.image_url || '',
          badge: data.badge || '',
          is_active: data.is_active !== false,
        })
      }
      setFetching(false)
    }
    load()
  }, [params.id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/products?id=' + params.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock_quantity: parseInt(form.stock_quantity) }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed to update')
      }
      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/admin/products" className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 font-medium mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </Link>
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-8">Edit Product</h1>
        {error && <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Slug *</label>
              <input name="slug" value={form.slug} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 font-mono text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($) *</label>
              <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Quantity</label>
              <input name="stock_quantity" type="number" min="0" value={form.stock_quantity} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 bg-white">
                <option value="supplements">Supplements</option>
                <option value="vitamins">Vitamins</option>
                <option value="minerals">Minerals</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Badge (optional)</label>
              <input name="badge" value={form.badge} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL (optional)</label>
              <input name="image_url" value={form.image_url} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900" />
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" name="is_active" id="is_active" checked={form.is_active}
                onChange={e => setForm(prev => ({ ...prev, is_active: e.target.checked }))}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
              <label htmlFor="is_active" className="text-sm font-semibold text-slate-700">Active (visible in store)</label>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
            <Link href="/admin/products" className="btn-outline">Cancel</Link>
            <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2 disabled:opacity-60">
              {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : <Save className="h-4 w-4" />}
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
