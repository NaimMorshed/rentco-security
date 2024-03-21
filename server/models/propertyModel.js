const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  landownerId: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  areaName: {
    type: String,
    required: true,
  },
  roadName: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  wardNumber: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: true,
  },
  garage: {
    type: Boolean,
    required: true,
  },
  guestParking: {
    type: Boolean,
    required: true,
  },
  lift: {
    type: Boolean,
    required: true,
  },
  securityGuard: {
    type: Boolean,
    required: true,
  },
});

const Property = mongoose.model("property", propertySchema);

module.exports = Property;