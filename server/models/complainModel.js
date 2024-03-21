const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
  },
	landownerId: {
    type: String,
    required: true,
  },
	apartmentId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
	unitNumber: {
    type: String,
    required: true,
  },
	postingDate: {
    type: Date,
    default: Date.now(),
  },
	severity: {
    type: String,
    required: true,
  },
	status: {
    type: String,
    default: "Pending",
  },
});

const Complain = mongoose.model("complain", complainSchema);

module.exports = Complain;