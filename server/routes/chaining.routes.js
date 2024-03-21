const express = require("express");
const router = express.Router();
const {
  approve, getTenantsFromLandowner
} = require("../controllers/chaining.controller");

router.post("/approve", approve);
router.post("/getTenants/:landownerId", getTenantsFromLandowner);

module.exports = router;
