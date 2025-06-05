/*
  # Create print requests table

  1. New Tables
    - `print_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text, optional)
      - `status` (enum: pending, processing, completed)
      - `file_url` (text)
      - `print_config` (json with printing configuration)
      - `total_amount` (numeric)

  2. Security
    - Enable RLS on print_requests table
    - Add policies for:
      - Customers can view their own print requests
      - Admin users can manage all print requests
*/

CREATE TABLE IF NOT EXISTS print_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'completed')) DEFAULT 'pending',
  file_url text NOT NULL,
  print_config jsonb NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount >= 0)
);

-- Enable Row Level Security
ALTER TABLE print_requests ENABLE ROW LEVEL SECURITY;

-- Allow customers to view their own print requests
CREATE POLICY "Customers can view their own print requests"
  ON print_requests
  FOR SELECT
  TO authenticated
  USING (customer_email = auth.jwt() ->> 'email');

-- Allow admins to manage all print requests
CREATE POLICY "Admins can manage all print requests"
  ON print_requests
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');