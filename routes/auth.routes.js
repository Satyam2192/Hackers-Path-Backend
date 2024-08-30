const express = require('express');
const { google, signOut, login, signup } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/google', google);
router.get('/signout', signOut)

module.exports = router;