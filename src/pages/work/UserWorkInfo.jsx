import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { motion } from "framer-motion";

export default function UserWorkInfo() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);

  // navigation
  const navigate = useNavigate();

  const fetchWorkData = async () => {
    try {
      const workRef = doc(fireDB, "work", id);
      const docSnap = await getDoc(workRef);

      if (docSnap.exists()) {
        setWork({ ...docSnap.data(), id: docSnap.id });
      } else {
        console.log("No such document!");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching work data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkData();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="min-h-screen mt-30 lg:mt-5 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-20 px-4 pb-16">
        <div className="text-2xl flex justify-center font-bold mb-6">
          {" "}
          Available Work :
        </div>
        <div className="max-w-4xl mx-auto bg-gray-900 border rounded-xl shadow-lg p-6">
          {work ? (
            <>
              <h2 className="text-3xl font-bold text-yellow-400 mb-4 capitalize">
                {work.title}
              </h2>

              {work.image && (
                <img
                  src={work.image}
                  alt={work.title}
                  className=" h-60 object-cover rounded-md  mb-6"
                />
              )}

              <p className="text-gray-300 mb-2">
                <span className="text-yellow-400 font-medium">Place:</span>{" "}
                {work.place || "-"}
              </p>

              <p className="text-gray-300 mb-2">
                <span className="text-yellow-400 font-medium">Location:</span>{" "}
                <a
                  href={work.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-400 hover:text-blue-500 break-all"
                >
                  {work.location}
                </a>
              </p>
              <p className="text-gray-300 mb-2">
                <span className="text-yellow-400 font-medium">
                  Dress code :
                </span>
                Black shirt , Black formal pant & black formal shoes . . Black
                Blazer if you have . .
              </p>
              <p className="text-gray-300 mb-2">
                <span className="text-yellow-400 font-medium">Salary:</span> ₹
                {work.salary}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="text-yellow-400 font-medium">Date:</span>{" "}
                {work.date}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="text-yellow-400 font-medium">Time:</span>{" "}
                {work.time}
              </p>
              <p className="text-gray-300 mt-4 whitespace-pre-wrap break-words">
                <span className="text-yellow-400 font-medium">
                  Description:
                </span>{" "}
                {work.description || "-"}
              </p>
              <br />
              <div className="flex gap-6 mt-4">
                <button
                  onClick={() => navigate("/workerApplication")}
                  className="border py-1 px-2 rounded-md bg-amber-500 hover:bg-amber-600 hover:scale-105 text-black  transition-all active:bg-amber-700"
                >
                  Apply Now
                </button>
                <button className="bg-green-500 hover:bg-green-600 transition-all hover:scale-105 text-black py-1 px-4 rounded text-sm">
                  <a
                    href={`https://wa.me/${work.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </button>
              </div>
            </>
          ) : (
            <p className="text-red-400 text-center">Work not found</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
