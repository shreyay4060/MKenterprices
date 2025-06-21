import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function Facility() {
  return (
    <Layout>
      <div className="min-h-screen pt-[200px] bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 py-10 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Facility Services
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            At <strong className="text-white">MK ENTERPRISES and Management Service</strong>, we provide top-notch facility services tailored for industries, corporates, and residential complexes.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {facilityList.map((facility, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 shadow-xl rounded-2xl p-6 border border-violet-700 hover:shadow-yellow-400/30 transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-4xl mb-4 text-yellow-400">{facility.icon}</div>
              <h2 className="text-xl font-semibold text-violet-300 mb-2">{facility.title}</h2>
              <p className="text-gray-400 text-sm">{facility.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-yellow-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us?
          </motion.h2>
          <p className="text-gray-300 mb-16 text-base">
            We combine experience, advanced management tools, and trained staff to deliver seamless and secure facility management services for our clients. Our commitment is to quality, hygiene, safety, and responsiveness.
          </p>
        </div>
      </div>
    </Layout>
  );
}

const facilityList = [
  {
    icon: "🧹",
    title: "Housekeeping",
    description:
      "Daily, weekly, or custom schedules for industrial, commercial, and residential housekeeping needs.",
  },
  {
    icon: "🛡️",
    title: "Security Services",
    description:
      "Professional and trained security guards ensuring 24/7 safety and peace of mind.",
  },
  {
    icon: "🛠️",
    title: "Maintenance",
    description:
      "Routine checks, repairs, and technical maintenance services to keep your premises running smoothly.",
  },
  {
    icon: "🌿",
    title: "Garden & Landscape",
    description:
      "Aesthetic and professional upkeep of green areas including lawns, plants, and outdoor decor.",
  },
  {
    icon: "🧯",
    title: "Fire & Safety Checks",
    description:
      "Inspection and compliance services to ensure fire safety systems and emergency preparedness.",
  },
  {
    icon: "🚮",
    title: "Waste Management",
    description:
      "Proper disposal, recycling, and cleanliness management adhering to environmental standards.",
  },
];
