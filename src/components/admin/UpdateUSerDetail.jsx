import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

export default function UpdateUserDetail() {
  const { id } = useParams();
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [getSingleUser, setGetSingleUser] = useState({
    name: "",
    email: "",
    role: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const getSingleUserFun = async () => {
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(fireDB, "user", id));
      const user = userDoc.data();
      setGetSingleUser({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "",
        time: user?.time || "",
        date: user?.date || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const updateUserFun = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "user", id), {
        name: getSingleUser.name,
        email: getSingleUser.email,
        role: getSingleUser.role,
        time: getSingleUser.time,
        date: getSingleUser.date,
      });
      toast.success("User role updated successfully!");
      navigate("/adminDashboard");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("User update failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleUserFun();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setGetSingleUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex  justify-center items-center min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-4">
      

      <div className="bg-gradient-to-br from-black via-slate-900 to-gray-800 border border-yellow-500 text-white rounded-xl shadow-xl px-8 py-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Update User Role
        </h2>

        <div className="mb-4">
          <label className="block text-yellow-300 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={getSingleUser.name}
            readOnly
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-yellow-300 mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={getSingleUser.email}
            readOnly
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label className="block text-yellow-300 mb-1">Role:</label>
          <input
            type="text"
            name="role"
            onChange={handleChange}
            value={getSingleUser.role}
            placeholder="User Role"
            className="w-full bg-gray-800 border border-yellow-400 text-white rounded-md px-3 py-2 outline-none focus:border-yellow-500"
          />
        </div>

        <button
          onClick={updateUserFun}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-md transition-all"
        >
          Update Role
        </button>
      </div>
    </div>
  );
}
