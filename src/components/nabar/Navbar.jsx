import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-b shadow-md">
      <div className="flex font-medium text-md justify-between items-center flex-col lg:flex-row gap-4 px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.jpg"
            alt="MK Enterprises Logo"
            width="40"
            height="40"
            className="rounded-full border border-yellow-400"
          />
          <span className="text-yellow-400 font-bold text-xl tracking-wide">
            MK ENTERPRISES
          </span>
        </div>

        {/* Links */}
        <ul className="flex gap-6 text-white">
          {["homePage", "about", "service", "contact" ].map((route, index) => (
            <li
              key={index}
              className="relative group transition duration-300 hover:scale-110 hover:text-yellow-300"
            >
              <Link to={`/${route}`} className="inline-block relative capitalize">
                {route === "homePage" ? "Home" : route}
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
              </Link>
            </li>
          ))}
          <li  className="relative group transition duration-300 hover:scale-110 hover:text-yellow-300">
            <Link to = {"/adminDashboard"}>Admin</Link>
          </li>
        </ul>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="transition duration-300 hover:scale-105 hover:bg-yellow-500 bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold shadow-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
}
