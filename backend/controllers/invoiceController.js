const Invoice = require("../models/invoices");

const getInvoices = async (req, res) => {
  // res.status(200).json({msg:"Got all INvoices"})
  const invoices = await Invoice.find({});
  res.json(invoices);
};
const testInvoicess = async (req, res) => {
  res.status(200).json({ msg: "Test all Invoices" });
};

const createInvoice = async (req, res) => {
  try {
    const {
      customerName,
      currentReading,
      previousReading,
      rentAmount,
      freeCopiesCount,
      ratePerReadings,
      netPayble,
      totalBeforeTax,
      totalAfterTax,
      gstType,
      gstPercentage,
    } = req.body;

    // Create a new invoice
    const invoice = new Invoice({
      customerName,
      currentReading,
      previousReading,
      rentAmount,
      freeCopiesCount,
      ratePerReadings,
      netPayble,
      totalBeforeTax,
      totalAfterTax,
      gstType,
      gstPercentage,
    });
    // Save the invoice
    const savedInvoice = await invoice.save();
    res.status(201).json({ success: true, data: savedInvoice });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getInvoices, testInvoicess, createInvoice };
