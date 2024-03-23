const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Number, default: 0 },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
