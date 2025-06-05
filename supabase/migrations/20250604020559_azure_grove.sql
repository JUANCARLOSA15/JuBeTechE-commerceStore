/*
  # Insert sample products

  1. Changes
    - Insert sample products into the products table with different categories:
      - Ropa (clothing)
      - Accesorios (accessories)
      - Papelería (stationery)
    
  2. Data
    - Each product includes:
      - Name
      - Description
      - Price
      - Category
      - Image URL
      - Customizable flag
*/

-- Ropa
INSERT INTO products (name, description, price, category, image, customizable) VALUES
(
  'Polo Personalizado',
  'Polo de algodón 100% personalizable con tu diseño favorito. Disponible en varios colores y tallas.',
  49.90,
  'ropa',
  'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
  true
),
(
  'Polera con Capucha',
  'Polera con capucha perfecta para el invierno. Personalízala con tu texto o diseño preferido.',
  89.90,
  'ropa',
  'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
  true
),
(
  'Gorra Personalizada',
  'Gorra de alta calidad personalizable con tu logo o diseño. Ajuste regulable.',
  29.90,
  'ropa',
  'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
  true
);

-- Accesorios
INSERT INTO products (name, description, price, category, image, customizable) VALUES
(
  'Taza Mágica',
  'Taza que cambia de color con bebidas calientes. Personalízala con fotos o mensajes especiales.',
  24.90,
  'accesorios',
  'https://images.pexels.com/photos/1793034/pexels-photo-1793034.jpeg',
  true
),
(
  'Mouse Pad Personalizado',
  'Mouse pad ergonómico con superficie suave. Añade tu foto o diseño favorito.',
  19.90,
  'accesorios',
  'https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg',
  true
),
(
  'Llavero Personalizado',
  'Llavero de acrílico personalizable con fotos o texto. Resistente y duradero.',
  12.90,
  'accesorios',
  'https://images.pexels.com/photos/1020997/pexels-photo-1020997.jpeg',
  true
);

-- Papelería
INSERT INTO products (name, description, price, category, image, customizable) VALUES
(
  'Cuaderno Personalizado',
  'Cuaderno A5 con tapa dura personalizable. 200 páginas de papel bond de alta calidad.',
  34.90,
  'papeleria',
  'https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg',
  true
),
(
  'Agenda 2025',
  'Agenda anual con páginas para notas y calendario. Personaliza la portada con tu diseño.',
  39.90,
  'papeleria',
  'https://images.pexels.com/photos/1809342/pexels-photo-1809342.jpeg',
  true
),
(
  'Set de Libretas',
  'Set de 3 libretas pequeñas personalizables. Perfectas para notas y recordatorios.',
  29.90,
  'papeleria',
  'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg',
  true
);