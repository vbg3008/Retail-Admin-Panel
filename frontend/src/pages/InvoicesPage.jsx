import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";

const CreateInvoiceModal = ({ isOpen, onClose, onSubmit, clients }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    currentReading: "",
    previousReading: "",
    rentAmount: "",
    freeCopiesCount: "",
    ratePerReadings: "",
    gstType: "SGST",
    gstPercentage: 9,
  });

  const [calculatedValues, setCalculatedValues] = useState({
    netPayable: 0,
    totalBeforeTax: 0,
    totalAfterTax: 0,
  });

  useEffect(() => {
    calculateValues();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateValues = () => {
    const netPayable =
      (parseFloat(formData.currentReading) || 0) -
      (parseFloat(formData.previousReading) || 0) -
      (parseFloat(formData.freeCopiesCount) || 0);

    const totalBeforeTax =
      netPayable * (parseFloat(formData.ratePerReadings) || 0) +
        (parseFloat(formData.rentAmount) || 0) <
      0
        ? 0
        : netPayable * (parseFloat(formData.ratePerReadings) || 0) +
          (parseFloat(formData.rentAmount) || 0);

    const totalAfterTax =
      totalBeforeTax * (1 + formData.gstPercentage / 100) < 0
        ? 0
        : totalBeforeTax * (1 + formData.gstPercentage / 100);

    setCalculatedValues({
      netPayable,
      totalBeforeTax,
      totalAfterTax,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        netPayble: calculatedValues.netPayable.toFixed(2),
        totalBeforeTax: calculatedValues.totalBeforeTax.toFixed(2),
        totalAfterTax: calculatedValues.totalAfterTax.toFixed(2),
      };
      console.log(submitData);

      const response = await fetch(
        "https://retail-admin-panel.onrender.com/api/invoices/createInvoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        onSubmit();
        onClose();
      } else {
        alert(result.message || "Failed to create invoice");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-10 backdrop-blur-md  flex items-center justify-center z-50 p-4">
      <div className="bg-white border p-6 sm:p-8 rounded-lg w-full h-[98vh] max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Create New Invoice
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <select
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          >
            <option value="">Select Customer</option>
            {clients.map((client) => (
              <option key={client._id} value={client.customerName}>
                {client.customerName}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="currentReading"
            value={formData.currentReading}
            onChange={handleChange}
            placeholder="Current Reading"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />

          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            placeholder="Rent Amount"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <input
            type="number"
            name="previousReading"
            value={formData.previousReading}
            onChange={handleChange}
            placeholder="Previous Reading"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <input
            type="number"
            name="freeCopiesCount"
            value={formData.freeCopiesCount}
            onChange={handleChange}
            placeholder="Free Copies Count"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <input
            type="number"
            name="ratePerReadings"
            value={formData.ratePerReadings}
            onChange={handleChange}
            placeholder="Rate Per Reading"
            required
            className="w-full p-2 border rounded text-sm sm:text-base"
          />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gstType"
                  value="SGST"
                  checked={formData.gstType === "SGST"}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      gstType: "SGST",
                      gstPercentage: 9,
                    }))
                  }
                  className="form-radio"
                />
                <span className="ml-2 text-sm sm:text-base">SGST (9%)</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gstType"
                  value="IGST"
                  checked={formData.gstType === "IGST"}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      gstType: "IGST",
                      gstPercentage: 18,
                    }))
                  }
                  className="form-radio"
                />
                <span className="ml-2 text-sm sm:text-base">IGST (18%)</span>
              </label>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded text-sm sm:text-base">
            <h3 className="font-bold mb-2">Calculated Values</h3>
            <p>Net Payable: {calculatedValues.netPayable.toFixed(2)}</p>
            <p>
              Total Before Tax: {calculatedValues.totalBeforeTax.toFixed(2)}
            </p>
            <p>Total After Tax: {calculatedValues.totalAfterTax.toFixed(2)}</p>
          </div>
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
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("https://retail-admin-panel.onrender.com/api/invoices").then(
        (res) => res.json()
      ),
      fetch("https://retail-admin-panel.onrender.com/api/clients").then((res) =>
        res.json()
      ),
    ])
      .then(([invoicesData, clientsData]) => {
        setInvoices(invoicesData);
        setClients(clientsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://retail-admin-panel.onrender.com/api/invoices"
      );
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
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
          <Plus className="mr-2" /> Create Invoice
        </button>
      </div>

      <CreateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={fetchInvoices}
        clients={clients}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Current Reading
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Previous Reading
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Net Payable
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total Before Tax
                </th>
                <th className="p-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total After Tax
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices
                .slice()
                .reverse()
                .map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-sm sm:text-base">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {invoice.customerName}
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {invoice.currentReading}
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {invoice.previousReading}
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {invoice.netPayble}
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {invoice.totalBeforeTax}
                    </td>
                    <td className="p-3 text-sm sm:text-base">
                      {invoice.totalAfterTax}
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

export default InvoicesPage;
