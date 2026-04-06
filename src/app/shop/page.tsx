import type { Metadata } from 'next'
import ShopContent from './ShopContent'

export const metadata: Metadata = {
  title: 'Supplement Store | Evolution Functional Medicine',
  description: 'Shop practitioner-grade private label supplements exclusively available from Evolution Functional Medicine.',
}

export default function ShopPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-primary-300 mb-4">
            <span>Home</span> <span className="mx-2">/</span> <span className="text-white">Shop</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Supplement Store</h1>
          <p className="text-primary-200 text-lg max-w-2xl">
            Practitioner-grade private label supplements, exclusively available to Evolution patients and the public.
          </p>
        </div>
      </section>
      <ShopContent />
    </div>
  )
}
