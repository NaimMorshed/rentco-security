const Users = require("../models/userModel");
const NewUser = require("../models/userSchema");
const Tenant = require("../models/tenantModel");
const Landowner = require("../models/landownerModel");

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
  // try {
  //   const { email } = req.params;
  //   const query = { email: email };
  //   const users = await Users.find(query);
  //   res.status(200).send(users);
  // } catch (error) {
  //   res.status(500).send({
  //     message: error.message,
  //   });
  // }
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
    const { fullName, nickname, email, dob, gender, district, religion, phoneNumber, occupation, permanentAddress, profilePhoto, accountType } = req.body;
    if (!fullName || !nickname || !email || !dob || !gender || !district || !religion || !phoneNumber || !profilePhoto || !accountType || !occupation || !permanentAddress)
    return res.status(400).send({ message: "Body is empty!" });

    // ---------- Check User Existence ---------

    const userExistEmail = await Users.findOne({ email });
    const userExistPhone = await Users.findOne({ phoneNumber });

    if (userExistEmail) {
      return res.status(400).send({ message: "User email already exist!" });
    } else if (userExistPhone) {
      return res.status(400).send({ message: "User phone already exist!" });
    }

    // -------- Create and get referenceID -------

    let referenceId;

    if (accountType === "Landowner") 
      await Landowner.create({}).then(data => referenceId = data._id);
    else if (accountType === "Tenant")
      await Tenant.create({}).then(data => referenceId = data._id);
    else 
      return res.status(400).send({ message: "Error creating referenceId!" });
    
    // -------- Create New User --------

    await Users.create({
      referenceId,
      fullName,
      nickname,
      email,
      dob,
      gender,
      district,
      religion,
      occupation,
      permanentAddress,
      phoneNumber,
      profilePhoto,
      accountType,
    });

    return res.status(201).send({ message: "User created successfully!" });
    
  } catch (error) {
    return res.status(500).send({ message: error.message })
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

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new NewUser({ username, email, password });
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await NewUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Here you would generate and send a JWT token
    res.json({ token: 'generated_token_here' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}