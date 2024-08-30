const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const Module = require("../models/module.model.js");

// GET all modules with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 15; 

    const skip = (page - 1) * limit; 

    const modules = await Module.find()
      .skip(skip)
      .limit(limit);

    const totalModules = await Module.countDocuments(); 

    res.json({
      success: true,
      modules,
      currentPage: page,
      totalPages: Math.ceil(totalModules / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET a specific module by ID
router.get("/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new module
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT/update a module by ID
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a module by ID
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
