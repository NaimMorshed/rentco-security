const Property = require("../models/propertyModel");

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.find({});
    return res.status(200).send(property);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getPropertyByLandowner = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findOne({ landownerId: id });
    if (property) 
      return res.status(200).send(property);
    else 
      return res.status(404).send({ message: "Property not found!" });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  };
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById({ _id: id });
    if (property) res.status(200).send(property);
    else res.status(404).send({ message: "Property not found!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.postProperty = async (req, res) => {
  const { landownerId } = req.body;

  // Check if exist with same landowner_id
  const exist = await Property.findOne({ landownerId: landownerId });
  if (exist) {
    return res.status(400).send({
      message: "Apartment already exist!",
    });
  }

  // Create property
  try {
    await Property.create({
      landownerId: req.body.landownerId,
      propertyName: req.body.propertyName,
      houseNumber: req.body.houseNumber,
      areaName: req.body.areaName,
      roadName: req.body.roadName,
      postCode: req.body.postCode,
      wardNumber: req.body.wardNumber,
      district: req.body.district,
      garage: req.body.garage,
      guestParking: req.body.guestParking,
      lift: req.body.lift,
      securityGuard: req.body.securityGuard,
    });
    res.status(201).send({
      message: "Property created successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id });
    if (property) {
      await Property.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "Property deleted successfully!",
      });
    } else {
      res.status(404).send({ message: "Property not found!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById({ _id: id });
    if (property) {
      await Property.updateOne(
        { _id: req.body._id },
        {
          $set: {
            landownerId: req.body.landownerId,
            propertyName: req.body.propertyName,
            houseNumber: req.body.houseNumber,
            areaName: req.body.areaName,
            roadName: req.body.roadName,
            postCode: req.body.postCode,
            wardNumber: req.body.wardNumber,
            district: req.body.district,
            garage: req.body.garage,
            guestParking: req.body.guestParking,
            lift: req.body.lift,
            securityGuard: req.body.securityGuard,
          },
        }
      );
      res.status(200).send({
        message: "Property is updated!",
      });
    } else {
      res.status(404).send({ message: "Property not found!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
