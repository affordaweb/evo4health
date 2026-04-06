import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutErinSection from '@/components/home/AboutErinSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection'
import DiscoveryCallCTA from '@/components/home/DiscoveryCallCTA'
import SupplementsPreview from '@/components/home/SupplementsPreview'
import SchemaMarkup from '@/components/SchemaMarkup'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Evolution | Functional Medicine, Weight Loss & Hormones',
  description: 'Erin and her team at Evolution specialize in functional medicine, weight loss, and hormone balancing. Book your free 15-minute discovery call today.',
}

export default function HomePage() {
  return (
    <>
      <SchemaMarkup />
      <HeroSection />
      <ServicesSection />
      <AboutErinSection />
      <TestimonialsSection />
      <GoogleReviewsSection />
      <DiscoveryCallCTA />
      <SupplementsPreview />
      <section className="py-12 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <p className="text-xl font-heading font-semibold mb-4">Questions? We would love to hear from you.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-primary-700 transition-all duration-200">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
