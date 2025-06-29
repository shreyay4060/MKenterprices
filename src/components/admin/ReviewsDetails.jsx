import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/myContext";
import { motion } from "framer-motion";

export default function ReviewsDetails() {
  const { getAllReviews, deleteReviewFun } = useContext(MyContext);
  const reviews = getAllReviews;

  // Theme
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="py-8 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {reviews.map(({ id, name, email, message, date, image }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-1 border-violet-700 relative hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-6 text-left relative">
              <div className="flex items-center mb-4">
                {image ? (
                  <img
                    src={image}
                    alt={`${name}'s uploaded`}
                    className="w-16 h-16 rounded-full border-2 border-violet-500 object-cover shadow-lg mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full border-2 border-violet-500 bg-white flex items-center justify-center shadow-lg mr-4">
                    <span className="text-2xl">👤</span>
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                {date?.seconds
                  ? new Date(date.seconds * 1000).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </p>
              <button
                onClick={() => deleteReviewFun(id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-full transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}