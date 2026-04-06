'use client'
import Link from 'next/link'
import { ShoppingBag, Clock, AlertTriangle } from 'lucide-react'

/**
 * CHECKOUT — ON HOLD (Dev Environment)
 * Online ordering is intentionally disabled on this dev/preview build.
 * To enable: replace this page with the full CheckoutForm flow once
 * Stripe keys, Supabase DB, and fulfillment are production-ready.
 */
export default function CheckoutPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="text-center max-w-lg mx-auto px-4">

        {/* Dev-site notice */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 text-amber-800 rounded-xl px-5 py-4 mb-8 text-left text-sm">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Dev Environment — Checkout Disabled</p>
            <p className="mt-0.5 text-amber-700">
              This is a development/preview site. Online ordering is currently on hold
              and no real orders will be processed or fulfilled.
            </p>
          </div>
        </div>

        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
          <Clock className="h-10 w-10 text-primary-700" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">
          Online Ordering Coming Soon
        </h1>
        <p className="text-slate-500 mb-3">
          We&apos;re currently setting up our secure online store.
          Full checkout will be available once we launch.
        </p>
        <p className="text-slate-400 text-sm mb-8">
          In the meantime, please contact us directly to place an order or
          schedule a free discovery consultation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn-primary">Contact Us to Order</Link>
          <Link href="/shop" className="btn-secondary">
            <ShoppingBag className="h-4 w-4 mr-2 inline" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}

