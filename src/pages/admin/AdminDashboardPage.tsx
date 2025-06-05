import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Pedidos</h2>
            <p className="text-gray-600">Gestiona los pedidos de productos</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Solicitudes de Impresión</h2>
            <p className="text-gray-600">Administra las solicitudes de impresión</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Productos</h2>
            <p className="text-gray-600">Gestiona el catálogo de productos</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;