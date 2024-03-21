const express = require("express");
const router = express.Router();
const {
  getApartments,
  getApartmentById,
  postApartment,
  deleteApartment,
  updateApartment,
} = require("../controllers/apartments.controller");

router.get("/", getApartments);
router.get("/:id", getApartmentById);
router.post("/", postApartment);
router.delete("/:id", deleteApartment);
router.put("/:id", updateApartment);

module.exports = router;
