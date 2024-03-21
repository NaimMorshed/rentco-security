const Apartments = require("../models/apartmentModel");
const Property = require("../models/propertyModel");

exports.getApartments = async (req, res) => {
  try {
    const apartments = await Apartments.find({});
    res.status(200).send(apartments);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

exports.getApartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartments.findById({ _id: id });
    if (apartment) 
      return res.status(200).send(apartment);
    else 
      res.status(404).send({ message: "Apartment not found!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  
}

exports.postApartment = async (req, res) => {
  try {
    let title, address;
    const { propertyId } = req.body;
    const demo = await Property.findOne({ _id: propertyId });
    if (demo) {
      title = demo.propertyName;
      address = demo.houseNumber + ", " + demo.areaName + ", " + demo.district;

      await Apartments.create({
        landownerId: req.body.landownerId,
        tenantId: req.body.tenantId,
        propertyId: req.body.propertyId,
        title: title,
        address: address,
        description: req.body.description,
        unitNumber: req.body.unitNumber,
        floor: req.body.floor,
        rent: req.body.rent,
        bedRooms: req.body.bedRooms,
        bathRooms: req.body.bathRooms,
        drawingRooms: req.body.drawingRooms,
        diningSpace: req.body.diningSpace,
        area: req.body.area,
        parking: req.body.parking,
        wifi: req.body.wifi,
        kitchen: req.body.kitchen,
        furnished: req.body.furnished,
        type: req.body.type,
        balcony: req.body.balcony,
        facing: req.body.facing,
        status: req.body.status,
        gasType: req.body.gasType,
        images: req.body.images,
      });
      return res.status(200).send({ message: "Apartment created successfully!" });
    } else {
      return res.status(401).send({ message: "Failed to get property!" });
    }
    
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

exports.deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartments.findOne({ _id: req.params.id });
    if (apartment) {
      await Apartments.deleteOne({ _id: req.params.id });
      return res.status(200).send({
        message: "Apartment deleted successfully!",
      });
    } else {
      return res.status(404).send({ message: "Apartment not found!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

exports.updateApartment = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartments.findById({ _id: id });
    if (apartment) {
      await Apartments.updateOne(
        { _id: req.body._id },
        {
          $set: {
            landownerId: req.body.landownerId,
            tenantId: req.body.tenantId,
            propertyId: req.body.propertyId,
            unitNumber: req.body.unitNumber,
            floor: req.body.floor,
            address: req.body.address,
            rent: req.body.rent,
            bedRooms: req.body.bedRooms,
            bathRooms: req.body.bathRooms,
            drawingRooms: req.body.drawingRooms,
            diningSpace: req.body.diningSpace,
            area: req.body.area,
            parking: req.body.parking,
            wifi: req.body.wifi,
            kitchen: req.body.kitchen,
            furnishing: req.body.furnishing,
            type: req.body.type,
            balcony: req.body.balcony,
            facing: req.body.facing,
            status: req.body.status,
            gasType: req.body.gasType,
          },
        }
      );
      res.status(200).send({
        message: "Apartment is updated!",
      });
    } else {
      res.status(404).send({ message: "Apartment not found!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}
