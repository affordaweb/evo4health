import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Package } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

export default async function AdminProductsPage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/')

  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <nav className="text-sm text-slate-500 mb-1">
              <Link href="/admin" className="hover:text-primary-700">Dashboard</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Products</span>
            </nav>
            <h1 className="font-heading text-3xl font-bold text-slate-900">Products</h1>
          </div>
          <Link href="/admin/products/new" className="btn-primary flex items-center space-x-2 text-sm">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </div>

        {!products || products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-bold text-slate-700 mb-2">No products yet</h2>
            <p className="text-slate-500 mb-6">Add your first supplement to get started.</p>
            <Link href="/admin/products/new" className="btn-primary">Add First Product</Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Product</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Price</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Stock</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(products as Product[]).map(product => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                        <p className="text-slate-400 text-xs truncate max-w-xs">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 capitalize">{product.category || '—'}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary-700">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{product.stock_quantity}</td>
                    <td className="px-6 py-4">
                      <span className={'px-2.5 py-1 rounded-full text-xs font-semibold ' + (product.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600')}>
                        {product.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={'/admin/products/' + product.id + '/edit'} className="p-2 rounded-lg hover:bg-primary-50 text-slate-400 hover:text-primary-700 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <form action={'/api/products?id=' + product.id} method="DELETE">
                          <button type="submit" className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
