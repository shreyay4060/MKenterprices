import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function Logistics() {
  return (
    <Layout>
      <div className="min-h-screen pt-[190px] bg-gradient-to-br from-black via-gray-900 to-gray-800 px-6 py-16 text-white">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Logistics Services
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            At <strong className="text-white">MK ENTERPRISES and Management Service</strong>,
            we provide reliable, scalable, and secure logistics services tailored to modern
            transportation and supply chain demands. Our operations span across urban and rural
            India, ensuring last-mile delivery and optimized freight handling.
          </motion.p>
        </div>

        {/* Info Image */}
        <div className="max-w-6xl mx-auto mb-16">
          <img
            src="/images/logistic1.jpg"
            alt="MK Logistics"
            className="w-full rounded-2xl shadow-xl object-cover h-72 md:h-96"
          />
        </div>

        {/* Service List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {logisticsList.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-violet-700 hover:shadow-yellow-400/30 transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-4xl text-yellow-400 mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-violet-300 mb-2">{item.title}</h2>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Details Section */}
        <div className="text-center mt-20 max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-yellow-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Why Our Logistics Services Stand Out?
          </motion.h2>
          <p className="text-gray-300 text-base">
            From first mile to last mile, our logistics solutions are designed to be fast,
            dependable, and cost-effective. Backed by GPS tracking, 24/7 monitoring,
            automated scheduling, and an experienced team, we ensure your goods are delivered
            safely and on time — every time.
          </p>
        </div>

        {/* Extra Functional Section */}
        <div className="mt-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">Smart Routing Technology</h3>
            <p className="text-gray-400">
              Our AI-powered route optimization ensures that deliveries follow the fastest and
              most fuel-efficient paths. We reduce delays and maximize operational efficiency.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">Client Dashboard</h3>
            <p className="text-gray-400">
              Businesses partnering with us get access to a digital dashboard for real-time
              shipment tracking, analytics, and inventory status with easy-to-read reports.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const logisticsList = [
  {
    icon: "🚚",
    title: "Transportation Services",
    description:
      "Efficient road transport solutions for bulk and regular deliveries across regions.",
  },
  {
    icon: "📦",
    title: "Warehousing & Storage",
    description:
      "Secure and scalable storage facilities with real-time inventory tracking.",
  },
  {
    icon: "🧾",
    title: "Inventory Management",
    description:
      "End-to-end tracking and automated systems to manage stock levels, reorders, and audits.",
  },
  {
    icon: "🔄",
    title: "Reverse Logistics",
    description:
      "Streamlined product returns and recovery services to enhance your supply chain efficiency.",
  },
  {
    icon: "🌐",
    title: "Distribution Network",
    description:
      "Optimized delivery routes and fulfillment for timely and accurate order processing.",
  },
  {
    icon: "📍",
    title: "Real-Time Tracking",
    description:
      "Live tracking and updates for shipments to ensure transparency and reliability.",
  },
];
