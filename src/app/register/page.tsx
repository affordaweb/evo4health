'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-6">✉️</div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">Check Your Email</h2>
          <p className="text-slate-600 mb-6">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          <Link href="/login" className="btn-primary">Go to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-primary-700" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join Evolution for personalized health.</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">{error}</div>
          )}
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900"
                placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900"
                placeholder="••••••••" />
              <p className="text-xs text-slate-400 mt-1">Minimum 6 characters</p>
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" /> : <UserPlus className="h-4 w-4" />}
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-700 hover:text-primary-900 font-semibold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
