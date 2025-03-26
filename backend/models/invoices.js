const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  customerName: {
    type: "string",
    required: true,
  },
  currentReading: {
    type: "number",
    required: true,
  },
  previousReading: {
    type: "number",
    required: true,
  },
  rentAmount: {
    type: "number",
    required: true,
  },
  freeCopiesCount: {
    type: "number",
    required: true,
  },
  gstType: {
    type: "string",
    required: true,
    enum: ["IGST", "SGST"],
  },
  gstPercentage: {
    type: "number",
    required: true,
    enum: [9, 18],
  
  },
  ratePerReadings: {
    type: "number",
    required: true,
  },
  netPayble: {
    type: "number",
    required: true,
  },
  totalBeforeTax: {
    type: "number",
    required: true,
  },
  totalAfterTax: {
    type: "number",
    required: true,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
