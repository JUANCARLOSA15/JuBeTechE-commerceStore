import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Upload } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Bienvenido a JuBeTech: 
            <span className="block text-yellow-400">Tu tienda online con impresión inteligente</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Personaliza productos o imprime tus archivos con tecnología y rapidez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/productos" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Ver Tienda
            </Link>
            <Link 
              to="/imprimir" 
              className="bg-white hover:bg-gray-100 text-blue-700 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <Upload className="mr-2 h-5 w-5" />
              Subir Archivos para Imprimir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;