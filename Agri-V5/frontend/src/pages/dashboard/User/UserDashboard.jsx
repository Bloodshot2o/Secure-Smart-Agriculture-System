import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import socket from "../../../socket";
import { Thermometer, Droplet, Leaf, CloudSun } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function UserDashboard() {
  const [sensorData, setSensorData] = useState({ temperature: 0, humidity: 0, moisture: 0 });
  const [chartData, setChartData] = useState([]);
  const [deviceStatus] = useState([
    { name: "Temp Sensor 1", type: "Temperature", status: "Online" },
    { name: "Humidity Sensor 2", type: "Humidity", status: "Online" },
    { name: "Soil Probe 3", type: "Moisture", status: "Online" },
  ]);

  useEffect(() => {
    socket.connect();
    socket.on("sensorData", (data) => {
      setSensorData(data);
      setChartData((prev) => [
        ...prev.slice(-19),
        {
          time: new Date().toLocaleTimeString(),
          ...data,
        },
      ]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-white px-8 text-center overflow-hidden bg-gradient-to-tr from-green-700 via-green-500 to-green-400">
        <motion.div className="absolute top-16 left-12 w-28 h-28 bg-green-200 rounded-full opacity-30 filter blur-3xl animate-pulse" />
        <motion.div className="absolute bottom-20 right-16 w-40 h-40 bg-green-100 rounded-full opacity-20 filter blur-3xl animate-pulse" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
          className="max-w-4xl bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-12 shadow-xl"
        >
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">🌿 User Dashboard</h1>
          <p className="text-xl drop-shadow-md">
            Monitor your farm environment and device health in real time.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="bg-green-50 p-12 space-y-20 min-h-screen">
        {/* Sensor Cards */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          <AnimatedCard><SensorCard label="Temperature" value={`${sensorData.temperature}°C`} icon={Thermometer} color="red" /></AnimatedCard>
          <AnimatedCard><SensorCard label="Humidity" value={`${sensorData.humidity}%`} icon={Droplet} color="blue" /></AnimatedCard>
          <AnimatedCard><SensorCard label="Soil Moisture" value={sensorData.moisture} icon={Leaf} color="green" /></AnimatedCard>
        </motion.div>

        {/* Line Chart */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-white p-8 shadow-2xl rounded-3xl border border-green-300">
            <CardContent>
              <h2 className="text-4xl font-extrabold text-green-900 mb-4">📈 Live Sensor Trends</h2>
              <p className="text-gray-700 mb-8">Track environmental changes on your farm.</p>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#d1fae5" />
                  <XAxis dataKey="time" tick={{ fill: "#065f46", fontWeight: "600" }} />
                  <YAxis tick={{ fill: "#065f46", fontWeight: "600" }} domain={["auto", "auto"]} />
                  <Tooltip contentStyle={{
                    backgroundColor: "#f0fdf4",
                    borderRadius: "10px",
                    borderColor: "#a7f3d0",
                    color: "#065f46",
                    fontWeight: "600",
                  }} />
                  <Legend wrapperStyle={{ fontWeight: "700", color: "#065f46" }} />
                  <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="🌡️ Temperature" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="💧 Humidity" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="moisture" stroke="#10b981" name="🌱 Moisture" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Farm Map */}
        <section className="bg-white py-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">🌾 Farm Map</h2>
          <p className="text-gray-600 mb-6">Visual overview of sensor positions.</p>
          <div className="w-full h-[350px] rounded-xl overflow-hidden bg-gray-100">
            <img src="/farm-map-placeholder.jpg" alt="Farm map" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Device Status Table */}
        <section className="bg-white py-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-green-200">
          <h2 className="text-3xl font-bold text-green-800 mb-4">📡 Device Status</h2>
          <table className="min-w-full table-auto text-left bg-white">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-6 py-3">Device</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {deviceStatus.map((d, i) => (
                <tr key={i} className="border-b">
                  <td className="px-6 py-4">{d.name}</td>
                  <td className="px-6 py-4">{d.type}</td>
                  <td className={`px-6 py-4 font-semibold ${d.status === "Online" ? "text-green-600" : "text-red-600"}`}>
                    {d.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Farm Tips / Weather */}
        <section className="bg-white py-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-yellow-100">
          <h2 className="text-3xl font-bold text-yellow-700 mb-4">🌤️ Weather & Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
              <CloudSun size={32} className="text-yellow-500" />
              <div>
                <p className="font-semibold text-yellow-800">Today’s Forecast:</p>
                <p className="text-gray-700">Sunny, 32°C, humidity 58%</p>
              </div>
            </div>
            <div className="p-4 bg-green-100 rounded-xl">
              <p className="font-semibold text-green-900">💡 Pro Tip:</p>
              <p className="text-gray-700">Water crops early in the morning to reduce evaporation loss and improve soil absorption.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Reusable Components
function SensorCard({ label, value, icon: Icon, color }) {
  return (
    <Card className="bg-white shadow-lg p-6 rounded-2xl border border-green-300 hover:shadow-2xl hover:scale-[1.05] transition-transform cursor-default">
      <CardContent className="flex flex-col items-center justify-center text-center">
        <Icon size={48} className={`mb-3 text-${color}-600 drop-shadow-lg`} />
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
        <p className={`text-3xl font-extrabold text-${color}-700 mt-1`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function AnimatedCard({ children }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}
