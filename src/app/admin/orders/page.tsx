'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Truck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatPrice, formatDate } from '@/lib/utils'
import type { Order } from '@/lib/types'

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({})

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
      setOrders(data || [])
      setLoading(false)
    }
    load()
  }, [])

  async function updateOrder(orderId: string, status: string, trackingNumber?: string) {
    setUpdating(orderId)
    const res = await fetch('/api/orders?id=' + orderId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, ...(trackingNumber ? { tracking_number: trackingNumber } : {}) }),
    })
    if (res.ok) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as any, ...(trackingNumber ? { tracking_number: trackingNumber } : {}) } : o))
    }
    setUpdating(null)
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <nav className="text-sm text-slate-500 mb-1">
              <Link href="/admin" className="hover:text-primary-700">Dashboard</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Orders</span>
            </nav>
            <h1 className="font-heading text-3xl font-bold text-slate-900">Orders</h1>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-slate-500 text-lg">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-bold text-slate-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-slate-500 text-sm">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-primary-700 text-lg">{formatPrice(order.total)}</span>
                    <span className={'px-3 py-1 rounded-full text-sm font-semibold ' + (statusColors[order.status] || 'bg-slate-100 text-slate-600')}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500 font-medium">Status:</span>
                    <select value={order.status} onChange={e => updateOrder(order.id, e.target.value)}
                      disabled={updating === order.id}
                      className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-slate-900">
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tracking #"
                      value={trackingInputs[order.id] ?? (order.tracking_number || '')}
                      onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                      className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 w-40"
                    />
                    <button
                      onClick={() => updateOrder(order.id, order.status, trackingInputs[order.id])}
                      disabled={updating === order.id || !trackingInputs[order.id]}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50 transition-colors">
                      Save
                    </button>
                  </div>
                </div>
                {order.shipping_address && (
                  <div className="mt-3 pt-3 border-t border-slate-50 text-xs text-slate-500">
                    Ship to: {(order.shipping_address as any).name}, {(order.shipping_address as any).city}, {(order.shipping_address as any).state}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
