import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById } from '../../data/products';
import { useCart } from '../../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productData = await getProductById(id);
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <button 
          onClick={() => navigate('/productos')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      quantity
    });
    
    navigate('/carrito');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => navigate('/productos')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver a productos
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl text-blue-600 font-bold mb-4">
            S/ {product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>
          
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              Cantidad
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 flex items-center justify-center rounded-l-lg"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                className="w-16 h-10 border-y border-gray-300 text-center focus:outline-none"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 flex items-center justify-center rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;