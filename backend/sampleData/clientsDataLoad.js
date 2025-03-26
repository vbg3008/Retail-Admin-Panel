const connectDB = require("../DB/connect");
const client = require("../models/clients");
const env = require("dotenv").config({path:"../.env"});


const clientSample = require("../sampleData/clients.json");

console.log(process.env.MONGO_URI);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await client.create(clientSample);
    console.log("Clients data imported successfully");
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
  }
};

start();
