import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div id="about" className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-violet-200 text-gray-800 px-6 py-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h2 className="text-4xl font-bold text-violet-800 mb-4 border-b-4 border-violet-600 inline-block pb-1">About MK Enterprises</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-black">MK ENTERPRISES & MANAGEMENT SERVICE</span> is a forward-thinking firm 
            committed to elevating businesses with comprehensive manpower solutions, expert workforce 
            management, and end-to-end operations support. We empower organizations through strategic collaboration 
            and a commitment to operational excellence.
          </p>

          <p className="mt-4 text-lg text-gray-700">
            We deliver a diverse range of services—from staffing and facility management to logistical coordination
            and administrative outsourcing. Our goal is to optimize productivity while enabling our partners to 
            focus on their core business values.
          </p>

          <p className="mt-4 text-lg text-gray-700">
            Driven by innovation, integrity, and quality service, MK Enterprises has become a trusted partner 
            to organizations across sectors, delivering agile, scalable, and custom-fit solutions that create value.
          </p>

          <div className="mt-6">
            <a
              href="#service"
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105"
            >
              Learn More About Our Services
            </a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <img
            src="/images/business-bg.jpg"
            alt="Business Leadership"
            className="rounded-xl shadow-lg object-cover w-full h-60"
          />
          <img
            src="/images/business-bg2.jpg"
            alt="Team Collaboration"
            className="rounded-xl shadow-lg object-cover w-full h-60"
          />
          <img
            src="/images/business-bg3.jpg"
            alt="Operational Efficiency"
            className="rounded-xl shadow-lg object-cover w-full h-60 md:col-span-2"
          />
        </motion.div>
      </div>
    </div>
  );
}