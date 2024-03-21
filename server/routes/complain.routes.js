const express = require("express");
const router = express.Router();
const { 
  getComplain, 
  postComplain, 
  deleteComplain,
  getComplainByLandownerId,
  getComplainByTenantId,
} = require("../controllers/complain.controller");

router.get("/", getComplain);
router.post("/", postComplain);
router.delete("/:id", deleteComplain);
router.get("/landowner/:id", getComplainByLandownerId);
router.get("/tenant/:id", getComplainByTenantId);

module.exports = router;