'use client'
import Link from 'next/link'
import { ShoppingBag, Clock } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
          <Clock className="h-10 w-10 text-primary-700" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">
          Shop Coming Soon
        </h1>
        <p className="text-slate-500 mb-3">
          We&apos;re currently setting up our online store. Online ordering will be available very soon!
        </p>
        <p className="text-slate-400 text-sm mb-8">
          In the meantime, please contact us directly to place an order or schedule a consultation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn-primary">Contact Us</Link>
          <Link href="/shop" className="btn-secondary">Browse Products</Link>
        </div>
      </div>
    </div>
  )
}

