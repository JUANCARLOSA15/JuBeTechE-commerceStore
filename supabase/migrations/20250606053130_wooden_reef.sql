/*
  # Fix Products Table RLS Policies

  1. Changes
    - Drop existing policies that were causing errors
    - Create new policies for admin access and public viewing
    - Ensure proper role checking using app_metadata

  2. Security
    - Enable RLS on products table
    - Add policy for admin users to manage all products
    - Add policy for public users to view active products
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
USING (
  (auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin'
)
WITH CHECK (
  (auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin'
);

CREATE POLICY "Anyone can view active products"
ON products
FOR SELECT
TO public
USING (active = true);