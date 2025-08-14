const express = require('express');
const SensorData = require('../models/SensorData');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,        // correct key from token
      role: decoded.role     // role: admin | technician | user
    };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Route: Save sensor data (all roles can post)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { temperature, humidity, moisture } = req.body;
    const data = new SensorData({
      temperature,
      humidity,
      moisture,
      userId: req.user.id
    });
    await data.save();
    res.status(201).json({ message: "Data saved" });
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ message: "Error saving sensor data" });
  }
});

// Route: Get sensor data
router.get('/', authMiddleware, async (req, res) => {
  try {
    let data;
    if (req.user.role === 'admin') {
      data = await SensorData.find().sort({ timestamp: -1 }).limit(100); // admin sees all
    } else {
      data = await SensorData.find({ userId: req.user.id }).sort({ timestamp: -1 }).limit(50);
    }
    res.json(data);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;
