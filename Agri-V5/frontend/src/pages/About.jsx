import React from "react";
import {

  Smile,
  Mail,
  Phone,
  TrendingUp,
  Cloud,
  ShieldCheck,
  Zap,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <main className="bg-green-50 text-gray-800 min-h-screen px-6 pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-20">
        <motion.h1
          className="text-5xl font-extrabold text-green-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🌿 About Our Smart Agriculture Platform
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering farmers with real-time data and automation through IoT — building a greener, more efficient future in agriculture.
        </p>
      </section>

      {/* What is Smart Agriculture */}
      <section className="max-w-4xl mx-auto mb-24 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">🌾 What is Smart Agriculture?</h2>
        <p className="text-gray-700 mb-4">
          Smart agriculture enhances traditional farming by integrating Internet of Things (IoT) devices, automation, cloud computing, and data analytics to improve productivity, efficiency, and sustainability.
        </p>
        <p className="text-gray-700">
          Our platform simplifies this integration, giving users a powerful dashboard that tracks and automates environmental control — all in real-time.
        </p>
      </section>

      {/* Advanced Features */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-10">🛠️ Advanced Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature icon={Cloud} title="Cloud Dashboard" text="Securely store and analyze your data with our cloud-connected interface." />
          <Feature icon={Zap} title="Automated Irrigation" text="Trigger watering based on soil moisture thresholds — no manual effort needed." />
          <Feature icon={Loader2} title="Live Syncing" text="All sensors update in real-time so you're always in the know." />
        </div>
      </section>

      {/* Advantages Section */}
      <section className="bg-green-100 py-16 mb-24 rounded-3xl shadow-inner">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-10">🌟 Key Advantages</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <Benefit icon={TrendingUp} title="Higher Crop Yields" text="Use data to optimize harvests and reduce guesswork." />
          <Benefit icon={ShieldCheck} title="Risk Reduction" text="Prevent crop loss with early warnings for poor conditions." />
          <Benefit icon={Smile} title="Saves Time & Money" text="Lower labor costs, less wasted water, and more efficient planning." />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto mb-24 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-10">🔧 How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-4 text-left max-w-3xl mx-auto">
          <li><strong>Install IoT Sensors:</strong> Devices placed in your farm gather temperature, humidity, and soil data.</li>
          <li><strong>Live Data Streaming:</strong> Readings are transmitted to our cloud dashboard in real time.</li>
          <li><strong>Smart Alerts:</strong> Get notified when conditions cross critical thresholds.</li>
          <li><strong>Automated Actions:</strong> Trigger irrigation or ventilation based on sensor readings.</li>
          <li><strong>Track Trends:</strong> Visualize performance over time to make long-term improvements.</li>
        </ol>
      </section>

      {/* Community Feedback */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-10">🗣️ What Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeedbackCard
            name="Aarav Sharma – Farmer"
            message="This platform has changed how I farm. I save water and make better decisions thanks to the live data."
          />
          <FeedbackCard
            name="Priya Desai – Agriculture Student"
            message="I'm learning so much using the dashboard. It's simple to use and teaches real-world IoT applications."
          />
        </div>
      </section>

      {/* Contact & Feedback */}
      <section className="max-w-4xl mx-auto mb-24 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">📬 Contact & Feedback</h2>
        <p className="text-gray-700 mb-4">
          Have questions, suggestions, or ideas? We’d love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2 text-green-800">
            <Mail /> <span>support@smartagri.io</span>
          </div>
          <div className="flex items-center gap-2 text-green-800">
            <Phone /> <span>+91 98765 43210</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-green-200">
        <h2 className="text-3xl font-extrabold text-green-800 mb-4">🌱 Ready to Farm Smarter?</h2>
        <p className="text-gray-700 mb-6">
          Join a growing community of users revolutionizing agriculture through smart technologies.
        </p>
        <button className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition">
          Get Started
        </button>
      </section>
    </main>
  );
};

export default About;

// Reusable components
const Feature = ({ icon: Icon, title, text }) => (
  <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-md hover:shadow-xl transition">
    <Icon size={36} className="text-green-600 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-700">{text}</p>
  </div>
);

const Benefit = ({ icon: Icon, title, text }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-green-300 transition">
    <Icon size={32} className="text-green-700 mb-3" />
    <h4 className="text-xl font-bold mb-2 text-green-800">{title}</h4>
    <p className="text-gray-700">{text}</p>
  </div>
);

const FeedbackCard = ({ name, message }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
    <p className="text-gray-800 mb-4 italic">“{message}”</p>
    <p className="text-green-700 font-semibold">— {name}</p>
  </div>
);
