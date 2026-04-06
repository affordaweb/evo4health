import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-2xl shadow-sm border border-slate-100',
      hover && 'transition-all duration-200 hover:shadow-xl hover:-translate-y-1',
      className
    )}>
      {children}
    </div>
  )
}
