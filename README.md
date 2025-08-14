# 🌱 Secure Smart Agriculture System (Agri-V5)

A full-stack IoT-based smart agriculture monitoring and control system designed to provide **real-time environmental data**, **role-based user access**, and **secure multi-user authentication**.  
The system integrates **ESP32 IoT devices**, a **Node.js backend**, and a **responsive web frontend** to help farmers and administrators manage agriculture resources efficiently.

---

## 📌 Overview
The Secure Smart Agriculture System enables:
- Live monitoring of **temperature**, **humidity**, and **soil moisture**.
- Secure multi-user authentication with **role-based dashboards** (Admin, Technician, User).
- Real-time IoT data streaming via **MQTT**.
- Sensor data encryption for security.
- Centralized web interface for data visualization and control.

---

## ✨ Features
- **Multi-User Roles**
  - **Admin**: Manage users, devices, and data.
  - **Technician**: Maintain and calibrate IoT devices.
  - **User/Farmer**: View live environmental data.
- **Secure Login & Authentication**
- **IoT Sensor Data Collection** (ESP32 + MQTT)
- **Real-Time Data Updates**
- **Encrypted Communication**
- **Activity Logs**
- **Device Management**
- **Responsive Web Dashboard**

---

## 🛠 Tech Stack

**IoT Layer**
- ESP32 Microcontroller
- DHT11/DHT22 Temperature & Humidity Sensor
- Soil Moisture Sensor
- MQTT Protocol

**Backend**
- Node.js + Express.js
- MongoDB (Mongoose)
- MQTT.js
- JSON Web Tokens (JWT) for Authentication
- Bcrypt for Password Hashing

**Frontend**
- HTML5, CSS3, JavaScript
- React.js (if included)
- Tailwind CSS

**Development Tools**
- Visual Studio Code
- Git & GitHub
- Postman (API Testing)

---

## 📂 Project Structure
Agri-V5/
│
├── esp32-backend/ # Backend API + MQTT Subscriber
│ ├── controllers/ # Auth & sensor controllers
│ ├── models/ # Mongoose models
│ ├── index.js # Main entry point
│ └── mqttSubscriber.js
│
├── frontend/ # Web UI (if available)
│
├── README.md
└── package.json

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Bloodshot2o/Secure-Smart-Agriculture-System.git
cd Secure-Smart-Agriculture-System


