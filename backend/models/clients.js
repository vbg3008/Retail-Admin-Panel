const mongooes = require("mongoose");

const clientSchema = new mongooes.Schema({
  customerName: {
    type: "string",
    required: [true, "Please give name"],
  },
  customerMobile: {
    type: "number",
    required: [true, "Please give Mobile NO"],
  },
  customerAddress: {
    type: "string",
    required: [true, "Please give address"],
  },
  customerGST: {
    type: "string",
    required: [true, "Please give GST"],
    

  },
  customerCurentReading: {
    type: "number",
    required: [true, "Please give Current Reading"],
    default:1,
  },
});

module.exports = mongooes.model("Client", clientSchema);