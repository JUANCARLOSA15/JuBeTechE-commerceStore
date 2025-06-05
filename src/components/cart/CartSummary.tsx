import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Smartphone } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { totalItems, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('yape');
  
  const shipping = totalPrice > 100 ? 0 : 15;
  const grandTotal = totalPrice + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
        Resumen de compra
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} productos)</span>
          <span className="font-medium">S/ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>
          <span className="font-medium">
            {shipping === 0 ? 'Gratis' : `S/ ${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold text-blue-600 text-xl">S/ {grandTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="font-medium mb-3">Método de pago</h3>
          
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="yape"
                checked={paymentMethod === 'yape'}
                onChange={() => setPaymentMethod('yape')}
                className="mr-3"
              />
              <Smartphone className="h-5 w-5 mr-3 text-purple-600" />
              <div>
                <p className="font-medium">Yape / Plin</p>
                <p className="text-sm text-gray-500">Pago con código QR</p>
              </div>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="transfer"
                checked={paymentMethod === 'transfer'}
                onChange={() => setPaymentMethod('transfer')}
                className="mr-3"
              />
              <CreditCard className="h-5 w-5 mr-3 text-green-600" />
              <div>
                <p className="font-medium">Transferencia bancaria</p>
                <p className="text-sm text-gray-500">BCP, Interbank, BBVA</p>
              </div>
            </label>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Proceder al pago
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Al realizar tu compra, aceptas nuestros términos y condiciones y política de privacidad.
        </p>
      </form>
    </div>
  );
};

export default CartSummary;