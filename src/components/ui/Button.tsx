'use client'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2',
          variant === 'primary' && 'bg-primary-700 text-white hover:bg-primary-800 hover:shadow-lg focus:ring-primary-500',
          variant === 'gold' && 'bg-gold-600 text-white hover:bg-gold-700 hover:shadow-lg focus:ring-gold-500',
          variant === 'outline' && 'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white focus:ring-primary-500',
          variant === 'ghost' && 'text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
export default Button
