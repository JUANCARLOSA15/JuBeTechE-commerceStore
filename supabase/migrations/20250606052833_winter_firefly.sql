/*
  # Update Products Table RLS Policies

  1. Changes
    - Remove existing RLS policies for products table
    - Add new RLS policies that check admin role via app_metadata
    - Add policy for public read access to active products
    
  2. Security
    - Admins can perform all operations on products
    - Public users can only read active products
    - Uses app_metadata for role checks instead of PostgreSQL roles
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;

-- Create new policies
CREATE POLICY "Admins can manage all products"
ON products
FOR ALL
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role')::text = 'admin');

CREATE POLICY "Anyone can view active products"
ON products
FOR SELECT
TO public
USING (active = true);