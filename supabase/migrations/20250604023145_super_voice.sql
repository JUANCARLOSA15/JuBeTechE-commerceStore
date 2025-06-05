/*
  # Add stock and active fields to products table

  1. Changes
    - Add stock column to products table
    - Add active column to products table
    - Update existing products with default values
*/

ALTER TABLE products
ADD COLUMN IF NOT EXISTS stock integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;

-- Update existing products with some stock
UPDATE products SET stock = 50 WHERE stock = 0;