export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  compare_at_price?: number
  images: string[]
  category: string
  stock_quantity: number
  is_active: boolean
  weight_oz?: number
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address: ShippingAddress
  stripe_payment_intent_id: string
  tracking_number?: string
  carrier?: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  unit_price: number
}

export interface ShippingAddress {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  zip_code: string
  country: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: 'user' | 'admin'
  created_at: string
}
