const express = require("express");
const router = express.Router();
const SensorData = require("../models/SensorData");

// GET /api/sensor-data => returns the latest data
router.get("/", async (req, res) => {
  try {
    const latest = await SensorData.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: "No sensor data found." });
    }
    res.json(latest);
  } catch (err) {
    console.error("Sensor fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
