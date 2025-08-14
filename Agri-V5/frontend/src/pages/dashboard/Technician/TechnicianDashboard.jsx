import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import socket from "../../../socket";
import {
  Thermometer,
  Droplet,
  Leaf,
  RefreshCcw,
  Wifi,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function TechnicianDashboard() {
  const [sensorData, setSensorData] = useState({ temperature: 0, humidity: 0, moisture: 0 });
  const [chartData, setChartData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState([
    { name: "Sensor A1", type: "Temperature", status: "Online", time: "–" },
    { name: "Sensor B2", type: "Humidity", status: "Online", time: "–" },
    { name: "Sensor C3", type: "Soil", status: "Online", time: "–" },
  ]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("sensorData", data => {
      setSensorData(data);
      setChartData(prev => [
        ...prev.slice(-19),
        { time: new Date().toLocaleTimeString(), ...data }
      ]);
      setDeviceStatus(ds =>
        ds.map(d =>
          data.device === d.name
            ? { ...d, status: "Online", time: new Date().toLocaleTimeString() }
            : d
        )
      );
    });

    socket.on("eventLog", log => setEvents(prev => [log, ...prev.slice(0, 9)]));

    return () => socket.disconnect();
  }, []);

  const handleRefresh = () => socket.emit("requestSensorData");
  const triggerPump = () => socket.emit("triggerPump");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-white px-8 text-center overflow-hidden bg-gradient-to-tr from-stone-800 via-lime-700 to-amber-400">
        <motion.div className="absolute top-16 left-12 w-28 h-28 bg-amber-200 rounded-full opacity-20 filter blur-3xl animate-pulse" />
        <motion.div className="absolute bottom-20 right-16 w-40 h-40 bg-lime-200 rounded-full opacity-15 filter blur-3xl animate-pulse" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
                    className="max-w-4xl bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-12 shadow-xl">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">🛠️ Technician Dashboard</h1>
          <p className="text-xl drop-shadow-md">Real-time monitoring and control of farm sensors and actuators.</p>
        </motion.div>
      </section>

      <main className="bg-gray-50 p-12 space-y-20 min-h-screen">

        {/* Status & Refresh */}
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-xl font-medium">
            Status: <span className={`font-bold ${connected ? "text-emerald-600" : "text-red-500"}`}>{connected ? "Connected" : "Disconnected"}</span>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={handleRefresh}
                         className="flex items-center gap-3 bg-emerald-700 text-white px-7 py-3 rounded-full shadow-lg hover:bg-emerald-800">
            <RefreshCcw size={20} /> Refresh Data
          </motion.button>
        </div>

        {/* Sensor Cards */}
        <motion.div initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
        }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <AnimatedCard><SensorCard label="Temperature" value={`${sensorData.temperature}°C`} icon={Thermometer} color="red" /></AnimatedCard>
          <AnimatedCard><SensorCard label="Humidity" value={`${sensorData.humidity}%`} icon={Droplet} color="blue" /></AnimatedCard>
          <AnimatedCard><SensorCard label="Soil Moisture" value={sensorData.moisture} icon={Leaf} color="green" /></AnimatedCard>
        </motion.div>

        {/* Live Trends */}
        <Card className="bg-white p-8 shadow-2xl rounded-3xl border border-gray-300 max-w-6xl mx-auto">
          <CardContent>
            <h2 className="text-4xl font-extrabold text-emerald-900 mb-4">📊 Live Sensor Trends</h2>
            <p className="text-gray-700 mb-8">Visualize real-time farm data.</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#d1fae5"/>
                <XAxis dataKey="time" tick={{ fill: "#065f46", fontWeight: "600" }}/>
                <YAxis tick={{ fill: "#065f46", fontWeight: "600" }} domain={["auto", "auto"]}/>
                <Tooltip contentStyle={{
                  backgroundColor: "#f0fdf4",
                  borderRadius: "10px",
                  borderColor: "#a7f3d0",
                  color: "#065f46",
                  fontWeight: "600"
                }}/>
                <Legend wrapperStyle={{ fontWeight: "700", color: "#065f46" }}/>
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="🌡️ Temperature" strokeWidth={3} activeDot={{ r: 8 }}/>
                <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="💧 Humidity" strokeWidth={3} activeDot={{ r: 8 }}/>
                <Line type="monotone" dataKey="moisture" stroke="#10b981" name="🌱 Moisture" strokeWidth={3} activeDot={{ r: 8 }}/>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Farm Map */}
        <section className="bg-white py-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">🌍 Field Map</h2>
          <p className="text-gray-600 mb-6">Live view of sensor/actuator placement.</p>
          <div className="w-full h-[400px] overflow-hidden rounded-2xl bg-gray-100">
            <img src="/farm-map-placeholder.jpg" alt="Field Map" className="w-full h-full object-cover"/>
          </div>
        </section>

        {/* Device Status Table */}
        <section className="bg-gray-50 py-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">📦 Devices</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white">
              <thead className="bg-emerald-100 text-emerald-800">
                <tr>
                  <th className="px-6 py-3 text-left">Device</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {deviceStatus.map((d,i) => (
                  <tr key={i} className="border-b hover:bg-gray-100 transition">
                    <td className="px-6 py-4">{d.name}</td>
                    <td className="px-6 py-4">{d.type}</td>
                    <td className={`px-6 py-4 font-bold ${d.status === "Online" ? "text-green-600" : "text-red-500"}`}>{d.status}</td>
                    <td className="px-6 py-4 text-gray-500">{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Event Log */}
        <section className="bg-white py-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-amber-200">
          <h2 className="text-3xl font-bold text-amber-700 mb-6">📋 Recent Alerts & Events</h2>
          <ul className="space-y-4">
            {events.map((e,i) => (
              <li key={i} className="bg-gray-50 border-l-4 border-amber-500 shadow p-4 rounded">{e}</li>
            ))}
            {!events.length && <li className="text-gray-500">No recent events.</li>}
          </ul>
        </section>

        {/* Control Panel */}
        <section className="bg-gray-50 py-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">🔧 Control Panel</h2>
          <div className="flex items-center gap-6">
            <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} onClick={triggerPump}
                           className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full shadow hover:bg-amber-700">
              <Zap size={20}/> Trigger Irrigation Pump
            </motion.button>
            <span className="flex items-center text-gray-600"><Wifi size={20} className="mr-2"/> All devices connected</span>
          </div>
        </section>
      </main>
    </>
  );
}

function SensorCard({ label, value, icon: Icon, color }) {
  return (
    <Card className="bg-white shadow-lg p-6 rounded-2xl border border-gray-200 hover:shadow-2xl hover:scale-[1.05] transition-transform cursor-default">
      <CardContent className="flex flex-col items-center text-center">
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
