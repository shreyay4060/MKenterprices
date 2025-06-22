import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { motion } from "framer-motion";

export default function AvailableWork() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllWork, loading } = context;

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-20 px-4 sm:px-10 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-yellow-400"
            >
              Available Work
            </motion.h2>
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-center text-violet-400 font-medium">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllWork &&
              getAllWork.map((item) => (
                <Link to={`/work/${item.id}`}>
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900   rounded-xl p-5 shadow-lg hover:shadow-violet-700/40 transition-all"
                  >
                    <h3 className="text-xl font-semibold text-violet-300 mb-3 capitalize">
                      {item.title}
                    </h3>

                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className=" h-44 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="text-sm space-y-1 text-gray-300">
                      <p>
                        <span className="text-yellow-400 font-medium">
                          Location:
                        </span>{" "}
                        {item.location}
                      </p>
                      <p>
                        <span className="text-yellow-400 font-medium">
                          Salary:
                        </span>{" "}
                        ₹{item.salary}
                      </p>
                      <p>
                        <span className="text-yellow-400 font-medium">
                          Date:
                        </span>{" "}
                        {item.date}
                      </p>
                      <p className="mt-2 text-gray-400">
                        {item.description.substring(0, 25)}...
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
