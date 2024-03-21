const mongoose = require("mongoose");

const landownerSchema = new mongoose.Schema({
  apartmentTotal: {
    type: Number,
    default: 0,
  },
  apartmentSaved: {
    type: Number,
    default: 0,
  },
  tenantSaved: {
    type: Number,
    default: 0,
  },
  penaltyOption: {
    type: Boolean,
    default: false,
  },
  penaltyPeriod: {
    type: Number,
    default: 15,
  },
  penaltyAmount: {
    type: Number,
    default: 100,
  },
  autoApartmentPlaceOnEmpty: {
    type: Boolean,
    default: false,
  },
  propertyInfo: {
    type: Boolean,
    default: false,
  },
  myTenants: {
    type: [String],
    default: [],
  }
});

const Landowner = mongoose.model("landowner", landownerSchema);

module.exports = Landowner;