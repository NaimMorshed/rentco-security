const express = require("express");
const router = express.Router();
const {
  getRequest,
  getRequestById,
  postRequest,
  deleteRequest,
} = require("../controllers/flatRequest.controller");

router.get("/", getRequest);
router.get("/:id", getRequestById);
router.post("/", postRequest);
router.delete("/:id", deleteRequest);

module.exports = router;
