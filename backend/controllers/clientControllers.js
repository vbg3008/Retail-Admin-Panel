const Client = require("../models/clients");

// Get all clients

const getClients = async (req, res) => {
  // res.status(200).json({msg:"Got all clients"})

  const clients = await Client.find({});
  res.json(clients);
};
const testClients = async (req, res) => {
  res.status(200).json({ msg: "Test all clients" });
};

const createClient = async (req, res) => {
  try {
    console.log(req.body);
    const {
      customerName,
      customerMobile,
      customerAddress,
      customerGST,
      customerCurrentReading,
    } = req.body;

    // Create a new Client

    const client = new Client({
      customerName,
      customerMobile,
      customerAddress,
      customerGST,
      customerCurrentReading,
    });
    // save the CLient

    const savedClient = await client.save();

    res.status(201).json({ success: true, data: savedClient });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getClients, testClients, createClient };
