'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const SITE_NAME = 'evo4health'

const serviceOptions = [
  'Functional Medicine Consultation',
  'Weight Loss Program',
  'Hormone Balancing',
  'Gut Health',
  'Supplement Consultation',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '', _honeypot: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form._honeypot) return
    setStatus('loading')
    try {
      const res = await fetch('https://contact-form-lake-theta.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.service + ': ' + form.message, site: SITE_NAME }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', service: '', message: '', _honeypot: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-heading font-bold text-primary-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600">We will get back to you within 1-2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="text" name="_honeypot" value={form._honeypot} onChange={e => setForm(f => ({ ...f, _honeypot: e.target.value }))} className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition" placeholder="your@email.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Service of Interest</label>
        <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition bg-white">
          <option value="">Select a service...</option>
          {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
        <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Tell us about your health goals or questions..." />
      </div>
      <button type="submit" disabled={status === 'loading'}
        className={cn('w-full btn-primary text-base py-4', status === 'loading' && 'opacity-70 cursor-not-allowed')}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>}
    </form>
  )
}
