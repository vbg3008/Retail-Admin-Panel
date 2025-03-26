import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";

const CreateClientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerMobile: "",
    customerAddress: "",
    customerGST: "",
    customerCurrentReading: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://retail-admin-panel.onrender.com/api/clients/createClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        onSubmit();
        onClose();
      } else {
        alert(result.message || "Failed to create client");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Create New Client
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <input
            type="tel"
            name="customerMobile"
            value={formData.customerMobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <input
            type="text"
            name="customerGST"
            value={formData.customerGST}
            onChange={handleChange}
            placeholder="GST Number"
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <input
            type="number"
            name="customerCurrentReading"
            value={formData.customerCurrentReading}
            onChange={handleChange}
            placeholder="Current Reading"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://retail-admin-panel.onrender.com/api/clients"
      );
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="mr-2" /> Create Client
        </button>
      </div>

      <CreateClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={fetchClients}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  GST
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Current Reading
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr
                  key={client._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-sm sm:text-base">
                    {client.customerName}
                  </td>
                  <td className="p-3 text-sm sm:text-base">
                    {client.customerMobile}
                  </td>
                  <td className="p-3 text-sm sm:text-base">
                    {client.customerAddress}
                  </td>
                  <td className="p-3 text-sm sm:text-base">
                    {client.customerGST || "N/A"}
                  </td>
                  <td className="p-3 text-sm sm:text-base">
                    {client.customerCurrentReading}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
