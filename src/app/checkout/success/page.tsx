'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

function SuccessContent() {
  const params = useSearchParams()
  const { clearCart } = useCart()
  const [cleared, setCleared] = useState(false)
  const status = params.get('redirect_status')

  useEffect(() => {
    if (status === 'succeeded' && !cleared) {
      clearCart()
      setCleared(true)
    }
  }, [status, clearCart, cleared])

  if (status === 'succeeded') {
    return (
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
        <p className="text-slate-600 text-lg mb-2">Thank you for your purchase.</p>
        <p className="text-slate-500 mb-10">
          You&apos;ll receive a confirmation email shortly. We&apos;ll notify you when your order ships.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/account" className="btn-primary flex items-center justify-center gap-2">
            <Package className="h-4 w-4" /> View My Orders
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-primary-700 text-primary-700 font-semibold text-sm hover:bg-primary-700 hover:text-white transition-all duration-200 gap-2"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  if (status === 'processing') {
    return (
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
          <Package className="h-12 w-12 text-amber-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Payment Processing</h1>
        <p className="text-slate-600 mb-8">
          Your payment is being processed. We&apos;ll email you once it&apos;s confirmed.
        </p>
        <Link href="/" className="btn-primary">Go Home</Link>
      </div>
    )
  }

  return (
    <div className="text-center max-w-lg mx-auto px-4">
      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="h-12 w-12 text-red-600" />
      </div>
      <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Payment Issue</h1>
      <p className="text-slate-600 mb-8">
        There was a problem with your payment. Please try again.
      </p>
      <Link href="/checkout" className="btn-primary">Try Again</Link>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <Suspense
        fallback={
          <div className="text-center">
            <Loader2 className="h-10 w-10 text-primary-600 animate-spin mx-auto" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  )
}
