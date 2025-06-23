import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { useNavigate } from 'react-router';
import myContext from '../../context/myContext';
import { motion } from "framer-motion";

export default function WorkInfo() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllWork, loading , deleteWorkFun} = context;

  return (
    <Layout>
        
      <div className="min-h-screen pt-[100px] px-4 pb-16 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">Work Information</h2>
            <button
              onClick={() => navigate('/addWork')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md transition-transform transform hover:scale-105"
            >
              Add Work
            </button>
          </div>

          {/* Loader */}
          {loading && (
            <p className="text-center text-violet-400 font-medium">Loading work data...</p>
          )}

          {/* No Work */}
          {!loading && (!getAllWork || getAllWork.length === 0) && (
            <p className="text-center text-gray-400 font-medium">No work available.</p>
          )}

          {/* Work Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {getAllWork && getAllWork.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border border-violet-700 rounded-xl p-5 shadow-lg hover:shadow-violet-700/40 transition-all"
              >
                <h3 className="text-xl font-semibold text-violet-300 mb-2">{item.title}</h3>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" h-48 object-cover rounded-lg my-6 mb-3"
                  />
                )}
                <p className="text-sm text-gray-400 mb-1">
                  <span className="text-yellow-500 font-medium">Location:</span> {item.location}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="text-yellow-500 font-medium">Salary:</span> ₹{item.salary}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <span className="text-yellow-500 font-medium">Date:</span> {item.date}
                </p>
                <p className="text-gray-300 text-sm">{item.description}</p>
                <button onClick={()=>deleteWorkFun(item.id)} className='border px-2 py-1 mt-7 rounded-md text-orange-600 hover:bg-orange-600 hover:border-orange-600 hover:text-white'>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
