'use client'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export default function CheckoutForm() {
  return (
    <div className="text-center py-12">
      <Clock className="h-12 w-12 text-primary-700 mx-auto mb-4" />
      <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Online Orders Coming Soon</h3>
      <p className="text-slate-500 mb-6">Please contact us to place an order.</p>
      <Link href="/contact" className="btn-primary">Contact Us</Link>
    </div>
  )
}
