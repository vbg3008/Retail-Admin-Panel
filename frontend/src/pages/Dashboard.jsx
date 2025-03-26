import React, { useState } from 'react';
import ClientsPage from './ClientsPage';
import InvoicesPage from './InvoicesPage';
import { Users, FileText } from 'lucide-react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/auth';
  };
  
  const renderContent = () => {
    switch(activeSection) {
      case 'clients':
        return <ClientsPage />;
      case 'invoices':
        return <InvoicesPage />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div
              onClick={() => setActiveSection('clients')}
              className="bg-blue-100 p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition text-center sm:text-left"
            >
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mb-2 sm:mb-4 mx-auto sm:mx-0" />
              <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Manage Clients</h2>
              <p className="text-sm sm:text-base text-gray-600">View and create client records</p>
            </div>
            <div
              onClick={() => setActiveSection('invoices')}
              className="bg-green-100 p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:bg-green-200 transition text-center sm:text-left"
            >
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mb-2 sm:mb-4 mx-auto sm:mx-0" />
              <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Manage Invoices</h2>
              <p className="text-sm sm:text-base text-gray-600">Generate and track invoices</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
            {activeSection ?
              (activeSection === 'clients' ? 'Client Management' : 'Invoice Management')
              : 'Admin Dashboard'
            }
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto items-center">
            {activeSection && (
              <button
                onClick={() => setActiveSection(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 w-full sm:w-auto mb-2 sm:mb-0"
              >
                Back to Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;