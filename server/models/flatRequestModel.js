const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  apartmentId: {
    type: String,
    required: true,
  },
  landownerId: {
    type: String,
    required: true,
  },
  tenantId: {
    type: String,
    required: true,
  },
  unitNumber: {
    type: String,
    required: true,
  },
  tenantName: {
    type: String,
    required: true,
  },
  tenantPhoto: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  member: {
    type: Number,
    required: true,
  },
});

const FlatRequest = mongoose.model("flatRequest", requestSchema);

module.exports = FlatRequest;
