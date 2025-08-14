const mqtt = require("mqtt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SensorData = require("./models/SensorData");

dotenv.config(); // Load env variables

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("📡 MQTT connected to broker");
  client.subscribe("sahin/agriculture/data", () => {
    console.log("📥 Subscribed to sahin/agriculture/data");
  });
});

client.on("message", async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      console.log("📨 Incoming:", payload);
  
      // Save to MongoDB
      await SensorData.create({
        temperature: payload.temperature,
        humidity: payload.humidity,
        moisture: payload.moisture,
        timestamp: new Date(),
      });
  
      console.log("✅ Stored in MongoDB");
  
      // Emit to connected frontend clients via Socket.IO
      if (global.io) {
        global.io.emit("sensorData", payload);
        console.log("📤 Emitted to frontend via Socket.IO");
      }
  
    } catch (error) {
      console.error("❌ Error saving MQTT message:", error.message);
    }
  });
  