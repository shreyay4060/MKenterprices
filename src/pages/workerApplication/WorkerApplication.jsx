import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";

export default function WorkerApplication() {
  const [worker, setWorker] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    image: null,
  });

  const navigate = useNavigate()

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setWorker((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setWorker((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, contact, image } = worker;

    if (!name || !email || !address || !contact || !image) {
      return toast.error("Please fill in all fields including image");
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        await addDoc(collection(fireDB, "workers"), {
          name,
          email,
          address,
          contact,
          image: base64Image,
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        });

        toast.success("Application submitted successfully");
        setWorker({ name: "", email: "", address: "", contact: "", image: null });
        navigate("/adminDashboard")
        setPreview(null);
      };

      reader.readAsDataURL(image);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Submission failed");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen mt-40 lg:mt-17 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
        <div className="max-w-xl mx-auto bg-gray-900 rounded-xl p-6 shadow-lg border border-yellow-500">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
            Worker Application Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
             <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded"
            />

            {preview && (
              <div className="mt-2 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full mx-auto border-2 border-yellow-500"
                />
              </div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={worker.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={worker.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Residential Address"
              value={worker.address}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={worker.contact}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded"
            />

           

            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
