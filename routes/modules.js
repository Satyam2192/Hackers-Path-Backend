const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const Module = require("../models/modules");

// GET all modules
router.get("/modules", async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a specific module by ID
router.get("/modules/:id", async (req, res) => {
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
router.post("/modules", auth, isAdmin, async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT/update a module by ID
router.put("/modules/:id", auth, isAdmin, async (req, res) => {
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
router.delete("/modules/:id", auth, isAdmin, async (req, res) => {
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
