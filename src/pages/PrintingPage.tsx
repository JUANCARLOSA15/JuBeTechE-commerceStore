import React from 'react';
import Layout from '../components/layout/Layout';
import FileUploadForm from '../components/printing/FileUploadForm';

const PrintingPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Servicio de Impresión</h1>
          <p className="text-blue-100 max-w-3xl">
            Sube tus archivos y nosotros nos encargamos de imprimirlos con la más alta calidad.
            Ideal para tesis, folletos, tarjetas, planos o cualquier documento que necesites en papel.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <FileUploadForm />
      </div>
    </Layout>
  );
};

export default PrintingPage;