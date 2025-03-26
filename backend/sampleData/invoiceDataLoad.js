const connectDB = require("../DB/connect");
const invoice = require("../models/invoices");
const env = require("dotenv").config({path:"../.env"});


const invoiceSample = require("../sampleData/invoices.json");

console.log(process.env.MONGO_URI);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await invoice.create(invoiceSample);
    console.log("Invoice data imported successfully");
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
  }
};

start();
