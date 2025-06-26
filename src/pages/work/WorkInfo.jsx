import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { motion } from "framer-motion";

export default function WorkInfo() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllWork, loading, deleteWorkFun } = context;

  const admin = JSON.parse(localStorage.getItem("users"));

  return (
    <Layout>
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-2">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold text-yellow-400"
            >
              Work Information
            </motion.h2>
            <button
              onClick={() => navigate("/addWork")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md transition-transform transform hover:scale-105"
            >
              Add Work
            </button>
          </div>

          {/* Admin Contact (Optional Info Bar) */}
          {admin?.phone && (
            <p className="mb-6 text-sm text-gray-300 break-words">
              <strong className="text-yellow-400">Phone:</strong>{" "}
              <a
                href={`tel:${admin.phone}`}
                className="hover:text-yellow-500 underline break-all"
              >
                {admin.phone}
              </a>
            </p>
          )}

          {/* Loader */}
          {loading && (
            <p className="text-center text-violet-400 font-medium animate-pulse">
              Loading work data...
            </p>
          )}

          {/* No Work */}
          {!loading && (!getAllWork || getAllWork.length === 0) && (
            <p className="text-center text-gray-400 font-medium">
              No work available.
            </p>
          )}

          {/* Work Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {getAllWork &&
              getAllWork.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 border border-violet-700 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-violet-700/40 transition-all"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-violet-300 mb-2 truncate">
                    {item.title}
                  </h3>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className=" h-44 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="text-sm sm:text-base space-y-1 text-gray-300 break-words">
                    <p>
                      <span className="text-yellow-500 font-medium">
                        Location:
                      </span>{" "}
                      <a
                        href={item.location}
                        className="break-all inline-block underline text-blue-400  hover:text-blue-500"
                      >
                        {item.place}
                      </a>
                    </p>

                    <p className="text-gray-300 mb-2">
                      <span className="text-yellow-400 font-medium">
                        Dress code :
                      </span>{" "}
                       Black shirt , Black formal pant & black formal shoes . .
                      Black Blazer if you have . .
                    </p>
                    <p>
                      <span className="text-yellow-500 font-medium">
                        Salary:
                      </span>{" "}
                      ₹{item.salary}
                    </p>
                    <p>
                      <span className="text-yellow-500 font-medium">Date:</span>{" "}
                      {item.date}
                    </p>
                    <p>
                      <span className="text-yellow-500 font-medium">Time:</span>{" "}
                      {item.time}
                    </p>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteWorkFun(item.id)}
                    className="border px-3 py-1 mt-4 rounded-md text-orange-600 hover:bg-orange-600 hover:border-orange-600 hover:text-white"
                  >
                    Delete
                  </button>
                  <p className="text-sm text-gray-500 mt-7">Posted on : {item.postedDate}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
