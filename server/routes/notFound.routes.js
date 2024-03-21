const express = require('express');
const router = express.Router();
const { notFound } = require('../controllers/notFound.controller');

router.use(notFound);

module.exports = router;