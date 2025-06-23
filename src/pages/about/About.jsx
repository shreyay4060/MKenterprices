import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div id="about" className="min-h-screen pt-47  lg:pt-25 bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white px-6  lg:py-28 ">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row  gap-12">

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold text-yellow-400 mb-4 border-b-4 border-yellow-600 inline-block pb-1">
              About MK Enterprises
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="font-semibold text-white">MK ENTERPRISES & MANAGEMENT SERVICE</span> is a platform that connects businesses with temporary workers in India, making short-term job opportunities easily accessible. Whether you're looking for flexible work or need reliable staff for a few hours or days, Workpluss simplifies the hiring process. This platform aims to bridge the gap between businesses and temporary workers, providing a convenient and efficient solution for both parties.
            </p>

            <p className="mt-4 text-lg text-gray-300">
              Our mission is to bridge the gap between businesses and skilled manpower by delivering flexible, efficient, and trusted staffing solutions that simplify hiring and enable business growth.
            </p>

            <p className="mt-4 text-lg text-gray-300">
              With a foundation built on innovation, integrity, and service quality, MK Enterprises stands as a trusted partner for logistics, facility management, administrative support, and more.
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Overall, MK Enterprises streamlines the hiring process, making it easier for businesses and temporary workers to connect and work together.
            </p>

            <div className="mt-6">
              <a
                href="#service"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105"
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
            <img
              src="/images/about-4.jpg" // new uploaded image
              alt="MK Team"
              className="rounded-xl shadow-lg object-cover w-full h-60 md:col-span-2"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
