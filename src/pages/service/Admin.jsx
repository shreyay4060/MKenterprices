import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function Admin() {
  const admin = {
    name: "Mukund Kumbhar",
    role: "Admin & Manager",
    email: "kumbharmukund27@gmail.com",
    phone: "+91 9325662421",
    address: "Near Shanivarwada  abc chouk  pune maharashtra",
    joined: "July 2024",
    profilePic: "/images/adminImg.jpg",
  };

  return (
    <Layout>
      <div className="min-h-screen pt-33 lg:pt-18 mt-20 lg:mt-10 mb-9 bg-gradient-to-r from-[#010320] via-[#010e50] to-[#021b57] px-3 py-8 text-white">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#010320] via-[#010e50] to-[#021b57] shadow-xl rounded-xl p-6 border border-violet-700">
          {/* Heading */}
          <motion.h1
            className="text-2xl font-bold text-center text-yellow-400 mb-6 border-b border-yellow-500 pb-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Admin Information
          </motion.h1>

          {/* Profile Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img
              src="/images/adminImg.jpg"
              alt="Admin"
              className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-md"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold text-violet-200">
                {admin.name}
              </h2>
              <p className="text-gray-300 text-sm">{admin.role}</p>
              <p className="mt-1 text-xs text-gray-400">
                Joined: {admin.joined}
              </p>
            </div>
          </motion.div>

          {/* Info List */}
          <div className="mt-6 space-y-4 ">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 p-3  rounded-md shadow-inner border border-violet-600"
            >
              <strong className="text-yellow-400 ">Email:</strong> {admin.email}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 p-3 rounded-md shadow-inner border border-violet-600"
            >
              <strong className="text-yellow-400">Phone:</strong>
              <a
                href={`tel:${admin.phone}`}
                className="hover:text-yellow-500 "
              >
                {admin.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-800 p-3 rounded-md shadow-inner border border-violet-600"
            >
              <strong className="text-yellow-400">Address:</strong>{" "}
              {admin.address}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
