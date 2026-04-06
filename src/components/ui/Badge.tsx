import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variant === 'default' && 'bg-slate-100 text-slate-700',
      variant === 'success' && 'bg-green-100 text-green-700',
      variant === 'warning' && 'bg-yellow-100 text-yellow-700',
      variant === 'error' && 'bg-red-100 text-red-700',
      variant === 'info' && 'bg-primary-100 text-primary-700',
      className
    )}>
      {children}
    </span>
  )
}
