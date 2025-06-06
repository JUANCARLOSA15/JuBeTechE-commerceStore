/*
  # Arreglar permisos de productos - Solución simple

  1. Cambios
    - Eliminar todas las políticas RLS problemáticas
    - Crear políticas simples sin verificación de roles
    - Permitir acceso completo a usuarios autenticados
    - Mantener acceso público solo para lectura de productos activos

  2. Seguridad
    - Público puede ver productos activos
    - Usuarios autenticados pueden gestionar todos los productos
    - Sin verificaciones de roles complejas
*/

-- Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Public can read active products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Enable admin access to all products" ON products;
DROP POLICY IF EXISTS "Enable read access for active products" ON products;
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Admins can manage all products" ON products;

-- Deshabilitar RLS temporalmente para limpiar
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Volver a habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Crear políticas simples y funcionales
CREATE POLICY "Public can read active products"
  ON products
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);