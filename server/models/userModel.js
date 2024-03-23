const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Number, default: 0 },
});

// json web token
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
    },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      },
    )
  } catch (err) {
    console.error(err);
  }
}

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
