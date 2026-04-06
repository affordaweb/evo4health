import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Providers'
import DevBanner from '@/components/DevBanner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://evo4health.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Evolution | Functional Medicine, Weight Loss & Hormones | Erin',
    template: '%s | Evolution Functional Medicine',
  },
  description: 'Erin and her team at Evolution specialize in functional medicine, weight loss, and hormone balancing. Book your free 15-minute discovery call today.',
  keywords: ['functional medicine', 'weight loss', 'hormones', 'Erin', 'Evolution', 'holistic health', 'supplements'],
  authors: [{ name: 'Evolution Functional Medicine', url: BASE_URL }],
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Evolution Functional Medicine',
    title: 'Evolution | Functional Medicine, Weight Loss & Hormones',
    description: 'Erin and her team at Evolution specialize in functional medicine, weight loss, and hormone balancing.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Evolution Functional Medicine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolution | Functional Medicine, Weight Loss & Hormones',
    description: 'Erin and her team at Evolution specialize in functional medicine, weight loss, and hormone balancing.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  return (
    <html lang="en" className={inter.variable + ' ' + playfair.variable}>
      <body className="font-sans bg-white text-slate-900 antialiased">
        {/* DEV ENVIRONMENT NOTICE — remove DevBanner before going live */}
        <DevBanner />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
