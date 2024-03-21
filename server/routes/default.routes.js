const express = require("express");
const router = express.Router();

const { default_ } = require("../controllers/default.controller");

router.get("/", default_);

module.exports = router;