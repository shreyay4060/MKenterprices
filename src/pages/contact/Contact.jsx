import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

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
      const contactRef = collection(fireDB, "portfolioContacts");
      await addDoc(contactRef, contact);
      toast.success("Message sent successfully");

      // Reset form
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
      <div
        id="contact"
        className="min-h-screen pt-20 px-4 py-12 bg-gradient-to-br from-violet-100 via-white to-violet-200"
      >
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-700 mb-3">
          Contact Me
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          I’d love to hear from you! Feel free to reach out for any project,
          collaboration, or just to say hello.
        </p>

        {/* Form and Info */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10">
          {/* Contact Form */}
          <form
            onSubmit={submitContact}
            className="bg-white px-6 py-8 rounded-md shadow-md border border-violet-300 space-y-4 w-full max-w-sm"
          >
            <div>
              <label className="block mb-1 text-xs text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-2 py-1 border text-xs border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-xs text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-2 py-1 border text-xs border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-xs text-gray-700 font-medium">Message</label>
              <textarea
                rows="3"
                name="message"
                value={contact.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="w-full px-2 py-1 border text-xs border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-400"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-violet-600 text-white text-xs px-3 py-1 rounded hover:bg-violet-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="text-sm text-gray-700 space-y-5 max-w-sm">
            <div>
              <h3 className="font-semibold text-violet-700 text-sm mb-1">Email</h3>
              <p>
                <a href="mailto:shreyay4060@gmail.com" className="hover:underline">
                  shreyay4060@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-violet-700 text-sm mb-1">Phone</h3>
              <p>
                <a href="tel:8421915279" className="hover:underline">
                  8421915279
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-violet-700 text-sm mb-1">Location</h3>
              <p>Kadepur, Sangli, Maharashtra</p>
            </div>

            <div>
              <h3 className="font-semibold text-violet-700 text-sm mb-1">Socials</h3>
              <p>
                <a
                  href="https://github.com/shreyay4060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline"
                >
                  GitHub
                </a>{" "}
                |{" "}
                <a
                  href="https://www.linkedin.com/in/shreya-yadav-53286028b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
