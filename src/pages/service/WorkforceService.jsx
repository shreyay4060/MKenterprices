import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function WorkforceService() {
  return (
    <Layout>
      <div className="min-h-screen pt-48 lg:pt-30 px-4 pb-20 bg-gradient-to-r from-[#010320] via-[#010e50] to-[#021b57] text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-6">
            Workforce Management
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            MK Enterprises offers industry-leading workforce management solutions tailored to streamline your HR operations, staffing, and scheduling.
            Our mission is to help organizations boost productivity, minimize labor costs, and foster stronger employee engagement through smart planning and expert execution.
          </p>
          <img
            src="/images/business-bg.jpg"
            alt="Workforce Management"
            className="rounded-xl shadow-xl w-full max-h-[400px] object-cover border border-violet-600"
          />
        </motion.div>
      </div>
    </Layout>
  );
}
