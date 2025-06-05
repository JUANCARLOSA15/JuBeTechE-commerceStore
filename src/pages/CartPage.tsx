import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    // In a real app, you would process payment here
    // For demo purposes, we'll just clear the cart and show success
    clearCart();
    setOrderComplete(true);
    
    // Reset and redirect after a delay
    setTimeout(() => {
      setOrderComplete(false);
      navigate('/');
    }, 5000);
  };

  if (orderComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">¡Pedido completado!</h1>
            <p className="text-gray-600 mb-8">
              Tu pedido ha sido procesado con éxito. Recibirás un correo electrónico con los detalles de tu compra.
            </p>
            <Link 
              to="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 inline-block"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">
              Parece que aún no has añadido ningún producto a tu carrito. ¡Explora nuestra tienda para encontrar algo especial!
            </p>
            <Link 
              to="/productos" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 inline-block"
            >
              Ir a la tienda
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </button>
            <h1 className="text-2xl font-bold">Mi Carrito</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {items.length} {items.length === 1 ? 'Producto' : 'Productos'}
                    </span>
                    <button 
                      onClick={() => clearCart()}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </div>
                
                <div>
                  {items.map(item => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;