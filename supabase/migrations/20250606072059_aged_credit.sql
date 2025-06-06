/*
  # Fix Admin RLS Policies

  1. Security Updates
    - Update RLS policies to use correct JWT claims structure
    - Fix permission denied errors for admin role access
    - Ensure proper authentication checks for admin operations

  2. Changes
    - Drop existing problematic policies
    - Create new policies with correct JWT claim access
    - Use user_metadata or app_metadata for role checking
*/

-- Drop existing problematic policies for products table
DROP POLICY IF EXISTS "Enable admin access to all products" ON products;
DROP POLICY IF EXISTS "Admins can manage all orders" ON orders;
DROP POLICY IF EXISTS "Admins can manage all print requests" ON print_requests;

-- Create new admin policies for products table using correct JWT structure
CREATE POLICY "Enable admin access to all products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    COALESCE(
      (auth.jwt() -> 'user_metadata' ->> 'role'),
      (auth.jwt() -> 'app_metadata' ->> 'role')
    ) = 'admin'
  )
  WITH CHECK (
    COALESCE(
      (auth.jwt() -> 'user_metadata' ->> 'role'),
      (auth.jwt() -> 'app_metadata' ->> 'role')
    ) = 'admin'
  );

-- Create new admin policies for orders table
CREATE POLICY "Admins can manage all orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (
    COALESCE(
      (auth.jwt() -> 'user_metadata' ->> 'role'),
      (auth.jwt() -> 'app_metadata' ->> 'role')
    ) = 'admin'
  )
  WITH CHECK (
    COALESCE(
      (auth.jwt() -> 'user_metadata' ->> 'role'),
      (auth.jwt() -> 'app_metadata' ->> 'role')
    ) = 'admin'
  );

-- Create new admin policies for print_requests table
CREATE POLICY "Admins can manage all print requests"
  ON print_requests
  FOR ALL
  TO authenticated
  USING (
    COALESCE(
      (auth.jwt() -> 'user_metadata' ->> 'role'),
      (auth.jwt() -> 'app_metadata' ->> 'role')
    ) = 'admin'
  )
  WITH CHECK (
    COALESCE(
      (auth.jwt() -> 'user_metadata' ->> 'role'),
      (auth.jwt() -> 'app_metadata' ->> 'role')
    ) = 'admin'
  );