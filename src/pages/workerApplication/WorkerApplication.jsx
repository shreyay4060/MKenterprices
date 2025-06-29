import React, { useContext, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

export default function WorkerApplication() {

  const context = useContext(myContext);
  const {loading , setLoading}  = context;
  const [worker, setWorker] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      const file = files[0];

      // Validate image size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be less than 2MB");
        return;
      }

      setWorker((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else if (name === "name") {
      if (/\d/.test(value)) {
        toast.error("Name should not contain numbers");
        return;
      }
      setWorker((prev) => ({ ...prev, [name]: value }));
    } else if (name === "contact") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setWorker((prev) => ({ ...prev, contact: cleanedValue }));
    } else {
      setWorker((prev) => ({ ...prev, [name]: value }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, address, contact, image } = worker;

  if (contact.length !== 10) {
    return toast.error("Contact must be exactly 10 digits");
  }

  if (!name || !email || !address || !contact ) {
    return toast.error("Please fill in all fields including image");
  }

  setLoading(true); // Start loader

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
      setPreview(null);

      const storedUser = JSON.parse(localStorage.getItem("users"));
      if (storedUser?.role === "admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/userDashboard");
      }
    };

    reader.readAsDataURL(image);
  } catch (error) {
    console.error("Error submitting application:", error);
    toast.error("Submission failed");
  } finally {
    setLoading(false); // Stop loader
  }
};


if (loading) return <Loader />;
  return (
    <Layout>
      <div className="min-h-screen mt-40 lg:mt-15 bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white py-10 px-4">
        <div className="max-w-xl mx-auto bg-gray-900 rounded-xl p-6 shadow-lg border border-yellow-500">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
            Worker Application Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Upload Image (Max: 2MB | Format: JPG, PNG)
              </label>
              <input
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded"
              />
            </div>

            {preview && (
              <div className="mt-2 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full mx-auto border-2 border-yellow-500 object-cover"
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
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l bg-gray-700 text-white border border-r-0 border-gray-600">
                +91
              </span>
              <input
                type="tel"
                name="contact"
                placeholder="10-digit Mobile Number"
                value={worker.contact}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 outline-none text-white border border-gray-600 rounded-r"
              />
            </div>

             <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 font-semibold rounded transition duration-200 ${
                  loading
                    ? "bg-yellow-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black"
                }`}
              >
                {loading ? "Submitting ..." : "Submit Application"}
              </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
