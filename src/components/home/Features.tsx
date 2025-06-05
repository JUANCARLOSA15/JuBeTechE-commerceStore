import React from 'react';
import { PaintBucket, Printer, Truck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <PaintBucket className="h-10 w-10 text-blue-600" />,
      title: 'Personalización con IA',
      description: 'Utiliza nuestra tecnología de IA para crear diseños únicos y personalizados para tus productos.'
    },
    {
      icon: <Printer className="h-10 w-10 text-blue-600" />,
      title: 'Impresión profesional',
      description: 'Obtén impresiones de alta calidad para todos tus documentos, desde tesis hasta planos arquitectónicos.'
    },
    {
      icon: <Truck className="h-10 w-10 text-blue-600" />,
      title: 'Entregas a todo el Perú',
      description: 'Enviamos tus productos e impresiones a cualquier parte del país con servicio de seguimiento.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Beneficios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105 duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;