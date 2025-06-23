import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function UserDashboard() {
  const user =JSON.parse(localStorage.getItem("users"))

  return (
    <Layout>
      <div className="min-h-screen pt-[100px] bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-yellow-400">Welcome, {user.name}!</h1>
            <p className="text-gray-400 mt-1 text-sm">Your personalized dashboard</p>
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="bg-gray-900 border border-violet-600 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-yellow-400 shadow-md"
            />

            <div className="flex-1 space-y-2 text-sm sm:text-base">
              <h2 className="text-xl font-semibold text-violet-200">{user.name}</h2>
              <p><span className="text-yellow-400 font-medium">Name:</span> {user.name}</p>
              <p><span className="text-yellow-400 font-medium">Email:</span> {user.email}</p>
              <p><span className="text-yellow-400 font-medium">Role:</span> {user.role}</p>
              <p><span className="text-yellow-400 font-medium">Joined:</span> {user.date}</p>
            </div>
          </motion.div>

          
        </div>
      </div>
    </Layout>
  );
}
