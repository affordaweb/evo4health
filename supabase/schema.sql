-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'supplements',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  weight_oz DECIMAL(6,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  tracking_number TEXT,
  carrier TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can read active products" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins can do everything with products" ON products USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can see own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all orders" ON orders USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can see items for their orders" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can see all order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, images, category, stock_quantity, weight_oz) VALUES
('Omega-3 Complete', 'omega-3-complete', 'Premium ultra-pure fish oil providing EPA and DHA to support cardiovascular health, brain function, and inflammation reduction.', 'Premium fish oil for heart and brain health', 45.99, 59.99, ARRAY['/images/products/omega3.jpg'], 'supplements', 50, 8),
('Vitamin D3 + K2', 'vitamin-d3-k2', 'Synergistic combination of Vitamin D3 and K2 (MK-7) to support bone density, immune function, and cardiovascular health.', 'Bone and immune support duo', 34.99, 44.99, ARRAY['/images/products/vitamin-d.jpg'], 'supplements', 45, 4),
('Probiotic Elite 30B', 'probiotic-elite', 'Advanced 30 billion CFU probiotic formula with 10 clinically-studied strains. Supports gut health and immune function.', '30 billion CFU gut health formula', 52.99, 64.99, ARRAY['/images/products/probiotic.jpg'], 'supplements', 35, 4),
('Magnesium Glycinate', 'magnesium-glycinate', 'Highly bioavailable magnesium glycinate for optimal absorption. Supports deep sleep, muscle relaxation, and stress reduction.', 'Sleep, muscle, and stress support', 39.99, 49.99, ARRAY['/images/products/magnesium.jpg'], 'supplements', 60, 6),
('B-Complex Plus', 'b-complex-plus', 'Complete methylated B-vitamin complex for energy production, nerve function, and mood support.', 'Energy and nervous system support', 29.99, 39.99, ARRAY['/images/products/b-complex.jpg'], 'supplements', 40, 3),
('Adrenal Support Formula', 'adrenal-support', 'Adaptogenic blend featuring ashwagandha, rhodiola, and eleuthero to support healthy cortisol levels and stress resilience.', 'Adaptogen blend for stress resilience', 48.99, 62.99, ARRAY['/images/products/adrenal.jpg'], 'supplements', 30, 5);
