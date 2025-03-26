import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateClientModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerMobile: '',
    customerAddress: '',
    customerGST: '',
    customerCurentReading: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.customerName || !formData.customerMobile) {
      alert('Name and Mobile are required');
      return;
    }
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">Create New Client</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={20} sm={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="customerName" className="block mb-2 text-xs sm:text-sm font-medium">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label htmlFor="customerMobile" className="block mb-2 text-xs sm:text-sm font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              id="customerMobile"
              name="customerMobile"
              value={formData.customerMobile}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <label htmlFor="customerAddress" className="block mb-2 text-xs sm:text-sm font-medium">
              Address
            </label>
            <textarea
              id="customerAddress"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer address"
              rows="3"
            />
          </div>

          <div>
            <label htmlFor="customerGST" className="block mb-2 text-xs sm:text-sm font-medium">
              GST Number
            </label>
            <input
              type="text"
              id="customerGST"
              name="customerGST"
              value={formData.customerGST}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GST number"
            />
          </div>

          <div>
            <label htmlFor="customerCurentReading" className="block mb-2 text-xs sm:text-sm font-medium">
              Current Reading
            </label>
            <input
              type="number"
              id="customerCurentReading"
              name="customerCurentReading"
              value={formData.customerCurentReading}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current reading"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClientModal;