/*
  # Fix Products Table RLS Policies

  1. Changes
    - Remove existing RLS policies for products table
    - Add new policies that properly handle both public and admin access
    - Ensure public users can view active products
    - Maintain admin ability to manage all products
  
  2. Security
    - Enable RLS on products table
    - Add policy for public users to view active products
    - Add policy for admin users to manage all products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Admins can manage all products" ON products;

-- Create new policies
CREATE POLICY "Enable read access for active products"
ON products
FOR SELECT
TO public
USING (active = true);

CREATE POLICY "Enable admin access to all products"
ON products
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');