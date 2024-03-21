const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  landownerId: {
    type: String,
    required: true,
  },
  tenantId: {
    type: String,
    default: "---",
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  propertyId: {
    type: String,
    required: true,
  },
  rented: {
    type: Boolean,
    default: false,
  },
  tenantName: {
    type: String,
    default: "---",
  },
  tenantPhone: {
    type: String,
    default: "---"
  },
  tenantPhoto: {
    type: String,
    default: "---",
  },
  joiningDate: {
    type: String,
    default: "---",
  },
  description: {
    type: String,
    required: false,
  },
  unitNumber: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  bedRooms: {
    type: Number,
    required: true,
  },
  bathRooms: {
    type: Number,
    required: true,
  },
  drawingRooms: {
    type: Number,
    required: true,
  },
  diningSpace: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  parking: {
    type: Number,
    required: true,
  },
  wifi: {
    type: Boolean,
    required: true,
  },
  kitchen: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  balcony: {
    type: Number,
    required: true,
  },
  facing: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  gasType: {
    type: String,
    required: true,
  },
  images: {
    type: String, 
    required: false,   
  },
});

const Apartments = mongoose.model("apartments", apartmentSchema);

module.exports = Apartments;