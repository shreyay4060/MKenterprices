import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";

export default function Review() {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    message: "",
  });

//   navigation
const navigate = useNavigate()

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const messageMaxLength = 250;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > messageMaxLength) return;

    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const { name, email, message } = reviewData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!message.trim()) newErrors.message = "Message is required.";
    else if (message.length < 10) newErrors.message = "Message must be at least 10 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    setLoading(true);
    try {
      const review = {
        ...reviewData,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      await addDoc(collection(fireDB, "reviews"), review);
      toast.success("Review submitted successfully!");
      setReviewData({ name: "", email: "", message: "" });
      navigate("/homePage")
      setErrors({});
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
        <form
          onSubmit={submitReview}
          className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-lg shadow-lg w-full max-w-lg transition-all"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Submit Your Review
          </h2>

          {/* Name Field */}
          <input
            type="text"
            name="name"
            value={reviewData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`w-full mb-2 px-4 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-violet-500"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mb-2">{errors.name}</p>
          )}

          {/* Email Field */}
          <input
            type="email"
            name="email"
            value={reviewData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={`w-full mb-2 px-4 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-violet-500"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mb-2">{errors.email}</p>
          )}

          {/* Message Field */}
          <textarea
            name="message"
            value={reviewData.message}
            onChange={handleChange}
            placeholder="Write your review here..."
            rows="5"
            className={`w-full mb-1 px-4 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-violet-500"
            }`}
          ></textarea>
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-right">
            {reviewData.message.length}/{messageMaxLength} characters
          </div>
          {errors.message && (
            <p className="text-sm text-red-500 mb-2">{errors.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded transition duration-200 ${
              loading
                ? "bg-violet-300 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
