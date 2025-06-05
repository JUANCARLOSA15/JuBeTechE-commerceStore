import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image } from 'lucide-react';

const PrintingService: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-4">¿Necesitas imprimir algo? JuBeTech lo hace por ti</h2>
            <p className="text-gray-600 mb-6">
              Sube tus archivos y nosotros nos encargamos de imprimirlos con la más alta calidad. 
              Ideal para tesis, folletos, tarjetas, planos o cualquier documento que necesites en papel.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <span>Documentos</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <span>Tesis</span>
              </div>
              <div className="flex items-center">
                <Image className="h-5 w-5 text-blue-600 mr-2" />
                <span>Fotografías</span>
              </div>
            </div>
            <Link 
              to="/imprimir" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 inline-block"
            >
              Empezar a imprimir
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <FileText className="h-16 w-16 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Sube tus archivos</h3>
                <p className="text-gray-600 mb-4">
                  Arrastra y suelta tus archivos aquí o haz clic para seleccionarlos desde tu dispositivo
                </p>
                <Link
                  to="/imprimir"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded transition-colors duration-300"
                >
                  Seleccionar archivos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintingService;