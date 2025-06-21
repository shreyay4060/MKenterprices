import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function WorkforceService() {
  return (
    <Layout>

    <div className="min-h-screen bg-gradient-to-br mt-35 lg:mt-5  from-violet-100 via-white to-violet-200 px-6 py-20 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-violet-800 mb-6">
          Workforce Management
        </h1>
        <p className="text-lg mb-6">
          MK Enterprises offers industry-leading workforce management solutions tailored to streamline your HR operations, staffing, and scheduling. We help organizations optimize productivity, reduce labor costs, and enhance employee engagement.
        </p>
        <img
          src="/images/business-bg.jpg"
          alt="Workforce Management"
          className="rounded-xl shadow-lg w-full max-h-[400px] object-cover"
          />
      </motion.div>
    </div>
          </Layout>
  );
}