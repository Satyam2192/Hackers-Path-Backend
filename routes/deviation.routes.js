const express = require('express');
const { getPriceDeviation } = require('../controllers/deviation.controller');
const router = express.Router();

// Route to get the standard deviation of crypto prices
router.get("/", getPriceDeviation);

module.exports = router;
