import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div
        id="about"
        className="min-h-screen pt-47 lg:pt-33  bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white px-6  lg:py-28 "
      >
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
              <span className="font-semibold text-white">
                MK ENTERPRISES & MANAGEMENT SERVICE
              </span>{" "}
              Connecting Businesses with Temporary Workers
            </p>

            <p className="mt-4 text-lg text-gray-300">
              We bridge the gap between businesses and skilled manpower,
              providing flexible and efficient staffing solutions for short-term
              job opportunities. Our platform simplifies hiring, enabling
              businesses to grow while offering temporary workers
              flexible work options.
            </p>

            <p className="mt-4 text-lg text-gray-300">
              <strong className="text-xl text-yellow-600">
                Mukund Kumbhar: Expert Event Management Services
              </strong>
            </p>
          
            <br />
            <ol>
              <li>1. Traffic Management: Ensuring smooth flow and safety.</li>
              <li>
                2. Sports Management: Coordinating tournaments and events.
              </li>
              <li>3. Political Functions: Providing logistical support.</li>
              <li>
                4. Wedding Ceremony Management: Making your special day
                unforgettable.
              </li>
            </ol>

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
              src="/images/business_women.jpg"
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

        {/* section 2 admin details */}
        <div className="max-w-6xl pb-20 border-t pt-10 mx-auto mt-10 flex flex-col lg:flex-row  gap-12">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold text-yellow-400 mb-4 border-b-4 border-yellow-600 inline-block pb-1">
              Mukund Kumbhar,
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="font-semibold text-white">
                Meet Mukund Kumbhar,
              </span>{" "}
              Director and CEO, a BSc Computer Science graduate from SGM
              College, Karad. With over 2 years of experience in producing
              events across various verticals, Mukund has honed his skills in
              management and production. He has successfully led management
              teams and volunteers for major companies, fostering strong vendor
              relationships. His expertise spans multiple segments, making him a
              seasoned professional in the industry.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <img
              src="/images/adminImg.jpg"
              alt="Business Leadership"
              className="rounded-xl shadow-lg object-cover  h-66"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
