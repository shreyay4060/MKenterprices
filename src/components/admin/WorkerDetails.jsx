import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";

export default function WorkerDetails() {
  const { getAllWorkers, deleteWorkerFun } = useContext(myContext);

  useEffect(() => {
    // Worker data is already fetched in context on mount
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
          All Worker Applications
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {getAllWorkers.length === 0 ? (
            <p className="text-center col-span-full">
              No worker applications found.
            </p>
          ) : (
            getAllWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-gray-900 border border-yellow-500 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={worker.image}
                    alt={worker.name}
                    className="w-16 h-16 rounded-full border-2 border-yellow-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400">
                      {worker.name}
                    </h3>
                    <p className="text-sm text-gray-300">{worker.email}</p>
                    <p className="text-sm text-gray-300">{worker.contact}</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-2">
                  <span className="font-medium text-white">Address:</span>{" "}
                  {worker.address}
                </p>
                <p className="text-gray-500 text-sm">
                  Applied on: {worker.date}
                </p>

                <div className="flex gap-6 mt-4">
                <a href={`mailto:${worker.email}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-black py-1 px-4 rounded text-sm">
                    Send Mail
                  </button>
                </a>

                <button
                  onClick={() => deleteWorkerFun(worker.id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded text-sm"
                >
                  Delete
                </button>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
