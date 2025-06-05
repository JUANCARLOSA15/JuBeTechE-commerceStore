/*
  # Add storage policies for product images

  1. Changes
    - Create products storage bucket
    - Add policy for authenticated users to upload images
    - Add policy for public access to view images

  2. Security
    - Only authenticated users can upload images
    - Only image files are allowed
    - Public read access for all images
*/

-- Create the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Policy to allow authenticated users to upload product images
create policy "Authenticated users can upload product images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'products' and
  (name like 'product-images/%') and
  (lower(name) like '%.jpg' or lower(name) like '%.jpeg' or lower(name) like '%.png' or lower(name) like '%.gif' or lower(name) like '%.webp')
);

-- Policy to allow public access to read product images
create policy "Public users can view product images"
on storage.objects for select
to public
using (bucket_id = 'products');