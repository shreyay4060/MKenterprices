import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ReviewMsg({ reviews = [] }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="py-8 px-4  bg-transparent">
      

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {reviews.map(({ id, name, email, message, date, image }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-violet-700 relative hover:shadow-2xl transition-all duration-300"
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
                  <div className="w-16 h-16 rounded-full border-2 border-violet-500 bg-white object-cover flex items-center justify-center shadow-lg mr-4">
                    <span className="text-5xl">👤</span>
                  </div>
                )}
                <div>
                  <h3 className="font-bold   dark:text-yellow-500">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {email}
                  </p>
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
