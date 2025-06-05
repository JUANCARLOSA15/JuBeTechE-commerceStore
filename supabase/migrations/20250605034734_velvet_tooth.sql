/*
  # Fix Products Table RLS Policies

  1. Changes
    - Drop existing RLS policies for products table
    - Add new RLS policies for products table that properly handle admin access
    
  2. Security
    - Enable RLS on products table
    - Add policies for:
      - Admins can manage all products
      - Public can view active products
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;

-- Re-enable RLS (in case it was disabled)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Admins can manage all products"
ON products
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Anyone can view active products"
ON products
FOR SELECT
TO public
USING (
  active = true
);