import React, { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import { motion } from "framer-motion";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";

export default function AddWork() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [work, setWork] = useState({
  title: "",
  image: "",
  place: "",
  location: "",
  description: "",
  salary: "",
  time: "",
  date: "",
  postedDate:new Date().toLocaleString(
    "en-US",{
      month:"short",
      day:"2-digit",
      year:"numeric"
    }
  )
});


  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.onload = () => {
        setWork((prev) => ({ ...prev, image: reader.result }));
      };
      if (files[0]) reader.readAsDataURL(files[0]);
    } else {
      setWork((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addWorkFun = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { title, image, location, salary } = work;
      if (!title || !image || !location || !salary) {
        toast.error("Please fill all the required fields");
        setLoading(false);
        return;
      }

      await addDoc(collection(fireDB, "work"), work);
      toast.success("Work added successfully");

      setWork({
        title: "",
        image: "",
        place:"",
        location: "",
        description: "",
        salary: "",
        time: "",
        date: "",
        postedDate:""
      });

      navigate("/adminDashboard");
    } catch (error) {
      console.error(error);
      toast.error("Error adding work");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-[100px] px-4 lg:px-90 lg:mt-10 mt-30 pb-20 bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-gray-900 border border-violet-700 rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
            Add New Work
          </h2>

          <form className="space-y-6" onSubmit={addWorkFun}>
            {/* Title */}
            <div>
              <label className="block text-violet-300 mb-2">Work Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={work.title}
                placeholder="Enter work title"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-violet-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-violet-300 mb-2">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 text-white bg-gray-800 border border-violet-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-violet-700 file:text-white hover:file:bg-violet-600"
              />
            </div>
            {/* Place */}
            <div>
              <label className="block text-violet-300 mb-2">Place</label>
              <input
                type="text"
                name="place"
                onChange={handleChange}
                value={work.place}
                placeholder="Enter event place"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-violet-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-violet-300 mb-2">Location</label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                value={work.location}
                placeholder="Enter location"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-violet-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-violet-300 mb-2">Date</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={work.date}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-violet-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-violet-300 mb-2">Time</label>
              <input
                type="text"
                name="time"
                onChange={handleChange}
                value={work.time}
                placeholder="e.g. 6 AM to 9 PM"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-violet-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-violet-300 mb-2">Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={work.description}
                placeholder="Enter work description"
                rows="4"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-violet-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              ></textarea>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-violet-300 mb-2">Salary (INR)</label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                value={work.salary}
                placeholder="Enter salary"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-violet-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-md"
              >
                {loading ? "Adding..." : "Add Work"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
