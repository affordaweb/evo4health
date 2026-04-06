import Link from 'next/link'
import { Leaf, Facebook, Instagram, Mail, Phone } from 'lucide-react'

const services = [
  { label: 'Functional Medicine', href: '/services' },
  { label: 'Weight Loss', href: '/services' },
  { label: 'Hormone Balancing', href: '/services' },
  { label: 'Gut Health', href: '/services' },
  { label: 'Supplements', href: '/shop' },
]

const quickLinks = [
  { label: 'About Erin', href: '/about' },
  { label: 'Book Free Call', href: '/schedule' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
  { label: 'My Account', href: '/account' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-7 w-7 text-primary-400" />
              <div>
                <div className="font-heading font-bold text-xl text-white">Evolution</div>
                <div className="text-xs text-primary-300">Functional Medicine</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Helping you achieve lasting health through functional medicine, weight loss, and hormone optimization.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com/evolution4health" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-primary-900 rounded-full hover:bg-primary-700 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/evolution4health" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-primary-900 rounded-full hover:bg-primary-700 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-300 mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map(s => (
                <li key={s.label}>
                  <Link href={s.href} className="text-slate-400 hover:text-white text-sm transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary-300 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-slate-400 text-sm">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span>info@evolution4health.com</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-400 text-sm">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span>Schedule a call online</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-primary-300 font-semibold mb-1">Hours</p>
              <p className="text-slate-400 text-xs">Mon – Fri: 9am – 5pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Evolution Functional Medicine. All rights reserved.</p>
          <p className="text-slate-500 text-xs">Built by <a href="https://affordaweb.com" className="text-primary-400 hover:text-primary-300 transition-colors">AffordaWeb</a></p>
        </div>
      </div>
    </footer>
  )
}
