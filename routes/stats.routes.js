const express = require('express');
const { getCryptoStats } = require('../controllers/stats.controller');
const router = express.Router();

// Route to get the latest cryptocurrency stats
router.get("/", getCryptoStats);

module.exports = router;
