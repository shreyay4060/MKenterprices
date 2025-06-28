import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";

export default function Review() {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitReview = async (e) => {
    e.preventDefault();

    const { name, email, message } = reviewData;

    if (!name || !email || !message) {
      return toast.error("Please fill out all fields");
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
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
        <form
          onSubmit={submitReview}
          className="bg-white p-8 rounded shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Submit Your Review
          </h2>
          <input
            type="text"
            name="name"
            value={reviewData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="email"
            name="email"
            value={reviewData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            name="message"
            value={reviewData.message}
            onChange={handleChange}
            placeholder="Write your review here..."
            rows="5"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>
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
