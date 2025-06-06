/*
  # Update products table policies

  1. Changes
    - Drop existing policies
    - Create new policies for public and authenticated access
    - Enable RLS on products table
    
  2. Security
    - Public users can only view active products
    - Authenticated users with admin role can manage all products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage all products" ON products;
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Admins can manage all products"
ON products
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can view active products"
ON products
FOR SELECT
TO public
USING (active = true);