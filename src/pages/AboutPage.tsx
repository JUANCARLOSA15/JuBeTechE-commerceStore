import React from 'react';
import Layout from '../components/layout/Layout';
import { Printer, ShoppingBag, Users, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Sobre JuBeTech</h1>
          <p className="text-blue-100 max-w-3xl">
            Conoce nuestra historia, misión y visión. En JuBeTech combinamos creatividad, 
            tecnología e impresión de calidad para ofrecerte los mejores productos y servicios.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 mb-4">
              JuBeTech nació en 2022 con una visión clara: combinar la tecnología moderna con servicios tradicionales 
              de impresión para crear una experiencia única para nuestros clientes.
            </p>
            <p className="text-gray-600 mb-4">
              Lo que comenzó como un pequeño emprendimiento se ha convertido en una empresa innovadora que 
              ofrece tanto productos personalizados como servicios de impresión profesional, todo potenciado 
              por tecnologías de inteligencia artificial.
            </p>
            <p className="text-gray-600">
              Hoy, JuBeTech es reconocida por su compromiso con la calidad, la personalización y la 
              satisfacción del cliente en todo el Perú.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Equipo JuBeTech" 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Target className="h-6 w-6 text-blue-600 mr-2" />
              Nuestra Misión
            </h2>
            <p className="text-gray-600">
              Proporcionar soluciones creativas y tecnológicas de alta calidad que permitan a nuestros 
              clientes expresar su personalidad a través de productos personalizados y servicios de 
              impresión eficientes, accesibles y amigables con el medio ambiente.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              Nuestra Visión
            </h2>
            <p className="text-gray-600">
              Ser la empresa líder en personalización de productos e impresión en Perú, reconocida por 
              nuestra innovación, calidad excepcional y compromiso con la satisfacción del cliente, 
              utilizando tecnologías avanzadas para crear experiencias memorables.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Nuestros Servicios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-600">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Productos Personalizados</h3>
                  <p className="text-gray-600">
                    Ofrecemos una amplia gama de productos personalizables, desde ropa y accesorios hasta 
                    artículos para el hogar y la oficina. Nuestro sistema de personalización con IA te ayuda 
                    a crear diseños únicos y memorables.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-yellow-500">
              <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Printer className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Servicio de Impresión</h3>
                  <p className="text-gray-600">
                    Imprimimos todo tipo de documentos con calidad profesional: tesis, folletos, 
                    tarjetas, planos y más. Utilizamos equipos de última generación y materiales 
                    de la más alta calidad para resultados excepcionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explora nuestra tienda de productos personalizados o utiliza nuestro servicio de impresión 
            para tus documentos importantes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/productos" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Ver Productos
            </a>
            <a 
              href="/imprimir" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Servicio de Impresión
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;