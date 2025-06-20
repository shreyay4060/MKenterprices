// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="border-b bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] w-full left-0 shadow-md fixed top-0 z-50">
      <div className="flex font-medium text-md justify-between items-center flex-col lg:flex-row gap-4 px-6 py-4">

        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.jpg"
            alt="MK Enterprises Logo"
            width="40"
            height="40"
            className="rounded-full border border-yellow-400"
          />
          <span className="text-yellow-400 font-bold text-xl tracking-wide">MK ENTERPRISES</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-white">
          <li className="transition duration-300 hover:scale-110 hover:text-yellow-300">
            <a href="#home">Home</a>
          </li>
          <li className="transition duration-300 hover:scale-110 hover:text-yellow-300">
            <a href="#about">About</a>
          </li>
          <li className="transition duration-300 hover:scale-110 hover:text-yellow-300">
            <a href="#service">Service</a>
          </li>
          <li className="transition duration-300 hover:scale-110 hover:text-yellow-300">
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Login Button */}
        <div>
          <button
            onClick={() => navigate("/login")}
            className="transition duration-300 hover:scale-105 hover:bg-yellow-500 bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold shadow-sm"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
