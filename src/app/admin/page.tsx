import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, ShoppingCart, DollarSign, Users, ArrowRight } from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/')

  const [{ count: productCount }, { count: orderCount }, { count: userCount }, { data: recentOrders }, { data: revenue }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('id, total, status, created_at, shipping_address').order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('total').eq('status', 'delivered'),
  ])

  const totalRevenue = (revenue || []).reduce((sum: number, o: any) => sum + Number(o.total), 0)

  const stats = [
    { label: 'Active Products', value: productCount || 0, icon: Package, href: '/admin/products', color: 'bg-primary-50 text-primary-700' },
    { label: 'Total Orders', value: orderCount || 0, icon: ShoppingCart, href: '/admin/orders', color: 'bg-gold-50 text-gold-700' },
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, href: '/admin/orders', color: 'bg-green-50 text-green-700' },
    { label: 'Customers', value: userCount || 0, icon: Users, href: '#', color: 'bg-blue-50 text-blue-700' },
  ]

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your store and orders</p>
          </div>
          <Link href="/admin/products/new" className="btn-primary flex items-center space-x-2 text-sm">
            <Package className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(stat => {
            const Icon = stat.icon
            return (
              <Link key={stat.label} href={stat.href} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow card-hover">
                <div className={'w-12 h-12 rounded-xl flex items-center justify-center mb-4 ' + stat.color}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-slate-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-primary-700 text-sm font-medium hover:text-primary-900 flex items-center space-x-1">
                <span>View All</span><ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {!recentOrders || recentOrders.length === 0 ? (
              <p className="text-slate-500 text-sm py-4 text-center">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">#{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-slate-400 text-xs">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={'px-2.5 py-1 rounded-full text-xs font-semibold ' + (statusColors[order.status] || 'bg-slate-100 text-slate-600')}>{order.status}</span>
                      <span className="font-bold text-slate-900 text-sm">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-slate-900">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              {[
                { href: '/admin/products', label: 'Manage Products', desc: 'Add, edit, or remove supplements', icon: Package },
                { href: '/admin/orders', label: 'Manage Orders', desc: 'Update order status and tracking', icon: ShoppingCart },
                { href: '/admin/products/new', label: 'Add New Product', desc: 'Create a new supplement listing', icon: Package },
              ].map(action => {
                const Icon = action.icon
                return (
                  <Link key={action.href} href={action.href} className="flex items-center space-x-4 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{action.label}</p>
                      <p className="text-slate-500 text-xs">{action.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

