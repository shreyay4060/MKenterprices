import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Safely parse user data from localStorage
  let user = null;
  try {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("users");
  }

  const role = user?.role;

  // ✅ Define links based on role
  const baseLinks = [
    { path: "/homePage", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/service", label: "Service" },
    { path: "/contact", label: "Contact" },
  ];

  // ✅ Add dashboard link conditionally
  if (role === "admin") {
    baseLinks.push({ path: "/adminDashboard", label: user?.name || "Admin" });
  } else if (role === "user") {
    baseLinks.push({ path: "/userDashboard", label: user?.name || "User" });
  }

  const logoutFun = () => {
    localStorage.clear("users");
    navigate("/login");
  };

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

        {/* Navigation Links */}
        <ul className="flex gap-6 text-white">
          {baseLinks.map((link, index) => {
            const isActive = location.pathname === link.path;

            return (
              <li
                key={index}
                className={`relative group transition duration-300 ${
                  isActive
                    ? "text-yellow-400 scale-110"
                    : "hover:text-yellow-300 hover:scale-105"
                }`}
              >
                <Link
                  to={link.path}
                  className="inline-block capitalize font-semibold"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 h-0.5 w-full bg-yellow-400"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Login / Logout Button */}
        {user ? (
          <button
            onClick={logoutFun}
            className="transition duration-300 hover:scale-105 hover:bg-yellow-500 bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold shadow-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="transition duration-300 hover:scale-105 hover:bg-yellow-500 bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold shadow-sm"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}