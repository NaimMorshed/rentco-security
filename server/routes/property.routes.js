const express = require("express");
const router = express.Router();
const {
  getProperty,
  getPropertyById,
  postProperty,
  deleteProperty,
  updateProperty,
  getPropertyByLandowner
} = require("../controllers/property.controller");

router.get("/", getProperty);
router.get("/:id", getPropertyById);
router.get("/landownerId/:id", getPropertyByLandowner);
router.post("/", postProperty);
router.delete("/:id", deleteProperty);
router.put("/:id", updateProperty);

module.exports = router;
