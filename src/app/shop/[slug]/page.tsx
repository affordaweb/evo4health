import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductDetailContent from './ProductDetailContent'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient()
  const { data } = await supabase.from('products').select('name, description').eq('slug', params.slug).single()
  if (!data) return { title: 'Product Not Found' }
  return {
    title: data.name + ' | Evolution Supplement Store',
    description: data.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const supabase = createServerClient()
  const { data: product } = await supabase.from('products').select('*').eq('slug', params.slug).eq('is_active', true).single()
  if (!product) notFound()
  return (
    <div className="pt-20">
      <ProductDetailContent product={product} />
    </div>
  )
}
