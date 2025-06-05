import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { getProducts } from '../data/products';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const categories = ['todos', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = !category || category === 'todos' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Nuestros Productos</h1>
          <p className="text-blue-100 max-w-3xl">
            Explora nuestra colección de productos personalizables. Desde polos y tazas hasta 
            cuadernos y cuadros decorativos, tenemos todo lo que necesitas para regalar o personalizar.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="flex overflow-x-auto pb-3 md:pb-0 mb-4 md:mb-0 -mx-4 px-4 md:px-0 md:mx-0">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
                  category === cat || (!category && cat === 'todos')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setCategory(cat === 'todos' ? null : cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">
              Intenta con otra búsqueda o categoría.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;