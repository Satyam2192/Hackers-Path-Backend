const express = require("express");
const router = express.Router();
const user = require("../models/user")

const { login, signup } = require('../Controllers/Auth');
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post('/login', login);
router.post('/signup', signup);

// all this funcality is used at admin dashboard
//get all users
router.get("/users", auth, isAdmin, async (req, res) => {
    try {
        const Users = await user.find();
        res.json(Users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a specific users by ID
router.get("/users/:id", auth, isAdmin, async (req, res) => {
    try {
        const Users = await user.findById(req.params.id);
        if (!Users) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(Users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE user from databse
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
    try {
        const Users = await user.findByIdAndDelete(req.params.id);
        if (!Users) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST user -> Add user by Admin
router.post("/users", auth, isAdmin, async (req, res) => {
    try {
      const Users = new user(req.body);
      await Users.save();
      res.status(201).json(Users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// routes for forgot password and email verifacation 

module.exports = router;