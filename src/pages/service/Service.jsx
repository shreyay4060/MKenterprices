import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

const services = [
  {
    title: "Workforce Management",
    description: "End-to-end staffing solutions for businesses of all scales.",
    image: "/images/business-bg.jpg",
    path: "/workforce",
  },
  {
    title: "Facility Management",
    description: "Comprehensive services to maintain and operate facilities efficiently.",
    image: "/images/business-bg2.jpg",
    path: "/facility",
  },
  {
    title: "Logistics Coordination",
    description: "Streamlined logistics solutions to keep your operations on track.",
    image: "/images/business-bg3.jpg",
    path: "/logistics",
  },
  {
    title: "Admin Outsourcing",
    description: "Delegating admin operations to improve business focus and agility.",
    image: "/images/logo.jpg",
    path: "/admin",
  },
];

export default function Service() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div
        id="service"
        className="min-h-screen bg-gradient-to-br  from-black via-gray-900 to-gray-800 px-6 py-18 lg:py-25 text-white"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-yellow-400 border-b-4 border-yellow-500 inline-block pb-2"
          >
            Our Services
          </motion.h2>
          <p className="mt-4 text-gray-300 text-lg">
            We provide flexible, reliable, and strategic solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white text-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => navigate(service.path)}
            >
              <img
                src={service.image}
                alt={service.title}
                className="rounded-t-xl h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-violet-700 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
