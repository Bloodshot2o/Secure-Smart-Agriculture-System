// components/SensorChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SensorChart = ({ data }) => {
  return (
    <div className="w-full h-80 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Sensor Data Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature (°C)" />
          <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
          <Line type="monotone" dataKey="moisture" stroke="#10b981" name="Moisture (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
