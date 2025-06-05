import React, { useEffect, useState } from 'react';
import { Trash2, FileText } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { paperTypes, paperSizes } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeFromCart }) => {
  const [product, setProduct] = useState<any>(null);
  const { getProductDetails } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (item.productId !== 'print-service') {
        const productData = await getProductDetails(item.productId);
        setProduct(productData);
      }
    };
    fetchProduct();
  }, [item.productId, getProductDetails]);

  // Function to calculate item price
  const getItemPrice = (): number => {
    if (item.printJob) {
      return item.printJob.price;
    }
    return product?.price || 0;
  };

  const itemPrice = getItemPrice();
  const totalPrice = itemPrice * item.quantity;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center py-6 border-b border-gray-200">
      {/* Product Image or Print Job Icon */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mr-4 mb-4 md:mb-0">
        {item.printJob ? (
          <div className="w-full h-full flex items-center justify-center bg-blue-100">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
        ) : (
          product && (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          )
        )}
      </div>
      
      {/* Product Details */}
      <div className="flex-grow mr-4">
        {item.printJob ? (
          <>
            <h3 className="font-semibold text-lg mb-1">Servicio de Impresión</h3>
            <p className="text-gray-500 text-sm mb-2">
              Archivo: {item.printJob.fileName}
            </p>
            <div className="text-sm text-gray-600">
              <p>
                {item.printJob.printType === 'color' ? 'Color' : 'Blanco y Negro'} - 
                {paperTypes.find(p => p.id === item.printJob.paperType)?.name} - 
                {paperSizes.find(p => p.id === item.printJob.size)?.name}
              </p>
              <p>Copias: {item.printJob.copies}</p>
            </div>
          </>
        ) : (
          product && (
            <>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              {item.customization && (
                <div className="text-sm text-gray-600 mb-2">
                  {item.customization.text && (
                    <p>Texto: {item.customization.text}</p>
                  )}
                  {item.customization.design && (
                    <p>Diseño personalizado incluido</p>
                  )}
                </div>
              )}
            </>
          )
        )}
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center mr-4 mt-2 md:mt-0">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 flex items-center justify-center rounded-l"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          className="w-12 h-8 border-y border-gray-300 text-center focus:outline-none"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
        />
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 flex items-center justify-center rounded-r"
        >
          +
        </button>
      </div>
      
      {/* Price */}
      <div className="flex items-center justify-between w-full md:w-auto mt-2 md:mt-0">
        <div className="text-right mr-4">
          <div className="font-semibold">S/ {totalPrice.toFixed(2)}</div>
          <div className="text-sm text-gray-500">S/ {itemPrice.toFixed(2)} c/u</div>
        </div>
        
        {/* Remove Button */}
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Eliminar del carrito"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;