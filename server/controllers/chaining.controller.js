const Apartments = require("../models/apartmentModel");
const FlatRequest = require("../models/flatRequestModel");
const Users = require("../models/userModel");
const Tenant = require("../models/tenantModel");
const Landowner = require("../models/landownerModel");

exports.approve = async (req, res) => {
  try {
    // Insert tenantId into landowner model -> myTenants
    const tenantInserted = await insertTenantIdIntoLandowner(req.body);

    // Update tenant model -> rentalHistory, landownerId, securityDeposit, apartmentId, member
    const tenantUpdated = await updateApartmentIntoTenant(req.body);

    // Update apartment model -> tenantId, tenantName, tenantPhone, joiningDate
    const apartmentUpdated = await updateApartment(req.body);

    // Update flat request -> status: approved
    const flatRequestUpdated = await updateFlatRequest(req.body);

    // Use Promise.all to wait for all promises to resolve
    const results = await Promise.all([tenantInserted, tenantUpdated, apartmentUpdated, flatRequestUpdated]);

    // Check if any of the promises failed
    if (results.includes(false)) {
      return res.status(401).send("One or more operations failed.");
    }

    return res.status(200).send("Request successfully approved.");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.decline = async (req, res) => {
  try {
    const response = await FlatRequest.updateOne(
      { _id: _id },
      {
        $set: {
          status: "Declined",
        },
      }
    );

    if (response) 
      return res.status(200).send("The request has been declined");
    else 
      return res.status(401).send("Failed to update flatRequest");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getTenantsFromLandowner = async (req, res) => {
  const { landownerId } = req.params;

  try {
    const landowner = await Users.findById({ _id: landownerId });
    if (landowner) {
      const landownerReferenceId = landowner.referenceId;
      const landownerTenantsList = await Landowner.findById({ _id: landownerReferenceId });
      if (landownerTenantsList) {
        const myTenantsArray = landownerTenantsList.myTenants;
        let data = [];

        // Use Promise.all to wait for all promises to resolve
        const tenantPromises = myTenantsArray.map(async (id) => {
          const tenantObject = await getTenant(id);
          if (tenantObject) {
            data.push(tenantObject);
          }
        });

        await Promise.all(tenantPromises);

        return res.status(200).send(data);
        
      } else {
        return res.status(401).send("Error fetching tenant list from landowner");
      }
    } else {
      return res.status(401).send("Error fetching landowner");
    }
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

const insertTenantIdIntoLandowner = async (data) => {
  const { landownerId, tenantId } = data;

  const landownerUser = await Users.findById({ _id: landownerId });
  const landownerByReference = await Landowner.findById({
    _id: landownerUser.referenceId,
  });

  const response = await Landowner.updateOne(
    { _id: landownerByReference },
    {
      $push: {
        myTenants: tenantId,
      },
    }
  );

  if (response) return true;
  else return false;
};

const updateApartmentIntoTenant = async (data) => {
  const { apartmentId, landownerId, tenantId, category, member } = data;

  const tenantUser = await Users.findById({ _id: tenantId });
  if (!tenantUser) {
    return false;
  };

  const tenantByReference = await Tenant.findById({ _id: tenantUser.referenceId });

  if (tenantByReference) {
    const response = await Tenant.updateOne(
      { _id: tenantByReference },
      {
        $push: { rentalHistory: apartmentId },
        $set: {
          landownerId: landownerId,
          securityDeposit: 10000,
          apartmentId: apartmentId,
          tenantType: category,
          member: member,
        },
      }
    );

    if (response) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const updateApartment = async (data) => {
  const { apartmentId, tenantId, tenantName, tenantPhoto } = data;

  const apartment = await Apartments.findById({ _id: apartmentId });
  if (apartment) {
    const currentDate = new Date();
    const response = await Apartments.updateOne(
      { _id: apartmentId },
      {
        $set: {
          tenantId: tenantId,
          tenantName: tenantName,
          tenantPhoto: tenantPhoto,
          joiningDate: currentDate,
        },
      }
    );

    if (response) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const updateFlatRequest = async (data) => {
  const { _id } = data;
  const response = await FlatRequest.updateOne(
    { _id: _id },
    {
      $set: {
        status: "Approved",
      },
    }
  );

  if (response) return true;
  else return false;
};

const getTenant = async (id) => {
  try {
    const { _id, fullName, referenceId, profilePhoto, phoneNumber } = await Users.findById({ _id: id });
    const { apartmentId, landownerId, tenantType, member, securityDeposit } = await Tenant.findById({ _id: referenceId });
    const { unitNumber, rent } = await Apartments.findById({ _id: apartmentId });

    return {
      tenantId: _id,
      apartmentId,
      landownerId,
      fullName, 
      profilePhoto,
      tenantType,
      member,
      phoneNumber,
      securityDeposit,
      rent,
      unitNumber
    }

  } catch (error) {
    
  }  
};
