const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  apartmentSaved: {
    type: Number,
    default: 0,
  },
  tenantSaved: {
    type: Number,
    default: 0,
  },
  autoPlaceOnEmpty: {
    type: Boolean,
    default: false,
  },
  tenantType: {
    type: String,
    default: "please update!",
  },
  rentalHistory: {
    type: [String],
    default: [],      // apartment id's
  },
  landownerId: {
    type: String,
    default: null,    // present landowner
  },
  apartmentId: {
    type: String,
    default: null,    // present apartment
  },
  securityDeposit: {
    type: Number,
    default: 0,
  },
  member: {
    type: Number,
    default: 0,
  },
});

const Tenant = mongoose.model("tenant", tenantSchema);

module.exports = Tenant;