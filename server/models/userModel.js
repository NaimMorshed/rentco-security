const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  referenceId: {        // tenant / landowner foreign key
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
    match: /^[0-9]{11}$/, // 11-digit phone number format
  },
  profilePhoto: {
    type: String
  },
  accountType: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  occupation: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  facebookId: {
    type: String,
    required: false,
  }
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;