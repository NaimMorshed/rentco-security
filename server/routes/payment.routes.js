const express = require("express");
const router = express.Router();
const { makePayment, success, fail, cancel } = require("../controllers/payment.controller");

router.post("/", makePayment);
router.post("/success", success);
router.post("/fail", fail);
router.post("/cancel", cancel);

module.exports = router;
