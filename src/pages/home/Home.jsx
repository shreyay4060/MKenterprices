import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ For animation

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/business-bg.jpg",
    "/images/business-bg2.jpg",
    "/images/business-bg3.jpg",
  ];

  // Typed.js animation
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js";
    script.onload = () => {
      const Typed = window.Typed;
      new Typed("#element", {
        strings: [
          "Empowering Businesses",
          "Smart Workforce Management",
          "Reliable Enterprise Solutions",
        ],
        typeSpeed: 40,
        backSpeed: 10,
        loop: true,
        showCursor: false,
      });
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="relative mt-12 lg:mt-0 min-h-screen overflow-hidden">
      {/* Background Carousel */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms]"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          filter: "brightness(0.5)",
        }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-white text-center bg-gradient-to-r from-black/30 via-black/20 to-black/30">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-6 tracking-wide"
        >
          MK Enterprises & Management Service
        </motion.h1>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          id="element"
          className="text-2xl sm:text-4xl font-semibold text-yellow-300 drop-shadow-md"
        ></motion.span>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 text-lg max-w-2xl text-white leading-relaxed drop-shadow"
        >
          We specialize in delivering tailored business services, workforce solutions,
          and operational excellence across industries.
        </motion.p>

        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block bg-yellow-400 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
        >
          Explore Services
        </motion.a>
      </div>
    </div>
  );
}
