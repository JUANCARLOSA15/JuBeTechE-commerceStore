import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const paperTypes = [
  { id: 'bond', name: 'Papel Bond', priceMultiplier: 1 },
  { id: 'couche', name: 'Papel Couché', priceMultiplier: 1.5 },
  { id: 'cartulina', name: 'Cartulina', priceMultiplier: 2 },
  { id: 'fotografico', name: 'Papel Fotográfico', priceMultiplier: 2.5 }
];

export const paperSizes = [
  { id: 'a4', name: 'A4 (210 x 297 mm)', priceMultiplier: 1 },
  { id: 'a3', name: 'A3 (297 x 420 mm)', priceMultiplier: 2 },
  { id: 'a5', name: 'A5 (148 x 210 mm)', priceMultiplier: 0.7 },
  { id: 'carta', name: 'Carta (216 x 279 mm)', priceMultiplier: 1.2 }
];

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getAdminProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}