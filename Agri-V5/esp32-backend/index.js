const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const sensorRoutes = require("./routes/sensorRoutes");

// Create Express App
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins (adjust in production)
    methods: ["GET", "POST"],
    
  }
});

// Make io globally available
global.io = io;

// When a client connects
io.on("connection", (socket) => {
  console.log("🟢 Socket.IO client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/sensor-data", sensorRoutes); // Frontend calls this

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  // Start Server with HTTP wrapper
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start MQTT listener
require("./mqttSubscriber");
