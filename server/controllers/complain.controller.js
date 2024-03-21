const Complain = require("../models/complainModel");
const User = require("../models/userModel");
const Tenant = require("../models/tenantModel");
const Apartment = require("../models/apartmentModel");

exports.postComplain = async (req, res) => {
  try {
    const { _id, severity, description } = req.body;
    const { tenantId, landownerId, apartmentId, fullName, profilePhoto, unitNumber } = await getDataForPost(_id);

    await Complain.create({
      tenantId,
      landownerId,
      apartmentId,
      fullName,
      profilePhoto,
      unitNumber,
      severity,
      description,
    })
      .then((response) => res.status(200).send(response))
      .catch((error) => res.status(401).send(error.message));
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getComplain = async (req, res) => {
  try {
    await Complain.find({})
      .then((response) => res.status(200).send(response))
      .catch((err) => res.status(401).send(err));
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteComplain = async (req, res) => {
  const { id } = req.params;
  await Complain.deleteOne({ _id: id })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(401).send(err));
};

exports.getComplainByLandownerId = async (req, res) => {
  try {
    const { id } = req.params;
    await Complain.find({ landownerId: id })
      .then((res) => res.status(200).send(res))
      .catch((err) => res.status(401).send(err));
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getComplainByTenantId = async (req, res) => {
  try {
    const { id } = req.params;
    await Complain.find({ tenantId: id })
      .then((res) => res.status(200).send(res))
      .catch((err) => res.status(401).send(err));
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getDataForPost = async (id) => {
  const user = await User.findById({ _id: id });
  const tenant = await Tenant.findById({ _id: user.referenceId });
  const apartment = await Apartment.findById({ _id: tenant.apartmentId });

  const finalObject = {
    tenantId: user._id,
    landownerId: tenant.landownerId,
    apartmentId: tenant.apartmentId,
    fullName: user.fullName,
    profilePhoto: user.profilePhoto,
    unitNumber: apartment.unitNumber
  };

  return finalObject;
};
