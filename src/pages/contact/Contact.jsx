import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { motion } from "framer-motion";

export default function Contact() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
    time: Timestamp.now(),
    date: new Date().toLocaleDateString(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const contactRef = collection(fireDB, "contactMsg");
      await addDoc(contactRef, contact);
      toast.success("Message sent successfully");

      setContact({
        name: "",
        email: "",
        message: "",
        time: Timestamp.now(),
        date: new Date().toLocaleDateString(),
      });
    } catch (error) {
      toast.error("Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pb-20 pt-52 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white  px-4">
        {/* Header */}
        <motion.h1
          className="text-4xl font-bold text-center text-yellow-400 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact MK ENTERPRISES and Management Service
        </motion.h1>
        <motion.p
          className="text-center text-gray-300 text-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We're here to help. Reach out for partnerships, services, or
          inquiries.
        </motion.p>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={submitContact}
            className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-yellow-500 rounded-2xl p-8 space-y-5 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl text-yellow-300 font-semibold mb-2">
              Send a Message
            </h2>

            <div>
              <label className="block text-sm text-yellow-100 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
                placeholder="name"
                className="w-full px-4 py-2 rounded bg-black/40 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-yellow-100 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-2 rounded bg-black/40 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-yellow-100 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={contact.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="4"
                className="w-full px-4 py-2 rounded bg-black/40 border border-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 rounded transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          {/* Info Box */}
          <motion.div
            className="text-gray-300 w-full max-w-md space-y-5 p-6 rounded-2xl border border-gray-700 bg-black/40 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h2 className="text-2xl text-yellow-300 font-semibold">
              Company Info
            </h2>
            <p>
              <strong>Address:</strong> Near Shanivarwada , abc Chouk Pune, Maharashtra
            </p>
            <p>
              <strong>Email:</strong> admin@mkenterprises.com
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+919325662421" className="text-yellow-400 underline">
                +91 9325662421
              </a>
            </p>

            <p>
              <strong>Hours:</strong> Mon – Sat, 9:00 AM – 6:00 PM
            </p>

            <div>
              <h3 className="text-yellow-400 font-medium text-lg">Follow Us</h3>
              <div className="flex gap-4 mt-2 text-yellow-300">
                <a href="#" className="hover:underline">
                  🌐 Website
                </a>
                <a
                  href="https://wa.me/919325662421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-green-400"
                >
                  🐳 WhatsApp
                </a>

                <a
                  href="https://www.instagram.com/mk_group.mangement27?igsh=bjg5eno2cmk2Ymc0"
                  className="hover:underline"
                >
                  📷 Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
