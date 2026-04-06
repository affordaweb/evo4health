import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { User, ShoppingBag, LogOut, ArrowRight } from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'
import type { Order } from '@/lib/types'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: orders } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5)

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary-700" />
              </div>
              <p className="font-bold text-slate-900">{profile?.full_name || 'Patient'}</p>
              <p className="text-slate-500 text-sm truncate">{user.email}</p>
              {profile?.role === 'admin' && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">Admin</span>
              )}
            </div>
            <nav className="space-y-1">
              {[
                { href: '/account', label: 'My Orders', icon: ShoppingBag },
                { href: '/shop', label: 'Shop Supplements', icon: ShoppingBag },
                { href: '/schedule', label: 'Book a Call', icon: ArrowRight },
                ...(profile?.role === 'admin' ? [{ href: '/admin', label: 'Admin Dashboard', icon: ArrowRight }] : []),
              ].map(item => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} className="flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-600 hover:bg-primary-50 hover:text-primary-700 transition-colors text-sm">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors text-sm">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </form>
            </nav>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Recent Orders</h2>
              {!orders || orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 mb-4">No orders yet.</p>
                  <Link href="/shop" className="btn-primary text-sm">Shop Supplements</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {(orders as Order[]).map(order => (
                    <div key={order.id} className="border border-slate-100 rounded-xl p-4 flex items-center justify-between hover:border-primary-200 transition-colors">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{formatDate(order.created_at)}</p>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                        <span className={'px-2.5 py-1 rounded-full text-xs font-semibold ' + (statusColors[order.status] || 'bg-slate-100 text-slate-600')}>{order.status}</span>
                        <span className="font-bold text-primary-700 text-sm">{formatPrice(order.total_amount)}</span>
                        <Link href={'/account/orders/' + order.id} className="text-primary-700 hover:text-primary-900">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                  <Link href="/shop" className="inline-block mt-2 text-sm text-primary-700 hover:text-primary-900 font-medium">View All Orders →</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

