'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ShoppingCart, User, Leaf, Phone } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/shop', label: 'Shop' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/contact', label: 'Contact' },
]

// Only the home page hero starts at y=0 behind the fixed navbar.
// All other pages use pt-20, so the area behind the navbar is the white body — transparent nav would hide text.
const DARK_HERO_PREFIXES = ['/']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems } = useCart()
  const pathname = usePathname()

  const hasDarkHero = DARK_HERO_PREFIXES.some(
    p => pathname === p || (p !== '/' && pathname.startsWith(p))
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const solid = scrolled || !hasDarkHero

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      solid ? 'bg-white shadow-md' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <Leaf className={cn('h-8 w-8 transition-colors', solid ? 'text-primary-700' : 'text-white')} />
            <div>
              <div className={cn('font-heading font-bold text-xl leading-tight transition-colors', solid ? 'text-primary-700' : 'text-white')}>
                Evolution
              </div>
              <div className={cn('text-xs leading-tight transition-colors', solid ? 'text-slate-500' : 'text-primary-200')}>
                Functional Medicine
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={cn('text-sm font-medium transition-colors hover:text-primary-500', solid ? 'text-slate-700' : 'text-white')}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className={cn('h-5 w-5 transition-colors', solid ? 'text-slate-700' : 'text-white')} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/account" className="p-2">
              <User className={cn('h-5 w-5 transition-colors', solid ? 'text-slate-700' : 'text-white')} />
            </Link>
            <a href="tel:+18133335593" className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-gold-600 text-white text-sm font-semibold hover:bg-gold-700 transition-all duration-200 hover:shadow-lg gap-2 animate-ring-pulse">
              <Phone className="h-4 w-4 text-white animate-phone-ring flex-shrink-0" />
              Call Us (813) 333-5593
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)}>
              <Menu className={cn('h-6 w-6 transition-colors', solid ? 'text-slate-700' : 'text-white')} />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
