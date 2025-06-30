import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { motion } from "framer-motion";

export default function AvailableWork() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllWork, loading } = context;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen pt-50 lg:pt-40 pb-20 px-4 sm:px-10 bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold flex justify-center underline text-yellow-400"
            >
              Available Work
            </motion.h2>
          </div>

          {loading && (
            <p className="text-center text-violet-400 font-medium">
              Loading work data...
            </p>
          )}

          {!loading && (!getAllWork || getAllWork.length === 0) && (
            <p className="text-center text-gray-400 font-medium">
              No work available.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllWork &&
              getAllWork.map((item) => (
                <div key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-black via-slate-900 to-gray-800 border rounded-xl p-5 shadow-lg hover:shadow-violet-700/40 transition-all"
                  >
                    <Link to={`/work/${item.id}`} className="block">
                      <h3 className="text-xl font-semibold text-white mb-3 capitalize">
                        {item.title}
                      </h3>

                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-44 object-cover rounded-lg mb-4"
                        />
                      )}

                      <div className="text-sm space-y-1 text-gray-300 break-words">
                        <p>
                          <span className="text-yellow-400 font-medium">
                            Location:
                          </span>{" "}
                          <span className="break-all inline-block underline text-blue-400 hover:text-blue-500">
                            {item.place}
                          </span>
                        </p>

                        <p className="text-gray-300 mb-2">
                          <span className="text-yellow-400 font-medium">
                            Dress code :
                          </span>{" "}
                          Black shirt , Black formal pant & black formal shoes . .
                          Black Blazer if you have . .
                        </p>
                        <p>
                          <span className="text-yellow-400 font-medium">
                            Salary :
                          </span>{" "}
                          ₹{item.salary} / day
                        </p>
                        <p className=" text-lg">
                          <span className="text-yellow-400 font-medium">
                            Date :
                          </span>{" "}
                          {formatDate(item.fromDate)} - {formatDate(item.toDate)}
                        </p>
                        <p className="mt-2 text-gray-400">
                          {item.description?.substring(0, 25)}...
                        </p>
                        <br />
                        <button className="border py-1 px-2 rounded-md bg-amber-500 hover:bg-amber-600 text-black hover:scale-105 transition-all active:bg-amber-700">
                          Apply Now
                        </button>
                      </div>
                    </Link>
                    <br />
                    <a
                      href={`https://wa.me/9325662421`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 mt-2 block text-center transition-all hover:scale-105 text-black py-1 px-4 rounded text-sm"
                    >
                      WhatsApp
                    </a>
                    <p className="text-sm text-gray-500 mt-7">
                      Posted on : {item.postedDate}
                    </p>
                  </motion.div>
                </div>
              ))}
            <br />
            <p>
              For more info call -{" "}
              <a href="tel:+919325662421" className="text-yellow-400 underline">
                +91 9325662421
              </a>
            </p>
            <div className="mt-10">
            <h3 className="text-center text-3xl text-yellow-400 underline mb-9">Client Application</h3>
            <p className="text-center text-white mb-4">If you want to post your own work, please fill out our application form.</p>
            <div className="flex justify-center">
              <Link
                to="/clientApplicationForm"
                className="bg-yellow-500 active:bg-yellow-500 hover:bg-white font-bold hover:text-violet-700 text-black py-2 px-6 rounded-md transition duration-200"
              >
                 Client Application Form
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
