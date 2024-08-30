const express = require('express');
const { deleteUser, updateUser, getUserModules, getUser } = require('../controllers/user.controller.js');
const verifyToken = require('../utils/verifyUser.js');

const router = express.Router();

router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserModules);
router.get('/:id', verifyToken, getUser);

module.exports = router;