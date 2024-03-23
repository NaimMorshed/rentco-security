const Users = require("../models/userModel");
const Tenant = require("../models/tenantModel");
const Landowner = require("../models/landownerModel");
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const user = await Users.findOne({ phone: phone });
    if (user) res.status(200).send(user);
    else res.status(404).send({ message: "User not found!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById({ _id: id });
    if (user) res.status(200).send(user);
    else res.status(404).send({ message: "User not found!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const query = { email: email };
    const users = await Users.find(query);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.postUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // hash password
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRound);
    const user = await Users.create({ username, email, password: hashPassword });

    return res.status(201).send({ message: 'User created successfully', token: await user.generateToken(), userId: user._id.toString() });
  } catch (error) {
    return res.status(401).send({ message: "Error: " + error.message });
  }

};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById({ _id: id });

    if (user) {
      // Delete reference
      if (user.accountType === "Landowner")
        await Landowner.deleteOne({ _id: user.referenceId })
      else if (user.accountType === "Tenant")
        await Tenant.deleteOne({ _id: user.referenceId })
      // Delete user
      await Users.deleteOne({ _id: id });

      return res.status(200).send({ message: "User deleted successfully!" });
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById({ _id: id });
    if (user) {
      await Users.updateOne(
        { _id: req.body._id },
        {
          $set: {
            fullName: req.body.fullName,
            nickname: req.body.nickname,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender,
            district: req.body.district,
            religion: req.body.religion,
            phoneNumber: req.body.phoneNumber,
            profilePhoto: req.body.profilePhoto,
            accountType: req.body.accountType,
            registrationDate: req.body.registrationDate,
          },
        }
      );
      res.status(200).send({
        message: "User is updated!",
      });
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const MAX_LOGIN_ATTEMPTS = 3; // Maximum allowed login attempts
  const LOCK_TIME_DURATION = 24 * 60 * 60 * 1000; // Lock duration in milliseconds (24 hours)

  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the account is currently locked
    if (user.lockUntil > Date.now()) {
      return res.status(401).send({ message: "Account is locked. Please try again later." });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      // Increment failed login attempts
      user.failedLoginAttempts++;

      // Lock the account if the maximum attempts are reached
      if (user.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME_DURATION;
        await user.save();
        return res.status(401).send({ message: "Account locked due to too many failed login attempts." });
      }

      // Save updated failed login attempts count
      await user.save();

      return res.status(401).send({ message: "Incorrect password. Please try again." });
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    await user.save();

    return res.status(200).send({
      message: "Login successful.", token: await user.generateToken(),
      userId: user._id.toString(),
    });

  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
}

async function hashPassword(password) {
  try {
    // Generate a salt with a cost factor of 10
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
}
