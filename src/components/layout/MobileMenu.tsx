'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { X, Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/shop', label: 'Shop' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <div className={cn(
        'fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary-700" />
            <span className="font-heading font-bold text-primary-700">Evolution</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-6 space-y-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={onClose}
              className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 pb-6 space-y-3">
          <Link href="/schedule" onClick={onClose}
            className="block w-full text-center btn-gold">
            Book Free Discovery Call
          </Link>
          <Link href="/account" onClick={onClose}
            className="block w-full text-center px-6 py-3 border-2 border-primary-700 text-primary-700 rounded-full font-semibold text-sm hover:bg-primary-700 hover:text-white transition-colors">
            My Account
          </Link>
        </div>
      </div>
    </>
  )
}
