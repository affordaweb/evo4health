import { redirect, notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'

interface Props {
  params: { id: string }
}

const statusSteps = [
  { status: 'pending', label: 'Order Placed', icon: Clock },
  { status: 'processing', label: 'Processing', icon: Package },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
]

export default async function OrderDetailPage({ params }: Props) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: order } = await supabase.from('orders').select('*, order_items(*, products(*))').eq('id', params.id).eq('user_id', user.id).single()
  if (!order) notFound()

  const currentStepIdx = statusSteps.findIndex(s => s.status === order.status)

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/account" className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 font-medium mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Account</span>
        </Link>
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900">Order Details</h1>
              <p className="text-slate-500 text-sm mt-1">#{order.id.slice(0, 8).toUpperCase()} • {formatDate(order.created_at)}</p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 capitalize">{order.status}</span>
          </div>
          <div className="flex justify-between mb-8">
            {statusSteps.map((step, i) => {
              const Icon = step.icon
              const active = i <= currentStepIdx
              return (
                <div key={step.status} className="flex flex-col items-center flex-1">
                  <div className={'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ' + (active ? 'bg-primary-700 border-primary-700 text-white' : 'bg-white border-slate-200 text-slate-400')}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={'text-xs mt-2 text-center ' + (active ? 'text-primary-700 font-semibold' : 'text-slate-400')}>{step.label}</p>
                  {i < statusSteps.length - 1 && (
                    <div className={'hidden sm:block absolute'} />
                  )}
                </div>
              )
            })}
          </div>
          {order.tracking_number && (
            <div className="p-4 bg-primary-50 rounded-xl mb-6">
              <p className="text-sm font-semibold text-primary-900">Tracking Number: <span className="font-mono text-primary-700">{order.tracking_number}</span></p>
            </div>
          )}
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Items Ordered</h2>
          <div className="space-y-3 mb-6">
            {order.order_items?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b border-slate-50">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{item.products?.name || 'Product'}</p>
                  <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-900 text-sm">{formatPrice(item.unit_price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2 border-t">
            <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary-700">{formatPrice(order.total)}</span></div>
          </div>
        </div>
        {order.shipping_address && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-3">Shipping Address</h2>
            <p className="text-slate-600 text-sm whitespace-pre-line">{JSON.stringify(order.shipping_address, null, 2).replace(/[{}"]/g, '').replace(/,\n/g, '\n').trim()}</p>
          </div>
        )}
      </div>
    </div>
  )
}
